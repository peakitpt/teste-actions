import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './formations.reducer';
import { FormationResponse, Formation } from '../formation.model';

export const getFormations = createFeatureSelector('formations');

export const getError = createSelector(
  getFormations,
  (state: State) => state.error
);

export const getFormationsList = createSelector(
  getFormations,
  (state: State) => {
    return state.formations as FormationResponse;
  }
);

export const getFormationsListEntirely = createSelector(
  getFormations,
  (state: State) => {
    return state.formationsEntirely as FormationResponse;
  }
);

export const getFormation = createSelector(getFormations, (state: State) => {
  return state.formation as Formation;
});

export const getSelectedFormations = createSelector(
  getFormations,
  (state: State) => {
    return state.selectedIds as Formation[];
  }
);
