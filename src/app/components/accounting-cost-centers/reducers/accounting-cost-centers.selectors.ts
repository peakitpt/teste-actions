import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-cost-centers.reducer';
import {
  AccountingCostCenterResponse,
  AccountingCostCenter,
} from '../accounting-cost-center.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getAccountingCostCenters = createFeatureSelector(
  'accounting-cost-centers'
);

export const getError = createSelector(
  getAccountingCostCenters,
  (state: State) => state.error
);

export const getAccountingCostCentersList = createSelector(
  getAccountingCostCenters,
  (state: State) => {
    return state.accountingCostCenters as AccountingCostCenterResponse;
  }
);

export const getAccountingCostCentersListEntirely = createSelector(
  getAccountingCostCenters,
  (state: State) => {
    return state.accountingCostCentersEntirely as AccountingCostCenterResponse;
  }
);

export const getAccountingCostCenter = createSelector(
  getAccountingCostCenters,
  (state: State) => {
    return state.accountingCostCenter as AccountingCostCenter;
  }
);

export const getSelectedAccountingCostCenters = createSelector(
  getAccountingCostCenters,
  (state: State) => {
    return state.selectedIds as AccountingCostCenter[];
  }
);

export const getModalRowAccountingCostCenter = createSelector(
  getAccountingCostCenters,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
