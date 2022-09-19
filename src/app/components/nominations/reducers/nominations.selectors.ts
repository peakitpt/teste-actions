import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './nominations.reducer';
import { NominationResponse, Nomination } from '../nomination.model';

export const getNominations = createFeatureSelector('nominations');

export const getError = createSelector(
  getNominations,
  (state: State) => state.error
);

export const getNominationsList = createSelector(
  getNominations,
  (state: State) => {
    return state.nominations as NominationResponse;
  }
);

export const getNominationsListEntirely = createSelector(
  getNominations,
  (state: State) => {
    return state.nominationsEntirely as NominationResponse;
  }
);

export const getNomination = createSelector(getNominations, (state: State) => {
  return state.nomination as Nomination;
});

export const getSelectedNominations = createSelector(
  getNominations,
  (state: State) => {
    return state.selectedIds as Nomination[];
  }
);
