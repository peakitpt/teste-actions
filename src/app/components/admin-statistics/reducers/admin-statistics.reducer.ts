import { Action } from '@ngrx/store';
import * as actions from './admin-statistics.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AdminStatistic } from '../admin-statistic.model';

export interface State {
  adminStatistic: AdminStatistic;
  selectedIds: AdminStatistic[];
  error: RequestError;
  file: any;
}

export const initialState: State = {
  adminStatistic: null,
  selectedIds: null,
  error: null,
  file: null,
};

export function reducer(state = initialState, action: Action): State {
  let adminStatistic: any;
  let selectedIds: any;
  let file: any;

  switch (action.type) {
    case actions.AdminStatisticsActionTypes.RequestFailAdminStatistics:
      const error = (action as actions.RequestFailAdminStatistics).payload;
      return { ...state, error };

    case actions.AdminStatisticsActionTypes.RequestGetAdminStatistic:
      return { ...state, error: null };

    case actions.AdminStatisticsActionTypes.SuccessGetAdminStatistic:
      adminStatistic = (action as actions.SuccessGetAdminStatistic).payload;
      return { ...state, adminStatistic };

    case actions.AdminStatisticsActionTypes.RequestPostAdminStatistic:
      return { ...state, error: null };

    case actions.AdminStatisticsActionTypes.SuccessPostAdminStatistic:
      adminStatistic = (action as actions.SuccessPostAdminStatistic).payload;
      return { ...state, adminStatistic };

    case actions.AdminStatisticsActionTypes.RequestPutAdminStatistic:
      return { ...state, error: null };

    case actions.AdminStatisticsActionTypes.SuccessPutAdminStatistic:
      adminStatistic = (action as actions.SuccessPutAdminStatistic).payload;
      return { ...state, adminStatistic };

    case actions.AdminStatisticsActionTypes.RequestDeleteAdminStatistic:
      return { ...state, error: null };

    case actions.AdminStatisticsActionTypes.SuccessDeleteAdminStatistic:
      adminStatistic = (action as actions.SuccessDeleteAdminStatistic).payload;
      return { ...state, adminStatistic };

    case actions.AdminStatisticsActionTypes.SetSelectedAdminStatistics:
      selectedIds = (action as actions.SetSelectedAdminStatistics).payload;
      return { ...state, selectedIds };

    case actions.AdminStatisticsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AdminStatisticsActionTypes.SuccessGetNew:
      adminStatistic = (action as actions.SuccessGetNew).payload;
      return { ...state, adminStatistic };

    case actions.AdminStatisticsActionTypes.RequestPostUploadFile:
      return { ...state, error: null };

    case actions.AdminStatisticsActionTypes.SuccessPostUploadFile:
      file = (action as actions.SuccessPostUploadFile).payload;
      return { ...state, file };

    default:
      return state;
  }
}
