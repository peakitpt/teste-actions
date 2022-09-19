import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-baptisms.reducer';
import { CuriaBaptismResponse, CuriaBaptism } from '../curia-baptism.model';

export const getCuriaBaptisms = createFeatureSelector('curia-baptisms');

export const getError = createSelector(
  getCuriaBaptisms,
  (state: State) => state.error
);

export const getCuriaBaptismsList = createSelector(
  getCuriaBaptisms,
  (state: State) => {
    return state.curiaBaptisms as CuriaBaptismResponse;
  }
);

export const getCuriaBaptismsListEntirely = createSelector(
  getCuriaBaptisms,
  (state: State) => {
    return state.curiaBaptismsEntirely as CuriaBaptismResponse;
  }
);

export const getCuriaBaptism = createSelector(
  getCuriaBaptisms,
  (state: State) => {
    return state.curiaBaptism as CuriaBaptism;
  }
);

export const getSelectedCuriaBaptisms = createSelector(
  getCuriaBaptisms,
  (state: State) => {
    return state.selectedIds as CuriaBaptism[];
  }
);
