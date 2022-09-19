import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './valences-modal.reducer';
import { ValencesResponse } from '../valences-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('valences-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getValences = createSelector(getFeature, (state: State) => {
  return state.valences as ValencesResponse;
});

export const getValenceTypes = createSelector(getFeature, (state: State) => {
  return state.valenceTypes as any;
});

export const getValencesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
