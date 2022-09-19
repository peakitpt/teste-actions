import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './worshipplaces-modal.reducer';
import { WorshipplacesResponse } from '../worshipplaces-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('worshipplaces-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getWorshipplaces = createSelector(getFeature, (state: State) => {
  return state.worshipplaces as WorshipplacesResponse;
});

export const getWorshipplacesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
