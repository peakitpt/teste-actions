import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-taxonomy-references.reducer';
import {
  AccountingTaxonomyReferenceResponse,
  AccountingTaxonomyReference,
} from '../accounting-taxonomy-reference.model';

export const getAccountingTaxonomyReferences = createFeatureSelector(
  'accounting-taxonomy-references'
);

export const getError = createSelector(
  getAccountingTaxonomyReferences,
  (state: State) => state.error
);

export const getAccountingTaxonomyReferencesList = createSelector(
  getAccountingTaxonomyReferences,
  (state: State) => {
    return state.accountingTaxonomyReferences as AccountingTaxonomyReferenceResponse;
  }
);

export const getAccountingTaxonomyReferencesListEntirely = createSelector(
  getAccountingTaxonomyReferences,
  (state: State) => {
    return state.accountingTaxonomyReferencesEntirely as AccountingTaxonomyReferenceResponse;
  }
);

export const getAccountingTaxonomyReference = createSelector(
  getAccountingTaxonomyReferences,
  (state: State) => {
    return state.accountingTaxonomyReference as AccountingTaxonomyReference;
  }
);

export const getSelectedAccountingTaxonomyReferences = createSelector(
  getAccountingTaxonomyReferences,
  (state: State) => {
    return state.selectedIds as AccountingTaxonomyReference[];
  }
);
