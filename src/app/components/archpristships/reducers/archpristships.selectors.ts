import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './archpristships.reducer';

export const getArchpristships = createFeatureSelector('archpristships');

export const getError = createSelector(
  getArchpristships,
  (state: State) => state.error
);

export const getArchpristshipsList = createSelector(
  getArchpristships,
  (state: State) => {
    return state.archpristships;
  }
);

export const getArchpristshipsListEntirely = createSelector(
  getArchpristships,
  (state: State) => {
    return state.archpristshipsEntirely;
  }
);

export const getArchpristship = createSelector(
  getArchpristships,
  (state: State) => {
    return state.bishopric;
  }
);

export const getSelectedArchpristships = createSelector(
  getArchpristships,
  (state: State) => {
    return state.selectedIds;
  }
);
