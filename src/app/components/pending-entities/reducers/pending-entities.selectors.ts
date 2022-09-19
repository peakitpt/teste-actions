import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './pending-entities.reducer';
import {
  AcceptPendingEntity,
  CountPendingEntities,
  PendingEntityEntity,
  PendingEntityResponse,
} from '../pending-entity.model';
import { Entity } from 'src/app/shared/reducers/entities/entity.model';

export const getPendingEntities = createFeatureSelector('pending-entities');

export const getError = createSelector(
  getPendingEntities,
  (state: State) => state.error
);

export const getPendingEntitiesList = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.pendingEntities as PendingEntityResponse;
  }
);

export const getPendingEntitiesEntirely = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.pendingEntitiesEntirely as PendingEntityResponse;
  }
);

export const getPendingEntity = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.pendingEntity as PendingEntityEntity;
  }
);

export const getSelectedPendingEntity = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.selectedIds as PendingEntityEntity[];
  }
);

export const getPendingEntityById = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.pendingEntitiesById as PendingEntityEntity;
  }
);

export const getRejectedPendingEntity = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.rejectedPendingEntity as PendingEntityEntity;
  }
);

export const getAcceptedPendingEntity = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.acceptedPendingEntity as AcceptPendingEntity;
  }
);

export const getCountPendingEntity = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.countPendingEntity as CountPendingEntities;
  }
);

export const getSimilarEntity = createSelector(
  getPendingEntities,
  (state: State) => {
    return state.similarEntities as Entity[];
  }
);
