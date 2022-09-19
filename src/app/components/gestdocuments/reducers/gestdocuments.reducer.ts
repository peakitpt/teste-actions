import { Action } from '@ngrx/store';
import * as actions from './gestdocuments.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Gestdocument, GestdocumentResponse } from '../gestdocument.model';

export interface State {
  gestdocuments: GestdocumentResponse;
  gestdocumentsEntirely: GestdocumentResponse;
  gestdocument: Gestdocument;
  selectedIds: Gestdocument[];

  error: RequestError;
}

export const initialState: State = {
  gestdocuments: null,
  gestdocumentsEntirely: null,
  gestdocument: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.GestdocumentsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.GestdocumentsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.GestdocumentsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, gestdocuments: successResult };

    case actions.GestdocumentsActionTypes.ClearGetAll:
      return {
        ...state,
        gestdocuments: { results: [] } as GestdocumentResponse,
      };

    case actions.GestdocumentsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.GestdocumentsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, gestdocument: successResult };

    case actions.GestdocumentsActionTypes.ClearGet:
      return { ...state, gestdocument: null };

    case actions.GestdocumentsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.GestdocumentsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, gestdocument: successResult };

    case actions.GestdocumentsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.GestdocumentsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, gestdocument: successResult };

    case actions.GestdocumentsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.GestdocumentsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, gestdocument: successResult };

    case actions.GestdocumentsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.GestdocumentsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, gestdocument: successResult };

    case actions.GestdocumentsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.GestdocumentsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.GestdocumentsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, gestdocumentsEntirely: successResult };

    default:
      return state;
  }
}
