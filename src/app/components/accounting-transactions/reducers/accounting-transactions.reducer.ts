import { Action } from '@ngrx/store';
import * as actions from './accounting-transactions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransaction,
  AccountingTransactionResponse,
} from '../accounting-transaction.model';

export interface State {
  accountingTransactions: AccountingTransactionResponse;
  accountingTransactionsEntirely: AccountingTransactionResponse;
  accountingTransaction: AccountingTransaction;
  selectedIds: AccountingTransaction[];
  error: RequestError;
}

export const initialState: State = {
  accountingTransactions: null,
  accountingTransactionsEntirely: null,
  accountingTransaction: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTransactions: any;
  let accountingTransactionsEntirely: any;
  let accountingTransaction: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccountingTransactionsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTransactionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTransactionsActionTypes.SuccessGetAll:
      accountingTransactions = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTransactions };

    case actions.AccountingTransactionsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingTransactionsActionTypes.SuccessGet:
      accountingTransaction = (action as actions.SuccessGet).payload;
      return { ...state, accountingTransaction };

    case actions.AccountingTransactionsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingTransactionsActionTypes.SuccessPost:
      accountingTransaction = (action as actions.SuccessPost).payload;
      return { ...state, accountingTransaction };

    case actions.AccountingTransactionsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingTransactionsActionTypes.SuccessPut:
      accountingTransaction = (action as actions.SuccessPut).payload;
      return { ...state, accountingTransaction };

    case actions.AccountingTransactionsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingTransactionsActionTypes.SuccessDelete:
      accountingTransaction = (action as actions.SuccessDelete).payload;
      return { ...state, accountingTransaction };

    // case actions.AccountingTransactionsActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingTransactionsActionTypes.SuccessBulkDelete:
    //   accountingTransaction = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingTransaction };

    case actions.AccountingTransactionsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingTransactionsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingTransactionsActionTypes.SuccessGetEntirely:
      accountingTransactionsEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingTransactionsEntirely };

    case actions.AccountingTransactionsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingTransactionsActionTypes.SuccessGetNew:
      accountingTransaction = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingTransaction };

    default:
      return state;
  }
}
