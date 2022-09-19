import { Action } from '@ngrx/store';
import * as actions from './parishioners-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ParishionersResponse } from '../parishioners-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  parishioners: ParishionersResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  parishioners: { results: [] } as ParishionersResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let parishioners: ParishionersResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ParishionersActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ParishionersActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ParishionersActionTypes.SuccessGetAll:
      parishioners = (action as actions.SuccessGetAll).payload;
      return { ...state, parishioners };

    case actions.ParishionersActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ParishionersActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
