import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './patrons-modal.reducer';
import { PatronsResponse } from '../patrons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('patrons-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getPatrons = createSelector(getFeature, (state: State) => {
  return state.patrons as PatronsResponse;
});

export const getPatronsSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
