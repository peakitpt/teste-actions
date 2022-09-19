import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './valences.reducer';
import { ValenceResponse, Valence } from '../valence.model';

export const getValences = createFeatureSelector('valences');

export const getError = createSelector(
  getValences,
  (state: State) => state.error
);

export const getValencesList = createSelector(getValences, (state: State) => {
  return state.valences as ValenceResponse;
});

export const getValencesListEntirely = createSelector(
  getValences,
  (state: State) => {
    return state.valencesEntirely as ValenceResponse;
  }
);

export const getValence = createSelector(getValences, (state: State) => {
  return state.valence as Valence;
});

export const getSelectedValences = createSelector(
  getValences,
  (state: State) => {
    return state.selectedIds as Valence[];
  }
);
