import { Action } from '@ngrx/store';
import * as actions from './worshipplaces-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { WorshipplacesResponse } from '../worshipplaces-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  worshipplaces: WorshipplacesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  worshipplaces: { results: [] } as WorshipplacesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: WorshipplacesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.WorshipplacesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.WorshipplacesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, worshipplaces: successResult };

    case actions.WorshipplacesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.WorshipplacesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
