import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './bishoprics.reducer';

export const getBishoprics = createFeatureSelector('bishoprics');

export const getError = createSelector(
  getBishoprics,
  (state: State) => state.error
);

export const getBishopricsList = createSelector(
  getBishoprics,
  (state: State) => {
    return state.bishoprics;
  }
);

export const getBishopricsListEntirely = createSelector(
  getBishoprics,
  (state: State) => {
    return state.bishopricsEntirely;
  }
);

export const getBishopric = createSelector(getBishoprics, (state: State) => {
  return state.bishopric;
});

export const getSelectedBishoprics = createSelector(
  getBishoprics,
  (state: State) => {
    return state.selectedIds;
  }
);
