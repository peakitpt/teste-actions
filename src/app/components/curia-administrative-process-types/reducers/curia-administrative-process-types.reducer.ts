import { Action } from '@ngrx/store';
import * as actions from './curia-administrative-process-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaAdministrativeProcessType,
  CuriaAdministrativeProcessTypeResponse,
} from '../curia-administrative-process-type.model';

export interface State {
  curiaAdministrativeProcessTypes: CuriaAdministrativeProcessTypeResponse;
  curiaAdministrativeProcessTypesEntirely: CuriaAdministrativeProcessTypeResponse;
  curiaAdministrativeProcessType: CuriaAdministrativeProcessType;
  selectedIds: CuriaAdministrativeProcessType[];
  error: RequestError;
}

export const initialState: State = {
  curiaAdministrativeProcessTypes: null,
  curiaAdministrativeProcessTypesEntirely: null,
  curiaAdministrativeProcessType: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaAdministrativeProcessTypes: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.ClearGetAll:
      return {
        ...state,
        curiaAdministrativeProcessTypes: {
          results: [],
        } as CuriaAdministrativeProcessTypeResponse,
      };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, curiaAdministrativeProcessType: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.ClearGet:
      return { ...state, curiaAdministrativeProcessType: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, curiaAdministrativeProcessType: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, curiaAdministrativeProcessType: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, curiaAdministrativeProcessType: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, curiaAdministrativeProcessType: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return {
        ...state,
        curiaAdministrativeProcessTypesEntirely: successResult,
      };

    default:
      return state;
  }
}
