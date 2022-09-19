import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accruals-types.reducer';
import { AccrualsTypeResponse, AccrualsType } from '../accruals-type.model';

export const getAccrualTypes = createFeatureSelector('accruals-types');

export const getError = createSelector(
  getAccrualTypes,
  (state: State) => state.error
);

export const getAccrualTypesList = createSelector(
  getAccrualTypes,
  (state: State) => {
    return state.accrualTypes as AccrualsTypeResponse;
  }
);

export const getAccrualTypesListEntirely = createSelector(
  getAccrualTypes,
  (state: State) => {
    return state.accrualTypesEntirely as AccrualsTypeResponse;
  }
);

export const getAccrualType = createSelector(
  getAccrualTypes,
  (state: State) => {
    return state.accrualType as AccrualsType;
  }
);

export const getSelectedAccrualTypes = createSelector(
  getAccrualTypes,
  (state: State) => {
    return state.selectedIds as AccrualsType[];
  }
);
