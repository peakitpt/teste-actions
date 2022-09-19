import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaEconomicCouncilResponse,
  CuriaEconomicCouncil,
} from '../curia-economic-council.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { DocumentsActionTypes } from '../../documents/reducers/documents.actions';

export enum CuriaEconomicCouncilsActionTypes {
  RequestFailCuriaEconomicCouncils = '[CuriaEconomicCouncils] Request Fail',
  RequestGetAllCuriaEconomicCouncils = '[CuriaEconomicCouncils] Request Get All',
  SuccessGetAllCuriaEconomicCouncils = '[CuriaEconomicCouncils] Success Get All',
  RequestGetCuriaEconomicCouncil = '[CuriaEconomicCouncils] Request Get',
  SuccessGetCuriaEconomicCouncil = '[CuriaEconomicCouncils] Success Get',
  RequestPostCuriaEconomicCouncil = '[CuriaEconomicCouncils] Request Post',
  SuccessPostCuriaEconomicCouncil = '[CuriaEconomicCouncils] Success Post',
  RequestPutCuriaEconomicCouncil = '[CuriaEconomicCouncils] Request Put',
  SuccessPutCuriaEconomicCouncil = '[CuriaEconomicCouncils] Success Put',
  RequestDeleteCuriaEconomicCouncil = '[CuriaEconomicCouncils] Request Delete',
  SuccessDeleteCuriaEconomicCouncil = '[CuriaEconomicCouncils] Success Delete',
  // RequestBulkDeleteCuriaEconomicCouncils = '[CuriaEconomicCouncils] Request Bulk Delete',
  // SuccessBulkDeleteCuriaEconomicCouncils = '[CuriaEconomicCouncils] Success Bulk Delete',
  RequestSendTestCuriaEconomicCouncil = '[CuriaEconomicCouncils] Request Send Test',
  SuccessSendTestCuriaEconomicCouncil = '[CuriaEconomicCouncils] Success Send Test',
  SetSelectedCuriaEconomicCouncils = '[CuriaEconomicCouncils] Set Selected',
  SetModalSelectCuriaEconomicCouncil = '[CuriaEconomicCouncils] Set Modal Select CuriaEconomicCouncil',
  RequestGetEntirelyCuriaEconomicCouncils = '[CuriaEconomicCouncils] Request Get Entirely',
  SuccessGetEntirelyCuriaEconomicCouncils = '[CuriaEconomicCouncils] Success Get Entirely',
  RequestGetNew = '[CuriaEconomicCouncils] Request Get New',
  SuccessGetNew = '[CuriaEconomicCouncils] Success Get New',
  ClearGet = '[CuriaEconomicCouncils] Request Clear Get',
  RequestGetNewCMODocument = '[CuriaEconomicCouncils] Request Get New Curia Secretariats and Orders Document',
}

@RequestStatus('error')
export class RequestFailCuriaEconomicCouncils implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestFailCuriaEconomicCouncils;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCuriaEconomicCouncils implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestGetAllCuriaEconomicCouncils;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCuriaEconomicCouncils implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SuccessGetAllCuriaEconomicCouncils;
  constructor(public payload: CuriaEconomicCouncilResponse) {}
}

@RequestStatus('pending')
export class RequestGetCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestGetCuriaEconomicCouncil;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SuccessGetCuriaEconomicCouncil;
  constructor(public payload: CuriaEconomicCouncil) {}
}

@RequestStatus('pending')
export class RequestPostCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestPostCuriaEconomicCouncil;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SuccessPostCuriaEconomicCouncil;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestPutCuriaEconomicCouncil;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SuccessPutCuriaEconomicCouncil;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestDeleteCuriaEconomicCouncil;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SuccessDeleteCuriaEconomicCouncil;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCuriaEconomicCouncils implements Action {
//   readonly type = CuriaEconomicCouncilsActionTypes.RequestBulkDeleteCuriaEconomicCouncils;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCuriaEconomicCouncils implements Action {
//   readonly type = CuriaEconomicCouncilsActionTypes.SuccessBulkDeleteCuriaEconomicCouncils;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestSendTestCuriaEconomicCouncil;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SuccessSendTestCuriaEconomicCouncil;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedCuriaEconomicCouncils implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SetSelectedCuriaEconomicCouncils;
  constructor(public payload?: CuriaEconomicCouncil[]) {}
}

@RequestStatus('default')
export class SetModalSelectCuriaEconomicCouncil implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SetModalSelectCuriaEconomicCouncil;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCuriaEconomicCouncils implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.RequestGetEntirelyCuriaEconomicCouncils;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCuriaEconomicCouncils implements Action {
  readonly type =
    CuriaEconomicCouncilsActionTypes.SuccessGetEntirelyCuriaEconomicCouncils;
  constructor(public payload: CuriaEconomicCouncilResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaEconomicCouncilsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaEconomicCouncilsActionTypes.SuccessGetNew;
  constructor(public payload: CuriaEconomicCouncil) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaEconomicCouncilsActionTypes.ClearGet;
  constructor() {}
}

export type StatisticsActions =
  | RequestFailCuriaEconomicCouncils
  | RequestGetAllCuriaEconomicCouncils
  | SuccessGetAllCuriaEconomicCouncils
  | RequestGetCuriaEconomicCouncil
  | SuccessGetCuriaEconomicCouncil
  | RequestPostCuriaEconomicCouncil
  | SuccessPostCuriaEconomicCouncil
  | RequestPutCuriaEconomicCouncil
  | SuccessPutCuriaEconomicCouncil
  | RequestDeleteCuriaEconomicCouncil
  | SuccessDeleteCuriaEconomicCouncil
  // | RequestBulkDeleteCuriaEconomicCouncils
  // | SuccessBulkDeleteCuriaEconomicCouncils
  | RequestSendTestCuriaEconomicCouncil
  | SuccessSendTestCuriaEconomicCouncil
  | SetSelectedCuriaEconomicCouncils
  | SetModalSelectCuriaEconomicCouncil
  | RequestGetEntirelyCuriaEconomicCouncils
  | SuccessGetEntirelyCuriaEconomicCouncils
  | RequestGetNew
  | SuccessGetNew
  | ClearGet;
