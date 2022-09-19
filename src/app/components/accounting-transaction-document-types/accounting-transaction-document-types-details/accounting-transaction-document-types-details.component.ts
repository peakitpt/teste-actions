import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-transaction-document-types.actions';
import { getAccountingTransactionDocumentType } from '../reducers/accounting-transaction-document-types.selectors';
import { Observable } from 'rxjs';
import { AccountingTransactionDocumentType } from '../accounting-transaction-document-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-accounting-transaction-document-types-details',
  templateUrl: './accounting-transaction-document-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionDocumentTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingTransactionDocumentType>;
  returnUrl = '/accounting-transaction-document-types';
  modulePath = 'accounting-transaction-document-types';
  viewName = 'AccountingTransactionDocumentType';

  selectorGetModel = getAccountingTransactionDocumentType;
  actionRequestFail =
    actions.AccountingTransactionDocumentTypesActionTypes
      .RequestFailAccountingTransactionDocumentTypes;
  actionRequestGetOne = actions.RequestGetAccountingTransactionDocumentType;
}
