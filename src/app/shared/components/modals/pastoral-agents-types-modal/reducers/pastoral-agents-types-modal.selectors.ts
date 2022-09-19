import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './pastoral-agents-types-modal.reducer';
import { PastoralAgentsTypesResponse } from '../pastoral-agents-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('pastoral-agents-type-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getPastoralAgentsTypes = createSelector(getFeature, (state: State) => {
  return state.pastoralAgentsTypes as PastoralAgentsTypesResponse;
});

export const getPastoralAgentsTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
