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
import { AccountingBalanceSheetsService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingBalanceSheet,
  getAccountingBalanceSheetsListEntirely,
  getSelectedAccountingBalanceSheets,
} from './../reducers/accounting-balance-sheets.selectors';
import { getAccountingBalanceSheetsList } from '../reducers/accounting-balance-sheets.selectors';
import * as actions from '../reducers/accounting-balance-sheets.actions';
import {
  AccountingBalanceSheetResponse,
  AccountingBalanceSheet,
} from '../accounting-balance-sheet.model';
import { ofType } from '@ngrx/effects';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-accounting-balance-sheets-list',
  templateUrl: './accounting-balance-sheets-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingBalanceSheetsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-balance-sheets';
  viewName = 'AccountingBalanceSheet';
  modelList$: Observable<AccountingBalanceSheetResponse>;
  selectedRows$: Observable<AccountingBalanceSheet[]>;
  sideNavMainButton = false;

  selectorGetModel = getAccountingBalanceSheet;
  selectorGetList = getAccountingBalanceSheetsList;
  selectorGetSelected = getSelectedAccountingBalanceSheets;
  selectorGetListEntirely = getAccountingBalanceSheetsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionRequestGetNew = actions.RequestGetNew;

  @ViewChild('periodTotalDebitTemplate')
  periodTotalDebitTemplate: TemplateRef<any>;
  @ViewChild('periodTotalCreditTemplate')
  periodTotalCreditTemplate: TemplateRef<any>;
  @ViewChild('periodAggregatedDebitAmountTemplate')
  periodAggregatedDebitAmountTemplate: TemplateRef<any>;
  @ViewChild('periodAggregatedCreditAmountTemplate')
  periodAggregatedCreditAmountTemplate: TemplateRef<any>;
  @ViewChild('periodAggregatedBalanceTemplate')
  periodAggregatedBalanceTemplate: TemplateRef<any>;
  @ViewChild('footerTableTemplate')
  footerTableTemplate: TemplateRef<any>;

  newModel: any;
  @ViewChild('recalculateModal') recalculateModal: DialogComponent;

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
    private accountingBalanceSheetsService: AccountingBalanceSheetsService,
    private snackBarService: SnackBarService
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
      accountingBalanceSheetsService
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.getNewAccountingBalanceSheet();
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccountingBalanceSheetsActionTypes.SuccessPost,
          actions.AccountingBalanceSheetsActionTypes.SuccessPut,
          actions.AccountingBalanceSheetsActionTypes.SuccessDelete
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
        id: 'period',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.period`),
      },
      {
        id: 'account_id',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_id`
        ),
      },
      {
        id: 'account_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_description`
        ),
      },
      {
        id: 'period_total_debit',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.period_total_debit`
        ),
        template: this.periodTotalDebitTemplate,
        templateFooter: this.footerTableTemplate,
      },
      {
        id: 'period_total_credit',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.period_total_credit`
        ),
        template: this.periodTotalCreditTemplate,
        templateFooter: this.footerTableTemplate,
      },
      {
        id: 'period_aggregated_debit_amount',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.period_aggregated_debit_amount`
        ),
        template: this.periodAggregatedDebitAmountTemplate,
        templateFooter: this.footerTableTemplate,
      },
      {
        id: 'period_aggregated_credit_amount',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.period_aggregated_credit_amount`
        ),
        template: this.periodAggregatedCreditAmountTemplate,
        templateFooter: this.footerTableTemplate,
      },
      {
        id: 'period_aggregated_balance',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.period_aggregated_balance`
        ),
        template: this.periodAggregatedBalanceTemplate,
        templateFooter: this.footerTableTemplate,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'period',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.period`),
      },
      {
        id: 'account_id',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_id`
        ),
      },
      {
        id: 'account_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_description`
        ),
      },
    ];
  }

  goToAccountingTransactionLines(line: AccountingBalanceSheet) {
    this.router.navigate(['/accounting-transaction-lines'], {
      queryParams: {
        accounting_chart_account_id: line.accounting_chart_account_id,
        accounting_chart_account_description: `${line.account_id} - ${line.account_description}`,
        period: line.period,
      },
    });
  }

  getColumnTotal(column_id: string): any {
    let res: number = 0;
    let color = 'positive';

    this.modelListData.results.forEach((element) => {
      res += +element[column_id];
    });

    switch (column_id) {
      case 'period_total_debit':
      case 'period_aggregated_debit_amount':
      case 'period_aggregated_balance':
        if (res >= 0) {
          color = 'positive';
        } else {
          color = 'negative';
        }
        break;
      case 'period_total_credit':
      case 'period_aggregated_credit_amount':
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

  private getNewAccountingBalanceSheet() {
    const model$ = this.store.select(this.selectorGetModel);
    this.store.dispatch(new this.actionRequestGetNew());

    this.subs.push(
      model$.subscribe((obj: any) => {
        if (obj) {
          this.newModel = obj;
        }
      })
    );
  }

  callRecalculateModal() {
    this.recalculateModal.open();
  }

  recalculate() {
    this.subs.push(
      this.accountingBalanceSheetsService.recalculate(this.newModel).subscribe(
        (r: any) => {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:actions.recalculating`
            ),
            this.sharedModule.SUCCESS_COLOR
          );
        },
        (erro) => {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:actions.recalculating_failed`
            ),
            this.sharedModule.ERROR_COLOR
          );
        }
      )
    );
  }
}
