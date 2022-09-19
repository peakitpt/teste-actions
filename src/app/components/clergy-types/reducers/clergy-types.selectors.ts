import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './clergy-types.reducer';
import { ClergyTypeResponse, ClergyType } from '../clergy-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getClergyTypes = createFeatureSelector('clergy-types');

export const getError = createSelector(
  getClergyTypes,
  (state: State) => state.error
);

export const getClergyTypesList = createSelector(getClergyTypes, (state: State) => {
  return state.clergy_types as ClergyTypeResponse;
});

export const getClergyTypesListEntirely = createSelector(
  getClergyTypes,
  (state: State) => {
    return state.clergy_typesEntirely as ClergyTypeResponse;
  }
);

export const getClergyType = createSelector(getClergyTypes, (state: State) => {
  return state.clergy_type as ClergyType;
});

export const getSelectedClergyTypes = createSelector(getClergyTypes, (state: State) => {
  return state.selectedIds as ClergyType[];
});
