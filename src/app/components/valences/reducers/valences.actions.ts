import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ValenceResponse, Valence } from '../valence.model';

export enum ValencesActionTypes {
  RequestFailValences = '[Valences] Request Fail',
  RequestGetAllValences = '[Valences] Request Get All',
  SuccessGetAllValences = '[Valences] Success Get All',
  RequestGetValence = '[Valences] Request Get',
  SuccessGetValence = '[Valences] Success Get',
  RequestPostValence = '[Valences] Request Post',
  SuccessPostValence = '[Valences] Success Post',
  RequestPutValence = '[Valences] Request Put',
  SuccessPutValence = '[Valences] Success Put',
  RequestDeleteValence = '[Valences] Request Delete',
  SuccessDeleteValence = '[Valences] Success Delete',
  // RequestBulkDeleteValences = '[Valences] Request Bulk Delete',
  // SuccessBulkDeleteValences = '[Valences] Success Bulk Delete',
  SetSelectedValences = '[Valences] Set Selected',
  RequestGetEntirelyValences = '[Valences] Request Get Entirely',
  SuccessGetEntirelyValences = '[Valences] Success Get Entirely',
  RequestGetNewValence = '[Valences] Request Get New',
  SuccessGetNewValence = '[Valences] Success Get New',
}

@RequestStatus('error')
export class RequestFailValences implements Action {
  readonly type = ValencesActionTypes.RequestFailValences;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllValences implements Action {
  readonly type = ValencesActionTypes.RequestGetAllValences;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllValences implements Action {
  readonly type = ValencesActionTypes.SuccessGetAllValences;
  constructor(public payload: ValenceResponse) {}
}

@RequestStatus('pending')
export class RequestGetValence implements Action {
  readonly type = ValencesActionTypes.RequestGetValence;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetValence implements Action {
  readonly type = ValencesActionTypes.SuccessGetValence;
  constructor(public payload: Valence) {}
}

@RequestStatus('pending')
export class RequestPostValence implements Action {
  readonly type = ValencesActionTypes.RequestPostValence;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostValence implements Action {
  readonly type = ValencesActionTypes.SuccessPostValence;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutValence implements Action {
  readonly type = ValencesActionTypes.RequestPutValence;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutValence implements Action {
  readonly type = ValencesActionTypes.SuccessPutValence;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteValence implements Action {
  readonly type = ValencesActionTypes.RequestDeleteValence;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteValence implements Action {
  readonly type = ValencesActionTypes.SuccessDeleteValence;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteValences implements Action {
//   readonly type = ValencesActionTypes.RequestBulkDeleteValences;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteValences implements Action {
//   readonly type = ValencesActionTypes.SuccessBulkDeleteValences;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedValences implements Action {
  readonly type = ValencesActionTypes.SetSelectedValences;
  constructor(public payload?: Valence[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyValences implements Action {
  readonly type = ValencesActionTypes.RequestGetEntirelyValences;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyValences implements Action {
  readonly type = ValencesActionTypes.SuccessGetEntirelyValences;
  constructor(public payload: ValenceResponse) {}
}

@RequestStatus('pending')
export class RequestGetNewValence implements Action {
  readonly type = ValencesActionTypes.RequestGetNewValence;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNewValence implements Action {
  readonly type = ValencesActionTypes.SuccessGetNewValence;
  constructor(public payload: Valence) {}
}

export type StatisticsActions =
  | RequestFailValences
  | RequestGetAllValences
  | SuccessGetAllValences
  | RequestGetValence
  | SuccessGetValence
  | RequestPostValence
  | SuccessPostValence
  | RequestPutValence
  | SuccessPutValence
  | RequestDeleteValence
  | SuccessDeleteValence
  // | RequestBulkDeleteValences
  // | SuccessBulkDeleteValences
  | SetSelectedValences
  | RequestGetEntirelyValences
  | SuccessGetEntirelyValences
  | RequestGetNewValence
  | SuccessGetNewValence;
