import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EmolumentResponse, Emolument } from '../emolument.model';

export enum EmolumentsActionTypes {
  RequestFailEmoluments = '[Emoluments] Request Fail',
  RequestGetAllEmoluments = '[Emoluments] Request Get All',
  SuccessGetAllEmoluments = '[Emoluments] Success Get All',
  RequestGetEmolument = '[Emoluments] Request Get',
  SuccessGetEmolument = '[Emoluments] Success Get',
  RequestPostEmolument = '[Emoluments] Request Post',
  SuccessPostEmolument = '[Emoluments] Success Post',
  RequestPutEmolument = '[Emoluments] Request Put',
  SuccessPutEmolument = '[Emoluments] Success Put',
  RequestDeleteEmolument = '[Emoluments] Request Delete',
  SuccessDeleteEmolument = '[Emoluments] Success Delete',
  // RequestBulkDeleteEmoluments = '[Emoluments] Request Bulk Delete',
  // SuccessBulkDeleteEmoluments = '[Emoluments] Success Bulk Delete',
  SetSelectedEmoluments = '[Emoluments] Set Selected',
  RequestGetEntirelyEmoluments = '[Emoluments] Request Get Entirely',
  SuccessGetEntirelyEmoluments = '[Emoluments] Success Get Entirely',
  RequestGetNew = '[Emoluments] Request Get New',
  SuccessGetNew = '[Emoluments] Success Get New',
}

@RequestStatus('error')
export class RequestFailEmoluments implements Action {
  readonly type = EmolumentsActionTypes.RequestFailEmoluments;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllEmoluments implements Action {
  readonly type = EmolumentsActionTypes.RequestGetAllEmoluments;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllEmoluments implements Action {
  readonly type = EmolumentsActionTypes.SuccessGetAllEmoluments;
  constructor(public payload: EmolumentResponse) {}
}

@RequestStatus('pending')
export class RequestGetEmolument implements Action {
  readonly type = EmolumentsActionTypes.RequestGetEmolument;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetEmolument implements Action {
  readonly type = EmolumentsActionTypes.SuccessGetEmolument;
  constructor(public payload: Emolument) {}
}

@RequestStatus('pending')
export class RequestPostEmolument implements Action {
  readonly type = EmolumentsActionTypes.RequestPostEmolument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostEmolument implements Action {
  readonly type = EmolumentsActionTypes.SuccessPostEmolument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutEmolument implements Action {
  readonly type = EmolumentsActionTypes.RequestPutEmolument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutEmolument implements Action {
  readonly type = EmolumentsActionTypes.SuccessPutEmolument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteEmolument implements Action {
  readonly type = EmolumentsActionTypes.RequestDeleteEmolument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteEmolument implements Action {
  readonly type = EmolumentsActionTypes.SuccessDeleteEmolument;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteEmoluments implements Action {
//   readonly type = EmolumentsActionTypes.RequestBulkDeleteEmoluments;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteEmoluments implements Action {
//   readonly type = EmolumentsActionTypes.SuccessBulkDeleteEmoluments;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedEmoluments implements Action {
  readonly type = EmolumentsActionTypes.SetSelectedEmoluments;
  constructor(public payload?: Emolument[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyEmoluments implements Action {
  readonly type = EmolumentsActionTypes.RequestGetEntirelyEmoluments;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyEmoluments implements Action {
  readonly type = EmolumentsActionTypes.SuccessGetEntirelyEmoluments;
  constructor(public payload: EmolumentResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = EmolumentsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = EmolumentsActionTypes.SuccessGetNew;
  constructor(public payload: Emolument) {}
}

export type StatisticsActions =
  | RequestFailEmoluments
  | RequestGetAllEmoluments
  | SuccessGetAllEmoluments
  | RequestGetEmolument
  | SuccessGetEmolument
  | RequestPostEmolument
  | SuccessPostEmolument
  | RequestPutEmolument
  | SuccessPutEmolument
  | RequestDeleteEmolument
  | SuccessDeleteEmolument
  // | RequestBulkDeleteEmoluments
  // | SuccessBulkDeleteEmoluments
  | SetSelectedEmoluments
  | RequestGetEntirelyEmoluments
  | SuccessGetEntirelyEmoluments
  | RequestGetNew
  | SuccessGetNew;
