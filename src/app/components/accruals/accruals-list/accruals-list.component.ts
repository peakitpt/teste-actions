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
import { AccrualsAccrualsService } from '@peakitpt/ui-kyrios-api';

import {
  getAccrualsListEntirely,
  getSelectedAccruals,
} from './../reducers/accruals.selectors';
import { getAccrualsList } from '../reducers/accruals.selectors';
import * as actions from '../reducers/accruals.actions';
import { AccrualResponse, Accrual } from '../accrual.model';
import { ofType } from '@ngrx/effects';
import { getListReports } from '../../reports/reducers/reports.selectors';
import { RequestGetListReports } from '../../reports/reducers/reports.actions';
import { Report } from '../../reports/report.model';

@Component({
  selector: 'kyr-accruals-list',
  templateUrl: './accruals-list.component.html',
})
export class AccrualsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accruals';
  modulePath = 'accruals';
  viewName = 'Accrual';
  modelList$: Observable<AccrualResponse>;
  selectedRows$: Observable<Accrual[]>;

  selectorGetList = getAccrualsList;
  selectorGetSelected = getSelectedAccruals;
  selectorGetListEntirely = getAccrualsListEntirely;
  actionSetSelected = actions.SetSelectedAccruals;
  actionRequestGetAll = actions.RequestGetAllAccruals;
  actionRequestGetListEntirely = actions.RequestGetEntirelyAccruals;

  @ViewChild('activeTemplate')
  activeTemplate: TemplateRef<any>;
  @ViewChild('validityDateStartTemplate')
  validityDateStartTemplate: TemplateRef<any>;
  @ViewChild('processingNextDateTemplate')
  processingNextDateTemplate: TemplateRef<any>;

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
    public moduleService?: AccrualsAccrualsService
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

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'client_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.client_name`
        ),
      },
      {
        id: 'accrual_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accrual_type_description`
        ),
      },
      {
        id: 'validity_date_start',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.validity_date_start`
        ),
        template: this.validityDateStartTemplate,
      },
      {
        id: 'processing_next_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.processing_next_date`
        ),
        template: this.processingNextDateTemplate,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
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
        id: 'client_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.client_name`
        ),
      },
      {
        id: 'accrual_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accrual_type_description`
        ),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccrualsActionTypes.SuccessPostAccrual,
          actions.AccrualsActionTypes.SuccessPutAccrual,
          actions.AccrualsActionTypes.SuccessDeleteAccrual
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  getReports() {
    // Get Reports list
    if (this.viewName) {
      const filter = {
        module: 'AccrualsAccrual',
        report_type: 'List',
      };
      const carboneReports$ = this.store.select(getListReports);
      this.store.dispatch(
        new RequestGetListReports({
          query: filter,
          page: 0,
          limit: 'all',
        })
      );

      this.subs.push(
        carboneReports$.subscribe((result: any) => {
          this.carboneReportsList = [];
          if (result) {
            if (result.results.length) {
              const parent = {
                name: this.i18nextPipe.transform(
                  `reports:message.created_reports`
                ),
                icon: 'edit_note',
                children: [],
              };

              result.results.forEach((rep: Report) => {
                parent.children.push({
                  name: rep.name,
                  value: {
                    fileName: rep.report_file,
                    fileType: rep.export_type,
                    reportType: rep.report_type,
                  },
                  icon: this.fileIcons[rep.export_type],
                });
              });
              this.carboneReportsList.push(parent);
            }
          }
        })
      );
    }
  }

  getSubscriptionReports() {
    super.getSubscriptionReports('AccrualsAccrual');
  }
}
