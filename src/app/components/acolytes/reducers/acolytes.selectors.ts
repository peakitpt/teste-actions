import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './acolytes.reducer';

export const getAcolytes = createFeatureSelector('acolytes');

export const getError = createSelector(
  getAcolytes,
  (state: State) => state.error
);

export const getAcolytesList = createSelector(getAcolytes, (state: State) => {
  return state.acolytes;
});

export const getAcolytesListEntirely = createSelector(
  getAcolytes,
  (state: State) => {
    return state.acolytesEntirely;
  }
);

export const getAcolyte = createSelector(getAcolytes, (state: State) => {
  return state.acolyte;
});

export const getSelectedAcolytes = createSelector(
  getAcolytes,
  (state: State) => {
    return state.selectedIds;
  }
);
