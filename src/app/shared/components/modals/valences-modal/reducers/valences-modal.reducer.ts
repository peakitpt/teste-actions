import { Action } from '@ngrx/store';
import * as actions from './valences-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ValencesResponse } from '../valences-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  valences: ValencesResponse;
  modalRowSelect: SelectedModalRow;
  valenceTypes: any;
  error: RequestError;
}

export const initialState: State = {
  valences: { results: [] } as ValencesResponse,
  valenceTypes: { results: [] } as any,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: ValencesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ValencesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ValencesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, valences: successResult };

    case actions.ValencesActionTypes.ClearGetAll:
      return { ...state, valences: { results: [] } as ValencesResponse };

    case actions.ValencesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
