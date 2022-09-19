import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-cost-centers-modal.reducer';
import { AccountingCostCentersResponse } from '../accounting-cost-centers-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'accounting-cost-centers-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAccountingCostCenters = createSelector(
  getFeature,
  (state: State) => {
    return state.accountingCostCenters as AccountingCostCentersResponse;
  }
);

export const getAccountingCostCentersSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
