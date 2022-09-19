import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './formations-modal.reducer';
import { FormationsResponse } from '../formations-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('formations-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getFormations = createSelector(getFeature, (state: State) => {
  return state.formations as FormationsResponse;
});

export const getFormationSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
