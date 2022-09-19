import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NumerationResponse, Numeration } from '../numeration.model';

export enum NumerationsActionTypes {
  RequestFailNumerations = '[Numerations] Request Fail',
  RequestGetAllNumerations = '[Numerations] Request Get All',
  SuccessGetAllNumerations = '[Numerations] Success Get All',
  RequestGetNumeration = '[Numerations] Request Get',
  SuccessGetNumeration = '[Numerations] Success Get',
  RequestPostNumeration = '[Numerations] Request Post',
  SuccessPostNumeration = '[Numerations] Success Post',
  RequestPutNumeration = '[Numerations] Request Put',
  SuccessPutNumeration = '[Numerations] Success Put',
  RequestDeleteNumeration = '[Numerations] Request Delete',
  SuccessDeleteNumeration = '[Numerations] Success Delete',
  // RequestBulkDeleteNumerations = '[Numerations] Request Bulk Delete',
  // SuccessBulkDeleteNumerations = '[Numerations] Success Bulk Delete',
  SetSelectedNumerations = '[Numerations] Set Selected',
  RequestGetEntirelyNumerations = '[Numerations] Request Get Entirely',
  SuccessGetEntirelyNumerations = '[Numerations] Success Get Entirely',
  RequestGetNewNumeration = '[Numerations] Request Get New',
  SuccessGetNewNumeration = '[Numerations] Success Get New',
}

@RequestStatus('error')
export class RequestFailNumerations implements Action {
  readonly type = NumerationsActionTypes.RequestFailNumerations;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllNumerations implements Action {
  readonly type = NumerationsActionTypes.RequestGetAllNumerations;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllNumerations implements Action {
  readonly type = NumerationsActionTypes.SuccessGetAllNumerations;
  constructor(public payload: NumerationResponse) {}
}

@RequestStatus('pending')
export class RequestGetNumeration implements Action {
  readonly type = NumerationsActionTypes.RequestGetNumeration;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNumeration implements Action {
  readonly type = NumerationsActionTypes.SuccessGetNumeration;
  constructor(public payload: Numeration) {}
}

@RequestStatus('pending')
export class RequestPostNumeration implements Action {
  readonly type = NumerationsActionTypes.RequestPostNumeration;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostNumeration implements Action {
  readonly type = NumerationsActionTypes.SuccessPostNumeration;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutNumeration implements Action {
  readonly type = NumerationsActionTypes.RequestPutNumeration;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutNumeration implements Action {
  readonly type = NumerationsActionTypes.SuccessPutNumeration;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteNumeration implements Action {
  readonly type = NumerationsActionTypes.RequestDeleteNumeration;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteNumeration implements Action {
  readonly type = NumerationsActionTypes.SuccessDeleteNumeration;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteNumerations implements Action {
//   readonly type = NumerationsActionTypes.RequestBulkDeleteNumerations;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteNumerations implements Action {
//   readonly type = NumerationsActionTypes.SuccessBulkDeleteNumerations;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedNumerations implements Action {
  readonly type = NumerationsActionTypes.SetSelectedNumerations;
  constructor(public payload?: Numeration[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyNumerations implements Action {
  readonly type = NumerationsActionTypes.RequestGetEntirelyNumerations;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyNumerations implements Action {
  readonly type = NumerationsActionTypes.SuccessGetEntirelyNumerations;
  constructor(public payload: NumerationResponse) {}
}

@RequestStatus('pending')
export class RequestGetNewNumeration implements Action {
  readonly type = NumerationsActionTypes.RequestGetNewNumeration;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNewNumeration implements Action {
  readonly type = NumerationsActionTypes.SuccessGetNewNumeration;
  constructor(public payload: Numeration) {}
}

export type StatisticsActions =
  | RequestFailNumerations
  | RequestGetAllNumerations
  | SuccessGetAllNumerations
  | RequestGetNumeration
  | SuccessGetNumeration
  | RequestPostNumeration
  | SuccessPostNumeration
  | RequestPutNumeration
  | SuccessPutNumeration
  | RequestDeleteNumeration
  | SuccessDeleteNumeration
  // | RequestBulkDeleteNumerations
  // | SuccessBulkDeleteNumerations
  | SetSelectedNumerations
  | RequestGetEntirelyNumerations
  | SuccessGetEntirelyNumerations
  | RequestGetNewNumeration
  | SuccessGetNewNumeration;
