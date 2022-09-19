import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './worshipplaces.reducer';

export const getWorshipplaces = createFeatureSelector('worshipplaces');

export const getError = createSelector(
  getWorshipplaces,
  (state: State) => state.error
);

export const getWorshipplacesList = createSelector(
  getWorshipplaces,
  (state: State) => {
    return state.worshipplaces;
  }
);

export const getWorshipplacesListEntirely = createSelector(
  getWorshipplaces,
  (state: State) => {
    return state.worshipplacesEntirely;
  }
);

export const getWorshipplace = createSelector(
  getWorshipplaces,
  (state: State) => {
    return state.bishopric;
  }
);

export const getSelectedWorshipplaces = createSelector(
  getWorshipplaces,
  (state: State) => {
    return state.selectedIds;
  }
);
