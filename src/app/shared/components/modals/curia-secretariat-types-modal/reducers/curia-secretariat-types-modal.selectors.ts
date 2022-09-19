import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-secretariat-types-modal.reducer';
import { CuriaSecretariatTypesResponse } from '../curia-secretariat-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'curia-secretariat-types-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getCuriaSecretariatTypes = createSelector(
  getFeature,
  (state: State) => {
    return state.curiaSecretariatTypes as CuriaSecretariatTypesResponse;
  }
);

export const getCuriaSecretariatTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
