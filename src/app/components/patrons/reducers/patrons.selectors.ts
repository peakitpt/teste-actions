import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './patrons.reducer';

export const getPatrons = createFeatureSelector('patrons');

export const getError = createSelector(
  getPatrons,
  (state: State) => state.error
);

export const getPatronsList = createSelector(getPatrons, (state: State) => {
  return state.patrons;
});

export const getPatronsListEntirely = createSelector(
  getPatrons,
  (state: State) => {
    return state.patronsEntirely;
  }
);

export const getPatron = createSelector(getPatrons, (state: State) => {
  return state.patron;
});

export const getSelectedPatrons = createSelector(getPatrons, (state: State) => {
  return state.selectedIds;
});
