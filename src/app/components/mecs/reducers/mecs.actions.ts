import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { EntityMec, MECResponse } from '../mecs.model';

export enum MecsActionTypes {
  RequestFail = '[Mecs] Request Fail',
  RequestGetAll = '[Mecs] Request Get All',
  SuccessGetAll = '[Mecs] Success Get All',
  RequestGet = '[Mecs] Request Get',
  SuccessGet = '[Mecs] Success Get',
  RequestPost = '[Mecs] Request Post',
  SuccessPost = '[Mecs] Success Post',
  RequestPut = '[Mecs] Request Put',
  SuccessPut = '[Mecs] Success Put',
  RequestDelete = '[Mecs] Request Delete',
  SuccessDelete = '[Mecs] Success Delete',
  RequestBulkDelete = '[Mecs] Request Bulk Delete',
  SuccessBulkDelete = '[Mecs] Success Bulk Delete',
  SetSelected = '[Mecs] Set Selected',
  RequestGetEntirelyMecs = '[Mecs] Request Get Entirely',
  SuccessGetEntirelyMecs = '[Mecs] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = MecsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = MecsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = MecsActionTypes.SuccessGetAll;
  constructor(public payload: MECResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = MecsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = MecsActionTypes.SuccessGet;
  constructor(public payload: EntityMec) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = MecsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = MecsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = MecsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = MecsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = MecsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = MecsActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = MecsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = MecsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = MecsActionTypes.SetSelected;
  constructor(public payload?: EntityMec[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyMecs implements Action {
  readonly type = MecsActionTypes.RequestGetEntirelyMecs;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyMecs implements Action {
  readonly type = MecsActionTypes.SuccessGetEntirelyMecs;
  constructor(public payload: MECResponse) {}
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
  | RequestGetEntirelyMecs
  | SuccessGetEntirelyMecs;
