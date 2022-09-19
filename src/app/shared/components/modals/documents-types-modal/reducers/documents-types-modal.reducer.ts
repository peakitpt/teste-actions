import { Action } from '@ngrx/store';
import * as actions from './documents-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { DocumentsTypesResponse } from '../documents-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  documentsTypes: DocumentsTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  documentsTypes: { results: [] } as DocumentsTypesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let documentsTypes: DocumentsTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.DocumentsTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.DocumentsTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessGetAll:
      documentsTypes = (action as actions.SuccessGetAll).payload;
      return { ...state, documentsTypes };

    case actions.DocumentsTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.DocumentsTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
