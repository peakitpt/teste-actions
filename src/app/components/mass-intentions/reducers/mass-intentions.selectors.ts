import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './mass-intentions.reducer';
import { MassIntentionResponse, MassIntention } from '../mass-intention.model';

export const getMassIntentions = createFeatureSelector('mass-intentions');

export const getError = createSelector(
  getMassIntentions,
  (state: State) => state.error
);

export const getMassIntentionsList = createSelector(
  getMassIntentions,
  (state: State) => {
    return state.massIntentions as MassIntentionResponse;
  }
);

export const getMassIntentionsListEntirely = createSelector(
  getMassIntentions,
  (state: State) => {
    return state.massIntentionsEntirely as MassIntentionResponse;
  }
);

export const getMassIntention = createSelector(
  getMassIntentions,
  (state: State) => {
    return state.massIntention as MassIntention;
  }
);

export const getSelectedMassIntentions = createSelector(
  getMassIntentions,
  (state: State) => {
    return state.selectedIds as MassIntention[];
  }
);
