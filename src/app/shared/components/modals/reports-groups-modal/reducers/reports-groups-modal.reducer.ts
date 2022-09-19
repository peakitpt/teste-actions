import { Action } from '@ngrx/store';
import * as actions from './reports-groups-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ReportsGroupResponse } from '../reports-groups-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  reportsGroups: ReportsGroupResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  reportsGroups: { results: [] } as ReportsGroupResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: ReportsGroupResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ReportsGroupsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ReportsGroupsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, reportsGroups: successResult };

    case actions.ReportsGroupsActionTypes.ClearGetAll:
      return {
        ...state,
        reportsGroups: { results: [] } as ReportsGroupResponse,
      };

    case actions.ReportsGroupsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
