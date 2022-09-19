import { Action } from '@ngrx/store';
import * as actions from './documents-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { DocumentsType, DocumentsTypeResponse } from '../documents-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  documentsTypes: DocumentsTypeResponse;
  documentstypesEntirely: DocumentsTypeResponse;
  documentsType: DocumentsType;
  selectedIds: DocumentsType[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  documentsTypes: null,
  documentstypesEntirely: null,
  documentsType: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let documentsTypes: any;
  let documentstypesEntirely: any;
  let documentsType: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.DocumentsTypesActionTypes.RequestFailDocumentsTypes:
      const error = (action as actions.RequestFailDocumentsTypes).payload;
      return { ...state, error };

    case actions.DocumentsTypesActionTypes.RequestGetAllDocumentsTypes:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessGetAllDocumentsTypes:
      documentsTypes = (action as actions.SuccessGetAllDocumentsTypes).payload;
      return { ...state, documentsTypes };

    case actions.DocumentsTypesActionTypes.RequestGetDocumentsType:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessGetDocumentsType:
      documentsType = (action as actions.SuccessGetDocumentsType).payload;
      return { ...state, documentsType };

    case actions.DocumentsTypesActionTypes.RequestPostDocumentsType:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessPostDocumentsType:
      documentsType = (action as actions.SuccessPostDocumentsType).payload;
      return { ...state, documentsType };

    case actions.DocumentsTypesActionTypes.RequestPutDocumentsType:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessPutDocumentsType:
      documentsType = (action as actions.SuccessPutDocumentsType).payload;
      return { ...state, documentsType };

    case actions.DocumentsTypesActionTypes.RequestDeleteDocumentsType:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessDeleteDocumentsType:
      documentsType = (action as actions.SuccessDeleteDocumentsType).payload;
      return { ...state, documentsType };

    // case actions.DocumentsTypesActionTypes.RequestBulkDeleteDocumentsTypes:
    //   return { ...state, error: null };

    // case actions.DocumentsTypesActionTypes.SuccessBulkDeleteDocumentsTypes:
    //   documentsType = (action as actions.SuccessBulkDeleteDocumentsTypes).payload;
    //   return { ...state, documentsType };

    case actions.DocumentsTypesActionTypes.RequestSendTestDocumentsType:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessSendTestDocumentsType:
      documentsType = (action as actions.SuccessSendTestDocumentsType).payload;
      return { ...state, documentsType };

    case actions.DocumentsTypesActionTypes.SetSelectedDocumentsTypes:
      selectedIds = (action as actions.SetSelectedDocumentsTypes).payload;
      return { ...state, selectedIds };

    case actions.DocumentsTypesActionTypes.SetModalSelectDocumentsType:
      modalRowSelect = (action as actions.SetModalSelectDocumentsType).payload;
      return { ...state, modalRowSelect };

    case actions.DocumentsTypesActionTypes.RequestGetEntirelyDocumentsTypes:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessGetEntirelyDocumentsTypes:
      documentstypesEntirely = (action as actions.SuccessGetEntirelyDocumentsTypes)
        .payload;
      return { ...state, documentstypesEntirely };

    default:
      return state;
  }
}
