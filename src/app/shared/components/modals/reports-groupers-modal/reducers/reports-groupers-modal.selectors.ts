import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reports-groupers-modal.reducer';
import { ReportsGrouperResponse } from '../reports-groupers-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('reports-groupers-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getReportsGroupers = createSelector(getFeature, (state: State) => {
  return state.reportsGroupers as ReportsGrouperResponse;
});

export const getReportsGroupersSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
