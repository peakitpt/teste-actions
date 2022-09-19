import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reports-groupers.reducer';
import {
  ReportsGrouperResponse,
  ReportsGrouper,
} from '../reports-grouper.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getReportsGroupers = createFeatureSelector('reports-groupers');

export const getError = createSelector(
  getReportsGroupers,
  (state: State) => state.error
);

export const getReportsGroupersList = createSelector(
  getReportsGroupers,
  (state: State) => {
    return state.reportsGroupers as ReportsGrouperResponse;
  }
);

export const getReportsGroupersListEntirely = createSelector(
  getReportsGroupers,
  (state: State) => {
    return state.reportsGroupersEntirely as ReportsGrouperResponse;
  }
);

export const getReportsGrouper = createSelector(
  getReportsGroupers,
  (state: State) => {
    return state.reportsGrouper as ReportsGrouper;
  }
);

export const getSelectedReportsGroupers = createSelector(
  getReportsGroupers,
  (state: State) => {
    return state.selectedIds as ReportsGrouper[];
  }
);

export const getModalRowReportsGrouper = createSelector(
  getReportsGroupers,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
