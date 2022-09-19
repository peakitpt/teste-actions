import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './institutions.reducer';
import { InstitutionResponse, Institution } from '../institution.model';

export const getInstitutions = createFeatureSelector('institutions');

export const getError = createSelector(
  getInstitutions,
  (state: State) => state.error
);

export const getInstitutionsList = createSelector(
  getInstitutions,
  (state: State) => {
    return state.institutions as InstitutionResponse;
  }
);

export const getInstitutionsListEntirely = createSelector(
  getInstitutions,
  (state: State) => {
    return state.institutionsEntirely as InstitutionResponse;
  }
);

export const getInstitution = createSelector(
  getInstitutions,
  (state: State) => {
    return state.baptism as Institution;
  }
);

export const getSelectedInstitutions = createSelector(
  getInstitutions,
  (state: State) => {
    return state.selectedIds as Institution[];
  }
);
