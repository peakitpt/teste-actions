import { Action } from '@ngrx/store';
import * as actions from './pending-entities.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CountPendingEntities,
  PendingEntityEntity,
  PendingEntityResponse,
} from '../pending-entity.model';
import { Entity } from 'src/app/shared/reducers/entities/entity.model';

export interface State {
  pendingEntities: PendingEntityResponse;
  pendingEntitiesEntirely: PendingEntityResponse;
  pendingEntity: PendingEntityEntity;
  pendingEntitiesById: PendingEntityEntity;
  selectedIds: PendingEntityEntity[];
  rejectedPendingEntity: PendingEntityEntity;
  acceptedPendingEntity: PendingEntityEntity;
  countPendingEntity: CountPendingEntities;
  similarEntities: Entity[];

  error: RequestError;
}

export const initialState: State = {
  pendingEntities: null,
  pendingEntitiesEntirely: null,
  pendingEntity: null,
  pendingEntitiesById: null,
  selectedIds: null,
  rejectedPendingEntity: null,
  acceptedPendingEntity: null,
  countPendingEntity: null,
  similarEntities: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;

  switch (action.type) {
    case actions.PendingEntitiesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PendingEntitiesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, pendingEntities: successResult };

    case actions.PendingEntitiesActionTypes.ClearGetAll:
      return {
        ...state,
        pendingEntities: { results: [] } as PendingEntityResponse,
      };

    case actions.PendingEntitiesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, pendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.ClearGet:
      return { ...state, pendingEntity: null };

    case actions.PendingEntitiesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, pendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, pendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, pendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, pendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.PendingEntitiesActionTypes.RequestGetByEntityId:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessGetByEntityId:
      successResult = (action as actions.SuccessGetByEntityId).payload;
      return { ...state, pendingEntitiesById: successResult };

    case actions.PendingEntitiesActionTypes.ClearGetByEntityId:
      return { ...state, pendingEntitiesById: null };

    case actions.PendingEntitiesActionTypes.RequestCheckExistance:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, pendingEntitiesEntirely: successResult };

    case actions.PendingEntitiesActionTypes.RequestRejectPendingEntity:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessRejectPendingEntity:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, rejectedPendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.RequestAcceptPendingEntity:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessAcceptPendingEntity:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, acceptedPendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.RequestCountPendingEntity:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessCountPendingEntity:
      successResult = (action as actions.SuccessCountPendingEntity).payload;
      return { ...state, countPendingEntity: successResult };

    case actions.PendingEntitiesActionTypes.RequestSimilarEntity:
      return { ...state, error: null };

    case actions.PendingEntitiesActionTypes.SuccessSimilarEntity:
      successResult = (action as actions.SuccessSimilarEntity).payload;
      return { ...state, similarEntities: successResult };

    default:
      return state;
  }
}
