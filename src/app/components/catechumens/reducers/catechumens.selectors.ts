import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './catechumens.reducer';
import { CatechumenResponse, Catechumen } from '../catechumen.model';

export const getCatechumens = createFeatureSelector('catechumens');

export const getError = createSelector(
  getCatechumens,
  (state: State) => state.error
);

export const getCatechumensList = createSelector(
  getCatechumens,
  (state: State) => {
    return state.catechumens as CatechumenResponse;
  }
);

export const getCatechumensListEntirely = createSelector(
  getCatechumens,
  (state: State) => {
    return state.catechumensEntirely as CatechumenResponse;
  }
);

export const getCatechumen = createSelector(getCatechumens, (state: State) => {
  return state.catechumen as Catechumen;
});

export const getSelectedCatechumens = createSelector(
  getCatechumens,
  (state: State) => {
    return state.selectedIds as Catechumen[];
  }
);
