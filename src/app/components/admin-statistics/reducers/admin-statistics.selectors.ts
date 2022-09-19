import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './admin-statistics.reducer';
import { AdminStatistic } from '../admin-statistic.model';

export const getAdminStatistics = createFeatureSelector('admin-statistics');

export const getError = createSelector(
  getAdminStatistics,
  (state: State) => state.error
);

export const getAdminStatistic = createSelector(
  getAdminStatistics,
  (state: State) => {
    return state.adminStatistic as AdminStatistic;
  }
);

export const getSelectedAdminStatistics = createSelector(
  getAdminStatistics,
  (state: State) => {
    return state.selectedIds as AdminStatistic[];
  }
);
