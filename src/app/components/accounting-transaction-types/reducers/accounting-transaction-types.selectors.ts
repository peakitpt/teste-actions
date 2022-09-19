import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-transaction-types.reducer';
import {
  AccountingTransactionTypeResponse,
  AccountingTransactionType,
} from '../accounting-transaction-type.model';

export const getAccountingTransactionTypes = createFeatureSelector(
  'accounting-transaction-types'
);

export const getError = createSelector(
  getAccountingTransactionTypes,
  (state: State) => state.error
);

export const getAccountingTransactionTypesList = createSelector(
  getAccountingTransactionTypes,
  (state: State) => {
    return state.accountingTransactionTypes as AccountingTransactionTypeResponse;
  }
);

export const getAccountingTransactionTypesListEntirely = createSelector(
  getAccountingTransactionTypes,
  (state: State) => {
    return state.accountingTransactionTypesEntirely as AccountingTransactionTypeResponse;
  }
);

export const getAccountingTransactionType = createSelector(
  getAccountingTransactionTypes,
  (state: State) => {
    return state.accountingTransactionType as AccountingTransactionType;
  }
);

export const getSelectedAccountingTransactionTypes = createSelector(
  getAccountingTransactionTypes,
  (state: State) => {
    return state.selectedIds as AccountingTransactionType[];
  }
);
