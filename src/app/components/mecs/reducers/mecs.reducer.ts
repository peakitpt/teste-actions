import { Action } from '@ngrx/store';
import * as actions from './mecs.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityMec, MECResponse } from '../mecs.model';

export interface State {
  mecs: MECResponse;
  mecsEntirely: MECResponse;
  mec: EntityMec;
  selectedIds: EntityMec[];
  error: RequestError;
}

export const initialState: State = {
  mecs: null,
  mecsEntirely: null,
  mec: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let mecs: any;
  let mecsEntirely: any;
  let mec: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.MecsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.MecsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.MecsActionTypes.SuccessGetAll:
      mecs = (action as actions.SuccessGetAll).payload;
      return { ...state, mecs };

    case actions.MecsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.MecsActionTypes.SuccessGet:
      mec = (action as actions.SuccessGet).payload;
      return { ...state, mec };

    case actions.MecsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.MecsActionTypes.SuccessPost:
      mec = (action as actions.SuccessPost).payload;
      return { ...state, mec };

    case actions.MecsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.MecsActionTypes.SuccessPut:
      mec = (action as actions.SuccessPut).payload;
      return { ...state, mec };

    case actions.MecsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.MecsActionTypes.SuccessDelete:
      mec = (action as actions.SuccessDelete).payload;
      return { ...state, mec };

    case actions.MecsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.MecsActionTypes.SuccessBulkDelete:
      mec = (action as actions.SuccessBulkDelete).payload;
      return { ...state, mec };

    case actions.MecsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.MecsActionTypes.RequestGetEntirelyMecs:
      return { ...state, error: null };

    case actions.MecsActionTypes.SuccessGetEntirelyMecs:
      mecsEntirely = (action as actions.SuccessGetEntirelyMecs).payload;
      return { ...state, mecsEntirely };

    default:
      return state;
  }
}
