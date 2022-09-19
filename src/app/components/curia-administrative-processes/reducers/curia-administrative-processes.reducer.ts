import { Action } from '@ngrx/store';
import * as actions from './curia-administrative-processes.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaAdministrativeProcess,
  CuriaAdministrativeProcessResponse,
} from '../curia-administrative-process.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaAdministrativeProcesses: CuriaAdministrativeProcessResponse;
  curiaAdministrativeProcessesEntirely: CuriaAdministrativeProcessResponse;
  curiaMinistryAndOrder: CuriaAdministrativeProcess;
  selectedIds: CuriaAdministrativeProcess[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaAdministrativeProcesses: null,
  curiaAdministrativeProcessesEntirely: null,
  curiaMinistryAndOrder: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let curiaAdministrativeProcesses: any;
  let curiaAdministrativeProcessesEntirely: any;
  let curiaMinistryAndOrder: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestFailCuriaAdministrativeProcesses:
      const error = (action as actions.RequestFailCuriaAdministrativeProcesses)
        .payload;
      return { ...state, error };

    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestGetAllCuriaAdministrativeProcesses:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SuccessGetAllCuriaAdministrativeProcesses:
      curiaAdministrativeProcesses = (
        action as actions.SuccessGetAllCuriaAdministrativeProcesses
      ).payload;
      return { ...state, curiaAdministrativeProcesses };

    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestGetCuriaAdministrativeProcess:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SuccessGetCuriaAdministrativeProcess:
      curiaMinistryAndOrder = (
        action as actions.SuccessGetCuriaAdministrativeProcess
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestPostCuriaAdministrativeProcess:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SuccessPostCuriaAdministrativeProcess:
      curiaMinistryAndOrder = (
        action as actions.SuccessPostCuriaAdministrativeProcess
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestPutCuriaAdministrativeProcess:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SuccessPutCuriaAdministrativeProcess:
      curiaMinistryAndOrder = (
        action as actions.SuccessPutCuriaAdministrativeProcess
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestDeleteCuriaAdministrativeProcess:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SuccessDeleteCuriaAdministrativeProcess:
      curiaMinistryAndOrder = (
        action as actions.SuccessDeleteCuriaAdministrativeProcess
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    // case actions.CuriaAdministrativeProcessesActionTypes.RequestBulkDeleteCuriaAdministrativeProcesses:
    //   return { ...state, error: null };

    // case actions.CuriaAdministrativeProcessesActionTypes.SuccessBulkDeleteCuriaAdministrativeProcesses:
    //   curiaMinistryAndOrder = (action as actions.SuccessBulkDeleteCuriaAdministrativeProcesses).payload;
    //   return { ...state, curiaMinistryAndOrder };

    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestSendTestCuriaAdministrativeProcess:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SuccessSendTestCuriaAdministrativeProcess:
      curiaMinistryAndOrder = (
        action as actions.SuccessSendTestCuriaAdministrativeProcess
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SetSelectedCuriaAdministrativeProcesses:
      selectedIds = (action as actions.SetSelectedCuriaAdministrativeProcesses)
        .payload;
      return { ...state, selectedIds };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SetModalSelectCuriaAdministrativeProcess:
      modalRowSelect = (
        action as actions.SetModalSelectCuriaAdministrativeProcess
      ).payload;
      return { ...state, modalRowSelect };

    case actions.CuriaAdministrativeProcessesActionTypes
      .RequestGetEntirelyCuriaAdministrativeProcesses:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes
      .SuccessGetEntirelyCuriaAdministrativeProcesses:
      curiaAdministrativeProcessesEntirely = (
        action as actions.SuccessGetEntirelyCuriaAdministrativeProcesses
      ).payload;
      return { ...state, curiaAdministrativeProcessesEntirely };

    case actions.CuriaAdministrativeProcessesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessesActionTypes.SuccessGetNew:
      curiaMinistryAndOrder = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaAdministrativeProcessesActionTypes.ClearGet:
      return { ...state, curiaMinistryAndOrder: null };

    default:
      return state;
  }
}
