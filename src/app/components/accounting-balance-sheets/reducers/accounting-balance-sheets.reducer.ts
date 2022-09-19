import { Action } from '@ngrx/store';
import * as actions from './accounting-balance-sheets.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingBalanceSheet,
  AccountingBalanceSheetResponse,
} from '../accounting-balance-sheet.model';

export interface State {
  accountingBalanceSheets: AccountingBalanceSheetResponse;
  accountingBalanceSheetsEntirely: AccountingBalanceSheetResponse;
  accountingBalanceSheet: AccountingBalanceSheet;
  selectedIds: AccountingBalanceSheet[];
  error: RequestError;
}

export const initialState: State = {
  accountingBalanceSheets: null,
  accountingBalanceSheetsEntirely: null,
  accountingBalanceSheet: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingBalanceSheets: any;
  let accountingBalanceSheetsEntirely: any;
  let accountingBalanceSheet: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccountingBalanceSheetsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingBalanceSheetsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingBalanceSheetsActionTypes.SuccessGetAll:
      accountingBalanceSheets = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingBalanceSheets };

    case actions.AccountingBalanceSheetsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingBalanceSheetsActionTypes.SuccessGet:
      accountingBalanceSheet = (action as actions.SuccessGet).payload;
      return { ...state, accountingBalanceSheet };

    case actions.AccountingBalanceSheetsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingBalanceSheetsActionTypes.SuccessPost:
      accountingBalanceSheet = (action as actions.SuccessPost).payload;
      return { ...state, accountingBalanceSheet };

    case actions.AccountingBalanceSheetsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingBalanceSheetsActionTypes.SuccessPut:
      accountingBalanceSheet = (action as actions.SuccessPut).payload;
      return { ...state, accountingBalanceSheet };

    case actions.AccountingBalanceSheetsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingBalanceSheetsActionTypes.SuccessDelete:
      accountingBalanceSheet = (action as actions.SuccessDelete).payload;
      return { ...state, accountingBalanceSheet };

    // case actions.AccountingBalanceSheetsActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingBalanceSheetsActionTypes.SuccessBulkDelete:
    //   accountingBalanceSheet = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingBalanceSheet };

    case actions.AccountingBalanceSheetsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingBalanceSheetsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingBalanceSheetsActionTypes.SuccessGetEntirely:
      accountingBalanceSheetsEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingBalanceSheetsEntirely };

    case actions.AccountingBalanceSheetsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingBalanceSheetsActionTypes.SuccessGetNew:
      accountingBalanceSheet = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingBalanceSheet };

    default:
      return state;
  }
}
