import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-administrative-process-types.reducer';
import {
  CuriaAdministrativeProcessTypeResponse,
  CuriaAdministrativeProcessType,
} from '../curia-administrative-process-type.model';

export const getCuriaAdministrativeProcessTypes = createFeatureSelector(
  'curia-administrative-process-types'
);

export const getError = createSelector(
  getCuriaAdministrativeProcessTypes,
  (state: State) => state.error
);

export const getCuriaAdministrativeProcessTypesList = createSelector(
  getCuriaAdministrativeProcessTypes,
  (state: State) => {
    return state.curiaAdministrativeProcessTypes as CuriaAdministrativeProcessTypeResponse;
  }
);

export const getCuriaAdministrativeProcessTypesListEntirely = createSelector(
  getCuriaAdministrativeProcessTypes,
  (state: State) => {
    return state.curiaAdministrativeProcessTypesEntirely as CuriaAdministrativeProcessTypeResponse;
  }
);

export const getCuriaAdministrativeProcessType = createSelector(
  getCuriaAdministrativeProcessTypes,
  (state: State) => {
    return state.curiaAdministrativeProcessType as CuriaAdministrativeProcessType;
  }
);

export const getSelectedCuriaAdministrativeProcessTypes = createSelector(
  getCuriaAdministrativeProcessTypes,
  (state: State) => {
    return state.selectedIds as CuriaAdministrativeProcessType[];
  }
);
