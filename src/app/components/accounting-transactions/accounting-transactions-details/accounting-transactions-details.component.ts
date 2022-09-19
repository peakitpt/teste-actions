import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-transactions.actions';
import { getAccountingTransaction } from '../reducers/accounting-transactions.selectors';
import { Observable } from 'rxjs';
import {
  AccountingTransaction,
  AccountingTransactionAttachment,
  AccountingTransactionLine,
} from '../accounting-transaction.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { AccountingTransactionsService } from '@peakitpt/ui-kyrios-api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-accounting-transactions-details',
  templateUrl: './accounting-transactions-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingTransaction>;
  returnUrl = '/accounting-transactions';
  modulePath = 'accounting-transactions';
  viewName = 'AccountingTransaction';

  selectorGetModel = getAccountingTransaction;
  actionRequestFail = actions.AccountingTransactionsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  transactionTypeOptions: any;
  periodOptions: any;
  detailsTabs: any[] = [];
  @ViewChild('generalTab') generalTab: TemplateRef<any>;
  @ViewChild('attachmentsTabsTemplate')
  attachmentsTabsTemplate: TemplateRef<any>;

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
    private accountingTransactionsService: AccountingTransactionsService
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
    super.ngAfterViewInit();
    this.setTransactionTypes();
    this.setPeriods();
    this.detailsTabs.push(
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.general'
        ),
        templateContent: this.generalTab,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.attachments'
        ),
        templateContent: this.attachmentsTabsTemplate,
      }
    );
  }

  setTransactionTypes() {
    this.accountingTransactionsService
      .getTransactionTypes()
      .subscribe((r: any[]) => {
        this.transactionTypeOptions = {};
        r.forEach((element) => {
          this.transactionTypeOptions[element.value] = element.name;
        });
      });
  }

  setPeriods() {
    this.periodOptions = {
      0: this.i18nextPipe.transform(`${this.modulePath}:model.options.opened`),
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    };
  }

  calculateGrandTotal(list: AccountingTransactionLine[]): number {
    let result: number = 0;

    list.forEach((line: AccountingTransactionLine) => {
      result += +line.credit_amount;
      result -= +line.debit_amount;
    });
    return result;
  }

  downloadAttachment(attachment: AccountingTransactionAttachment) {
    window.open(
      `${environment.railsAppUrl}/filemanagers/download?f=${attachment.attachment}&fn=${attachment.attachment_name}`,
      '_blank'
    );
  }
}
