import { Action } from '@ngrx/store';
import * as actions from './institution-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { InstitutionType, InstitutionTypeResponse } from '../institution-type.model';

export interface State {
  institution_types: InstitutionTypeResponse;
  institution_typesEntirely: InstitutionTypeResponse;
  institution_type: InstitutionType;
  selectedIds: InstitutionType[];
  error: RequestError;
}

export const initialState: State = {
  institution_types: null,
  institution_typesEntirely: null,
  institution_type: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.InstitutionTypeActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.InstitutionTypeActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.InstitutionTypeActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, institution_types: successResult };

    case actions.InstitutionTypeActionTypes.ClearGetAll:
      return { ...state, institution_types: { results: [] } as InstitutionTypeResponse };

    case actions.InstitutionTypeActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.InstitutionTypeActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, institution_type: successResult };

    case actions.InstitutionTypeActionTypes.ClearGet:
      return { ...state, institution_type: null };

    case actions.InstitutionTypeActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.InstitutionTypeActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, institution_type: successResult };

    case actions.InstitutionTypeActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.InstitutionTypeActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, institution_type: successResult };

    case actions.InstitutionTypeActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.InstitutionTypeActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, institution_type: successResult };

    case actions.InstitutionTypeActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.InstitutionTypeActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, institution_type: successResult };

    case actions.InstitutionTypeActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.InstitutionTypeActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.InstitutionTypeActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, institution_typesEntirely: successResult };

    default:
      return state;
  }
}
