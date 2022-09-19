import { Action } from '@ngrx/store';
import * as actions from './accounting-transaction-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransactionType,
  AccountingTransactionTypeResponse,
} from '../accounting-transaction-type.model';

export interface State {
  accountingTransactionTypes: AccountingTransactionTypeResponse;
  accountingTransactionTypesEntirely: AccountingTransactionTypeResponse;
  accountingTransactionType: AccountingTransactionType;
  selectedIds: AccountingTransactionType[];
  error: RequestError;
}

export const initialState: State = {
  accountingTransactionTypes: null,
  accountingTransactionTypesEntirely: null,
  accountingTransactionType: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTransactionTypes: any;
  let accountingTransactionTypesEntirely: any;
  let accountingTransactionType: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccountingTransactionTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTransactionTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTransactionTypesActionTypes.SuccessGetAll:
      accountingTransactionTypes = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTransactionTypes };

    case actions.AccountingTransactionTypesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingTransactionTypesActionTypes.SuccessGet:
      accountingTransactionType = (action as actions.SuccessGet).payload;
      return { ...state, accountingTransactionType };

    case actions.AccountingTransactionTypesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingTransactionTypesActionTypes.SuccessPost:
      accountingTransactionType = (action as actions.SuccessPost).payload;
      return { ...state, accountingTransactionType };

    case actions.AccountingTransactionTypesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingTransactionTypesActionTypes.SuccessPut:
      accountingTransactionType = (action as actions.SuccessPut).payload;
      return { ...state, accountingTransactionType };

    case actions.AccountingTransactionTypesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingTransactionTypesActionTypes.SuccessDelete:
      accountingTransactionType = (action as actions.SuccessDelete).payload;
      return { ...state, accountingTransactionType };

    // case actions.AccountingTransactionTypesActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingTransactionTypesActionTypes.SuccessBulkDelete:
    //   accountingTransactionType = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingTransactionType };

    case actions.AccountingTransactionTypesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingTransactionTypesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingTransactionTypesActionTypes.SuccessGetEntirely:
      accountingTransactionTypesEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingTransactionTypesEntirely };

    case actions.AccountingTransactionTypesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingTransactionTypesActionTypes.SuccessGetNew:
      accountingTransactionType = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingTransactionType };

    default:
      return state;
  }
}
