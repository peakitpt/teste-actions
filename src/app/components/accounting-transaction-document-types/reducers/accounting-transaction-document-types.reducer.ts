import { Action } from '@ngrx/store';
import * as actions from './accounting-transaction-document-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransactionDocumentType,
  AccountingTransactionDocumentTypeResponse,
} from '../accounting-transaction-document-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingTransactionDocumentTypes: AccountingTransactionDocumentTypeResponse;
  accountingTransactionDocumentTypesEntirely: AccountingTransactionDocumentTypeResponse;
  accountingTransactionDocumentType: AccountingTransactionDocumentType;
  selectedIds: AccountingTransactionDocumentType[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingTransactionDocumentTypes: null,
  accountingTransactionDocumentTypesEntirely: null,
  accountingTransactionDocumentType: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTransactionDocumentTypes: any;
  let accountingTransactionDocumentTypesEntirely: any;
  let accountingTransactionDocumentType: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestFailAccountingTransactionDocumentTypes:
      const error = (action as actions.RequestFailAccountingTransactionDocumentTypes)
        .payload;
      return { ...state, error };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestGetAllAccountingTransactionDocumentTypes:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessGetAllAccountingTransactionDocumentTypes:
      accountingTransactionDocumentTypes = (action as actions.SuccessGetAllAccountingTransactionDocumentTypes)
        .payload;
      return { ...state, accountingTransactionDocumentTypes };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestGetAccountingTransactionDocumentType:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessGetAccountingTransactionDocumentType:
      accountingTransactionDocumentType = (action as actions.SuccessGetAccountingTransactionDocumentType)
        .payload;
      return { ...state, accountingTransactionDocumentType };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestPostAccountingTransactionDocumentType:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessPostAccountingTransactionDocumentType:
      accountingTransactionDocumentType = (action as actions.SuccessPostAccountingTransactionDocumentType)
        .payload;
      return { ...state, accountingTransactionDocumentType };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestPutAccountingTransactionDocumentType:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessPutAccountingTransactionDocumentType:
      accountingTransactionDocumentType = (action as actions.SuccessPutAccountingTransactionDocumentType)
        .payload;
      return { ...state, accountingTransactionDocumentType };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestDeleteAccountingTransactionDocumentType:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessDeleteAccountingTransactionDocumentType:
      accountingTransactionDocumentType = (action as actions.SuccessDeleteAccountingTransactionDocumentType)
        .payload;
      return { ...state, accountingTransactionDocumentType };

    // case actions.AccountingTransactionDocumentTypesActionTypes.RequestBulkDeleteAccountingTransactionDocumentTypes:
    //   return { ...state, error: null };

    // case actions.AccountingTransactionDocumentTypesActionTypes.SuccessBulkDeleteAccountingTransactionDocumentTypes:
    //   accountingTransactionDocumentType = (action as actions.SuccessBulkDeleteAccountingTransactionDocumentTypes).payload;
    //   return { ...state, accountingTransactionDocumentType };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestSendTestAccountingTransactionDocumentType:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessSendTestAccountingTransactionDocumentType:
      accountingTransactionDocumentType = (action as actions.SuccessSendTestAccountingTransactionDocumentType)
        .payload;
      return { ...state, accountingTransactionDocumentType };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SetSelectedAccountingTransactionDocumentTypes:
      selectedIds = (action as actions.SetSelectedAccountingTransactionDocumentTypes)
        .payload;
      return { ...state, selectedIds };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SetModalSelectAccountingTransactionDocumentType:
      modalRowSelect = (action as actions.SetModalSelectAccountingTransactionDocumentType)
        .payload;
      return { ...state, modalRowSelect };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .RequestGetEntirelyAccountingTransactionDocumentTypes:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessGetEntirelyAccountingTransactionDocumentTypes:
      accountingTransactionDocumentTypesEntirely = (action as actions.SuccessGetEntirelyAccountingTransactionDocumentTypes)
        .payload;
      return { ...state, accountingTransactionDocumentTypesEntirely };

    case actions.AccountingTransactionDocumentTypesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes.SuccessGetNew:
      accountingTransactionDocumentType = (action as actions.SuccessGetNew)
        .payload;
      return { ...state, accountingTransactionDocumentType };

    default:
      return state;
  }
}
