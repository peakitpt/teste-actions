import { Action } from '@ngrx/store';
import * as actions from './deaths.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Death, DeathResponse } from '../death.model';

export interface State {
  deaths: DeathResponse;
  deathsEntirely: DeathResponse;
  death: Death;
  selectedIds: Death[];

  error: RequestError;
}

export const initialState: State = {
  deaths: null,
  deathsEntirely: null,
  death: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.DeathsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.DeathsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, deaths: successResult };

    case actions.DeathsActionTypes.ClearGetAll:
      return { ...state, deaths: { results: [] } as DeathResponse };

    case actions.DeathsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, death: successResult };

    case actions.DeathsActionTypes.ClearGet:
      return { ...state, death: null };

    case actions.DeathsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, death: successResult };

    case actions.DeathsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, death: successResult };

    case actions.DeathsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, death: successResult };

    case actions.DeathsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, death: successResult };

    case actions.DeathsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.DeathsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.DeathsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, death: successResult };

    case actions.DeathsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.DeathsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, deathsEntirely: successResult };

    default:
      return state;
  }
}
