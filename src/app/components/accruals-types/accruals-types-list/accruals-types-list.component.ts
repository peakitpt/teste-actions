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
import { AccrualsTypesService } from '@peakitpt/ui-kyrios-api';

import {
  getAccrualTypesListEntirely,
  getSelectedAccrualTypes,
} from './../reducers/accruals-types.selectors';
import { getAccrualTypesList } from '../reducers/accruals-types.selectors';
import * as actions from '../reducers/accruals-types.actions';
import { AccrualsTypeResponse, AccrualsType } from '../accruals-type.model';
import { ofType } from '@ngrx/effects';
import {
  getListReports,
  getListSubscriptionReports,
} from '../../reports/reducers/reports.selectors';
import {
  RequestGetListReports,
  RequestGetListSubscriptionReports,
} from '../../reports/reducers/reports.actions';
import {
  Report,
  ReportResponse,
  SubscriptionReport,
  SubscriptionReportGroup,
} from '../../reports/report.model';

@Component({
  selector: 'kyr-accruals-types-list',
  templateUrl: './accruals-types-list.component.html',
})
export class AccrualsTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accruals';
  modulePath = 'accruals-types';
  viewName = 'AccrualType';
  modelList$: Observable<AccrualsTypeResponse>;
  selectedRows$: Observable<AccrualsType[]>;

  selectorGetList = getAccrualTypesList;
  selectorGetSelected = getSelectedAccrualTypes;
  selectorGetListEntirely = getAccrualTypesListEntirely;
  actionSetSelected = actions.SetSelectedAccrualTypes;
  actionRequestGetAll = actions.RequestGetAllAccrualTypes;
  actionRequestGetListEntirely = actions.RequestGetEntirelyAccrualTypes;

  periodicityTypeTranslator: any;
  @ViewChild('validityDateStartTemplate')
  validityDateStartTemplate: TemplateRef<any>;
  @ViewChild('validityDateEndTemplate')
  validityDateEndTemplate: TemplateRef<any>;
  @ViewChild('periodicityTypeTemplate')
  periodicityTypeTemplate: TemplateRef<any>;

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
    public moduleService?: AccrualsTypesService
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

  ngAfterViewInit() {
    this.setPeriodicityTypes();
    super.ngAfterViewInit();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
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
        id: 'validity_date_end',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.validity_date_end`
        ),
        template: this.validityDateEndTemplate,
      },
      {
        id: 'periodicity_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.periodicity_type`
        ),
        template: this.periodicityTypeTemplate,
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
        id: 'code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccrualTypesActionTypes.SuccessPostAccrualType,
          actions.AccrualTypesActionTypes.SuccessPutAccrualType,
          actions.AccrualTypesActionTypes.SuccessDeleteAccrualType
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  setPeriodicityTypes() {
    this.periodicityTypeTranslator = {
      1: this.i18nextPipe.transform(`${this.modulePath}:options.yearly`),
      2: this.i18nextPipe.transform(`${this.modulePath}:options.quarterly`),
      3: this.i18nextPipe.transform(`${this.modulePath}:options.semiannual`),
      4: this.i18nextPipe.transform(`${this.modulePath}:options.monthly`),
      5: this.i18nextPipe.transform(`${this.modulePath}:options.weekly`),
      6: this.i18nextPipe.transform(`${this.modulePath}:options.other`),
    };
  }

  getReports() {
    // Get Reports list
    if (this.viewName) {
      const filter = {
        module: 'AccrualsType',
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
        carboneReports$.subscribe((result: ReportResponse) => {
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
    super.getSubscriptionReports('AccrualsType');
  }
}
