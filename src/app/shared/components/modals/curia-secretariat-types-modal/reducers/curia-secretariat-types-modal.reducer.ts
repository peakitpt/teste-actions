import { Action } from '@ngrx/store';
import * as actions from './curia-secretariat-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaSecretariatTypesResponse } from '../curia-secretariat-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaSecretariatTypes: CuriaSecretariatTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaSecretariatTypes: { results: [] } as CuriaSecretariatTypesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: CuriaSecretariatTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaSecretariatTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaSecretariatTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaSecretariatTypes: successResult };

    case actions.CuriaSecretariatTypesActionTypes.ClearGetAll:
      return {
        ...state,
        curiaSecretariatTypes: { results: [] } as CuriaSecretariatTypesResponse,
      };

    case actions.CuriaSecretariatTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.CuriaSecretariatTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
