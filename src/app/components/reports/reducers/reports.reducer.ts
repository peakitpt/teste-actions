import { Action } from '@ngrx/store';
import * as actions from './reports.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Report, ReportResponse, ViewResponse } from '../report.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  reports: ReportResponse;
  reportsEntirely: ReportResponse;
  report: Report;
  selectedIds: Report[];
  modalRowSelect: SelectedModalRow;
  views: ViewResponse;
  error: RequestError;
  listReports: ReportResponse;
  formReports: ReportResponse;
  listSubscriptionReports: any;
  formSubscriptionReports: any;
}

export const initialState: State = {
  reports: null,
  reportsEntirely: null,
  report: null,
  selectedIds: null,
  modalRowSelect: null,
  views: null,
  error: null,
  listReports: null,
  formReports: null,
  listSubscriptionReports: null,
  formSubscriptionReports: null
};

export function reducer(state = initialState, action: Action): State {
  let reports: any;
  let reportsEntirely: any;
  let report: any;
  let selectedIds: any;
  let modalRowSelect: any;
  let views: any;
  let listReports: any;
  let formReports: any;
  let listSubscriptionReports: any;
  let formSubscriptionReports: any;

  switch (action.type) {
    case actions.ReportsActionTypes.RequestFailReports:
      const error = (action as actions.RequestFailReports).payload;
      return { ...state, error };

    case actions.ReportsActionTypes.RequestGetAllReports:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetAllReports:
      reports = (action as actions.SuccessGetAllReports).payload;
      return { ...state, reports };

    case actions.ReportsActionTypes.RequestGetListReports:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetListReports:
      listReports = (action as actions.SuccessGetListReports).payload;
      return { ...state, listReports };

    case actions.ReportsActionTypes.RequestGetFormReports:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetFormReports:
      formReports = (action as actions.SuccessGetFormReports).payload;
      return { ...state, formReports };

    case actions.ReportsActionTypes.RequestGetReport:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetReport:
      report = (action as actions.SuccessGetReport).payload;
      return { ...state, report };

    case actions.ReportsActionTypes.RequestPostReport:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessPostReport:
      report = (action as actions.SuccessPostReport).payload;
      return { ...state, report };

    case actions.ReportsActionTypes.RequestPutReport:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessPutReport:
      report = (action as actions.SuccessPutReport).payload;
      return { ...state, report };

    case actions.ReportsActionTypes.RequestDeleteReport:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessDeleteReport:
      report = (action as actions.SuccessDeleteReport).payload;
      return { ...state, report };

    // case actions.ReportsActionTypes.RequestBulkDeleteReports:
    //   return { ...state, error: null };

    // case actions.ReportsActionTypes.SuccessBulkDeleteReports:
    //   report = (action as actions.SuccessBulkDeleteReports).payload;
    //   return { ...state, report };

    case actions.ReportsActionTypes.SetSelectedReports:
      selectedIds = (action as actions.SetSelectedReports).payload;
      return { ...state, selectedIds };

    case actions.ReportsActionTypes.SetModalSelectReport:
      modalRowSelect = (action as actions.SetModalSelectReport).payload;
      return { ...state, modalRowSelect };

    case actions.ReportsActionTypes.RequestGetAllViews:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetAllViews:
      views = (action as actions.SuccessGetAllViews).payload;
      return { ...state, views };

    case actions.ReportsActionTypes.RequestGetListSubscriptionReports:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetListSubscriptionReports:
      listSubscriptionReports = (action as actions.SuccessGetListSubscriptionReports)
        .payload;
      return { ...state, listSubscriptionReports };

    case actions.ReportsActionTypes.RequestGetFormSubscriptionReports:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetFormSubscriptionReports:
      formSubscriptionReports = (action as actions.SuccessGetFormSubscriptionReports)
        .payload;
      return { ...state, formSubscriptionReports };

    case actions.ReportsActionTypes.RequestGetEntirelyReports:
      return { ...state, error: null };

    case actions.ReportsActionTypes.SuccessGetEntirelyReports:
      reportsEntirely = (action as actions.SuccessGetEntirelyReports).payload;
      return { ...state, reportsEntirely };

    default:
      return state;
  }
}
