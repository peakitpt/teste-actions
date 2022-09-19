import { Action } from '@ngrx/store';
import * as actions from './acolytes.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityAcolyte } from '../../mecs/mecs.model';
import { AcolyteResponse } from '../acolytes.model';

export interface State {
  acolytes: AcolyteResponse;
  acolytesEntirely: AcolyteResponse;
  acolyte: EntityAcolyte;
  selectedIds: EntityAcolyte[];
  error: RequestError;
}

export const initialState: State = {
  acolytes: null,
  acolytesEntirely: null,
  acolyte: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let acolytes: any;
  let acolytesEntirely: any;
  let acolyte: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AcolytesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AcolytesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AcolytesActionTypes.SuccessGetAll:
      acolytes = (action as actions.SuccessGetAll).payload;
      return { ...state, acolytes };

    case actions.AcolytesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AcolytesActionTypes.SuccessGet:
      acolyte = (action as actions.SuccessGet).payload;
      return { ...state, acolyte };

    case actions.AcolytesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AcolytesActionTypes.SuccessPost:
      acolyte = (action as actions.SuccessPost).payload;
      return { ...state, acolyte };

    case actions.AcolytesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AcolytesActionTypes.SuccessPut:
      acolyte = (action as actions.SuccessPut).payload;
      return { ...state, acolyte };

    case actions.AcolytesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AcolytesActionTypes.SuccessDelete:
      acolyte = (action as actions.SuccessDelete).payload;
      return { ...state, acolyte };

    case actions.AcolytesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.AcolytesActionTypes.SuccessBulkDelete:
      acolyte = (action as actions.SuccessBulkDelete).payload;
      return { ...state, acolyte };

    case actions.AcolytesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AcolytesActionTypes.RequestGetEntirelyAcolytes:
      return { ...state, error: null };

    case actions.AcolytesActionTypes.SuccessGetEntirelyAcolytes:
      acolytesEntirely = (action as actions.SuccessGetEntirelyAcolytes).payload;
      return { ...state, acolytesEntirely };

    default:
      return state;
  }
}
