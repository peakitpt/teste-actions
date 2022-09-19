import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './weddings.reducer';
import { WeddingResponse, Wedding } from '../wedding.model';

export const getWeddings = createFeatureSelector('weddings');

export const getError = createSelector(
  getWeddings,
  (state: State) => state.error
);

export const getWeddingsList = createSelector(getWeddings, (state: State) => {
  return state.weddings as WeddingResponse;
});

export const getWeddingsListEntirely = createSelector(
  getWeddings,
  (state: State) => {
    return state.weddingsEntirely as WeddingResponse;
  }
);

export const getWedding = createSelector(getWeddings, (state: State) => {
  return state.wedding as Wedding;
});

export const getSelectedWeddings = createSelector(
  getWeddings,
  (state: State) => {
    return state.selectedIds as Wedding[];
  }
);
