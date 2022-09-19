import { Action } from '@ngrx/store';
import * as actions from './entitys-access.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityAccess, EntityAccessResponse } from '../entity-access.model';

export interface State {
  entitysAccess: EntityAccessResponse;
  entityAccess: EntityAccess;
  selectedIds: EntityAccess[];
  error: RequestError;
}

export const initialState: State = {
  entitysAccess: null,
  entityAccess: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let entitysAccess: any;
  let entityAccess: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.EntitysAccessActionTypes.RequestFailEntitysAccess:
      const error = (action as actions.RequestFailEntitysAccess).payload;
      return { ...state, error };

    case actions.EntitysAccessActionTypes.RequestGetAllEntitysAccess:
      return { ...state, error: null };

    case actions.EntitysAccessActionTypes.SuccessGetAllEntitysAccess:
      entitysAccess = (action as actions.SuccessGetAllEntitysAccess).payload;
      return { ...state, entitysAccess };

    case actions.EntitysAccessActionTypes.RequestGetEntityAccess:
      return { ...state, error: null };

    case actions.EntitysAccessActionTypes.SuccessGetEntityAccess:
      entityAccess = (action as actions.SuccessGetEntityAccess).payload;
      return { ...state, entityAccess };

    case actions.EntitysAccessActionTypes.RequestDeleteEntityAccess:
      return { ...state, error: null };

    case actions.EntitysAccessActionTypes.SuccessDeleteEntityAccess:
      entityAccess = (action as actions.SuccessDeleteEntityAccess).payload;
      return { ...state, entityAccess };

    // case actions.EntitysAccessActionTypes.RequestBulkDeleteEntitysAccess:
    //   return { ...state, error: null };

    // case actions.EntitysAccessActionTypes.SuccessBulkDeleteEntitysAccess:
    //   entityAccess = (action as actions.SuccessBulkDeleteEntitysAccess).payload;
    //   return { ...state, entityAccess };

    case actions.EntitysAccessActionTypes.SetSelectedEntitysAccess:
      selectedIds = (action as actions.SetSelectedEntitysAccess).payload;
      return { ...state, selectedIds };

    default:
      return state;
  }
}
