import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './pastoral-agents.reducer';

export const getPastoralAgents = createFeatureSelector('pastoral-agent');

export const getError = createSelector(
  getPastoralAgents,
  (state: State) => state.error
);

export const getPastoralAgentsList = createSelector(
  getPastoralAgents,
  (state: State) => {
    return state.pastoralAgents;
  }
);

export const getPastoralAgentsListEntirely = createSelector(
  getPastoralAgents,
  (state: State) => {
    return state.pastoralagentsEntirely;
  }
);

export const getPastoralAgent = createSelector(
  getPastoralAgents,
  (state: State) => {
    return state.pastoralAgent;
  }
);

export const getPastoralAgentTypes = createSelector(
  getPastoralAgents,
  (state: State) => {
    return state.pastoralAgentTypes;
  }
);

export const getSelectedPastoralAgents = createSelector(
  getPastoralAgents,
  (state: State) => {
    return state.selectedIds;
  }
);
