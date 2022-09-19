import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './parishioners-modal.reducer';
import { ParishionersResponse } from '../parishioners-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('parishioners-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getParishioners = createSelector(getFeature, (state: State) => {
  return state.parishioners as ParishionersResponse;
});

export const getParishionersSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
