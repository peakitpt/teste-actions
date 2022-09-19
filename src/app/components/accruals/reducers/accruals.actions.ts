import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccrualResponse, Accrual } from '../accrual.model';

export enum AccrualsActionTypes {
  RequestFailAccruals = '[Accruals] Request Fail',
  RequestGetAllAccruals = '[Accruals] Request Get All',
  SuccessGetAllAccruals = '[Accruals] Success Get All',
  RequestGetAccrual = '[Accruals] Request Get',
  SuccessGetAccrual = '[Accruals] Success Get',
  RequestPostAccrual = '[Accruals] Request Post',
  SuccessPostAccrual = '[Accruals] Success Post',
  RequestPutAccrual = '[Accruals] Request Put',
  SuccessPutAccrual = '[Accruals] Success Put',
  RequestDeleteAccrual = '[Accruals] Request Delete',
  SuccessDeleteAccrual = '[Accruals] Success Delete',
  // RequestBulkDeleteAccruals = '[Accruals] Request Bulk Delete',
  // SuccessBulkDeleteAccruals = '[Accruals] Success Bulk Delete',
  SetSelectedAccruals = '[Accruals] Set Selected',
  RequestGetEntirelyAccruals = '[Accruals] Request Get Entirely',
  SuccessGetEntirelyAccruals = '[Accruals] Success Get Entirely',
  RequestGetNew = '[Accruals] Request Get New',
  SuccessGetNew = '[Accruals] Success Get New',
}

@RequestStatus('error')
export class RequestFailAccruals implements Action {
  readonly type = AccrualsActionTypes.RequestFailAccruals;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllAccruals implements Action {
  readonly type = AccrualsActionTypes.RequestGetAllAccruals;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllAccruals implements Action {
  readonly type = AccrualsActionTypes.SuccessGetAllAccruals;
  constructor(public payload: AccrualResponse) {}
}

@RequestStatus('pending')
export class RequestGetAccrual implements Action {
  readonly type = AccrualsActionTypes.RequestGetAccrual;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetAccrual implements Action {
  readonly type = AccrualsActionTypes.SuccessGetAccrual;
  constructor(public payload: Accrual) {}
}

@RequestStatus('pending')
export class RequestPostAccrual implements Action {
  readonly type = AccrualsActionTypes.RequestPostAccrual;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostAccrual implements Action {
  readonly type = AccrualsActionTypes.SuccessPostAccrual;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutAccrual implements Action {
  readonly type = AccrualsActionTypes.RequestPutAccrual;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutAccrual implements Action {
  readonly type = AccrualsActionTypes.SuccessPutAccrual;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteAccrual implements Action {
  readonly type = AccrualsActionTypes.RequestDeleteAccrual;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteAccrual implements Action {
  readonly type = AccrualsActionTypes.SuccessDeleteAccrual;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteAccruals implements Action {
//   readonly type = AccrualsActionTypes.RequestBulkDeleteAccruals;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteAccruals implements Action {
//   readonly type = AccrualsActionTypes.SuccessBulkDeleteAccruals;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedAccruals implements Action {
  readonly type = AccrualsActionTypes.SetSelectedAccruals;
  constructor(public payload?: Accrual[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyAccruals implements Action {
  readonly type = AccrualsActionTypes.RequestGetEntirelyAccruals;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyAccruals implements Action {
  readonly type = AccrualsActionTypes.SuccessGetEntirelyAccruals;
  constructor(public payload: AccrualResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccrualsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccrualsActionTypes.SuccessGetNew;
  constructor(public payload: Accrual) {}
}

export type StatisticsActions =
  | RequestFailAccruals
  | RequestGetAllAccruals
  | SuccessGetAllAccruals
  | RequestGetAccrual
  | SuccessGetAccrual
  | RequestPostAccrual
  | SuccessPostAccrual
  | RequestPutAccrual
  | SuccessPutAccrual
  | RequestDeleteAccrual
  | SuccessDeleteAccrual
  // | RequestBulkDeleteAccruals
  // | SuccessBulkDeleteAccruals
  | SetSelectedAccruals
  | RequestGetEntirelyAccruals
  | SuccessGetEntirelyAccruals
  | RequestGetNew
  | SuccessGetNew;
