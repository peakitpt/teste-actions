import { Action } from '@ngrx/store';
import * as actions from './curia-secretariat-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaSecretariatType,
  CuriaSecretariatTypeResponse,
} from '../curia-secretariat-type.model';

export interface State {
  curiaSecretariatTypes: CuriaSecretariatTypeResponse;
  curiaSecretariatTypesEntirely: CuriaSecretariatTypeResponse;
  curiaSecretariatType: CuriaSecretariatType;
  selectedIds: CuriaSecretariatType[];
  error: RequestError;
}

export const initialState: State = {
  curiaSecretariatTypes: null,
  curiaSecretariatTypesEntirely: null,
  curiaSecretariatType: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.CuriaSecretariatTypesActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaSecretariatTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaSecretariatTypes: successResult };

    case actions.CuriaSecretariatTypesActionTypes.ClearGetAll:
      return {
        ...state,
        curiaSecretariatTypes: { results: [] } as CuriaSecretariatTypeResponse,
      };

    case actions.CuriaSecretariatTypesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, curiaSecretariatType: successResult };

    case actions.CuriaSecretariatTypesActionTypes.ClearGet:
      return { ...state, curiaSecretariatType: null };

    case actions.CuriaSecretariatTypesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, curiaSecretariatType: successResult };

    case actions.CuriaSecretariatTypesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, curiaSecretariatType: successResult };

    case actions.CuriaSecretariatTypesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, curiaSecretariatType: successResult };

    case actions.CuriaSecretariatTypesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, curiaSecretariatType: successResult };

    case actions.CuriaSecretariatTypesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CuriaSecretariatTypesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, curiaSecretariatTypesEntirely: successResult };

    default:
      return state;
  }
}
