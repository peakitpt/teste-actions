import { Action } from '@ngrx/store';
import * as actions from './bishoprics.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Bishopric, BishopricResponse } from '../bishopric.model';

export interface State {
  bishoprics: BishopricResponse;
  bishopricsEntirely: BishopricResponse;
  bishopric: Bishopric;
  selectedIds: Bishopric[];
  error: RequestError;
}

export const initialState: State = {
  bishoprics: null,
  bishopricsEntirely: null,
  bishopric: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let bishoprics: any;
  let bishopricsEntirely: any;
  let bishopric: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.BishopricsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.BishopricsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessGetAll:
      bishoprics = (action as actions.SuccessGetAll).payload;
      return { ...state, bishoprics };

    case actions.BishopricsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessGet:
      bishopric = (action as actions.SuccessGet).payload;
      return { ...state, bishopric };

    case actions.BishopricsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessPost:
      bishopric = (action as actions.SuccessPost).payload;
      return { ...state, bishopric };

    case actions.BishopricsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessPut:
      bishopric = (action as actions.SuccessPut).payload;
      return { ...state, bishopric };

    case actions.BishopricsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessDelete:
      bishopric = (action as actions.SuccessDelete).payload;
      return { ...state, bishopric };

    case actions.BishopricsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessBulkDelete:
      bishopric = (action as actions.SuccessBulkDelete).payload;
      return { ...state, bishopric };

    case actions.BishopricsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.BishopricsActionTypes.RequestGetEntirelyBishoprics:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessGetEntirelyBishoprics:
      bishopricsEntirely = (action as actions.SuccessGetEntirelyBishoprics)
        .payload;
      return { ...state, bishopricsEntirely };

    default:
      return state;
  }
}
