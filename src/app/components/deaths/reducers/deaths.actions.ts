import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { DeathResponse, Death } from '../death.model';

export enum DeathsActionTypes {
  RequestFail = '[Deaths] Request Fail',
  RequestGetAll = '[Deaths] Request Get All',
  SuccessGetAll = '[Deaths] Success Get All',
  ClearGetAll = '[Deaths] Clear Get All',
  RequestGet = '[Deaths] Request Get',
  SuccessGet = '[Deaths] Success Get',
  ClearGet = '[Deaths] Clear Get',
  RequestPost = '[Deaths] Request Post',
  SuccessPost = '[Deaths] Success Post',
  RequestPut = '[Deaths] Request Put',
  SuccessPut = '[Deaths] Success Put',
  RequestDelete = '[Deaths] Request Delete',
  SuccessDelete = '[Deaths] Success Delete',
  RequestBulkDelete = '[Deaths] Request Bulk Delete',
  SuccessBulkDelete = '[Deaths] Success Bulk Delete',
  SetSelected = '[Deaths] Set Selected',
  RequestFailSaveAndGenerateDocument = '[Deaths] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[Deaths] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[Deaths] Success Save And Generate Document',
  RequestGetEntirely = '[Deaths] Request Get Entirely',
  SuccessGetEntirely = '[Deaths] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = DeathsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = DeathsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = DeathsActionTypes.SuccessGetAll;
  constructor(public payload: DeathResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = DeathsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = DeathsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = DeathsActionTypes.SuccessGet;
  constructor(public payload: Death) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = DeathsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = DeathsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = DeathsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = DeathsActionTypes.RequestPut;
  constructor(public payload: Death) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = DeathsActionTypes.SuccessPut;
  constructor(public payload: Death) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = DeathsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = DeathsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = DeathsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = DeathsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = DeathsActionTypes.SetSelected;
  constructor(public payload?: Death[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = DeathsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = DeathsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = DeathsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = DeathsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = DeathsActionTypes.SuccessGetEntirely;
  constructor(public payload: DeathResponse, public isDetailsList = false) {}
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
  | RequestFailSaveAndGenerateDocument
  | RequestSaveAndGenerateDocument
  | SuccessSaveAndGenerateDocument
  | RequestGetEntirely
  | SuccessGetEntirely;
