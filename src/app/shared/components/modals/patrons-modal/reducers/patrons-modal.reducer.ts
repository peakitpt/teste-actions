import { Action } from '@ngrx/store';
import * as actions from './patrons-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PatronsResponse } from '../patrons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  patrons: PatronsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  patrons: { results: [] } as PatronsResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let patrons: PatronsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.PatronsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PatronsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessGetAll:
      patrons = (action as actions.SuccessGetAll).payload;
      return { ...state, patrons };

    case actions.PatronsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
