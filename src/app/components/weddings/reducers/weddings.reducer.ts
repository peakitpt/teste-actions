import { Action } from '@ngrx/store';
import * as actions from './weddings.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Wedding, WeddingResponse } from '../wedding.model';

export interface State {
  weddings: WeddingResponse;
  weddingsEntirely: WeddingResponse;
  wedding: Wedding;
  selectedIds: Wedding[];

  error: RequestError;
}

export const initialState: State = {
  weddings: null,
  weddingsEntirely: null,
  wedding: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.WeddingsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.WeddingsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, weddings: successResult };

    case actions.WeddingsActionTypes.ClearGetAll:
      return {
        ...state,
        weddings: { results: [] } as WeddingResponse,
      };

    case actions.WeddingsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, wedding: successResult };

    case actions.WeddingsActionTypes.ClearGet:
      return { ...state, wedding: null };

    case actions.WeddingsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, wedding: successResult };

    case actions.WeddingsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, wedding: successResult };

    case actions.WeddingsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, wedding: successResult };

    case actions.WeddingsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, wedding: successResult };

    case actions.WeddingsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.WeddingsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.WeddingsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, wedding: successResult };

    case actions.WeddingsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, weddingsEntirely: successResult };

    case actions.WeddingsActionTypes.RequestSendToCuria:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessSendToCuria:
      successResult = (action as actions.SuccessSendToCuria).payload;
      return { ...state, wedding: successResult };

    case actions.WeddingsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.WeddingsActionTypes.SuccessGetNew:
      successResult = (action as actions.SuccessGetNew).payload;
      return { ...state, wedding: successResult };

    default:
      return state;
  }
}
