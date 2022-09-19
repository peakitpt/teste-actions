import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { Bishopric, BishopricResponse } from '../bishopric.model';

export enum BishopricsActionTypes {
  RequestFail = '[Bishoprics] Request Fail',
  RequestGetAll = '[Bishoprics] Request Get All',
  SuccessGetAll = '[Bishoprics] Success Get All',
  RequestGet = '[Bishoprics] Request Get',
  SuccessGet = '[Bishoprics] Success Get',
  RequestPost = '[Bishoprics] Request Post',
  SuccessPost = '[Bishoprics] Success Post',
  RequestPut = '[Bishoprics] Request Put',
  SuccessPut = '[Bishoprics] Success Put',
  RequestDelete = '[Bishoprics] Request Delete',
  SuccessDelete = '[Bishoprics] Success Delete',
  RequestBulkDelete = '[Bishoprics] Request Bulk Delete',
  SuccessBulkDelete = '[Bishoprics] Success Bulk Delete',
  SetSelected = '[Bishoprics] Set Selected',
  RequestGetEntirelyBishoprics = '[Bishoprics] Request Get Entirely',
  SuccessGetEntirelyBishoprics = '[Bishoprics] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = BishopricsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = BishopricsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = BishopricsActionTypes.SuccessGetAll;
  constructor(public payload: BishopricResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = BishopricsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = BishopricsActionTypes.SuccessGet;
  constructor(public payload: Bishopric) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = BishopricsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = BishopricsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = BishopricsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = BishopricsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = BishopricsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = BishopricsActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = BishopricsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = BishopricsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = BishopricsActionTypes.SetSelected;
  constructor(public payload?: Bishopric[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyBishoprics implements Action {
  readonly type = BishopricsActionTypes.RequestGetEntirelyBishoprics;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyBishoprics implements Action {
  readonly type = BishopricsActionTypes.SuccessGetEntirelyBishoprics;
  constructor(public payload: BishopricResponse) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestGet
  | SuccessGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirelyBishoprics
  | SuccessGetEntirelyBishoprics;
