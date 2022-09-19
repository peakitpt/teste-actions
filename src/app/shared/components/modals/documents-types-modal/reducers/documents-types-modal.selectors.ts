import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './documents-types-modal.reducer';
import { DocumentsTypesResponse } from '../documents-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('documents-types-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getDocumentsTypes = createSelector(getFeature, (state: State) => {
  return state.documentsTypes as DocumentsTypesResponse;
});

export const getDocumentsTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
