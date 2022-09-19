import { Action } from '@ngrx/store';
import * as actions from './mass-intentions-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  MassIntentionsType,
  MassIntentionsTypeResponse,
} from '../mass-intentions-type.model';

export interface State {
  massIntentionsTypes: MassIntentionsTypeResponse;
  massIntentionsTypesEntirely: MassIntentionsTypeResponse;
  massIntentionsType: MassIntentionsType;
  selectedIds: MassIntentionsType[];
  error: RequestError;
}

export const initialState: State = {
  massIntentionsTypes: null,
  massIntentionsTypesEntirely: null,
  massIntentionsType: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.MassIntentionsTypesActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.MassIntentionsTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.MassIntentionsTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, massIntentionsTypes: successResult };

    case actions.MassIntentionsTypesActionTypes.ClearGetAll:
      return {
        ...state,
        massIntentionsTypes: { results: [] } as MassIntentionsTypeResponse,
      };

    case actions.MassIntentionsTypesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.MassIntentionsTypesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, massIntentionsType: successResult };

    case actions.MassIntentionsTypesActionTypes.ClearGet:
      return { ...state, massIntentionsType: null };

    case actions.MassIntentionsTypesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.MassIntentionsTypesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, massIntentionsType: successResult };

    case actions.MassIntentionsTypesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.MassIntentionsTypesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, massIntentionsType: successResult };

    case actions.MassIntentionsTypesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.MassIntentionsTypesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, massIntentionsType: successResult };

    case actions.MassIntentionsTypesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.MassIntentionsTypesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, massIntentionsType: successResult };

    case actions.MassIntentionsTypesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.MassIntentionsTypesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.MassIntentionsTypesActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, massIntentionsTypesEntirely: successResult };

    default:
      return state;
  }
}
