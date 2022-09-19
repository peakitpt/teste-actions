import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ReportsService } from '@peakitpt/ui-kyrios-api';

import {
  getReportsList,
  getReportsListEntirely,
} from '../reducers/reports.selectors';
import { getSelectedReports } from './../reducers/reports.selectors';
import * as actions from '../reducers/reports.actions';
import { ReportResponse, Report } from '../report.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-reports-list',
  templateUrl: './reports-list.component.html',
})
export class ReportsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'reporting';
  modulePath = 'reports';
  modelList$: Observable<ReportResponse>;
  selectedRows$: Observable<Report[]>;
  viewName = 'Report';
  currentSubscriptionId = +localStorage.getItem('subscriptionId');

  selectorGetList = getReportsList;
  selectorGetSelected = getSelectedReports;
  selectorGetListEntirely = getReportsListEntirely;
  actionSetSelected = actions.SetSelectedReports;
  actionRequestGetAll = actions.RequestGetAllReports;
  actionRequestGetListEntirely = actions.RequestGetEntirelyReports;

  @ViewChild('reportOwnerTemplate') reportOwnerTemplate: TemplateRef<any>;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<any>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    public moduleService?: ReportsService
  ) {
    super(
      titleService,
      router,
      route,
      i18nextPipe,
      sharedModule,
      actionSubject,
      store,
      menuHelperService,
      http,
      fb,
      moduleService
    );
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.ReportsActionTypes.SuccessPostReport,
          actions.ReportsActionTypes.SuccessPutReport,
          actions.ReportsActionTypes.SuccessDeleteReport
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'report_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.report_type`
        ),
      },
      {
        id: 'module',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.module`),
      },
      {
        id: 'export_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.export_type`
        ),
      },
      {
        id: 'owner',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.owner`),
        template: this.reportOwnerTemplate,
      },
      {
        id: 'buttons',
        title: '',
        sortable: false,
        isColumnStickyEnd: true,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'report_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.report_type`
        ),
      },
      {
        id: 'export_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.export_type`
        ),
      },
    ];
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
      {
        name: this.i18nextPipe.transform(
          `${this.modulePath}:action.permissions`
        ),
        value: 'permissions',
        icon: 'lock_open',
      },
    ];
  }

  menuClick(event: string, data?: any) {
    switch (event) {
      case 'permissions':
        this.router.navigate([this.modulePath, data.id, 'permissions']);
        break;
      default:
        super.menuClick(event, data);
    }

    this.setLimit(event);
  }
}
