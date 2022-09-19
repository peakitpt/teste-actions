import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './institution-types.reducer';
import { InstitutionTypeResponse, InstitutionType } from '../institution-type.model';

export const getInstitutionTypes = createFeatureSelector('institution-types');

export const getError = createSelector(
  getInstitutionTypes,
  (state: State) => state.error
);

export const getInstitutionTypesList = createSelector(getInstitutionTypes, (state: State) => {
  return state.institution_types as InstitutionTypeResponse;
});

export const getInstitutionTypesListEntirely = createSelector(
  getInstitutionTypes,
  (state: State) => {
    return state.institution_typesEntirely as InstitutionTypeResponse;
  }
);

export const getInstitutionType = createSelector(getInstitutionTypes, (state: State) => {
  return state.institution_type as InstitutionType;
});

export const getSelectedInstitutionTypes = createSelector(getInstitutionTypes, (state: State) => {
  return state.selectedIds as InstitutionType[];
});
