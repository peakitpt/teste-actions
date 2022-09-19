import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-secretariats.reducer';
import {
  CuriaSecretariatResponse,
  CuriaSecretariat,
} from '../curia-secretariat.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getCuriaSecretariats = createFeatureSelector('curia-secretariats');

export const getError = createSelector(
  getCuriaSecretariats,
  (state: State) => state.error
);

export const getCuriaSecretariatsList = createSelector(
  getCuriaSecretariats,
  (state: State) => {
    return state.curiaSecretariats as CuriaSecretariatResponse;
  }
);

export const getCuriaSecretariatsListEntirely = createSelector(
  getCuriaSecretariats,
  (state: State) => {
    return state.curiaSecretariatsEntirely as CuriaSecretariatResponse;
  }
);

export const getCuriaSecretariat = createSelector(
  getCuriaSecretariats,
  (state: State) => {
    return state.curiaMinistryAndOrder as CuriaSecretariat;
  }
);

export const getSelectedCuriaSecretariats = createSelector(
  getCuriaSecretariats,
  (state: State) => {
    return state.selectedIds as CuriaSecretariat[];
  }
);

export const getModalRowCuriaSecretariat = createSelector(
  getCuriaSecretariats,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
