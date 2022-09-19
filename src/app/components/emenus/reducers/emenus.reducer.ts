import { Action } from '@ngrx/store';
import * as actions from './emenus.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Emenu, EmenuResponse } from '../emenu.model';

export interface State {
  emenus: EmenuResponse;
  emenusEntirely: EmenuResponse;
  emenu: Emenu;
  selectedIds: Emenu[];
  error: RequestError;
}

export const initialState: State = {
  emenus: null,
  emenusEntirely: null,
  emenu: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let emenus: any;
  let emenusEntirely: any;
  let emenu: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.EmenusActionTypes.RequestFailEmenus:
      const error = (action as actions.RequestFailEmenus).payload;
      return { ...state, error };

    case actions.EmenusActionTypes.RequestGetAllEmenus:
      return { ...state, error: null };

    case actions.EmenusActionTypes.SuccessGetAllEmenus:
      emenus = (action as actions.SuccessGetAllEmenus).payload;
      return { ...state, emenus };

    case actions.EmenusActionTypes.RequestGetEmenu:
      return { ...state, error: null };

    case actions.EmenusActionTypes.SuccessGetEmenu:
      emenu = (action as actions.SuccessGetEmenu).payload;
      return { ...state, emenu };

    case actions.EmenusActionTypes.RequestPostEmenu:
      return { ...state, error: null };

    case actions.EmenusActionTypes.SuccessPostEmenu:
      emenu = (action as actions.SuccessPostEmenu).payload;
      return { ...state, emenu };

    case actions.EmenusActionTypes.RequestPutEmenu:
      return { ...state, error: null };

    case actions.EmenusActionTypes.SuccessPutEmenu:
      emenu = (action as actions.SuccessPutEmenu).payload;
      return { ...state, emenu };

    case actions.EmenusActionTypes.RequestDeleteEmenu:
      return { ...state, error: null };

    case actions.EmenusActionTypes.SuccessDeleteEmenu:
      emenu = (action as actions.SuccessDeleteEmenu).payload;
      return { ...state, emenu };

    // case actions.EmenusActionTypes.RequestBulkDeleteEmenus:
    //   return { ...state, error: null };

    // case actions.EmenusActionTypes.SuccessBulkDeleteEmenus:
    //   emenu = (action as actions.SuccessBulkDeleteEmenus).payload;
    //   return { ...state, emenu };

    case actions.EmenusActionTypes.SetSelectedEmenus:
      selectedIds = (action as actions.SetSelectedEmenus).payload;
      return { ...state, selectedIds };

    case actions.EmenusActionTypes.RequestGetEntirelyEmenus:
      return { ...state, error: null };

    case actions.EmenusActionTypes.SuccessGetEntirelyEmenus:
      emenusEntirely = (action as actions.SuccessGetEntirelyEmenus).payload;
      return { ...state, emenusEntirely };

    default:
      return state;
  }
}
