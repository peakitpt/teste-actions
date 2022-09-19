import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-transaction-document-types-modal.reducer';
import { AccountingTransactionDocumentTypesResponse } from '../accounting-transaction-document-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'accounting-transaction-document-types-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAccountingTransactionDocumentTypes = createSelector(
  getFeature,
  (state: State) => {
    return state.accountingTransactionDocumentTypes as AccountingTransactionDocumentTypesResponse;
  }
);

export const getAccountingTransactionDocumentTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
