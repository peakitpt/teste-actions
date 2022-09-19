import { Action } from '@ngrx/store';
import * as actions from './reports-groupers-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ReportsGrouperResponse } from '../reports-groupers-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  reportsGroupers: ReportsGrouperResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  reportsGroupers: { results: [] } as ReportsGrouperResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: ReportsGrouperResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ReportsGroupersActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ReportsGroupersActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, reportsGroupers: successResult };

    case actions.ReportsGroupersActionTypes.ClearGetAll:
      return {
        ...state,
        reportsGroupers: { results: [] } as ReportsGrouperResponse,
      };

    case actions.ReportsGroupersActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
