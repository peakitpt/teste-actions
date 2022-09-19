import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/reports.actions';
import { getReport } from '../reducers/reports.selectors';
import { Observable } from 'rxjs';
import { Report } from '../report.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { getReportsPermissionsList } from '../../reports-permissions/reducers/reports-permissions.selectors';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import * as reportsPermissionsActions from 'src/app/components/reports-permissions/reducers/reports-permissions.actions';
import { State as ReportsPermissionsState } from 'src/app/components/reports-permissions/reducers/reports-permissions.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-reports-details',
  templateUrl: './reports-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ReportsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Report>;
  returnUrl = '/reports';
  modulePath = 'reports';
  viewName = 'Report';

  selectorGetModel = getReport;
  actionRequestFail = actions.ReportsActionTypes.RequestFailReports;
  actionRequestGetOne = actions.RequestGetReport;

  detailsTabs: any[];
  reportsPermissions$: Observable<any>;
  canEdit = false;

  // TEMPLATES
  @ViewChild('reportTemplate') reportTemplate: TemplateRef<any>;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private reportsPermissionsStore: Store<ReportsPermissionsState>
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
  }

  ngAfterViewInit() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.report`),
        templateContent: this.reportTemplate,
      },
    ];
    this.modal.open();
  }

  afterGetModel() {
    super.afterGetModel();
    this.setCanEdit();
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];

    if (this.canEdit) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }

    this.headerOptionsMenu.push({
      name: this.i18nextPipe.transform(`${this.modulePath}:action.permissions`),
      value: 'permissions',
      icon: 'lock_open',
    });
  }

  menuClick(event: string, data: any) {
    switch (event) {
      case 'permissions':
        this.modal.close();
        this.router.navigate([this.modulePath, this.id, 'permissions']);
        break;
      default:
        super.menuClick(event, data);
    }
  }

  setCanEdit() {
    if (
      this.model.reportings_permission.entity_id ==
      localStorage.getItem('subscriptionId')
    ) {
      this.canEdit = true;
    }
  }
}
