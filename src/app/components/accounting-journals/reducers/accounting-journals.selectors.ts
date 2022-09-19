import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-journals.reducer';
import {
  AccountingJournalResponse,
  AccountingJournal,
} from '../accounting-journal.model';

export const getAccountingJournals = createFeatureSelector(
  'accounting-journals'
);

export const getError = createSelector(
  getAccountingJournals,
  (state: State) => state.error
);

export const getAccountingJournalsList = createSelector(
  getAccountingJournals,
  (state: State) => {
    return state.accountingJournals as AccountingJournalResponse;
  }
);

export const getAccountingJournal = createSelector(
  getAccountingJournals,
  (state: State) => {
    return state.accountingJournal as AccountingJournal;
  }
);

export const getSelectedAccountingJournals = createSelector(
  getAccountingJournals,
  (state: State) => {
    return state.selectedIds as AccountingJournal[];
  }
);
