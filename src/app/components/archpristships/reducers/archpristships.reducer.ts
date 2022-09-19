import { Action } from '@ngrx/store';
import * as actions from './archpristships.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Archpristship, ArchpristshipResponse } from '../archpristship.model';

export interface State {
  archpristships: ArchpristshipResponse;
  archpristshipsEntirely: ArchpristshipResponse;
  bishopric: Archpristship;
  selectedIds: Archpristship[];
  error: RequestError;
}

export const initialState: State = {
  archpristships: null,
  archpristshipsEntirely: null,
  bishopric: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let archpristships: any;
  let archpristshipsEntirely: any;
  let bishopric: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.ArchpristshipsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ArchpristshipsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessGetAll:
      archpristships = (action as actions.SuccessGetAll).payload;
      return { ...state, archpristships };

    case actions.ArchpristshipsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessGet:
      bishopric = (action as actions.SuccessGet).payload;
      return { ...state, bishopric };

    case actions.ArchpristshipsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessPost:
      bishopric = (action as actions.SuccessPost).payload;
      return { ...state, bishopric };

    case actions.ArchpristshipsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessPut:
      bishopric = (action as actions.SuccessPut).payload;
      return { ...state, bishopric };

    case actions.ArchpristshipsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessDelete:
      bishopric = (action as actions.SuccessDelete).payload;
      return { ...state, bishopric };

    case actions.ArchpristshipsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessBulkDelete:
      bishopric = (action as actions.SuccessBulkDelete).payload;
      return { ...state, bishopric };

    case actions.ArchpristshipsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.ArchpristshipsActionTypes.RequestGetEntirelyArchpristships:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessGetEntirelyArchpristships:
      archpristshipsEntirely = (action as actions.SuccessGetEntirelyArchpristships)
        .payload;
      return { ...state, archpristshipsEntirely };

    default:
      return state;
  }
}
