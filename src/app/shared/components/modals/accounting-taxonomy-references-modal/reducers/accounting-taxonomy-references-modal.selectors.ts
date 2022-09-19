import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-taxonomy-references-modal.reducer';
import { AccountingTaxonomyReferencesResponse } from '../accounting-taxonomy-references-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'accounting-taxonomy-references-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAccountingTaxonomyReferences = createSelector(
  getFeature,
  (state: State) => {
    return state.accountingTaxonomyReferences as AccountingTaxonomyReferencesResponse;
  }
);

export const getAccountingTaxonomyReferencesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
