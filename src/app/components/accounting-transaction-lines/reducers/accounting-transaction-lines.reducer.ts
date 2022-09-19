import { Action } from '@ngrx/store';
import * as actions from './accounting-transaction-lines.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransactionLine,
  AccountingTransactionLineResponse,
} from '../accounting-transaction-line.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingTransactionLines: AccountingTransactionLineResponse;
  accountingTransactionLinesEntirely: AccountingTransactionLineResponse;
  accountingTransactionLine: AccountingTransactionLine;
  selectedIds: AccountingTransactionLine[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingTransactionLines: null,
  accountingTransactionLinesEntirely: null,
  accountingTransactionLine: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTransactionLines: any;
  let accountingTransactionLinesEntirely: any;
  let accountingTransactionLine: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingTransactionLinesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTransactionLinesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessGetAll:
      accountingTransactionLines = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTransactionLines };

    case actions.AccountingTransactionLinesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessGet:
      accountingTransactionLine = (action as actions.SuccessGet).payload;
      return { ...state, accountingTransactionLine };

    case actions.AccountingTransactionLinesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessPost:
      accountingTransactionLine = (action as actions.SuccessPost).payload;
      return { ...state, accountingTransactionLine };

    case actions.AccountingTransactionLinesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessPut:
      accountingTransactionLine = (action as actions.SuccessPut).payload;
      return { ...state, accountingTransactionLine };

    case actions.AccountingTransactionLinesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessDelete:
      accountingTransactionLine = (action as actions.SuccessDelete).payload;
      return { ...state, accountingTransactionLine };

    // case actions.AccountingTransactionLinesActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingTransactionLinesActionTypes.SuccessBulkDelete:
    //   accountingTransactionLine = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingTransactionLine };

    case actions.AccountingTransactionLinesActionTypes.RequestSendTest:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessSendTest:
      accountingTransactionLine = (action as actions.SuccessSendTest).payload;
      return { ...state, accountingTransactionLine };

    case actions.AccountingTransactionLinesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingTransactionLinesActionTypes.SetModalSelect:
      modalRowSelect = (action as actions.SetModalSelect).payload;
      return { ...state, modalRowSelect };

    case actions.AccountingTransactionLinesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessGetEntirely:
      accountingTransactionLinesEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingTransactionLinesEntirely };

    case actions.AccountingTransactionLinesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingTransactionLinesActionTypes.SuccessGetNew:
      accountingTransactionLine = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingTransactionLine };

    default:
      return state;
  }
}
