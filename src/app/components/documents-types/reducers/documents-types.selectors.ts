import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './documents-types.reducer';
import { DocumentsTypeResponse, DocumentsType } from '../documents-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getDocumentsTypes = createFeatureSelector('documents-types');

export const getError = createSelector(
  getDocumentsTypes,
  (state: State) => state.error
);

export const getDocumentsTypesList = createSelector(
  getDocumentsTypes,
  (state: State) => {
    return state.documentsTypes as DocumentsTypeResponse;
  }
);

export const getDocumentsTypesListEntirely = createSelector(
  getDocumentsTypes,
  (state: State) => {
    return state.documentstypesEntirely as DocumentsTypeResponse;
  }
);

export const getDocumentsType = createSelector(
  getDocumentsTypes,
  (state: State) => {
    return state.documentsType as DocumentsType;
  }
);

export const getSelectedDocumentsTypes = createSelector(
  getDocumentsTypes,
  (state: State) => {
    return state.selectedIds as DocumentsType[];
  }
);

export const getModalRowDocumentsType = createSelector(
  getDocumentsTypes,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
