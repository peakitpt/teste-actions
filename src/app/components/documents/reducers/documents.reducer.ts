import { Action } from '@ngrx/store';
import * as actions from './documents.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Document, DocumentResponse } from '../document.model';

export interface State {
  documents: DocumentResponse;
  documentsEntirely: DocumentResponse;
  document: Document;
  selectedIds: Document[];
  error: RequestError;
}

export const initialState: State = {
  documents: null,
  documentsEntirely: null,
  document: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let documents: any;
  let documentsEntirely: any;
  let document: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.DocumentsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.DocumentsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessGetAll:
      documents = (action as actions.SuccessGetAll).payload;
      return { ...state, documents };

    case actions.DocumentsActionTypes.ClearGetAll:
      return {
        ...state,
        documents: { results: [] } as DocumentResponse,
      };

    case actions.DocumentsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessGet:
      document = (action as actions.SuccessGet).payload;
      return { ...state, document };

    case actions.DocumentsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessPost:
      document = (action as actions.SuccessPost).payload;
      return { ...state, document };

    case actions.DocumentsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessPut:
      document = (action as actions.SuccessPut).payload;
      return { ...state, document };

    case actions.DocumentsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessDelete:
      document = (action as actions.SuccessDelete).payload;
      return { ...state, document };

    case actions.DocumentsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessBulkDelete:
      document = (action as actions.SuccessBulkDelete).payload;
      return { ...state, document };

    case actions.DocumentsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.DocumentsActionTypes.RequestFamily:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessFamily:
      documents = (action as actions.SuccessFamily).payload;
      return { ...state, documents };

    case actions.DocumentsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessGetEntirely:
      documentsEntirely = (action as actions.SuccessGetEntirely).payload;
      return { ...state, documentsEntirely };

    case actions.DocumentsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.DocumentsActionTypes.SuccessGetNew:
      document = (action as actions.SuccessGetNew).payload;
      return { ...state, document };

    case actions.DocumentsActionTypes.ClearGet:
      return { ...state, document: null };

    default:
      return state;
  }
}
