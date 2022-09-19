import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/reports-groups.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/reports-groups.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getReportsGroup } from '../reducers/reports-groups.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { ReportsGroup, ReportsGroupsLine } from '../reports-group.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { State as ReportsState } from 'src/app/shared/components/modals/reports-modal/reducers/reports-modal.reducer';
import { getReportsSelected } from 'src/app/shared/components/modals/reports-modal/reducers/reports-modal.selectors';
import { State as ReportsGroupersState } from 'src/app/shared/components/modals/reports-groupers-modal/reducers/reports-groupers-modal.reducer';
import { getReportsGroupersSelected } from 'src/app/shared/components/modals/reports-groupers-modal/reducers/reports-groupers-modal.selectors';

@Component({
  selector: 'kyr-reports-groups-form',
  templateUrl: './reports-groups-form.component.html',
})
export class ReportsGroupsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<ReportsGroup>;
  modulePath = 'reports-groups';

  selectorGetModel = getReportsGroup;
  actionRequestFail = actions.ReportsGroupsActionTypes.RequestFailReportsGroups;
  actionRequestGetAll = actions.RequestGetAllReportsGroups;
  actionRequestGetOne = actions.RequestGetReportsGroup;
  actionRequestPut = actions.RequestPutReportsGroup;
  actionSuccessPut = actions.ReportsGroupsActionTypes.SuccessPutReportsGroup;
  actionRequestPost = actions.RequestPostReportsGroup;
  actionSuccessPost = actions.ReportsGroupsActionTypes.SuccessPostReportsGroup;

  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('reportTemplate') reportTemplate: TemplateRef<any>;
  @ViewChild('reportsGrouperTemplate') reportsGrouperTemplate: TemplateRef<any>;

  reportsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  reportsGroupersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  reportsGroupsLinesColumns: any[] = [];
  reportsGroupsLinesDS: TableDataSource<any> = new TableDataSource([]);
  reportsGroupsLinesFormArray: FormArray = new FormArray([]);
  newReportsGroupsLine = {
    created_at: null,
    free_text: null,
    id: null,
    is_free_text: null,
    report_description: null,
    report_id: null,
    reports_group_id: null,
    reports_grouper_description: null,
    reports_grouper_id: null,
    updated_at: null,
    _destroy: false,
  };

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private reportsStore: Store<ReportsState>,
    private reportsGroupersStore: Store<ReportsGroupersState>
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

  initializeForm() {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      enabled: [true],
      block_remove: [false],
      created_at: [null],
      created_by_user_id: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      reports_groups_lines: this.fb.array([]),
      updated_at: [null],
      updated_by_user_id: [null],
    });

    this.reportsGroupsLinesFormArray = this.form.controls
      .reports_groups_lines as FormArray;
  }

  ngOnInit() {
    super.ngOnInit();
    this.setReportsModal();
    this.setReportsGroupersModal();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.setReportsGroupsLines(obj.reports_groups_lines);
  }

  onAfterViewInit() {
    this.clearModalInputs();
    this.buildReportsGroupsLinesTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_reports_modal': {
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);

            this.reportsGroupsLinesFormArray
              .get([tableIndex, 'report_id'])
              .setValue(null);
            this.reportsGroupsLinesFormArray
              .get([tableIndex, 'report_description'])
              .setValue(null);
          }
        }
        break;
      }
      case 'view_selected_reports': {
        if (inputName) {
          let id: number;

          if (inputName.includes('#')) {
            // Table's modal
            id = this.reportsGroupsLinesFormArray.get([
              this.getInputNameIndex(inputName),
              'report_id',
            ]).value;
          }
          if (id) {
            this.openDetails('reports', id);
          }
        }
        break;
      }
      case 'clear_reports-groupers_modal': {
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);

            this.reportsGroupsLinesFormArray
              .get([tableIndex, 'reports_group_id'])
              .setValue(null);
            this.reportsGroupsLinesFormArray
              .get([tableIndex, 'reports_grouper_description'])
              .setValue(null);
          }
        }
        break;
      }
      case 'view_selected_reports-groupers': {
        if (inputName) {
          let id: number;

          if (inputName.includes('#')) {
            // Table's modal
            id = this.reportsGroupsLinesFormArray.get([
              this.getInputNameIndex(inputName),
              'reports_group_id',
            ]).value;
          }

          if (id) {
            this.openDetails('reports_groups', id);
          }
        }
        break;
      }
      default: {
        super.menuClick(event, inputName);
      }
    }
  }

  onFormValid() {
    if (this.form.value.id) {
      this.store.dispatch(new this.actionRequestPut(this.form.value));
    } else {
      this.store.dispatch(new this.actionRequestPost(this.form.value));
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setReportsGroupsLines(reportsGroupsLines: ReportsGroupsLine[] = []) {
    this.reportsGroupsLinesFormArray.clear();
    this.reportsGroupsLinesDS.data = this.reportsGroupsLinesFormArray.value;
    if (reportsGroupsLines?.length) {
      reportsGroupsLines.forEach((menu: ReportsGroupsLine) => {
        this.addTableLine(
          menu,
          this.reportsGroupsLinesFormArray,
          this.reportsGroupsLinesDS
        );
      });
    }
  }

  private setReportsModal() {
    this.reportsMenuOptions = this.defaultModalMenu('reports');
    // When a row is selected
    this.subs.push(
      this.reportsStore
        .select(getReportsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.updateTableValues(
              this.getInputNameIndex(row.inputName),
              this.reportsGroupsLinesFormArray,
              this.reportsGroupsLinesDS,
              [
                {
                  control: 'report_id',
                  value: row.model.id,
                },
                {
                  control: 'report_description',
                  value:
                    row.model.report_name +
                    ' [' +
                    row.model.report_path +
                    ' - ' +
                    row.model.view_description +
                    ']',
                },
              ]
            );
          }
        })
    );
  }

  private setReportsGroupersModal() {
    this.reportsGroupersMenuOptions = this.defaultModalMenu('reports-groupers');
    // When a row is selected
    this.subs.push(
      this.reportsGroupersStore
        .select(getReportsGroupersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.updateTableValues(
              this.getInputNameIndex(row.inputName),
              this.reportsGroupsLinesFormArray,
              this.reportsGroupsLinesDS,
              [
                {
                  control: 'reports_grouper_id',
                  value: row.model.id,
                },
                {
                  control: 'reports_grouper_description',
                  value: row.model.name,
                },
              ]
            );
          }
        })
    );
  }

  private buildReportsGroupsLinesTableColumns() {
    setTimeout(() => {
      this.reportsGroupsLinesColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
        },
        {
          id: 'report_description',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.report_description`
            ) + ' *',
          sortable: false,
          template: this.reportTemplate,
        },
        {
          id: 'reports_grouper_description',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.reports_grouper_description`
            ) + ' *',
          sortable: false,
          template: this.reportsGrouperTemplate,
        },
      ];
    });
  }
}
