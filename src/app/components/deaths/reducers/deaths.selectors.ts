import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './deaths.reducer';
import { DeathResponse, Death } from '../death.model';

export const getDeaths = createFeatureSelector('deaths');

export const getError = createSelector(
  getDeaths,
  (state: State) => state.error
);

export const getDeathsList = createSelector(getDeaths, (state: State) => {
  return state.deaths as DeathResponse;
});

export const getDeathsListEntirely = createSelector(
  getDeaths,
  (state: State) => {
    return state.deathsEntirely as DeathResponse;
  }
);

export const getDeath = createSelector(getDeaths, (state: State) => {
  return state.death as Death;
});

export const getSelectedDeaths = createSelector(getDeaths, (state: State) => {
  return state.selectedIds as Death[];
});
