import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './pastoral-agents-types.reducer';
import {
  PastoralAgentsType,
  PastoralAgentsTypeResponse
} from '../pastoral-agents-type.model';
export const getPastoralAgentsTypes = createFeatureSelector(
  'pastoral-agents-types'
);

export const getError = createSelector(
  getPastoralAgentsTypes,
  (state: State) => state.error
);

export const getPastoralAgentsTypesList = createSelector(
  getPastoralAgentsTypes,
  (state: State) => {
    return state.pastoralAgentsTypes as PastoralAgentsTypeResponse;
  }
);

export const getPastoralAgentsType = createSelector(
  getPastoralAgentsTypes,
  (state: State) => {
    return state.pastoralAgentsType as PastoralAgentsType;
  }
);

export const getPastoralAgentsTypesListEntirely = createSelector(
  getPastoralAgentsTypes,
  (state: State) => {
    return state.pastoralagenttypesEntirely as PastoralAgentsTypeResponse;
  }
);

export const getSelectedPastoralAgentsTypes = createSelector(
  getPastoralAgentsTypes,
  (state: State) => {
    return state.selectedIds as PastoralAgentsType[];
  }
);
