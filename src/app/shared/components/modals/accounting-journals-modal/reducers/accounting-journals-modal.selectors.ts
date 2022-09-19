import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-journals-modal.reducer';
import { AccountingJournalsResponse } from '../accounting-journals-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'accounting-journals-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAccountingJournals = createSelector(
  getFeature,
  (state: State) => {
    return state.accountingJournals as AccountingJournalsResponse;
  }
);

export const getAccountingJournalsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
