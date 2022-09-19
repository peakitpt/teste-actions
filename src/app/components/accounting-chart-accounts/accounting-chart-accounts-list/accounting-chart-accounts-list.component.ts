import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
import { AccountingChartAccountsService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingChartAccountsListEntirely,
  getSelectedAccountingChartAccounts,
} from './../reducers/accounting-chart-accounts.selectors';
import { getAccountingChartAccountsList } from '../reducers/accounting-chart-accounts.selectors';
import * as actions from '../reducers/accounting-chart-accounts.actions';
import {
  AccountingChartAccountResponse,
  AccountingChartAccount,
} from '../accounting-chart-account.model';
import { ofType } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-accounting-chart-accounts-list',
  templateUrl: './accounting-chart-accounts-list.component.html',
})
export class AccountingChartAccountsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-chart-accounts';
  viewName = 'AccountingChartAccount';
  modelList$: Observable<AccountingChartAccountResponse>;
  selectedRows$: Observable<AccountingChartAccount[]>;

  selectorGetList = getAccountingChartAccountsList;
  selectorGetSelected = getSelectedAccountingChartAccounts;
  selectorGetListEntirely = getAccountingChartAccountsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

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
    public moduleService?: AccountingChartAccountsService
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
        id: 'account_id_as_text',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_id_as_text`
        ),
      },
      {
        id: 'account_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_description`
        ),
      },
      {
        id: 'grouping_category',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.grouping_category`
        ),
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
        id: 'account_id_as_text',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_id_as_text`
        ),
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
          actions.AccountingChartAccountsActionTypes.SuccessPost,
          actions.AccountingChartAccountsActionTypes.SuccessPut,
          actions.AccountingChartAccountsActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  openRailsReport(file: any) {
    const url = `${environment.railsAppUrl}/accounting_chart_accounts/report/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
