import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-balance-sheets.reducer';
import {
  AccountingBalanceSheetResponse,
  AccountingBalanceSheet,
} from '../accounting-balance-sheet.model';

export const getAccountingBalanceSheets = createFeatureSelector(
  'accounting-balance-sheets'
);

export const getError = createSelector(
  getAccountingBalanceSheets,
  (state: State) => state.error
);

export const getAccountingBalanceSheetsList = createSelector(
  getAccountingBalanceSheets,
  (state: State) => {
    return state.accountingBalanceSheets as AccountingBalanceSheetResponse;
  }
);

export const getAccountingBalanceSheetsListEntirely = createSelector(
  getAccountingBalanceSheets,
  (state: State) => {
    return state.accountingBalanceSheetsEntirely as AccountingBalanceSheetResponse;
  }
);

export const getAccountingBalanceSheet = createSelector(
  getAccountingBalanceSheets,
  (state: State) => {
    return state.accountingBalanceSheet as AccountingBalanceSheet;
  }
);

export const getSelectedAccountingBalanceSheets = createSelector(
  getAccountingBalanceSheets,
  (state: State) => {
    return state.selectedIds as AccountingBalanceSheet[];
  }
);
