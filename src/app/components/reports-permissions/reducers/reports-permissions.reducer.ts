import { Action } from '@ngrx/store';
import * as actions from './reports-permissions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ReportPermission,
  ReportPermissionResponse
} from '../report-permission.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  reportsPermissions: ReportPermissionResponse;
  report: ReportPermission;
  selectedIds: ReportPermission[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  reportsPermissions: null,
  report: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let reportsPermissions: any;
  let report: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ReportsPermissionsActionTypes.RequestFailReportsPermissions:
      const error = (action as actions.RequestFailReportsPermissions).payload;
      return { ...state, error };

    case actions.ReportsPermissionsActionTypes.RequestGetAllReportsPermissions:
      return { ...state, error: null };

    case actions.ReportsPermissionsActionTypes.SuccessGetAllReportsPermissions:
      reportsPermissions = (action as actions.SuccessGetAllReportsPermissions)
        .payload;
      return { ...state, reportsPermissions };

    case actions.ReportsPermissionsActionTypes.RequestGetReport:
      return { ...state, error: null };

    case actions.ReportsPermissionsActionTypes.SuccessGetReport:
      report = (action as actions.SuccessGetReport).payload;
      return { ...state, report };

    case actions.ReportsPermissionsActionTypes.RequestPostReport:
      return { ...state, error: null };

    case actions.ReportsPermissionsActionTypes.SuccessPostReport:
      report = (action as actions.SuccessPostReport).payload;
      return { ...state, report };

    case actions.ReportsPermissionsActionTypes.RequestPutReport:
      return { ...state, error: null };

    case actions.ReportsPermissionsActionTypes.SuccessPutReport:
      report = (action as actions.SuccessPutReport).payload;
      return { ...state, report };

    case actions.ReportsPermissionsActionTypes.RequestUpdateReportPermission:
      return { ...state, error: null };

    case actions.ReportsPermissionsActionTypes.SuccessUpdateReportPermission:
      selectedIds = (action as actions.SuccessUpdateReportPermission).payload;
      return { ...state, selectedIds };

    case actions.ReportsPermissionsActionTypes.RequestDeleteReport:
      return { ...state, error: null };

    case actions.ReportsPermissionsActionTypes.SuccessDeleteReport:
      report = (action as actions.SuccessDeleteReport).payload;
      return { ...state, report };

    // case actions.ReportsPermissionsActionTypes.RequestBulkDeleteReportsPermissions:
    //   return { ...state, error: null };

    // case actions.ReportsPermissionsActionTypes.SuccessBulkDeleteReportsPermissions:
    //   report = (action as actions.SuccessBulkDeleteReportsPermissions).payload;
    //   return { ...state, report };

    case actions.ReportsPermissionsActionTypes.SetSelectedReportsPermissions:
      selectedIds = (action as actions.SetSelectedReportsPermissions).payload;
      return { ...state, selectedIds };

    case actions.ReportsPermissionsActionTypes.SetModalSelectReport:
      modalRowSelect = (action as actions.SetModalSelectReport).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
