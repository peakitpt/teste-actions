import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-chart-accounts.reducer';
import {
  AccountingChartAccountResponse,
  AccountingChartAccount,
} from '../accounting-chart-account.model';

export const getAccountingChartAccounts = createFeatureSelector(
  'accounting-chart-accounts'
);

export const getError = createSelector(
  getAccountingChartAccounts,
  (state: State) => state.error
);

export const getAccountingChartAccountsList = createSelector(
  getAccountingChartAccounts,
  (state: State) => {
    return state.accountingChartAccounts as AccountingChartAccountResponse;
  }
);

export const getAccountingChartAccountsListEntirely = createSelector(
  getAccountingChartAccounts,
  (state: State) => {
    return state.accountingChartAccountsEntirely as AccountingChartAccountResponse;
  }
);

export const getAccountingChartAccount = createSelector(
  getAccountingChartAccounts,
  (state: State) => {
    return state.accountingChartAccount as AccountingChartAccount;
  }
);

export const getSelectedAccountingChartAccounts = createSelector(
  getAccountingChartAccounts,
  (state: State) => {
    return state.selectedIds as AccountingChartAccount[];
  }
);
