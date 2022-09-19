import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { Patron, PatronResponse } from '../patrons.model';

export enum PatronsActionTypes {
  RequestFail = '[Patrons] Request Fail',
  RequestGetAll = '[Patrons] Request Get All',
  SuccessGetAll = '[Patrons] Success Get All',
  RequestGet = '[Patrons] Request Get',
  SuccessGet = '[Patrons] Success Get',
  RequestPost = '[Patrons] Request Post',
  SuccessPost = '[Patrons] Success Post',
  RequestPut = '[Patrons] Request Put',
  SuccessPut = '[Patrons] Success Put',
  RequestDelete = '[Patrons] Request Delete',
  SuccessDelete = '[Patrons] Success Delete',
  RequestBulkDelete = '[Patrons] Request Bulk Delete',
  SuccessBulkDelete = '[Patrons] Success Bulk Delete',
  SetSelected = '[Patrons] Set Selected',
  RequestGetEntirelyPatrons = '[Patrons] Request Get Entirely',
  SuccessGetEntirelyPatrons = '[Patrons] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PatronsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PatronsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PatronsActionTypes.SuccessGetAll;
  constructor(public payload: PatronResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = PatronsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = PatronsActionTypes.SuccessGet;
  constructor(public payload: Patron) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = PatronsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = PatronsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = PatronsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = PatronsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = PatronsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = PatronsActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = PatronsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = PatronsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = PatronsActionTypes.SetSelected;
  constructor(public payload?: Patron[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyPatrons implements Action {
  readonly type = PatronsActionTypes.RequestGetEntirelyPatrons;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyPatrons implements Action {
  readonly type = PatronsActionTypes.SuccessGetEntirelyPatrons;
  constructor(public payload: PatronResponse) {}
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
  | RequestGetEntirelyPatrons
  | SuccessGetEntirelyPatrons;
