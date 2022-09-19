import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-transactions.reducer';
import {
  AccountingTransactionResponse,
  AccountingTransaction,
} from '../accounting-transaction.model';

export const getAccountingTransactions = createFeatureSelector(
  'accounting-transactions'
);

export const getError = createSelector(
  getAccountingTransactions,
  (state: State) => state.error
);

export const getAccountingTransactionsList = createSelector(
  getAccountingTransactions,
  (state: State) => {
    return state.accountingTransactions as AccountingTransactionResponse;
  }
);

export const getAccountingTransactionsListEntirely = createSelector(
  getAccountingTransactions,
  (state: State) => {
    return state.accountingTransactionsEntirely as AccountingTransactionResponse;
  }
);

export const getAccountingTransaction = createSelector(
  getAccountingTransactions,
  (state: State) => {
    return state.accountingTransaction as AccountingTransaction;
  }
);

export const getSelectedAccountingTransactions = createSelector(
  getAccountingTransactions,
  (state: State) => {
    return state.selectedIds as AccountingTransaction[];
  }
);
