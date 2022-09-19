import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './formation-types-modal.reducer';
import { FormationTypesResponse } from '../formation-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('formation-types-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getFormationTypes = createSelector(getFeature, (state: State) => {
  return state.formationtypes as FormationTypesResponse;
});

export const getFormationTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
