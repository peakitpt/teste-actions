import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './emoluments.reducer';
import { EmolumentResponse, Emolument } from '../emolument.model';

export const getEmoluments = createFeatureSelector('emoluments');

export const getError = createSelector(
  getEmoluments,
  (state: State) => state.error
);

export const getEmolumentsList = createSelector(
  getEmoluments,
  (state: State) => {
    return state.emoluments as EmolumentResponse;
  }
);

export const getEmolumentsListEntirely = createSelector(
  getEmoluments,
  (state: State) => {
    return state.emolumentsEntirely as EmolumentResponse;
  }
);

export const getEmolument = createSelector(getEmoluments, (state: State) => {
  return state.numeration as Emolument;
});

export const getSelectedEmoluments = createSelector(
  getEmoluments,
  (state: State) => {
    return state.selectedIds as Emolument[];
  }
);
