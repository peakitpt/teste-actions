import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reports-permissions.reducer';
import {
  ReportPermissionResponse,
  ReportPermission
} from '../report-permission.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getReportsPermissions = createFeatureSelector(
  'reports-permissions'
);

export const getError = createSelector(
  getReportsPermissions,
  (state: State) => state.error
);

export const getReportsPermissionsList = createSelector(
  getReportsPermissions,
  (state: State) => {
    return state.reportsPermissions as ReportPermissionResponse;
  }
);

export const getReport = createSelector(
  getReportsPermissions,
  (state: State) => {
    return state.report as ReportPermission;
  }
);

export const getSelectedReportsPermissions = createSelector(
  getReportsPermissions,
  (state: State) => {
    return state.selectedIds as ReportPermission[];
  }
);

export const getModalRowReport = createSelector(
  getReportsPermissions,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
