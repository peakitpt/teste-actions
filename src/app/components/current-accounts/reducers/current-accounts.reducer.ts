import { Action } from '@ngrx/store';
import * as actions from './current-accounts.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CurrentAccount,
  CurrentAccountReceipt,
  CurrentAccountResponse,
} from '../current-account.model';

export interface State {
  currentAccounts: CurrentAccountResponse;
  currentAccountsEntirely: CurrentAccountResponse;
  currentAccount: CurrentAccount;
  selectedIds: CurrentAccount[];
  error: RequestError;
  currentAccountsReceipts: CurrentAccountResponse;
  currentAccountReceipt: CurrentAccountReceipt;
}

export const initialState: State = {
  currentAccounts: null,
  currentAccountsEntirely: null,
  currentAccount: null,
  selectedIds: null,
  error: null,
  currentAccountsReceipts: { results: [] } as CurrentAccountResponse,
  currentAccountReceipt: null,
};

export function reducer(state = initialState, action: Action): State {
  let currentAccounts: any;
  let currentAccountsEntirely: any;
  let currentAccount: any;
  let selectedIds: any;
  let currentAccountsReceipts: any;
  let currentAccountReceipt: any;

  switch (action.type) {
    case actions.CurrentAccountsActionTypes.RequestFailCurrentAccounts:
      const error = (action as actions.RequestFailCurrentAccounts).payload;
      return { ...state, error };

    case actions.CurrentAccountsActionTypes.RequestGetAllCurrentAccounts:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessGetAllCurrentAccounts:
      currentAccounts = (action as actions.SuccessGetAllCurrentAccounts)
        .payload;
      return { ...state, currentAccounts };

    case actions.CurrentAccountsActionTypes.RequestGetCurrentAccount:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessGetCurrentAccount:
      currentAccount = (action as actions.SuccessGetCurrentAccount).payload;
      return { ...state, currentAccount };

    case actions.CurrentAccountsActionTypes.RequestPostCurrentAccount:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessPostCurrentAccount:
      currentAccount = (action as actions.SuccessPostCurrentAccount).payload;
      return { ...state, currentAccount };

    case actions.CurrentAccountsActionTypes.RequestPutCurrentAccount:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessPutCurrentAccount:
      currentAccount = (action as actions.SuccessPutCurrentAccount).payload;
      return { ...state, currentAccount };

    case actions.CurrentAccountsActionTypes.RequestDeleteCurrentAccount:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessDeleteCurrentAccount:
      currentAccount = (action as actions.SuccessDeleteCurrentAccount).payload;
      return { ...state, currentAccount };

    // case actions.CurrentAccountsActionTypes.RequestBulkDeleteCurrentAccounts:
    //   return { ...state, error: null };

    // case actions.CurrentAccountsActionTypes.SuccessBulkDeleteCurrentAccounts:
    //   currentAccount = (action as actions.SuccessBulkDeleteCurrentAccounts).payload;
    //   return { ...state, currentAccount };

    case actions.CurrentAccountsActionTypes.SetSelectedCurrentAccounts:
      selectedIds = (action as actions.SetSelectedCurrentAccounts).payload;
      return { ...state, selectedIds };

    case actions.CurrentAccountsActionTypes.RequestGetEntirelyCurrentAccounts:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessGetEntirelyCurrentAccounts:
      currentAccountsEntirely = (action as actions.SuccessGetEntirelyCurrentAccounts)
        .payload;
      return { ...state, currentAccountsEntirely };

    case actions.CurrentAccountsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessGetNew:
      currentAccount = (action as actions.SuccessGetNew).payload;
      return { ...state, currentAccount };

    case actions.CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipts:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessGetCurrentAccountsReceipts:
      currentAccountsReceipts = (action as actions.SuccessGetCurrentAccountsReceipts)
        .payload;
      return { ...state, currentAccountsReceipts };

    case actions.CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipt:
      return { ...state, error: null };

    case actions.CurrentAccountsActionTypes.SuccessGetCurrentAccountsReceipt:
      currentAccountReceipt = (action as actions.SuccessGetCurrentAccountsReceipt)
        .payload;
      return { ...state, currentAccountReceipt };
      
    default:
      return state;
  }
}
