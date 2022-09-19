import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './parishioner-processes.reducer';
import {
  ParishionerProcessResponse,
  ParishionerProcess,
} from '../parishioner-process.model';

export const getParishionerProcesses = createFeatureSelector(
  'parishioner-processes'
);

export const getError = createSelector(
  getParishionerProcesses,
  (state: State) => state.error
);

export const getParishionerProcessesList = createSelector(
  getParishionerProcesses,
  (state: State) => {
    return state.parishionerProcesses as ParishionerProcessResponse;
  }
);

export const getSelectedParishionerProcesses = createSelector(
  getParishionerProcesses,
  (state: State) => {
    return state.selectedIds as ParishionerProcess[];
  }
);
