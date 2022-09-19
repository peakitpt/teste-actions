import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaAdministrativeProcessResponse,
  CuriaAdministrativeProcess,
} from '../curia-administrative-process.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { DocumentsActionTypes } from '../../documents/reducers/documents.actions';

export enum CuriaAdministrativeProcessesActionTypes {
  RequestFailCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Request Fail',
  RequestGetAllCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Request Get All',
  SuccessGetAllCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Success Get All',
  RequestGetCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Request Get',
  SuccessGetCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Success Get',
  RequestPostCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Request Post',
  SuccessPostCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Success Post',
  RequestPutCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Request Put',
  SuccessPutCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Success Put',
  RequestDeleteCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Request Delete',
  SuccessDeleteCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Success Delete',
  // RequestBulkDeleteCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Request Bulk Delete',
  // SuccessBulkDeleteCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Success Bulk Delete',
  RequestSendTestCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Request Send Test',
  SuccessSendTestCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Success Send Test',
  SetSelectedCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Set Selected',
  SetModalSelectCuriaAdministrativeProcess = '[CuriaAdministrativeProcesses] Set Modal Select CuriaAdministrativeProcess',
  RequestGetEntirelyCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Request Get Entirely',
  SuccessGetEntirelyCuriaAdministrativeProcesses = '[CuriaAdministrativeProcesses] Success Get Entirely',
  RequestGetNew = '[CuriaAdministrativeProcesses] Request Get New',
  SuccessGetNew = '[CuriaAdministrativeProcesses] Success Get New',
  ClearGet = '[CuriaAdministrativeProcesses] Clear Get',
}

@RequestStatus('error')
export class RequestFailCuriaAdministrativeProcesses implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestFailCuriaAdministrativeProcesses;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCuriaAdministrativeProcesses implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestGetAllCuriaAdministrativeProcesses;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCuriaAdministrativeProcesses implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SuccessGetAllCuriaAdministrativeProcesses;
  constructor(public payload: CuriaAdministrativeProcessResponse) {}
}

@RequestStatus('pending')
export class RequestGetCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestGetCuriaAdministrativeProcess;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SuccessGetCuriaAdministrativeProcess;
  constructor(public payload: CuriaAdministrativeProcess) {}
}

@RequestStatus('pending')
export class RequestPostCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestPostCuriaAdministrativeProcess;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SuccessPostCuriaAdministrativeProcess;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestPutCuriaAdministrativeProcess;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SuccessPutCuriaAdministrativeProcess;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestDeleteCuriaAdministrativeProcess;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SuccessDeleteCuriaAdministrativeProcess;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCuriaAdministrativeProcesses implements Action {
//   readonly type = CuriaAdministrativeProcessesActionTypes.RequestBulkDeleteCuriaAdministrativeProcesses;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCuriaAdministrativeProcesses implements Action {
//   readonly type = CuriaAdministrativeProcessesActionTypes.SuccessBulkDeleteCuriaAdministrativeProcesses;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestSendTestCuriaAdministrativeProcess;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SuccessSendTestCuriaAdministrativeProcess;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedCuriaAdministrativeProcesses implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SetSelectedCuriaAdministrativeProcesses;
  constructor(public payload?: CuriaAdministrativeProcess[]) {}
}

@RequestStatus('default')
export class SetModalSelectCuriaAdministrativeProcess implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SetModalSelectCuriaAdministrativeProcess;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCuriaAdministrativeProcesses implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.RequestGetEntirelyCuriaAdministrativeProcesses;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCuriaAdministrativeProcesses implements Action {
  readonly type =
    CuriaAdministrativeProcessesActionTypes.SuccessGetEntirelyCuriaAdministrativeProcesses;
  constructor(public payload: CuriaAdministrativeProcessResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaAdministrativeProcessesActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaAdministrativeProcessesActionTypes.SuccessGetNew;
  constructor(public payload: CuriaAdministrativeProcess) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaAdministrativeProcessesActionTypes.ClearGet;
  constructor() {}
}

export type StatisticsActions =
  | RequestFailCuriaAdministrativeProcesses
  | RequestGetAllCuriaAdministrativeProcesses
  | SuccessGetAllCuriaAdministrativeProcesses
  | RequestGetCuriaAdministrativeProcess
  | SuccessGetCuriaAdministrativeProcess
  | RequestPostCuriaAdministrativeProcess
  | SuccessPostCuriaAdministrativeProcess
  | RequestPutCuriaAdministrativeProcess
  | SuccessPutCuriaAdministrativeProcess
  | RequestDeleteCuriaAdministrativeProcess
  | SuccessDeleteCuriaAdministrativeProcess
  // | RequestBulkDeleteCuriaAdministrativeProcesses
  // | SuccessBulkDeleteCuriaAdministrativeProcesses
  | RequestSendTestCuriaAdministrativeProcess
  | SuccessSendTestCuriaAdministrativeProcess
  | SetSelectedCuriaAdministrativeProcesses
  | SetModalSelectCuriaAdministrativeProcess
  | RequestGetEntirelyCuriaAdministrativeProcesses
  | SuccessGetEntirelyCuriaAdministrativeProcesses
  | RequestGetNew
  | SuccessGetNew
  | ClearGet;
