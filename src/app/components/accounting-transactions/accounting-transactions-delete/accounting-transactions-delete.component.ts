import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingTransaction,
  getSelectedAccountingTransactions,
} from '../reducers/accounting-transactions.selectors';
import * as actions from '../reducers/accounting-transactions.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingTransaction } from '../accounting-transaction.model';

@Component({
  selector: 'kyr-accounting-transactions-delete',
  templateUrl: './accounting-transactions-delete.component.html',
})
export class AccountingTransactionsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingTransaction[]>;
  modelList: AccountingTransaction[] = [];
  returnUrl = ['/accounting-transactions'];
  modulePath = 'accounting-transactions';

  selectorGetModel = getAccountingTransaction;
  selectorGetSelected = getSelectedAccountingTransactions;
  actionRequestFail = actions.AccountingTransactionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.AccountingTransactionsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
