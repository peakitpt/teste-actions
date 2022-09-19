import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-chart-accounts-modal.reducer';
import { AccountingChartAccountsResponse } from '../accounting-chart-accounts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'accounting-chart-accounts-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAccountingChartAccounts = createSelector(
  getFeature,
  (state: State) => {
    return state.accountingChartAccounts as AccountingChartAccountsResponse;
  }
);

export const getAccountingChartAccountsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
