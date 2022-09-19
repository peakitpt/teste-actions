import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reports.reducer';
import { ReportResponse, Report, ViewResponse } from '../report.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getReports = createFeatureSelector('reports');

export const getError = createSelector(
  getReports,
  (state: State) => state.error
);

export const getReportsList = createSelector(getReports, (state: State) => {
  return state.reports as ReportResponse;
});

export const getListReports = createSelector(getReports, (state: State) => {
  if (state) {
    return state.listReports as ReportResponse;
  }
});

export const getReportsListEntirely = createSelector(
  getReports,
  (state: State) => {
    return state.reportsEntirely as ReportResponse;
  }
);

export const getListSubscriptionReports = createSelector(
  getReports,
  (state: State) => {
    if (state) {
      return state.listSubscriptionReports as any;
    }
  }
);

export const getFormSubscriptionReports = createSelector(
  getReports,
  (state: State) => {
    if (state) {
      return state.formSubscriptionReports as any;
    }
  }
);

export const getFormReports = createSelector(getReports, (state: State) => {
  return state.formReports as ReportResponse;
});

export const getReport = createSelector(getReports, (state: State) => {
  return state.report as Report;
});

export const getViewsList = createSelector(getReports, (state: State) => {
  return state.views as ViewResponse;
});

export const getSelectedReports = createSelector(getReports, (state: State) => {
  return state.selectedIds as Report[];
});

export const getModalRowReport = createSelector(getReports, (state: State) => {
  if (state) {
    return state.modalRowSelect as SelectedModalRow;
  }
});
