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
import { AccountingTransactionsService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingTransactionsListEntirely,
  getSelectedAccountingTransactions,
} from './../reducers/accounting-transactions.selectors';
import { getAccountingTransactionsList } from '../reducers/accounting-transactions.selectors';
import * as actions from '../reducers/accounting-transactions.actions';
import {
  AccountingTransactionResponse,
  AccountingTransaction,
} from '../accounting-transaction.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-accounting-transactions-list',
  templateUrl: './accounting-transactions-list.component.html',
})
export class AccountingTransactionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-transactions';
  viewName = 'AccountingTransaction';
  modelList$: Observable<AccountingTransactionResponse>;
  selectedRows$: Observable<AccountingTransaction[]>;

  selectorGetList = getAccountingTransactionsList;
  selectorGetSelected = getSelectedAccountingTransactions;
  selectorGetListEntirely = getAccountingTransactionsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('periodTypeTemplate')
  periodTypeTemplate: TemplateRef<any>;
  @ViewChild('transactionDateTemplate')
  transactionDateTemplate: TemplateRef<any>;
  @ViewChild('totalAmountTemplate')
  totalAmountTemplate: TemplateRef<any>;

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
    public moduleService?: AccountingTransactionsService
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
        id: 'period',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.period`),
        template: this.periodTypeTemplate,
      },
      {
        id: 'transaction_id',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.transaction_id`
        ),
      },
      {
        id: 'accounting_transaction_document_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accounting_transaction_document_type_description`
        ),
      },
      {
        id: 'transaction_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.transaction_date`
        ),
        template: this.transactionDateTemplate,
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'accounting_journal_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accounting_journal_description`
        ),
      },
      {
        id: 'doc_archival_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.doc_archival_number`
        ),
      },
      {
        id: 'total_amount',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.total_amount`
        ),
        template: this.totalAmountTemplate,
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
          actions.AccountingTransactionsActionTypes.SuccessPost,
          actions.AccountingTransactionsActionTypes.SuccessPut,
          actions.AccountingTransactionsActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
