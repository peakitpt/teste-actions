import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './bishoprics-modal.reducer';
import { BishopricsResponse } from '../bishoprics-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('bishoprics-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getBishoprics = createSelector(getFeature, (state: State) => {
  return state.bishoprics as BishopricsResponse;
});

export const getBishopricsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
