import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { Archpristship, ArchpristshipResponse } from '../archpristship.model';

export enum ArchpristshipsActionTypes {
  RequestFail = '[Archpristships] Request Fail',
  RequestGetAll = '[Archpristships] Request Get All',
  SuccessGetAll = '[Archpristships] Success Get All',
  RequestGet = '[Archpristships] Request Get',
  SuccessGet = '[Archpristships] Success Get',
  RequestPost = '[Archpristships] Request Post',
  SuccessPost = '[Archpristships] Success Post',
  RequestPut = '[Archpristships] Request Put',
  SuccessPut = '[Archpristships] Success Put',
  RequestDelete = '[Archpristships] Request Delete',
  SuccessDelete = '[Archpristships] Success Delete',
  RequestBulkDelete = '[Archpristships] Request Bulk Delete',
  SuccessBulkDelete = '[Archpristships] Success Bulk Delete',
  SetSelected = '[Archpristships] Set Selected',
  RequestGetEntirelyArchpristships = '[Archpristships] Request Get Entirely',
  SuccessGetEntirelyArchpristships = '[Archpristships] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ArchpristshipsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ArchpristshipsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessGetAll;
  constructor(public payload: ArchpristshipResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = ArchpristshipsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessGet;
  constructor(public payload: Archpristship) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = ArchpristshipsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = ArchpristshipsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = ArchpristshipsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = ArchpristshipsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = ArchpristshipsActionTypes.SetSelected;
  constructor(public payload?: Archpristship[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyArchpristships implements Action {
  readonly type = ArchpristshipsActionTypes.RequestGetEntirelyArchpristships;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyArchpristships implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessGetEntirelyArchpristships;
  constructor(public payload: ArchpristshipResponse) {}
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
  | RequestGetEntirelyArchpristships
  | SuccessGetEntirelyArchpristships;
