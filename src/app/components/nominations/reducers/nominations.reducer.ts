import { Action } from '@ngrx/store';
import * as actions from './nominations.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Nomination, NominationResponse } from '../nomination.model';

export interface State {
  nominations: NominationResponse;
  nominationsEntirely: NominationResponse;
  nomination: Nomination;
  selectedIds: Nomination[];
  error: RequestError;
}

export const initialState: State = {
  nominations: null,
  nominationsEntirely: null,
  nomination: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let nominations: any;
  let nominationsEntirely: any;
  let nomination: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.NominationsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NominationsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NominationsActionTypes.SuccessGetAll:
      nominations = (action as actions.SuccessGetAll).payload;
      return { ...state, nominations };

    case actions.NominationsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.NominationsActionTypes.SuccessGet:
      nomination = (action as actions.SuccessGet).payload;
      return { ...state, nomination };

    case actions.NominationsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.NominationsActionTypes.SuccessPost:
      nomination = (action as actions.SuccessPost).payload;
      return { ...state, nomination };

    case actions.NominationsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.NominationsActionTypes.SuccessPut:
      nomination = (action as actions.SuccessPut).payload;
      return { ...state, nomination };

    case actions.NominationsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.NominationsActionTypes.SuccessDelete:
      nomination = (action as actions.SuccessDelete).payload;
      return { ...state, nomination };

    // case actions.NominationsActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.NominationsActionTypes.SuccessBulkDelete:
    //   nomination = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, nomination };

    case actions.NominationsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.NominationsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.NominationsActionTypes.SuccessGetEntirely:
      nominationsEntirely = (action as actions.SuccessGetEntirely).payload;
      return { ...state, nominationsEntirely };

    case actions.NominationsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.NominationsActionTypes.SuccessGetNew:
      nomination = (action as actions.SuccessGetNew).payload;
      return { ...state, nomination };

    default:
      return state;
  }
}
