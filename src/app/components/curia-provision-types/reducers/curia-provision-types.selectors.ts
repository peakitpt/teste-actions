import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-provision-types.reducer';
import {
  CuriaProvisionTypeResponse,
  CuriaProvisionType,
} from '../curia-provision-type.model';

export const getCuriaProvisionTypes = createFeatureSelector(
  'curia-provision-types'
);

export const getError = createSelector(
  getCuriaProvisionTypes,
  (state: State) => state.error
);

export const getCuriaProvisionTypesList = createSelector(
  getCuriaProvisionTypes,
  (state: State) => {
    return state.curiaProvisionTypes as CuriaProvisionTypeResponse;
  }
);

export const getCuriaProvisionTypesListEntirely = createSelector(
  getCuriaProvisionTypes,
  (state: State) => {
    return state.curiaProvisionTypesEntirely as CuriaProvisionTypeResponse;
  }
);

export const getCuriaProvisionType = createSelector(
  getCuriaProvisionTypes,
  (state: State) => {
    return state.curiaProvisionType as CuriaProvisionType;
  }
);

export const getSelectedCuriaProvisionTypes = createSelector(
  getCuriaProvisionTypes,
  (state: State) => {
    return state.selectedIds as CuriaProvisionType[];
  }
);
