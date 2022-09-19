import { Action } from '@ngrx/store';
import * as actions from './archpristships-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ArchpristshipsResponse } from '../archpristships-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  archpristships: ArchpristshipsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  archpristships: { results: [] } as ArchpristshipsResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let archpristships: ArchpristshipsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ArchpristshipsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ArchpristshipsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessGetAll:
      archpristships = (action as actions.SuccessGetAll).payload;
      return { ...state, archpristships };

    case actions.ArchpristshipsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ArchpristshipsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
