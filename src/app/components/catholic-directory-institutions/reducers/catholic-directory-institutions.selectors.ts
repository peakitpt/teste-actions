import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './catholic-directory-institutions.reducer';
import {
  CatholicDirectoryInstitutionResponse,
  CatholicDirectoryInstitution,
} from '../catholic-directory-institution.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getCatholicDirectoryInstitutions = createFeatureSelector(
  'catholic-directory-institutions'
);

export const getError = createSelector(
  getCatholicDirectoryInstitutions,
  (state: State) => state.error
);

export const getCatholicDirectoryInstitutionsList = createSelector(
  getCatholicDirectoryInstitutions,
  (state: State) => {
    return state.catholicDirectoryInstitutions as CatholicDirectoryInstitutionResponse;
  }
);

export const getCatholicDirectoryInstitutionsListEntirely = createSelector(
  getCatholicDirectoryInstitutions,
  (state: State) => {
    return state.catholicDirectoryInstitutionsEntirely as CatholicDirectoryInstitutionResponse;
  }
);

export const getCatholicDirectoryInstitution = createSelector(
  getCatholicDirectoryInstitutions,
  (state: State) => {
    return state.catholicDirectoryInstitution as CatholicDirectoryInstitution;
  }
);

export const getSelectedCatholicDirectoryInstitutions = createSelector(
  getCatholicDirectoryInstitutions,
  (state: State) => {
    return state.selectedIds as CatholicDirectoryInstitution[];
  }
);

export const getModalRowCatholicDirectoryInstitution = createSelector(
  getCatholicDirectoryInstitutions,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
