import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './chapelries.reducer';

export const getChapelries = createFeatureSelector('chapelries');

export const getError = createSelector(
  getChapelries,
  (state: State) => state.error
);

export const getChapelriesList = createSelector(
  getChapelries,
  (state: State) => {
    return state.chapelries;
  }
);

export const getChapelriesListEntirely = createSelector(
  getChapelries,
  (state: State) => {
    return state.chapelriesEntirely;
  }
);

export const getChapelry = createSelector(getChapelries, (state: State) => {
  return state.bishopric;
});

export const getSelectedChapelries = createSelector(
  getChapelries,
  (state: State) => {
    return state.selectedIds;
  }
);
