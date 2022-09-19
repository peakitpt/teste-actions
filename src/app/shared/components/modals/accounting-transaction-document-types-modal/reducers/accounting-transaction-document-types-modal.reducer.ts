import { Action } from '@ngrx/store';
import * as actions from './accounting-transaction-document-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccountingTransactionDocumentTypesResponse } from '../accounting-transaction-document-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingTransactionDocumentTypes: AccountingTransactionDocumentTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingTransactionDocumentTypes: {
    results: [],
  } as AccountingTransactionDocumentTypesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTransactionDocumentTypes: AccountingTransactionDocumentTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingTransactionDocumentTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTransactionDocumentTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes.SuccessGetAll:
      accountingTransactionDocumentTypes = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTransactionDocumentTypes };

    case actions.AccountingTransactionDocumentTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.AccountingTransactionDocumentTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
