import { Action } from '@ngrx/store';
import * as actions from './formations-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { FormationsResponse } from '../formations-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  formations: FormationsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  formations: { results: [] } as FormationsResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let formations: FormationsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.FormationsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.FormationsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessGetAll:
      formations = (action as actions.SuccessGetAll).payload;
      return { ...state, formations };

    case actions.FormationsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.FormationsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
