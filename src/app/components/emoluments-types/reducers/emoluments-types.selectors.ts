import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './emoluments-types.reducer';
import { EmolumentTypeResponse, EmolumentType } from '../emoluments-type.model';

export const getEmolumentsTypes = createFeatureSelector('emoluments-types');

export const getError = createSelector(
  getEmolumentsTypes,
  (state: State) => state.error
);

export const getEmolumentsTypesList = createSelector(
  getEmolumentsTypes,
  (state: State) => {
    return state.emolumentsTypes as EmolumentTypeResponse;
  }
);

export const getEmolumentsTypesListEntirely = createSelector(
  getEmolumentsTypes,
  (state: State) => {
    return state.emolumentsTypesEntirely as EmolumentTypeResponse;
  }
);

export const getEmolumentType = createSelector(
  getEmolumentsTypes,
  (state: State) => {
    return state.numeration as EmolumentType;
  }
);

export const getSelectedEmolumentsTypes = createSelector(
  getEmolumentsTypes,
  (state: State) => {
    return state.selectedIds as EmolumentType[];
  }
);
