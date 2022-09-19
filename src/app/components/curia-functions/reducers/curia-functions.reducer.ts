import { Action } from '@ngrx/store';
import * as actions from './curia-functions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaFunction, CuriaFunctionResponse } from '../curia-function.model';

export interface State {
  curiaFunctions: CuriaFunctionResponse;
  curiaFunctionsEntirely: CuriaFunctionResponse;
  curiaFunction: CuriaFunction;
  selectedIds: CuriaFunction[];

  error: RequestError;
}

export const initialState: State = {
  curiaFunctions: null,
  curiaFunctionsEntirely: null,
  curiaFunction: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.CuriaFunctionsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaFunctionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaFunctions: successResult };

    case actions.CuriaFunctionsActionTypes.ClearGetAll:
      return {
        ...state,
        curiaFunctions: { results: [] } as CuriaFunctionResponse,
      };

    case actions.CuriaFunctionsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, curiaFunction: successResult };

    case actions.CuriaFunctionsActionTypes.ClearGet:
      return { ...state, curiaFunction: null };

    case actions.CuriaFunctionsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, curiaFunction: successResult };

    case actions.CuriaFunctionsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, curiaFunction: successResult };

    case actions.CuriaFunctionsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, curiaFunction: successResult };

    case actions.CuriaFunctionsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, curiaFunction: successResult };

    case actions.CuriaFunctionsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CuriaFunctionsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, curiaFunctionsEntirely: successResult };

    case actions.CuriaFunctionsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessGetNew:
      successResult = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaFunction: successResult };

    default:
      return state;
  }
}
