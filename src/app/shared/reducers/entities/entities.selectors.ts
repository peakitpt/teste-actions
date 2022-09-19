import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './entities.reducer';
import { Entity } from './entity.model';

export const getEntities = createFeatureSelector('entities');

export const getError = createSelector(
  getEntities,
  (state: State) => state.error
);

export const getEntity = createSelector(getEntities, (state: State) => {
  return state.entity as Entity;
});
