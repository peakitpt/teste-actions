import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './families.reducer';
import { FamilyResponse, Family } from '../family.model';

export const getFamilies = createFeatureSelector('families');

export const getError = createSelector(
  getFamilies,
  (state: State) => state.error
);

export const getFamiliesList = createSelector(getFamilies, (state: State) => {
  return state.families as FamilyResponse;
});

export const getFamiliesListEntirely = createSelector(
  getFamilies,
  (state: State) => {
    return state.familiesEntirely as FamilyResponse;
  }
);

export const getFamily = createSelector(getFamilies, (state: State) => {
  return state.family as Family;
});

export const getSelectedFamilies = createSelector(
  getFamilies,
  (state: State) => {
    return state.selectedIds as Family[];
  }
);

export const getEntityFamilies = createSelector(getFamilies, (state: State) => {
  return state.entityFamilies as Array<{ id: number; name: string }>;
});
