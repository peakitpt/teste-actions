import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-transaction-document-types.reducer';
import {
  AccountingTransactionDocumentTypeResponse,
  AccountingTransactionDocumentType,
} from '../accounting-transaction-document-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getAccountingTransactionDocumentTypes = createFeatureSelector(
  'accounting-transaction-document-types'
);

export const getError = createSelector(
  getAccountingTransactionDocumentTypes,
  (state: State) => state.error
);

export const getAccountingTransactionDocumentTypesList = createSelector(
  getAccountingTransactionDocumentTypes,
  (state: State) => {
    return state.accountingTransactionDocumentTypes as AccountingTransactionDocumentTypeResponse;
  }
);

export const getAccountingTransactionDocumentTypesListEntirely = createSelector(
  getAccountingTransactionDocumentTypes,
  (state: State) => {
    return state.accountingTransactionDocumentTypesEntirely as AccountingTransactionDocumentTypeResponse;
  }
);

export const getAccountingTransactionDocumentType = createSelector(
  getAccountingTransactionDocumentTypes,
  (state: State) => {
    return state.accountingTransactionDocumentType as AccountingTransactionDocumentType;
  }
);

export const getSelectedAccountingTransactionDocumentTypes = createSelector(
  getAccountingTransactionDocumentTypes,
  (state: State) => {
    return state.selectedIds as AccountingTransactionDocumentType[];
  }
);

export const getModalRowAccountingTransactionDocumentType = createSelector(
  getAccountingTransactionDocumentTypes,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
