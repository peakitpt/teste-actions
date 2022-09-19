import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './gestdocuments.reducer';
import { GestdocumentResponse, Gestdocument } from '../gestdocument.model';

export const getGestdocuments = createFeatureSelector('gestdocuments');

export const getError = createSelector(
  getGestdocuments,
  (state: State) => state.error
);

export const getGestdocumentsList = createSelector(
  getGestdocuments,
  (state: State) => {
    return state.gestdocuments as GestdocumentResponse;
  }
);

export const getGestdocumentsListEntirely = createSelector(
  getGestdocuments,
  (state: State) => {
    return state.gestdocumentsEntirely as GestdocumentResponse;
  }
);

export const getGestdocument = createSelector(
  getGestdocuments,
  (state: State) => {
    return state.gestdocument as Gestdocument;
  }
);

export const getSelectedGestdocuments = createSelector(
  getGestdocuments,
  (state: State) => {
    return state.selectedIds as Gestdocument[];
  }
);
