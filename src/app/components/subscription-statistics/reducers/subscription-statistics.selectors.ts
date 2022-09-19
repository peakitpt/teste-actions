import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './subscription-statistics.reducer';
import { SubscriptionStatistic } from '../subscription-statistic.model';

export const getSubscriptionStatistics = createFeatureSelector(
  'subscription-statistics'
);

export const getError = createSelector(
  getSubscriptionStatistics,
  (state: State) => state.error
);

export const getSubscriptionStatistic = createSelector(
  getSubscriptionStatistics,
  (state: State) => {
    return state.subscriptionStatistic as SubscriptionStatistic;
  }
);

export const getSelectedSubscriptionStatistics = createSelector(
  getSubscriptionStatistics,
  (state: State) => {
    return state.selectedIds as SubscriptionStatistic[];
  }
);
