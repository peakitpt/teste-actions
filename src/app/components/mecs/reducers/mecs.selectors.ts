import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './mecs.reducer';

export const getMecs = createFeatureSelector('mecs');

export const getError = createSelector(getMecs, (state: State) => state.error);

export const getMecsList = createSelector(getMecs, (state: State) => {
  return state.mecs;
});

export const getMecsListEntirely = createSelector(getMecs, (state: State) => {
  return state.mecsEntirely;
});

export const getMEC = createSelector(getMecs, (state: State) => {
  return state.mec;
});

export const getSelectedMecs = createSelector(getMecs, (state: State) => {
  return state.selectedIds;
});
