import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accrual-types-modal.reducer';
import { AccrualTypesResponse } from '../accrual-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('accrual-types-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAccrualTypes = createSelector(getFeature, (state: State) => {
  return state.accrualtypes as AccrualTypesResponse;
});

export const getAccrualTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
