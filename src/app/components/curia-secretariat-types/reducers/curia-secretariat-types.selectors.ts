import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-secretariat-types.reducer';
import {
  CuriaSecretariatTypeResponse,
  CuriaSecretariatType,
} from '../curia-secretariat-type.model';

export const getCuriaSecretariatTypes = createFeatureSelector(
  'curia-secretariat-types'
);

export const getError = createSelector(
  getCuriaSecretariatTypes,
  (state: State) => state.error
);

export const getCuriaSecretariatTypesList = createSelector(
  getCuriaSecretariatTypes,
  (state: State) => {
    return state.curiaSecretariatTypes as CuriaSecretariatTypeResponse;
  }
);

export const getCuriaSecretariatTypesListEntirely = createSelector(
  getCuriaSecretariatTypes,
  (state: State) => {
    return state.curiaSecretariatTypesEntirely as CuriaSecretariatTypeResponse;
  }
);

export const getCuriaSecretariatType = createSelector(
  getCuriaSecretariatTypes,
  (state: State) => {
    return state.curiaSecretariatType as CuriaSecretariatType;
  }
);

export const getSelectedCuriaSecretariatTypes = createSelector(
  getCuriaSecretariatTypes,
  (state: State) => {
    return state.selectedIds as CuriaSecretariatType[];
  }
);
