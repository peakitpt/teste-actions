import { Action } from '@ngrx/store';
import * as actions from './accounting-chart-accounts-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccountingChartAccountsResponse } from '../accounting-chart-accounts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingChartAccounts: AccountingChartAccountsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingChartAccounts: {
    results: [],
  } as AccountingChartAccountsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingChartAccounts: AccountingChartAccountsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingChartAccountsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingChartAccountsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessGetAll:
      accountingChartAccounts = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingChartAccounts };

    case actions.AccountingChartAccountsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.AccountingChartAccountsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
