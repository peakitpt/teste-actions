import { Action } from '@ngrx/store';
import * as actions from './clergy-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ClergyType, ClergyTypeResponse } from '../clergy-type.model';

export interface State {
  clergy_types: ClergyTypeResponse;
  clergy_typesEntirely: ClergyTypeResponse;
  clergy_type: ClergyType;
  selectedIds: ClergyType[];
  error: RequestError;
}

export const initialState: State = {
  clergy_types: null,
  clergy_typesEntirely: null,
  clergy_type: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.ClergyTypeActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ClergyTypeActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ClergyTypeActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, clergy_types: successResult };

    case actions.ClergyTypeActionTypes.ClearGetAll:
      return { ...state, clergy_types: { results: [] } as ClergyTypeResponse };

    case actions.ClergyTypeActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.ClergyTypeActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, clergy_type: successResult };

    case actions.ClergyTypeActionTypes.ClearGet:
      return { ...state, clergy_type: null };

    case actions.ClergyTypeActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.ClergyTypeActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, clergy_type: successResult };

    case actions.ClergyTypeActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.ClergyTypeActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, clergy_type: successResult };

    case actions.ClergyTypeActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.ClergyTypeActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, clergy_type: successResult };

    case actions.ClergyTypeActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.ClergyTypeActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, clergy_type: successResult };

    case actions.ClergyTypeActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.ClergyTypeActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.ClergyTypeActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, clergy_typesEntirely: successResult };

    default:
      return state;
  }
}
