import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './numerations.reducer';
import { NumerationResponse, Numeration } from '../numeration.model';

export const getNumerations = createFeatureSelector('numerations');

export const getError = createSelector(
  getNumerations,
  (state: State) => state.error
);

export const getNumerationsList = createSelector(
  getNumerations,
  (state: State) => {
    return state.numerations as NumerationResponse;
  }
);

export const getNumerationsListEntirely = createSelector(
  getNumerations,
  (state: State) => {
    return state.numerationsEntirely as NumerationResponse;
  }
);

export const getNumeration = createSelector(getNumerations, (state: State) => {
  return state.numeration as Numeration;
});

export const getSelectedNumerations = createSelector(
  getNumerations,
  (state: State) => {
    return state.selectedIds as Numeration[];
  }
);
