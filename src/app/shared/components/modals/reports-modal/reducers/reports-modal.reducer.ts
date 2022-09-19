import { Action } from '@ngrx/store';
import * as actions from './reports-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ReportResponse } from '../reports-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  reports: ReportResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  reports: { results: [] } as ReportResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: ReportResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ReportsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ReportsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, reports: successResult };

    case actions.ReportsActionTypes.ClearGetAll:
      return {
        ...state,
        reports: { results: [] } as ReportResponse,
      };

    case actions.ReportsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
