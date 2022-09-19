import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './institutions-types-modal.reducer';
import { InstitutionTypeResponse } from '../institutions-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('institutions-types-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getInstitutionsTypes = createSelector(getFeature, (state: State) => {
  return state.institutions_types as InstitutionTypeResponse;
});

export const getInstitutionsTypesSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
