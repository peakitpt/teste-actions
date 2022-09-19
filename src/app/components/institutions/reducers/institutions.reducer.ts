import { Action } from '@ngrx/store';
import * as actions from './institutions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Institution, InstitutionResponse } from '../institution.model';

export interface State {
  institutions: InstitutionResponse;
  institutionsEntirely: InstitutionResponse;
  baptism: Institution;
  selectedIds: Institution[];

  error: RequestError;
}

export const initialState: State = {
  institutions: null,
  institutionsEntirely: null,
  baptism: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.InstitutionsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.InstitutionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, institutions: successResult };

    case actions.InstitutionsActionTypes.ClearGetAll:
      return {
        ...state,
        institutions: { results: [] } as InstitutionResponse,
      };

    case actions.InstitutionsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, baptism: successResult };

    case actions.InstitutionsActionTypes.ClearGet:
      return { ...state, baptism: null };

    case actions.InstitutionsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, baptism: successResult };

    case actions.InstitutionsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, baptism: successResult };

    case actions.InstitutionsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, baptism: successResult };

    case actions.InstitutionsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, baptism: successResult };

    case actions.InstitutionsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.InstitutionsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.InstitutionsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, baptism: successResult };

    case actions.InstitutionsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, institutionsEntirely: successResult };

    case actions.InstitutionsActionTypes.RequestSendToCuria:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessSendToCuria:
      successResult = (action as actions.SuccessSendToCuria).payload;
      return { ...state, baptism: successResult };

    default:
      return state;
  }
}
