import { Action } from '@ngrx/store';
import * as actions from './baptisms.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Baptism, BaptismResponse } from '../baptism.model';

export interface State {
  baptisms: BaptismResponse;
  baptismsEntirely: BaptismResponse;
  baptism: Baptism;
  selectedIds: Baptism[];

  error: RequestError;
}

export const initialState: State = {
  baptisms: null,
  baptismsEntirely: null,
  baptism: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.BaptismsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.BaptismsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, baptisms: successResult };

    case actions.BaptismsActionTypes.ClearGetAll:
      return {
        ...state,
        baptisms: { results: [] } as BaptismResponse,
      };

    case actions.BaptismsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, baptism: successResult };

    case actions.BaptismsActionTypes.ClearGet:
      return { ...state, baptism: null };

    case actions.BaptismsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, baptism: successResult };

    case actions.BaptismsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, baptism: successResult };

    case actions.BaptismsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, baptism: successResult };

    case actions.BaptismsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, baptism: successResult };

    case actions.BaptismsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.BaptismsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.BaptismsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, baptism: successResult };

    case actions.BaptismsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, baptismsEntirely: successResult };

    case actions.BaptismsActionTypes.RequestSendToCuria:
      return { ...state, error: null };

    case actions.BaptismsActionTypes.SuccessSendToCuria:
      successResult = (action as actions.SuccessSendToCuria).payload;
      return { ...state, baptism: successResult };

    default:
      return state;
  }
}
