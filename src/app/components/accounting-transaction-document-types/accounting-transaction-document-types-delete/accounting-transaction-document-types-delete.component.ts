import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingTransactionDocumentType,
  getSelectedAccountingTransactionDocumentTypes,
} from '../reducers/accounting-transaction-document-types.selectors';
import * as actions from '../reducers/accounting-transaction-document-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingTransactionDocumentType } from '../accounting-transaction-document-type.model';

@Component({
  selector: 'kyr-accounting-transaction-document-types-delete',
  templateUrl: './accounting-transaction-document-types-delete.component.html',
})
export class AccountingTransactionDocumentTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingTransactionDocumentType[]>;
  modelList: AccountingTransactionDocumentType[] = [];
  returnUrl = ['/accounting-transaction-document-types'];
  modulePath = 'accounting-transaction-document-types';

  selectorGetModel = getAccountingTransactionDocumentType;
  selectorGetSelected = getSelectedAccountingTransactionDocumentTypes;
  actionRequestFail =
    actions.AccountingTransactionDocumentTypesActionTypes
      .RequestFailAccountingTransactionDocumentTypes;
  actionRequestGetAll = actions.RequestGetAllAccountingTransactionDocumentTypes;
  actionRequestGetOne = actions.RequestGetAccountingTransactionDocumentType;
  actionRequestDelete = actions.RequestDeleteAccountingTransactionDocumentType;
  actionSuccessDelete =
    actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessDeleteAccountingTransactionDocumentType;
  actionSetSelected = actions.SetSelectedAccountingTransactionDocumentTypes;
}
