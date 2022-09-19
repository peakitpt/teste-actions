import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './catechisms.reducer';
import {
  CatechismResponse,
  Catechism,
  CatechismSessionResponse,
  CatechismIndividualDocumentResponse,
  CatechismSession,
} from '../catechism.model';

export const getCatechisms = createFeatureSelector('catechisms');

export const getError = createSelector(
  getCatechisms,
  (state: State) => state.error
);

export const getCatechismsList = createSelector(
  getCatechisms,
  (state: State) => {
    return state.catechisms as CatechismResponse;
  }
);

export const getCatechismsListEntirely = createSelector(
  getCatechisms,
  (state: State) => {
    return state.catechismsEntirely as CatechismResponse;
  }
);

export const getCatechism = createSelector(getCatechisms, (state: State) => {
  return state.catechism as Catechism;
});

export const getSelectedCatechisms = createSelector(
  getCatechisms,
  (state: State) => {
    return state.selectedIds as Catechism[];
  }
);

// SESSIONS
export const getSessionsList = createSelector(getCatechisms, (state: State) => {
  return state.sessions as CatechismSessionResponse;
});

export const getSession = createSelector(getCatechisms, (state: State) => {
  return state.session as CatechismSession;
});

export const getSelectedSessions = createSelector(
  getCatechisms,
  (state: State) => {
    return state.selectedSessionsIds as CatechismSession[];
  }
);

// INDIVIDUAL DOCUMENTS
export const getIndividualDocumentsList = createSelector(
  getCatechisms,
  (state: State) => {
    return state.individualDocs as CatechismIndividualDocumentResponse;
  }
);
