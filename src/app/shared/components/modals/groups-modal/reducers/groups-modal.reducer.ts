import { Action } from '@ngrx/store';
import * as actions from './groups-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { GroupResponse } from '../groups-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  groups: GroupResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  groups: { results: [] } as GroupResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: GroupResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.GroupsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.GroupsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, groups: successResult };

    case actions.GroupsActionTypes.ClearGetAll:
      return { ...state, groups: { results: [] } as GroupResponse };

    case actions.GroupsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
