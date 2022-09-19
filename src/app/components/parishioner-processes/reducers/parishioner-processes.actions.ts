import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ParishionerProcessResponse,
  ParishionerProcess,
} from '../parishioner-process.model';

export enum ParishionerProcessesActionTypes {
  RequestFailParishionerProcesses = '[ParishionerProcesses] Request Fail',
  RequestGetAllParishionerProcesses = '[ParishionerProcesses] Request Get All',
  SuccessGetAllParishionerProcesses = '[ParishionerProcesses] Success Get All',
  SetSelectedParishionerProcesses = '[ParishionerProcesses] Set Selected',
}

@RequestStatus('error')
export class RequestFailParishionerProcesses implements Action {
  readonly type =
    ParishionerProcessesActionTypes.RequestFailParishionerProcesses;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllParishionerProcesses implements Action {
  readonly type =
    ParishionerProcessesActionTypes.RequestGetAllParishionerProcesses;
  constructor(public id: number, public payload: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllParishionerProcesses implements Action {
  readonly type =
    ParishionerProcessesActionTypes.SuccessGetAllParishionerProcesses;
  constructor(public payload: ParishionerProcessResponse) {}
}

@RequestStatus('default')
export class SetSelectedParishionerProcesses implements Action {
  readonly type =
    ParishionerProcessesActionTypes.SetSelectedParishionerProcesses;
  constructor(public payload?: ParishionerProcess[]) {}
}

export type StatisticsActions =
  | RequestFailParishionerProcesses
  | RequestGetAllParishionerProcesses
  | SuccessGetAllParishionerProcesses
  | SetSelectedParishionerProcesses;
