import { Action } from '@ngrx/store';
import * as actions from './curia-weddings.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaWedding, CuriaWeddingResponse } from '../curia-wedding.model';

export interface State {
  curiaWeddings: CuriaWeddingResponse;
  curiaWeddingsEntirely: CuriaWeddingResponse;
  curiaWedding: CuriaWedding;
  selectedIds: CuriaWedding[];
  error: RequestError;
}

export const initialState: State = {
  curiaWeddings: null,
  curiaWeddingsEntirely: null,
  curiaWedding: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.CuriaWeddingsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaWeddingsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaWeddings: successResult };

    case actions.CuriaWeddingsActionTypes.ClearGetAll:
      return {
        ...state,
        curiaWeddings: { results: [] } as CuriaWeddingResponse,
      };

    case actions.CuriaWeddingsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, curiaWedding: successResult };

    case actions.CuriaWeddingsActionTypes.ClearGet:
      return { ...state, curiaWedding: null };

    case actions.CuriaWeddingsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, curiaWedding: successResult };

    case actions.CuriaWeddingsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, curiaWedding: successResult };

    case actions.CuriaWeddingsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, curiaWedding: successResult };

    case actions.CuriaWeddingsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, curiaWedding: successResult };

    case actions.CuriaWeddingsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CuriaWeddingsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.CuriaWeddingsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, curiaWedding: successResult };

    case actions.CuriaWeddingsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, curiaWeddingsEntirely: successResult };

    case actions.CuriaWeddingsActionTypes.RequestSendToCuria:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessSendToCuria:
      successResult = (action as actions.SuccessSendToCuria).payload;
      return { ...state, curiaWedding: successResult };

    case actions.CuriaWeddingsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaWeddingsActionTypes.SuccessGetNew:
      successResult = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaWedding: successResult };

    default:
      return state;
  }
}
