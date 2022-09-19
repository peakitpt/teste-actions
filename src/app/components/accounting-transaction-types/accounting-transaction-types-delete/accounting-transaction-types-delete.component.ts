import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingTransactionType,
  getSelectedAccountingTransactionTypes,
} from '../reducers/accounting-transaction-types.selectors';
import * as actions from '../reducers/accounting-transaction-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingTransactionType } from '../accounting-transaction-type.model';

@Component({
  selector: 'kyr-accounting-transaction-types-delete',
  templateUrl: './accounting-transaction-types-delete.component.html',
})
export class AccountingTransactionTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingTransactionType[]>;
  modelList: AccountingTransactionType[] = [];
  returnUrl = ['/accounting-transaction-types'];
  modulePath = 'accounting-transaction-types';

  selectorGetModel = getAccountingTransactionType;
  selectorGetSelected = getSelectedAccountingTransactionTypes;
  actionRequestFail = actions.AccountingTransactionTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete =
    actions.AccountingTransactionTypesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
