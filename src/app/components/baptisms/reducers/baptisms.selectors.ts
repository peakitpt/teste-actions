import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './baptisms.reducer';
import { BaptismResponse, Baptism } from '../baptism.model';

export const getBaptisms = createFeatureSelector('baptisms');

export const getError = createSelector(
  getBaptisms,
  (state: State) => state.error
);

export const getBaptismsList = createSelector(getBaptisms, (state: State) => {
  return state.baptisms as BaptismResponse;
});

export const getBaptismsListEntirely = createSelector(
  getBaptisms,
  (state: State) => {
    return state.baptismsEntirely as BaptismResponse;
  }
);

export const getBaptism = createSelector(getBaptisms, (state: State) => {
  return state.baptism as Baptism;
});

export const getSelectedBaptisms = createSelector(
  getBaptisms,
  (state: State) => {
    return state.selectedIds as Baptism[];
  }
);
