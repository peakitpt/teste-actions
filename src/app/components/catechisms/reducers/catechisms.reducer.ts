import { Action } from '@ngrx/store';
import * as actions from './catechisms.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  Catechism,
  CatechismIndividualDocumentResponse,
  CatechismResponse,
  CatechismSession,
  CatechismSessionResponse,
} from '../catechism.model';

export interface State {
  catechisms: CatechismResponse;
  catechismsEntirely: CatechismResponse;
  catechism: Catechism;
  selectedIds: Catechism[];
  error: RequestError;
  sessions: CatechismSessionResponse;
  session: CatechismSession;
  selectedSessionsIds: CatechismSession[];
  individualDocs: CatechismIndividualDocumentResponse;
}

export const initialState: State = {
  catechisms: null,
  catechismsEntirely: null,
  catechism: null,
  selectedIds: null,
  error: null,
  sessions: null,
  session: null,
  selectedSessionsIds: null,
  individualDocs: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;

  switch (action.type) {
    case actions.CatechismsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CatechismsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, catechisms: successResult };

    case actions.CatechismsActionTypes.ClearGetAll:
      return { ...state, catechisms: { results: [] } as CatechismResponse };

    case actions.CatechismsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, catechism: successResult };

    case actions.CatechismsActionTypes.ClearGet:
      return { ...state, catechism: null };

    case actions.CatechismsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, catechism: successResult };

    case actions.CatechismsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, catechism: successResult };

    case actions.CatechismsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, catechism: successResult };

    case actions.CatechismsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, catechism: successResult };

    case actions.CatechismsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CatechismsActionTypes.RequestGetEntirelyCatechisms:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessGetEntirelyCatechisms:
      successResult = (action as actions.SuccessGetEntirelyCatechisms).payload;
      return { ...state, catechismsEntirely: successResult };

    case actions.CatechismsActionTypes.RequestPassGrade:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessPassGrade:
      successResult = (action as actions.SuccessPassGrade).payload;
      return { ...state };

    case actions.CatechismsActionTypes.RequestFinalize:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessFinalize:
      successResult = (action as actions.SuccessFinalize).payload;
      return { ...state, catechism: successResult };

    // SESSIONS
    case actions.CatechismsActionTypes.RequestGetAllSessions:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessGetAllSessions:
      successResult = (action as actions.SuccessGetAllSessions).payload;
      return { ...state, sessions: successResult };

    case actions.CatechismsActionTypes.ClearGetAllSessions:
      return {
        ...state,
        sessions: { results: [] } as CatechismSessionResponse,
      };

    case actions.CatechismsActionTypes.RequestGetSession:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessGetSession:
      successResult = (action as actions.SuccessGetSession).payload;
      return { ...state, session: successResult };

    case actions.CatechismsActionTypes.RequestPostSession:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessPostSession:
      successResult = (action as actions.SuccessPostSession).payload;
      return { ...state, session: successResult };

    case actions.CatechismsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessPutSession:
      successResult = (action as actions.SuccessPutSession).payload;
      return { ...state, session: successResult };

    case actions.CatechismsActionTypes.RequestDeleteSession:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessDeleteSession:
      successResult = (action as actions.SuccessDeleteSession).payload;
      return { ...state, session: successResult };

    case actions.CatechismsActionTypes.SetSelectedSession:
      successResult = (action as actions.SetSelectedSession).payload;
      return { ...state, selectedSessionsIds: successResult };

    // INDIVIDUAL DOCUMENTS
    case actions.CatechismsActionTypes.RequestGetAllIndividualDocuments:
      return { ...state, error: null };

    case actions.CatechismsActionTypes.SuccessGetAllIndividualDocuments:
      successResult = (action as actions.SuccessGetAllIndividualDocuments)
        .payload;
      return { ...state, individualDocs: successResult };

    case actions.CatechismsActionTypes.ClearGetAllIndividualDocuments:
      return {
        ...state,
        individualDocs: { results: [] } as CatechismIndividualDocumentResponse,
      };

    default:
      return state;
  }
}
