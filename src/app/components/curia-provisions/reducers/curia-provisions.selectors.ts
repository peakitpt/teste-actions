import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-provisions.reducer';
import {
  CuriaProvisionResponse,
  CuriaProvision,
} from '../curia-provision.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getCuriaProvisions = createFeatureSelector('curia-provisions');

export const getError = createSelector(
  getCuriaProvisions,
  (state: State) => state.error
);

export const getCuriaProvisionsList = createSelector(
  getCuriaProvisions,
  (state: State) => {
    return state.curiaProvisions as CuriaProvisionResponse;
  }
);

export const getCuriaProvisionsListEntirely = createSelector(
  getCuriaProvisions,
  (state: State) => {
    return state.curiaProvisionsEntirely as CuriaProvisionResponse;
  }
);

export const getCuriaProvision = createSelector(
  getCuriaProvisions,
  (state: State) => {
    return state.curiaMinistryAndOrder as CuriaProvision;
  }
);

export const getSelectedCuriaProvisions = createSelector(
  getCuriaProvisions,
  (state: State) => {
    return state.selectedIds as CuriaProvision[];
  }
);

export const getModalRowCuriaProvision = createSelector(
  getCuriaProvisions,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
