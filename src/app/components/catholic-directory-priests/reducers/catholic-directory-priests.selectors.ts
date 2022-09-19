import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './catholic-directory-priests.reducer';
import {
  CatholicDirectoryPriestResponse,
  CatholicDirectoryPriest,
} from '../catholic-directory-priest.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getCatholicDirectoryPriests = createFeatureSelector(
  'catholic-directory-priests'
);

export const getError = createSelector(
  getCatholicDirectoryPriests,
  (state: State) => state.error
);

export const getCatholicDirectoryPriestsList = createSelector(
  getCatholicDirectoryPriests,
  (state: State) => {
    return state.catholicDirectoryPriests as CatholicDirectoryPriestResponse;
  }
);

export const getCatholicDirectoryPriestsListEntirely = createSelector(
  getCatholicDirectoryPriests,
  (state: State) => {
    return state.catholicDirectoryPriestsEntirely as CatholicDirectoryPriestResponse;
  }
);

export const getCatholicDirectoryPriest = createSelector(
  getCatholicDirectoryPriests,
  (state: State) => {
    return state.catholicDirectoryPriest as CatholicDirectoryPriest;
  }
);

export const getSelectedCatholicDirectoryPriests = createSelector(
  getCatholicDirectoryPriests,
  (state: State) => {
    return state.selectedIds as CatholicDirectoryPriest[];
  }
);

export const getModalRowCatholicDirectoryPriest = createSelector(
  getCatholicDirectoryPriests,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
