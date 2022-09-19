import { Action } from '@ngrx/store';
import * as actions from './accounting-chart-accounts.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingChartAccount,
  AccountingChartAccountResponse,
} from '../accounting-chart-account.model';

export interface State {
  accountingChartAccounts: AccountingChartAccountResponse;
  accountingChartAccountsEntirely: AccountingChartAccountResponse;
  accountingChartAccount: AccountingChartAccount;
  selectedIds: AccountingChartAccount[];
  error: RequestError;
}

export const initialState: State = {
  accountingChartAccounts: null,
  accountingChartAccountsEntirely: null,
  accountingChartAccount: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingChartAccounts: any;
  let accountingChartAccountsEntirely: any;
  let accountingChartAccount: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccountingChartAccountsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingChartAccountsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessGetAll:
      accountingChartAccounts = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingChartAccounts };

    case actions.AccountingChartAccountsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessGet:
      accountingChartAccount = (action as actions.SuccessGet).payload;
      return { ...state, accountingChartAccount };

    case actions.AccountingChartAccountsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessPost:
      accountingChartAccount = (action as actions.SuccessPost).payload;
      return { ...state, accountingChartAccount };

    case actions.AccountingChartAccountsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessPut:
      accountingChartAccount = (action as actions.SuccessPut).payload;
      return { ...state, accountingChartAccount };

    case actions.AccountingChartAccountsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessDelete:
      accountingChartAccount = (action as actions.SuccessDelete).payload;
      return { ...state, accountingChartAccount };

    // case actions.AccountingChartAccountsActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingChartAccountsActionTypes.SuccessBulkDelete:
    //   accountingChartAccount = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingChartAccount };

    case actions.AccountingChartAccountsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingChartAccountsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessGetEntirely:
      accountingChartAccountsEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingChartAccountsEntirely };

    case actions.AccountingChartAccountsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessGetNew:
      accountingChartAccount = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingChartAccount };

    default:
      return state;
  }
}
