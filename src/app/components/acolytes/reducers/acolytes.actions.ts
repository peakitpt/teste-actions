import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { EntityAcolyte } from '../../mecs/mecs.model';
import { AcolyteResponse } from '../acolytes.model';

export enum AcolytesActionTypes {
  RequestFail = '[Acolytes] Request Fail',
  RequestGetAll = '[Acolytes] Request Get All',
  SuccessGetAll = '[Acolytes] Success Get All',
  RequestGet = '[Acolytes] Request Get',
  SuccessGet = '[Acolytes] Success Get',
  RequestPost = '[Acolytes] Request Post',
  SuccessPost = '[Acolytes] Success Post',
  RequestPut = '[Acolytes] Request Put',
  SuccessPut = '[Acolytes] Success Put',
  RequestDelete = '[Acolytes] Request Delete',
  SuccessDelete = '[Acolytes] Success Delete',
  RequestBulkDelete = '[Acolytes] Request Bulk Delete',
  SuccessBulkDelete = '[Acolytes] Success Bulk Delete',
  SetSelected = '[Acolytes] Set Selected',
  RequestGetEntirelyAcolytes = '[Acolytes] Request Get Entirely',
  SuccessGetEntirelyAcolytes = '[Acolytes] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AcolytesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AcolytesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AcolytesActionTypes.SuccessGetAll;
  constructor(public payload: AcolyteResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AcolytesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AcolytesActionTypes.SuccessGet;
  constructor(public payload: EntityAcolyte) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AcolytesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AcolytesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AcolytesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AcolytesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AcolytesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AcolytesActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = AcolytesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = AcolytesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AcolytesActionTypes.SetSelected;
  constructor(public payload?: EntityAcolyte[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyAcolytes implements Action {
  readonly type = AcolytesActionTypes.RequestGetEntirelyAcolytes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyAcolytes implements Action {
  readonly type = AcolytesActionTypes.SuccessGetEntirelyAcolytes;
  constructor(public payload: AcolyteResponse) {}
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
  | RequestGetEntirelyAcolytes
  | SuccessGetEntirelyAcolytes;
