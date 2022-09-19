import { SelectedModalRow } from './../../../shared/shared.model';
import { Action } from '@ngrx/store';
import * as actions from './reports-groupers.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ReportsGrouper,
  ReportsGrouperResponse,
} from '../reports-grouper.model';

export interface State {
  reportsGroupers: ReportsGrouperResponse;
  reportsGroupersEntirely: ReportsGrouperResponse;
  reportsGrouper: ReportsGrouper;
  selectedIds: ReportsGrouper[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  reportsGroupers: null,
  reportsGroupersEntirely: null,
  reportsGrouper: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let reportsGroupers: any;
  let reportsGroupersEntirely: any;
  let reportsGrouper: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ReportsGroupersActionTypes.RequestFailReportsGroupers:
      const error = (action as actions.RequestFailReportsGroupers).payload;
      return { ...state, error };

    case actions.ReportsGroupersActionTypes.RequestGetAllReportsGroupers:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessGetAllReportsGroupers:
      reportsGroupers = (action as actions.SuccessGetAllReportsGroupers)
        .payload;
      return { ...state, reportsGroupers };

    case actions.ReportsGroupersActionTypes.RequestGetReportsGrouper:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessGetReportsGrouper:
      reportsGrouper = (action as actions.SuccessGetReportsGrouper).payload;
      return { ...state, reportsGrouper };

    case actions.ReportsGroupersActionTypes.RequestPostReportsGrouper:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessPostReportsGrouper:
      reportsGrouper = (action as actions.SuccessPostReportsGrouper).payload;
      return { ...state, reportsGrouper };

    case actions.ReportsGroupersActionTypes.RequestPutReportsGrouper:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessPutReportsGrouper:
      reportsGrouper = (action as actions.SuccessPutReportsGrouper).payload;
      return { ...state, reportsGrouper };

    case actions.ReportsGroupersActionTypes.RequestDeleteReportsGrouper:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessDeleteReportsGrouper:
      reportsGrouper = (action as actions.SuccessDeleteReportsGrouper).payload;
      return { ...state, reportsGrouper };

    // case actions.ReportsGroupersActionTypes.RequestBulkDeleteReportsGroupers:
    //   return { ...state, error: null };

    // case actions.ReportsGroupersActionTypes.SuccessBulkDeleteReportsGroupers:
    //   reportsGrouper = (action as actions.SuccessBulkDeleteReportsGroupers).payload;
    //   return { ...state, reportsGrouper };

    case actions.ReportsGroupersActionTypes.SetSelectedReportsGroupers:
      selectedIds = (action as actions.SetSelectedReportsGroupers).payload;
      return { ...state, selectedIds };

    case actions.ReportsGroupersActionTypes.SetModalSelectReportsGrouper:
      modalRowSelect = (action as actions.SetModalSelectReportsGrouper).payload;
      return { ...state, modalRowSelect };

    case actions.ReportsGroupersActionTypes.RequestGetEntirelyReportsGroupers:
      return { ...state, error: null };

    case actions.ReportsGroupersActionTypes.SuccessGetEntirelyReportsGroupers:
      reportsGroupersEntirely = (action as actions.SuccessGetEntirelyReportsGroupers)
        .payload;
      return { ...state, reportsGroupersEntirely };

    default:
      return state;
  }
}
