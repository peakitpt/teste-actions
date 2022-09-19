import { SelectedModalRow } from './../../../shared/shared.model';
import { Action } from '@ngrx/store';
import * as actions from './reports-groups.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ReportsGroup, ReportsGroupResponse } from '../reports-group.model';

export interface State {
  reportsGroups: ReportsGroupResponse;
  reportsGroupsEntirely: ReportsGroupResponse;
  reportsGroup: ReportsGroup;
  selectedIds: ReportsGroup[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  reportsGroups: null,
  reportsGroupsEntirely: null,
  reportsGroup: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let reportsGroups: any;
  let reportsGroupsEntirely: any;
  let reportsGroup: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ReportsGroupsActionTypes.RequestFailReportsGroups:
      const error = (action as actions.RequestFailReportsGroups).payload;
      return { ...state, error };

    case actions.ReportsGroupsActionTypes.RequestGetAllReportsGroups:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessGetAllReportsGroups:
      reportsGroups = (action as actions.SuccessGetAllReportsGroups).payload;
      return { ...state, reportsGroups };

    case actions.ReportsGroupsActionTypes.RequestGetReportsGroup:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessGetReportsGroup:
      reportsGroup = (action as actions.SuccessGetReportsGroup).payload;
      return { ...state, reportsGroup };

    case actions.ReportsGroupsActionTypes.RequestPostReportsGroup:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessPostReportsGroup:
      reportsGroup = (action as actions.SuccessPostReportsGroup).payload;
      return { ...state, reportsGroup };

    case actions.ReportsGroupsActionTypes.RequestPutReportsGroup:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessPutReportsGroup:
      reportsGroup = (action as actions.SuccessPutReportsGroup).payload;
      return { ...state, reportsGroup };

    case actions.ReportsGroupsActionTypes.RequestDeleteReportsGroup:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessDeleteReportsGroup:
      reportsGroup = (action as actions.SuccessDeleteReportsGroup).payload;
      return { ...state, reportsGroup };

    // case actions.ReportsGroupsActionTypes.RequestBulkDeleteReportsGroups:
    //   return { ...state, error: null };

    // case actions.ReportsGroupsActionTypes.SuccessBulkDeleteReportsGroups:
    //   reportsGroup = (action as actions.SuccessBulkDeleteReportsGroups).payload;
    //   return { ...state, reportsGroup };

    case actions.ReportsGroupsActionTypes.SetSelectedReportsGroups:
      selectedIds = (action as actions.SetSelectedReportsGroups).payload;
      return { ...state, selectedIds };

    case actions.ReportsGroupsActionTypes.SetModalSelectReportsGroup:
      modalRowSelect = (action as actions.SetModalSelectReportsGroup).payload;
      return { ...state, modalRowSelect };

    case actions.ReportsGroupsActionTypes.RequestGetEntirelyReportsGroups:
      return { ...state, error: null };

    case actions.ReportsGroupsActionTypes.SuccessGetEntirelyReportsGroups:
      reportsGroupsEntirely = (action as actions.SuccessGetEntirelyReportsGroups)
        .payload;
      return { ...state, reportsGroupsEntirely };

    default:
      return state;
  }
}
