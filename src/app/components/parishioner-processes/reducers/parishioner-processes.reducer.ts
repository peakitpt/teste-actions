import { Action } from '@ngrx/store';
import * as actions from './parishioner-processes.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ParishionerProcess,
  ParishionerProcessResponse,
} from '../parishioner-process.model';

export interface State {
  parishionerProcesses: ParishionerProcessResponse;
  selectedIds: ParishionerProcess[];
  error: RequestError;
}

export const initialState: State = {
  parishionerProcesses: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let parishionerProcesses: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.ParishionerProcessesActionTypes
      .RequestFailParishionerProcesses:
      const error = (action as actions.RequestFailParishionerProcesses).payload;
      return { ...state, error };

    case actions.ParishionerProcessesActionTypes
      .RequestGetAllParishionerProcesses:
      return { ...state, error: null };

    case actions.ParishionerProcessesActionTypes
      .SuccessGetAllParishionerProcesses:
      parishionerProcesses = (
        action as actions.SuccessGetAllParishionerProcesses
      ).payload;
      return { ...state, parishionerProcesses };

    case actions.ParishionerProcessesActionTypes
      .SetSelectedParishionerProcesses:
      selectedIds = (action as actions.SetSelectedParishionerProcesses).payload;
      return { ...state, selectedIds };

    default:
      return state;
  }
}
