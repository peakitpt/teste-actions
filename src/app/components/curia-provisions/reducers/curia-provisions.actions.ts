import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaProvisionResponse,
  CuriaProvision,
} from '../curia-provision.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { DocumentsActionTypes } from '../../documents/reducers/documents.actions';

export enum CuriaProvisionsActionTypes {
  RequestFailCuriaProvisions = '[CuriaProvisions] Request Fail',
  RequestGetAllCuriaProvisions = '[CuriaProvisions] Request Get All',
  SuccessGetAllCuriaProvisions = '[CuriaProvisions] Success Get All',
  RequestGetCuriaProvision = '[CuriaProvisions] Request Get',
  SuccessGetCuriaProvision = '[CuriaProvisions] Success Get',
  RequestPostCuriaProvision = '[CuriaProvisions] Request Post',
  SuccessPostCuriaProvision = '[CuriaProvisions] Success Post',
  RequestPutCuriaProvision = '[CuriaProvisions] Request Put',
  SuccessPutCuriaProvision = '[CuriaProvisions] Success Put',
  RequestDeleteCuriaProvision = '[CuriaProvisions] Request Delete',
  SuccessDeleteCuriaProvision = '[CuriaProvisions] Success Delete',
  // RequestBulkDeleteCuriaProvisions = '[CuriaProvisions] Request Bulk Delete',
  // SuccessBulkDeleteCuriaProvisions = '[CuriaProvisions] Success Bulk Delete',
  RequestSendTestCuriaProvision = '[CuriaProvisions] Request Send Test',
  SuccessSendTestCuriaProvision = '[CuriaProvisions] Success Send Test',
  SetSelectedCuriaProvisions = '[CuriaProvisions] Set Selected',
  SetModalSelectCuriaProvision = '[CuriaProvisions] Set Modal Select CuriaProvision',
  RequestGetEntirelyCuriaProvisions = '[CuriaProvisions] Request Get Entirely',
  SuccessGetEntirelyCuriaProvisions = '[CuriaProvisions] Success Get Entirely',
  RequestGetNew = '[CuriaProvisions] Request Get New',
  SuccessGetNew = '[CuriaProvisions] Success Get New',
  ClearGet = '[CuriaProvisions] Request Clear Get',
  RequestGetNewCMODocument = '[CuriaProvisions] Request Get New Curia Secretariats and Orders Document',
}

@RequestStatus('error')
export class RequestFailCuriaProvisions implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestFailCuriaProvisions;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCuriaProvisions implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestGetAllCuriaProvisions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCuriaProvisions implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessGetAllCuriaProvisions;
  constructor(public payload: CuriaProvisionResponse) {}
}

@RequestStatus('pending')
export class RequestGetCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestGetCuriaProvision;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessGetCuriaProvision;
  constructor(public payload: CuriaProvision) {}
}

@RequestStatus('pending')
export class RequestPostCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestPostCuriaProvision;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessPostCuriaProvision;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestPutCuriaProvision;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessPutCuriaProvision;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestDeleteCuriaProvision;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessDeleteCuriaProvision;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCuriaProvisions implements Action {
//   readonly type = CuriaProvisionsActionTypes.RequestBulkDeleteCuriaProvisions;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCuriaProvisions implements Action {
//   readonly type = CuriaProvisionsActionTypes.SuccessBulkDeleteCuriaProvisions;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestSendTestCuriaProvision;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessSendTestCuriaProvision;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedCuriaProvisions implements Action {
  readonly type = CuriaProvisionsActionTypes.SetSelectedCuriaProvisions;
  constructor(public payload?: CuriaProvision[]) {}
}

@RequestStatus('default')
export class SetModalSelectCuriaProvision implements Action {
  readonly type = CuriaProvisionsActionTypes.SetModalSelectCuriaProvision;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCuriaProvisions implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestGetEntirelyCuriaProvisions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCuriaProvisions implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessGetEntirelyCuriaProvisions;
  constructor(public payload: CuriaProvisionResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaProvisionsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaProvisionsActionTypes.SuccessGetNew;
  constructor(public payload: CuriaProvision) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaProvisionsActionTypes.ClearGet;
  constructor() {}
}

export type StatisticsActions =
  | RequestFailCuriaProvisions
  | RequestGetAllCuriaProvisions
  | SuccessGetAllCuriaProvisions
  | RequestGetCuriaProvision
  | SuccessGetCuriaProvision
  | RequestPostCuriaProvision
  | SuccessPostCuriaProvision
  | RequestPutCuriaProvision
  | SuccessPutCuriaProvision
  | RequestDeleteCuriaProvision
  | SuccessDeleteCuriaProvision
  // | RequestBulkDeleteCuriaProvisions
  // | SuccessBulkDeleteCuriaProvisions
  | RequestSendTestCuriaProvision
  | SuccessSendTestCuriaProvision
  | SetSelectedCuriaProvisions
  | SetModalSelectCuriaProvision
  | RequestGetEntirelyCuriaProvisions
  | SuccessGetEntirelyCuriaProvisions
  | RequestGetNew
  | SuccessGetNew
  | ClearGet;
