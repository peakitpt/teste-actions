import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
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
import { AccountingTransactionLinesService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingTransactionLinesList,
  getAccountingTransactionLinesListEntirely,
} from '../reducers/accounting-transaction-lines.selectors';
import { getSelectedAccountingTransactionLines } from './../reducers/accounting-transaction-lines.selectors';
import * as actions from '../reducers/accounting-transaction-lines.actions';
import {
  AccountingTransactionLineResponse,
  AccountingTransactionLine,
} from '../accounting-transaction-line.model';
import { ofType } from '@ngrx/effects';
@Component({
  selector: 'kyr-accounting-transaction-lines-list',
  templateUrl: './accounting-transaction-lines-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionLinesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-transaction-lines';
  modelList$: Observable<AccountingTransactionLineResponse>;
  selectedRows$: Observable<AccountingTransactionLine[]>;
  viewName = 'AccountingTransactionLine';
  sideNavMainButton = false;

  selectorGetList = getAccountingTransactionLinesList;
  selectorGetSelected = getSelectedAccountingTransactionLines;
  selectorGetListEntirely = getAccountingTransactionLinesListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('transDateTemplate')
  transDateTemplate: TemplateRef<any>;
  @ViewChild('debitAmountTemplate')
  debitAmountTemplate: TemplateRef<any>;
  @ViewChild('creditAmountTemplate')
  creditAmountTemplate: TemplateRef<any>;
  @ViewChild('footerTableTemplate')
  footerTableTemplate: TemplateRef<any>;

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
    public moduleService?: AccountingTransactionLinesService
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
      },
      {
        id: 'trans_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.trans_date`
        ),
        template: this.transDateTemplate,
      },
      {
        id: 'accounting_chart_account_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accounting_chart_account_description`
        ),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'debit_amount',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.debit_amount`
        ),
        template: this.debitAmountTemplate,
        footerTemplate: this.footerTableTemplate,
      },
      {
        id: 'credit_amount',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.credit_amount`
        ),
        template: this.creditAmountTemplate,
        footerTemplate: this.footerTableTemplate,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'period',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.period`),
      },
      {
        id: 'trans_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.trans_date`
        ),
        template: this.transDateTemplate,
      },
      {
        id: 'accounting_chart_account_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accounting_chart_account_description`
        ),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccountingTransactionLinesActionTypes.SuccessPost,
          actions.AccountingTransactionLinesActionTypes.SuccessPut,
          actions.AccountingTransactionLinesActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  getColumnTotal(column_id: string): any {
    let res: number = 0;
    let color = 'positive';

    this.modelListData.results.forEach((element) => {
      res += +element[column_id];
    });

    switch (column_id) {
      case 'debit_amount':
        if (res >= 0) {
          color = 'positive';
        } else {
          color = 'negative';
        }
        break;
      case 'credit_amount':
        if (res < 0) {
          color = 'positive';
        } else {
          color = 'negative';
        }
        break;
      default:
        break;
    }

    return {
      value: res,
      color,
    };
  }
}
