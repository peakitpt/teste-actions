import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-transaction-types.actions';
import { getAccountingTransactionType } from '../reducers/accounting-transaction-types.selectors';
import { Observable } from 'rxjs';
import { AccountingTransactionType } from '../accounting-transaction-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-accounting-transaction-types-details',
  templateUrl: './accounting-transaction-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingTransactionType>;
  returnUrl = '/accounting-transaction-types';
  modulePath = 'accounting-transaction-types';
  viewName = 'AccountingTransactionType';

  selectorGetModel = getAccountingTransactionType;
  actionRequestFail = actions.AccountingTransactionTypesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
