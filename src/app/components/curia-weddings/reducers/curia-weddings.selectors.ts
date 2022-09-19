import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-weddings.reducer';
import { CuriaWeddingResponse, CuriaWedding } from '../curia-wedding.model';

export const getCuriaWeddings = createFeatureSelector('curia-weddings');

export const getError = createSelector(
  getCuriaWeddings,
  (state: State) => state.error
);

export const getCuriaWeddingsList = createSelector(
  getCuriaWeddings,
  (state: State) => {
    return state.curiaWeddings as CuriaWeddingResponse;
  }
);

export const getCuriaWeddingsListEntirely = createSelector(
  getCuriaWeddings,
  (state: State) => {
    return state.curiaWeddingsEntirely as CuriaWeddingResponse;
  }
);

export const getCuriaWedding = createSelector(
  getCuriaWeddings,
  (state: State) => {
    return state.curiaWedding as CuriaWedding;
  }
);

export const getSelectedCuriaWeddings = createSelector(
  getCuriaWeddings,
  (state: State) => {
    return state.selectedIds as CuriaWedding[];
  }
);
