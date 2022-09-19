import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { EntityReader } from '../../mecs/mecs.model';
import { ReaderResponse } from '../readers.model';

export enum ReadersActionTypes {
  RequestFail = '[Readers] Request Fail',
  RequestGetAll = '[Readers] Request Get All',
  SuccessGetAll = '[Readers] Success Get All',
  RequestGet = '[Readers] Request Get',
  SuccessGet = '[Readers] Success Get',
  RequestPost = '[Readers] Request Post',
  SuccessPost = '[Readers] Success Post',
  RequestPut = '[Readers] Request Put',
  SuccessPut = '[Readers] Success Put',
  RequestDelete = '[Readers] Request Delete',
  SuccessDelete = '[Readers] Success Delete',
  RequestBulkDelete = '[Readers] Request Bulk Delete',
  SuccessBulkDelete = '[Readers] Success Bulk Delete',
  SetSelected = '[Readers] Set Selected',
  RequestGetEntirelyReaders = '[Readers] Request Get Entirely',
  SuccessGetEntirelyReaders = '[Readers] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ReadersActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ReadersActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ReadersActionTypes.SuccessGetAll;
  constructor(public payload: ReaderResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = ReadersActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = ReadersActionTypes.SuccessGet;
  constructor(public payload: EntityReader) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = ReadersActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = ReadersActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = ReadersActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = ReadersActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = ReadersActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = ReadersActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = ReadersActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = ReadersActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = ReadersActionTypes.SetSelected;
  constructor(public payload?: EntityReader[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyReaders implements Action {
  readonly type = ReadersActionTypes.RequestGetEntirelyReaders;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyReaders implements Action {
  readonly type = ReadersActionTypes.SuccessGetEntirelyReaders;
  constructor(public payload: ReaderResponse) {}
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
  | RequestGetEntirelyReaders
  | SuccessGetEntirelyReaders;
