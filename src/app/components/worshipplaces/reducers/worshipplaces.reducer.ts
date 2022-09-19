import { Action } from '@ngrx/store';
import * as actions from './worshipplaces.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Worshipplace, WorshipplaceResponse } from '../worshipplace.model';

export interface State {
  worshipplaces: WorshipplaceResponse;
  worshipplacesEntirely: WorshipplaceResponse;
  bishopric: Worshipplace;
  selectedIds: Worshipplace[];
  error: RequestError;
}

export const initialState: State = {
  worshipplaces: null,
  worshipplacesEntirely: null,
  bishopric: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let worshipplaces: any;
  let worshipplacesEntirely: any;
  let bishopric: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.WorshipplacesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.WorshipplacesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessGetAll:
      worshipplaces = (action as actions.SuccessGetAll).payload;
      return { ...state, worshipplaces };

    case actions.WorshipplacesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessGet:
      bishopric = (action as actions.SuccessGet).payload;
      return { ...state, bishopric };

    case actions.WorshipplacesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessPost:
      bishopric = (action as actions.SuccessPost).payload;
      return { ...state, bishopric };

    case actions.WorshipplacesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessPut:
      bishopric = (action as actions.SuccessPut).payload;
      return { ...state, bishopric };

    case actions.WorshipplacesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessDelete:
      bishopric = (action as actions.SuccessDelete).payload;
      return { ...state, bishopric };

    case actions.WorshipplacesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessBulkDelete:
      bishopric = (action as actions.SuccessBulkDelete).payload;
      return { ...state, bishopric };

    case actions.WorshipplacesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.WorshipplacesActionTypes.RequestGetEntirelyWorshipplaces:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessGetEntirelyWorshipplaces:
      worshipplacesEntirely = (action as actions.SuccessGetEntirelyWorshipplaces)
        .payload;
      return { ...state, worshipplacesEntirely };

    default:
      return state;
  }
}
