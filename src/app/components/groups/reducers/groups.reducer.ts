import { Action } from '@ngrx/store';
import * as actions from './groups.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Group, GroupResponse } from '../group.model';

export interface State {
  groups: GroupResponse;
  groupsEntirely: GroupResponse;
  group: Group;
  selectedIds: Group[];
  error: RequestError;
}

export const initialState: State = {
  groups: null,
  groupsEntirely: null,
  group: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.GroupsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.GroupsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, groups: successResult };

    case actions.GroupsActionTypes.ClearGetAll:
      return { ...state, groups: { results: [] } as GroupResponse };

    case actions.GroupsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, group: successResult };

    case actions.GroupsActionTypes.ClearGet:
      return { ...state, group: null };

    case actions.GroupsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, group: successResult };

    case actions.GroupsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, group: successResult };

    case actions.GroupsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, group: successResult };

    case actions.GroupsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, group: successResult };

    case actions.GroupsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.GroupsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.GroupsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, groupsEntirely: successResult };

    default:
      return state;
  }
}
