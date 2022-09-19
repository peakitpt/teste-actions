import { Action } from '@ngrx/store';
import * as actions from './chrisms.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Chrism, ChrismResponse } from '../chrism.model';
import { ReportResponse } from '../../reports/report.model';

export interface State {
  chrisms: ChrismResponse;
  chrismsEntirely: ChrismResponse;
  chrism: Chrism;
  selectedIds: Chrism[];

  error: RequestError;
  // Reports
  chrismEntitiesError: RequestError;
  formReports: ReportResponse;
  formSubscriptionReports: any;
}

export const initialState: State = {
  chrisms: null,
  chrismsEntirely: null,
  chrism: null,
  selectedIds: null,

  error: null,
  // Reports
  chrismEntitiesError: null,
  formReports: null,
  formSubscriptionReports: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;
  let formReports: any;
  let formSubscriptionReports: any;

  switch (action.type) {
    case actions.ChrismsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ChrismsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, chrisms: successResult };

    case actions.ChrismsActionTypes.ClearGetAll:
      return {
        ...state,
        chrisms: { results: [] } as ChrismResponse,
      };

    case actions.ChrismsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, chrism: successResult };

    case actions.ChrismsActionTypes.ClearGet:
      return { ...state, chrism: null };

    case actions.ChrismsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, chrism: successResult };

    case actions.ChrismsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, chrism: successResult };

    case actions.ChrismsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, chrism: successResult };

    case actions.ChrismsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, chrism: successResult };

    case actions.ChrismsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.ChrismsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, chrismsEntirely: successResult };

    // CHRISMS ENTITIES
    case actions.ChrismsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.ChrismsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.ChrismsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, chrism: successResult.chrism };

    // REPORTS
    case actions.ChrismsActionTypes.RequestFailChrismEntitiesReports:
      const chrismEntitiesError = (
        action as actions.RequestFailChrismEntitiesReports
      ).payload;
      return { ...state, chrismEntitiesError };

    case actions.ChrismsActionTypes.RequestGetChrismEntitiesFormReports:
      return { ...state, chrismEntitiesError: null };

    case actions.ChrismsActionTypes.SuccessGetChrismEntitiesFormReports:
      formReports = (action as actions.SuccessGetChrismEntitiesFormReports)
        .payload;
      return { ...state, formReports };

    case actions.ChrismsActionTypes
      .RequestGetChrismEntitiesFormSubscriptionReports:
      return { ...state, chrismEntitiesError: null };

    case actions.ChrismsActionTypes
      .SuccessGetChrismEntitiesFormSubscriptionReports:
      formSubscriptionReports = (
        action as actions.SuccessGetChrismEntitiesFormSubscriptionReports
      ).payload;
      return { ...state, formSubscriptionReports };

    default:
      return state;
  }
}
