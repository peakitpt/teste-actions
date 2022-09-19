import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-transaction-lines.reducer';
import {
  AccountingTransactionLineResponse,
  AccountingTransactionLine,
} from '../accounting-transaction-line.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getAccountingTransactionLines = createFeatureSelector(
  'accounting-transaction-lines'
);

export const getError = createSelector(
  getAccountingTransactionLines,
  (state: State) => state.error
);

export const getAccountingTransactionLinesList = createSelector(
  getAccountingTransactionLines,
  (state: State) => {
    return state.accountingTransactionLines as AccountingTransactionLineResponse;
  }
);

export const getAccountingTransactionLinesListEntirely = createSelector(
  getAccountingTransactionLines,
  (state: State) => {
    return state.accountingTransactionLinesEntirely as AccountingTransactionLineResponse;
  }
);

export const getAccountingTransactionLine = createSelector(
  getAccountingTransactionLines,
  (state: State) => {
    return state.accountingTransactionLine as AccountingTransactionLine;
  }
);

export const getSelectedAccountingTransactionLines = createSelector(
  getAccountingTransactionLines,
  (state: State) => {
    return state.selectedIds as AccountingTransactionLine[];
  }
);

export const getModalRowAccountingTransactionLine = createSelector(
  getAccountingTransactionLines,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
