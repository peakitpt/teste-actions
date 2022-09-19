import { Action } from '@ngrx/store';
import * as actions from './subscription-statistics.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SubscriptionStatistic } from '../subscription-statistic.model';

export interface State {
  subscriptionStatistic: SubscriptionStatistic;
  selectedIds: SubscriptionStatistic[];
  error: RequestError;
  file: any;
}

export const initialState: State = {
  subscriptionStatistic: null,
  selectedIds: null,
  error: null,
  file: null,
};

export function reducer(state = initialState, action: Action): State {
  let subscriptionStatistic: any;
  let selectedIds: any;
  let file: any;

  switch (action.type) {
    case actions.SubscriptionStatisticsActionTypes
      .RequestFailSubscriptionStatistics:
      const error = (action as actions.RequestFailSubscriptionStatistics)
        .payload;
      return { ...state, error };

    case actions.SubscriptionStatisticsActionTypes
      .RequestGetSubscriptionStatistic:
      return { ...state, error: null };

    case actions.SubscriptionStatisticsActionTypes
      .SuccessGetSubscriptionStatistic:
      subscriptionStatistic = (action as actions.SuccessGetSubscriptionStatistic)
        .payload;
      return { ...state, subscriptionStatistic };

    case actions.SubscriptionStatisticsActionTypes
      .RequestPostSubscriptionStatistic:
      return { ...state, error: null };

    case actions.SubscriptionStatisticsActionTypes
      .SuccessPostSubscriptionStatistic:
      subscriptionStatistic = (action as actions.SuccessPostSubscriptionStatistic)
        .payload;
      return { ...state, subscriptionStatistic };

    case actions.SubscriptionStatisticsActionTypes
      .RequestPutSubscriptionStatistic:
      return { ...state, error: null };

    case actions.SubscriptionStatisticsActionTypes
      .SuccessPutSubscriptionStatistic:
      subscriptionStatistic = (action as actions.SuccessPutSubscriptionStatistic)
        .payload;
      return { ...state, subscriptionStatistic };

    case actions.SubscriptionStatisticsActionTypes
      .RequestDeleteSubscriptionStatistic:
      return { ...state, error: null };

    case actions.SubscriptionStatisticsActionTypes
      .SuccessDeleteSubscriptionStatistic:
      subscriptionStatistic = (action as actions.SuccessDeleteSubscriptionStatistic)
        .payload;
      return { ...state, subscriptionStatistic };

    case actions.SubscriptionStatisticsActionTypes
      .SetSelectedSubscriptionStatistics:
      selectedIds = (action as actions.SetSelectedSubscriptionStatistics)
        .payload;
      return { ...state, selectedIds };

    case actions.SubscriptionStatisticsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.SubscriptionStatisticsActionTypes.SuccessGetNew:
      subscriptionStatistic = (action as actions.SuccessGetNew).payload;
      return { ...state, subscriptionStatistic };

    case actions.SubscriptionStatisticsActionTypes.RequestPostUploadFile:
      return { ...state, error: null };

    case actions.SubscriptionStatisticsActionTypes.SuccessPostUploadFile:
      file = (action as actions.SuccessPostUploadFile).payload;
      return { ...state, file };

    default:
      return state;
  }
}
