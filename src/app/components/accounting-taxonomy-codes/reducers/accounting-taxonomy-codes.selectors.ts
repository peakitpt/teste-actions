import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-taxonomy-codes.reducer';
import {
  AccountingTaxonomyCodeResponse,
  AccountingTaxonomyCode,
} from '../accounting-taxonomy-code.model';

export const getAccountingTaxonomyCodes = createFeatureSelector(
  'accounting-taxonomy-codes'
);

export const getError = createSelector(
  getAccountingTaxonomyCodes,
  (state: State) => state.error
);

export const getAccountingTaxonomyCodesList = createSelector(
  getAccountingTaxonomyCodes,
  (state: State) => {
    return state.accountingTaxonomyCodes as AccountingTaxonomyCodeResponse;
  }
);

export const getAccountingTaxonomyCodesListEntirely = createSelector(
  getAccountingTaxonomyCodes,
  (state: State) => {
    return state.accountingTaxonomyCodesEntirely as AccountingTaxonomyCodeResponse;
  }
);

export const getAccountingTaxonomyCode = createSelector(
  getAccountingTaxonomyCodes,
  (state: State) => {
    return state.accountingTaxonomyCode as AccountingTaxonomyCode;
  }
);

export const getSelectedAccountingTaxonomyCodes = createSelector(
  getAccountingTaxonomyCodes,
  (state: State) => {
    return state.selectedIds as AccountingTaxonomyCode[];
  }
);
