import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ClergyTypeResponse, ClergyType } from '../clergy-type.model';

export enum ClergyTypeActionTypes {
  RequestFail = '[ClergyTypes] Request Fail',
  RequestGetAll = '[ClergyTypes] Request Get All',
  SuccessGetAll = '[ClergyTypes] Success Get All',
  ClearGetAll = '[ClergyTypes] Clear Get All',
  RequestGet = '[ClergyTypes] Request Get',
  SuccessGet = '[ClergyTypes] Success Get',
  ClearGet = '[ClergyTypes] Clear Get',
  RequestPost = '[ClergyTypes] Request Post',
  SuccessPost = '[ClergyTypes] Success Post',
  RequestPut = '[ClergyTypes] Request Put',
  SuccessPut = '[ClergyTypes] Success Put',
  RequestDelete = '[ClergyTypes] Request Delete',
  SuccessDelete = '[ClergyTypes] Success Delete',
  RequestBulkDelete = '[ClergyTypes] Request Bulk Delete',
  SuccessBulkDelete = '[ClergyTypes] Success Bulk Delete',
  SetSelected = '[ClergyTypes] Set Selected',
  RequestGetEntirely = '[ClergyTypes] Request Get Entirely',
  SuccessGetEntirely = '[ClergyTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ClergyTypeActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ClergyTypeActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ClergyTypeActionTypes.SuccessGetAll;
  constructor(public payload: ClergyTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = ClergyTypeActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = ClergyTypeActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = ClergyTypeActionTypes.SuccessGet;
  constructor(public payload: ClergyType) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = ClergyTypeActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = ClergyTypeActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = ClergyTypeActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = ClergyTypeActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = ClergyTypeActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = ClergyTypeActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = ClergyTypeActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = ClergyTypeActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = ClergyTypeActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = ClergyTypeActionTypes.SetSelected;
  constructor(public payload?: ClergyType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = ClergyTypeActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = ClergyTypeActionTypes.SuccessGetEntirely;
  constructor(public payload: ClergyTypeResponse) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestGet
  | SuccessGet
  | ClearGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirely
  | SuccessGetEntirely;
