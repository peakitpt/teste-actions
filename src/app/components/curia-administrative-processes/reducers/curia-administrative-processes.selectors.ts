import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-administrative-processes.reducer';
import {
  CuriaAdministrativeProcessResponse,
  CuriaAdministrativeProcess,
} from '../curia-administrative-process.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getCuriaAdministrativeProcesses = createFeatureSelector(
  'curia-administrative-processes'
);

export const getError = createSelector(
  getCuriaAdministrativeProcesses,
  (state: State) => state.error
);

export const getCuriaAdministrativeProcessesList = createSelector(
  getCuriaAdministrativeProcesses,
  (state: State) => {
    return state.curiaAdministrativeProcesses as CuriaAdministrativeProcessResponse;
  }
);

export const getCuriaAdministrativeProcessesListEntirely = createSelector(
  getCuriaAdministrativeProcesses,
  (state: State) => {
    return state.curiaAdministrativeProcessesEntirely as CuriaAdministrativeProcessResponse;
  }
);

export const getCuriaAdministrativeProcess = createSelector(
  getCuriaAdministrativeProcesses,
  (state: State) => {
    return state.curiaMinistryAndOrder as CuriaAdministrativeProcess;
  }
);

export const getSelectedCuriaAdministrativeProcesses = createSelector(
  getCuriaAdministrativeProcesses,
  (state: State) => {
    return state.selectedIds as CuriaAdministrativeProcess[];
  }
);

export const getModalRowCuriaAdministrativeProcess = createSelector(
  getCuriaAdministrativeProcesses,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
