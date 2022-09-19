import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-provision-types-modal.reducer';
import { CuriaProvisionTypesResponse } from '../curia-provision-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('curia-provision-types-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getCuriaProvisionTypes = createSelector(
  getFeature,
  (state: State) => {
    return state.curiaProvisionTypes as CuriaProvisionTypesResponse;
  }
);

export const getCuriaProvisionTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
