import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './chapelries-modal.reducer';
import { ChapelriesResponse } from '../chapelries-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('chapelries-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getChapelries = createSelector(getFeature, (state: State) => {
  return state.chapelries as ChapelriesResponse;
});

export const getChapelriesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
