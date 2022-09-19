import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './clergy-types-modal.reducer';
import { ClergyTypeResponse } from '../clergy-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('clergy-types-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getClergyTypes = createSelector(getFeature, (state: State) => {
  return state.clergy_types as ClergyTypeResponse;
});

export const getClergyTypesSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
