import { Action } from '@ngrx/store';
import * as actions from './curia-baptisms.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaBaptism, CuriaBaptismResponse } from '../curia-baptism.model';

export interface State {
  curiaBaptisms: CuriaBaptismResponse;
  curiaBaptismsEntirely: CuriaBaptismResponse;
  curiaBaptism: CuriaBaptism;
  selectedIds: CuriaBaptism[];

  error: RequestError;
}

export const initialState: State = {
  curiaBaptisms: null,
  curiaBaptismsEntirely: null,
  curiaBaptism: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.CuriaBaptismsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaBaptismsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaBaptisms: successResult };

    case actions.CuriaBaptismsActionTypes.ClearGetAll:
      return {
        ...state,
        curiaBaptisms: { results: [] } as CuriaBaptismResponse,
      };

    case actions.CuriaBaptismsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, curiaBaptism: successResult };

    case actions.CuriaBaptismsActionTypes.ClearGet:
      return { ...state, curiaBaptism: null };

    case actions.CuriaBaptismsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, curiaBaptism: successResult };

    case actions.CuriaBaptismsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, curiaBaptism: successResult };

    case actions.CuriaBaptismsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, curiaBaptism: successResult };

    case actions.CuriaBaptismsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, curiaBaptism: successResult };

    case actions.CuriaBaptismsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CuriaBaptismsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.CuriaBaptismsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, curiaBaptism: successResult };

    case actions.CuriaBaptismsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, curiaBaptismsEntirely: successResult };

    case actions.CuriaBaptismsActionTypes.RequestSendToCuria:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessSendToCuria:
      successResult = (action as actions.SuccessSendToCuria).payload;
      return { ...state, curiaBaptism: successResult };

    case actions.CuriaBaptismsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaBaptismsActionTypes.SuccessGetNew:
      successResult = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaBaptism: successResult };

    default:
      return state;
  }
}
