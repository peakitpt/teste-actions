import { Action } from '@ngrx/store';
import * as actions from './users-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { UsersResponse } from '../users-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  users: UsersResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  users: { results: [] } as UsersResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let users: UsersResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.UsersActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.UsersActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessGetAll:
      users = (action as actions.SuccessGetAll).payload;
      return { ...state, users };

    case actions.UsersActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
