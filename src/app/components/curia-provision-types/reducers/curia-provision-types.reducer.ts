import { Action } from '@ngrx/store';
import * as actions from './curia-provision-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaProvisionType,
  CuriaProvisionTypeResponse,
} from '../curia-provision-type.model';

export interface State {
  curiaProvisionTypes: CuriaProvisionTypeResponse;
  curiaProvisionTypesEntirely: CuriaProvisionTypeResponse;
  curiaProvisionType: CuriaProvisionType;
  selectedIds: CuriaProvisionType[];
  error: RequestError;
}

export const initialState: State = {
  curiaProvisionTypes: null,
  curiaProvisionTypesEntirely: null,
  curiaProvisionType: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.CuriaProvisionTypesActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaProvisionTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaProvisionTypes: successResult };

    case actions.CuriaProvisionTypesActionTypes.ClearGetAll:
      return {
        ...state,
        curiaProvisionTypes: { results: [] } as CuriaProvisionTypeResponse,
      };

    case actions.CuriaProvisionTypesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, curiaProvisionType: successResult };

    case actions.CuriaProvisionTypesActionTypes.ClearGet:
      return { ...state, curiaProvisionType: null };

    case actions.CuriaProvisionTypesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, curiaProvisionType: successResult };

    case actions.CuriaProvisionTypesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, curiaProvisionType: successResult };

    case actions.CuriaProvisionTypesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, curiaProvisionType: successResult };

    case actions.CuriaProvisionTypesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, curiaProvisionType: successResult };

    case actions.CuriaProvisionTypesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CuriaProvisionTypesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, curiaProvisionTypesEntirely: successResult };

    default:
      return state;
  }
}
