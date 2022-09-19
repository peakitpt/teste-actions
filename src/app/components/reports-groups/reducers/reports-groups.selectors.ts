import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reports-groups.reducer';
import { ReportsGroupResponse, ReportsGroup } from '../reports-group.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getReportsGroups = createFeatureSelector('reports-groups');

export const getError = createSelector(
  getReportsGroups,
  (state: State) => state.error
);

export const getReportsGroupsList = createSelector(
  getReportsGroups,
  (state: State) => {
    return state.reportsGroups as ReportsGroupResponse;
  }
);

export const getReportsGroupsListEntirely = createSelector(
  getReportsGroups,
  (state: State) => {
    return state.reportsGroupsEntirely as ReportsGroupResponse;
  }
);

export const getReportsGroup = createSelector(
  getReportsGroups,
  (state: State) => {
    return state.reportsGroup as ReportsGroup;
  }
);

export const getSelectedReportsGroups = createSelector(
  getReportsGroups,
  (state: State) => {
    return state.selectedIds as ReportsGroup[];
  }
);

export const getModalRowReportsGroup = createSelector(
  getReportsGroups,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
