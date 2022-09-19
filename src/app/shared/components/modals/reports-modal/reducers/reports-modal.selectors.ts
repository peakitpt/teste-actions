import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reports-modal.reducer';
import { ReportResponse } from '../reports-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('reports-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getReports = createSelector(getFeature, (state: State) => {
  return state.reports as ReportResponse;
});

export const getReportsSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
