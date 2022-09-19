import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reportmanagments.reducer';
import { Reportmanagment } from '../reportmanagment.model';

export const getReportmanagments = createFeatureSelector('reportmanagments');

export const getError = createSelector(
  getReportmanagments,
  (state: State) => state.error
);

export const getReportmanagment = createSelector(
  getReportmanagments,
  (state: State) => {
    return state.reportmanagment as Reportmanagment;
  }
);

export const getSelectedReportmanagments = createSelector(
  getReportmanagments,
  (state: State) => {
    return state.selectedIds as Reportmanagment[];
  }
);
