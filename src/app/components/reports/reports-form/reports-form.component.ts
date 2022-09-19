import { getSubscriptionsSelected } from './../../../shared/components/modals/subscriptions-modal/reducers/subscriptions-modal.selectors';
import { getReportsPermissionsList } from './../../reports-permissions/reducers/reports-permissions.selectors';
import { ViewResponse, View } from './../report.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Observable } from 'rxjs';
import * as actions from '../reducers/reports.actions';
import { getReport, getViewsList } from '../reducers/reports.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Report } from '../report.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { FormGroup } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../reducers/reports.reducer';
import { State as BaseState } from 'src/app/components/base/reducers/base.reducer';
import * as reportsPermissionsActions from 'src/app/components/reports-permissions/reducers/reports-permissions.actions';
import { State as ReportsPermissionsState } from 'src/app/components/reports-permissions/reducers/reports-permissions.reducer';
import { State as SubscriptionsState } from 'src/app/shared/components/modals/subscriptions-modal/reducers/subscriptions-modal.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { getSubscriptions } from '../../base/reducers/base.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-reports-form',
  templateUrl: './reports-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ReportsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Report>;
  views$: Observable<any>;
  modulePath = 'reports';
  // canEdit = true;

  selectorGetModel = getReport;
  selectorGetViews = getViewsList;
  actionRequestFail = actions.ReportsActionTypes.RequestFailReports;
  actionRequestGetAll = actions.RequestGetAllReports;
  actionRequestGetOne = actions.RequestGetReport;
  actionRequestPut = actions.RequestPutReport;
  actionSuccessPut = actions.ReportsActionTypes.SuccessPutReport;
  actionRequestPost = actions.RequestPostReport;
  actionSuccessPost = actions.ReportsActionTypes.SuccessPostReport;
  actionRequestGetAllViews = actions.RequestGetAllViews;

  // TEMPLATES
  @ViewChild('reportTemplate') reportTemplate: TemplateRef<any>;

  // Specific variables (Reports)
  reportTypeOptions = [
    {
      value: 'List',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.list`),
    },
    {
      value: 'Form',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.form`),
    },
    {
      value: 'DetailsList',
      label: this.i18nextPipe.transform(
        `${this.modulePath}:option.detailsList`
      ),
    },
  ];
  moduleOptions = [];
  exportTypeOptions = [
    {
      value: 'pdf',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.pdf`),
    },
    {
      value: 'docx',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.docx`),
    },
    {
      value: 'xlsx',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.xlsx`),
    },
    {
      value: 'odt',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.odt`),
    },
    {
      value: 'ods',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.ods`),
    },
  ];
  selectedFile: any;
  // Specific variables (Reports Permissions)
  modalParam = {};
  reportsPermissions$: Observable<any>;
  entities$: Observable<any>;
  entitiesOptions: Array<{ label: string; value: number }> = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private baseStore: Store<BaseState>,
    private reportsPermissionsStore: Store<ReportsPermissionsState>,
    private subscriptionsStore: Store<SubscriptionsState>
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject
    );
  }

  onAfterViewInit() {
    this.getViews();

    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.report`),
        templateContent: this.reportTemplate,
      },
    ];
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, Validators.required],
      report_type: [null, Validators.required],
      module: [null, Validators.required],
      export_type: [null, Validators.required],
      report_file: [null, Validators.required],
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    // this.setCanEdit();
  }

  getViews() {
    this.views$ = this.store.select(this.selectorGetViews);
    // we want all the views
    this.store.dispatch(
      new this.actionRequestGetAllViews({
        limit: 'all',
      })
    );

    this.subs.push(
      this.views$.subscribe((obj: ViewResponse) => {
        if (obj) {
          this.moduleOptions = obj.results.map((view) => {
            return {
              label: this.i18nextPipe.transform(
                `${this.modulePath}:option.module.${view.name}`
              ),
              value: view.name,
            };
          });
        }
      })
    );
  }

  changeReportFile(files: FileList) {
    this.selectedFile = files[0];
    this.form.get('report_file').setValue(this.selectedFile.name);
  }

  onSubmit() {
    this.isSaving = true;
    this.requireMatch(); // Add error if module does not exist

    if (this.form.valid) {
      this.onFormValid();
    } else {
      this.isSaving = false;

      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform('translation:message.form_errors'),
        this.sharedModule.ERROR_COLOR
      );
    }
  }

  onFormValid() {
    const fd = new FormData();

    Object.keys(this.form.value).forEach((key: string) => {
      switch (key) {
        case 'report_file':
          if (this.selectedFile) {
            fd.append(key, this.selectedFile, this.selectedFile.name);
          }
          break;
        case 'module':
          if (this.form.value[key].value) {
            fd.append(key, this.form.value[key].value);
          } else {
            fd.append(key, this.form.value[key]);
          }
          break;
        default:
          fd.append(key, this.form.value[key]);
          break;
      }
    });

    if (this.form.value.id) {
      const payload = {
        id: this.id,
        payload: fd,
      };
      this.store.dispatch(new this.actionRequestPut(payload));
    } else {
      this.store.dispatch(new this.actionRequestPost(fd));
    }
  }

  requireMatch() {
    let res = false;
    for (const i of this.moduleOptions) {
      if (
        i.value === this.form.value.module ||
        i.value === this.form.value.module.value
      ) {
        res = true;
        break;
      }
    }
    if (res) {
      this.form.controls['module'].setErrors(null);
    } else {
      this.form.controls['module'].setErrors({ inexistent: true });
    }
  }

  // setCanEdit() {
  //   if (
  //     this.model.reportings_permission.entity_id ==
  //     localStorage.getItem('subscriptionId')
  //   ) {
  //     this.canEdit = true;
  //   }
  // }
}
