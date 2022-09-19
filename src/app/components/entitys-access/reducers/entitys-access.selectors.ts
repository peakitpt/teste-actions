import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './entitys-access.reducer';
import { EntityAccessResponse, EntityAccess } from '../entity-access.model';

export const getEntitysAccess = createFeatureSelector('entitys-access');

export const getError = createSelector(
  getEntitysAccess,
  (state: State) => state.error
);

export const getEntitysAccessList = createSelector(
  getEntitysAccess,
  (state: State) => {
    return state.entitysAccess as EntityAccessResponse;
  }
);

export const getEntityAccess = createSelector(
  getEntitysAccess,
  (state: State) => {
    return state.entityAccess as EntityAccess;
  }
);

export const getSelectedEntitysAccess = createSelector(
  getEntitysAccess,
  (state: State) => {
    return state.selectedIds as EntityAccess[];
  }
);
