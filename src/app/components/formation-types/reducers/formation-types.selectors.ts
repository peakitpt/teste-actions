import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './formation-types.reducer';
import { FormationTypeResponse, FormationType } from '../formation-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFormationTypes = createFeatureSelector('formation-types');

export const getError = createSelector(
  getFormationTypes,
  (state: State) => state.error
);

export const getFormationTypesList = createSelector(
  getFormationTypes,
  (state: State) => {
    return state.formationTypes as FormationTypeResponse;
  }
);

export const getFormationTypesListEntirely = createSelector(
  getFormationTypes,
  (state: State) => {
    return state.formationtypesEntirely as FormationTypeResponse;
  }
);

export const getFormationType = createSelector(
  getFormationTypes,
  (state: State) => {
    return state.formationType as FormationType;
  }
);

export const getSelectedFormationTypes = createSelector(
  getFormationTypes,
  (state: State) => {
    return state.selectedIds as FormationType[];
  }
);

export const getModalRowFormationType = createSelector(
  getFormationTypes,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
