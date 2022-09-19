import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './archpristships-modal.reducer';
import { ArchpristshipsResponse } from '../archpristships-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('archpristships-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getArchpristships = createSelector(getFeature, (state: State) => {
  return state.archpristships as ArchpristshipsResponse;
});

export const getArchpristshipsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
