import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './relationship-degrees.reducer';
import {
  RelationshipDegreeResponse,
  RelationshipDegree
} from '../relationship-degree.model';

export const getRelationshipDegrees = createFeatureSelector(
  'relationship-degrees'
);

export const getError = createSelector(
  getRelationshipDegrees,
  (state: State) => state.error
);

export const getRelationshipDegreesList = createSelector(
  getRelationshipDegrees,
  (state: State) => {
    return state.relationshipDegrees as RelationshipDegreeResponse;
  }
);

export const getRelationshipDegree = createSelector(
  getRelationshipDegrees,
  (state: State) => {
    return state.relationshipDegree as RelationshipDegree;
  }
);

export const getSelectedRelationshipDegrees = createSelector(
  getRelationshipDegrees,
  (state: State) => {
    return state.selectedIds as RelationshipDegree[];
  }
);
