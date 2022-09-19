import { Action } from '@ngrx/store';
import * as actions from './persons-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PersonsResponse } from '../persons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  persons: PersonsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  persons: { results: [] } as PersonsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: PersonsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.PersonsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PersonsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, persons: successResult };

    case actions.PersonsActionTypes.ClearGetAll:
      return { ...state, persons: { results: [] } as PersonsResponse };

    case actions.PersonsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
