import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { Worshipplace, WorshipplaceResponse } from '../worshipplace.model';

export enum WorshipplacesActionTypes {
  RequestFail = '[Worshipplaces] Request Fail',
  RequestGetAll = '[Worshipplaces] Request Get All',
  SuccessGetAll = '[Worshipplaces] Success Get All',
  RequestGet = '[Worshipplaces] Request Get',
  SuccessGet = '[Worshipplaces] Success Get',
  RequestPost = '[Worshipplaces] Request Post',
  SuccessPost = '[Worshipplaces] Success Post',
  RequestPut = '[Worshipplaces] Request Put',
  SuccessPut = '[Worshipplaces] Success Put',
  RequestDelete = '[Worshipplaces] Request Delete',
  SuccessDelete = '[Worshipplaces] Success Delete',
  RequestBulkDelete = '[Worshipplaces] Request Bulk Delete',
  SuccessBulkDelete = '[Worshipplaces] Success Bulk Delete',
  SetSelected = '[Worshipplaces] Set Selected',
  RequestGetEntirelyWorshipplaces = '[Worshipplaces] Request Get Entirely',
  SuccessGetEntirelyWorshipplaces = '[Worshipplaces] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = WorshipplacesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = WorshipplacesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = WorshipplacesActionTypes.SuccessGetAll;
  constructor(public payload: WorshipplaceResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = WorshipplacesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = WorshipplacesActionTypes.SuccessGet;
  constructor(public payload: Worshipplace) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = WorshipplacesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = WorshipplacesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = WorshipplacesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = WorshipplacesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = WorshipplacesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = WorshipplacesActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = WorshipplacesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = WorshipplacesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = WorshipplacesActionTypes.SetSelected;
  constructor(public payload?: Worshipplace[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyWorshipplaces implements Action {
  readonly type = WorshipplacesActionTypes.RequestGetEntirelyWorshipplaces;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyWorshipplaces implements Action {
  readonly type = WorshipplacesActionTypes.SuccessGetEntirelyWorshipplaces;
  constructor(public payload: WorshipplaceResponse) {}
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
  | RequestGetEntirelyWorshipplaces
  | SuccessGetEntirelyWorshipplaces;
