import { Action } from '@ngrx/store';
import * as actions from './reportmanagments.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Reportmanagment } from '../reportmanagment.model';

export interface State {
  reportmanagment: Reportmanagment;
  selectedIds: Reportmanagment[];
  error: RequestError;
  file: any;
  redirect: any;
}

export const initialState: State = {
  reportmanagment: null,
  selectedIds: null,
  error: null,
  file: null,
  redirect: null,
};

export function reducer(state = initialState, action: Action): State {
  let reportmanagment: any;
  let selectedIds: any;
  let file: any;
  let redirect: any;

  switch (action.type) {
    case actions.ReportmanagmentsActionTypes.RequestFailReportmanagments:
      const error = (action as actions.RequestFailReportmanagments).payload;
      return { ...state, error };

    case actions.ReportmanagmentsActionTypes.RequestGetReportmanagment:
      return { ...state, error: null };

    case actions.ReportmanagmentsActionTypes.SuccessGetReportmanagment:
      reportmanagment = (action as actions.SuccessGetReportmanagment).payload;
      return { ...state, reportmanagment };

    case actions.ReportmanagmentsActionTypes.RequestPostReportmanagment:
      return { ...state, error: null };

    case actions.ReportmanagmentsActionTypes.SuccessPostReportmanagment:
      reportmanagment = (action as actions.SuccessPostReportmanagment).payload;
      return { ...state, reportmanagment };

    case actions.ReportmanagmentsActionTypes.RequestPutReportmanagment:
      return { ...state, error: null };

    case actions.ReportmanagmentsActionTypes.SuccessPutReportmanagment:
      reportmanagment = (action as actions.SuccessPutReportmanagment).payload;
      return { ...state, reportmanagment };

    case actions.ReportmanagmentsActionTypes.RequestDeleteReportmanagment:
      return { ...state, error: null };

    case actions.ReportmanagmentsActionTypes.SuccessDeleteReportmanagment:
      reportmanagment = (action as actions.SuccessDeleteReportmanagment)
        .payload;
      return { ...state, reportmanagment };

    case actions.ReportmanagmentsActionTypes.SetSelectedReportmanagments:
      selectedIds = (action as actions.SetSelectedReportmanagments).payload;
      return { ...state, selectedIds };

    case actions.ReportmanagmentsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.ReportmanagmentsActionTypes.SuccessGetNew:
      reportmanagment = (action as actions.SuccessGetNew).payload;
      return { ...state, reportmanagment };

    case actions.ReportmanagmentsActionTypes.RequestPostUploadFile:
      return { ...state, error: null };

    case actions.ReportmanagmentsActionTypes.SuccessPostUploadFile:
      file = (action as actions.SuccessPostUploadFile).payload;
      return { ...state, file };

    case actions.ReportmanagmentsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ReportmanagmentsActionTypes.SuccessGetAll:
      redirect = (action as actions.SuccessGetAll).payload;
      return { ...state, redirect };

    default:
      return state;
  }
}
