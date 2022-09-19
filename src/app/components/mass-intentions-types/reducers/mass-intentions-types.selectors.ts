import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './mass-intentions-types.reducer';
import {
  MassIntentionsTypeResponse,
  MassIntentionsType,
} from '../mass-intentions-type.model';

export const getMassIntentionsTypes = createFeatureSelector(
  'mass-intentions-types'
);

export const getError = createSelector(
  getMassIntentionsTypes,
  (state: State) => state.error
);

export const getMassIntentionsTypesList = createSelector(
  getMassIntentionsTypes,
  (state: State) => {
    return state.massIntentionsTypes as MassIntentionsTypeResponse;
  }
);

export const getMassIntentionsTypesListEntirely = createSelector(
  getMassIntentionsTypes,
  (state: State) => {
    return state.massIntentionsTypesEntirely as MassIntentionsTypeResponse;
  }
);

export const getMassIntentionsType = createSelector(
  getMassIntentionsTypes,
  (state: State) => {
    return state.massIntentionsType as MassIntentionsType;
  }
);

export const getSelectedMassIntentionsTypes = createSelector(
  getMassIntentionsTypes,
  (state: State) => {
    return state.selectedIds as MassIntentionsType[];
  }
);
