import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './documents.reducer';
import { DocumentResponse, Document } from '../document.model';

export const getDocuments = createFeatureSelector('documents');

export const getError = createSelector(
  getDocuments,
  (state: State) => state.error
);

export const getDocumentsList = createSelector(getDocuments, (state: State) => {
  return state.documents as DocumentResponse;
});

export const getDocumentsListEntirely = createSelector(
  getDocuments,
  (state: State) => {
    return state.documentsEntirely as DocumentResponse;
  }
);

export const getDocument = createSelector(getDocuments, (state: State) => {
  return state.document as Document;
});

export const getSelectedDocuments = createSelector(
  getDocuments,
  (state: State) => {
    return state.selectedIds as Document[];
  }
);
