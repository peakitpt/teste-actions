import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-taxonomy-codes-modal.reducer';
import { AccountingTaxonomyCodesResponse } from '../accounting-taxonomy-codes-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'accounting-taxonomy-codes-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAccountingTaxonomyCodes = createSelector(
  getFeature,
  (state: State) => {
    return state.accountingTaxonomyCodes as AccountingTaxonomyCodesResponse;
  }
);

export const getAccountingTaxonomyCodesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
