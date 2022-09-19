import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accruals.reducer';
import { AccrualResponse, Accrual } from '../accrual.model';

export const getAccruals = createFeatureSelector('accruals');

export const getError = createSelector(
  getAccruals,
  (state: State) => state.error
);

export const getAccrualsList = createSelector(getAccruals, (state: State) => {
  return state.accrualsAccruals as AccrualResponse;
});

export const getAccrualsListEntirely = createSelector(
  getAccruals,
  (state: State) => {
    return state.accrualsAccrualsEntirely as AccrualResponse;
  }
);

export const getAccrual = createSelector(getAccruals, (state: State) => {
  return state.accrual as Accrual;
});

export const getSelectedAccruals = createSelector(
  getAccruals,
  (state: State) => {
    return state.selectedIds as Accrual[];
  }
);
