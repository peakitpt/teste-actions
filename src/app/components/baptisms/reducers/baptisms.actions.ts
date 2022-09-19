import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { BaptismResponse, Baptism } from '../baptism.model';

export enum BaptismsActionTypes {
  RequestFail = '[Baptisms] Request Fail',
  RequestGetAll = '[Baptisms] Request Get All',
  SuccessGetAll = '[Baptisms] Success Get All',
  ClearGetAll = '[Baptisms] Clear Get All',
  RequestGet = '[Baptisms] Request Get',
  SuccessGet = '[Baptisms] Success Get',
  ClearGet = '[Baptisms] Clear Get',
  RequestPost = '[Baptisms] Request Post',
  SuccessPost = '[Baptisms] Success Post',
  RequestPut = '[Baptisms] Request Put',
  SuccessPut = '[Baptisms] Success Put',
  RequestDelete = '[Baptisms] Request Delete',
  SuccessDelete = '[Baptisms] Success Delete',
  RequestBulkDelete = '[Baptisms] Request Bulk Delete',
  SuccessBulkDelete = '[Baptisms] Success Bulk Delete',
  SetSelected = '[Baptisms] Set Selected',
  RequestFailSaveAndGenerateDocument = '[Baptisms] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[Baptisms] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[Baptisms] Success Save And Generate Document',
  RequestGetEntirely = '[Baptisms] Request Get Entirely',
  SuccessGetEntirely = '[Baptisms] Success Get Entirely',

  RequestSendToCuria = '[Baptisms] Request Send to Curia',
  SuccessSendToCuria = '[Baptisms] Success Send to Curia',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = BaptismsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = BaptismsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = BaptismsActionTypes.SuccessGetAll;
  constructor(public payload: BaptismResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = BaptismsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = BaptismsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = BaptismsActionTypes.SuccessGet;
  constructor(public payload: Baptism) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = BaptismsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = BaptismsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = BaptismsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = BaptismsActionTypes.RequestPut;
  constructor(public payload: Baptism) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = BaptismsActionTypes.SuccessPut;
  constructor(public payload: Baptism) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = BaptismsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = BaptismsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = BaptismsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = BaptismsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = BaptismsActionTypes.SetSelected;
  constructor(public payload?: Baptism[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = BaptismsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = BaptismsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = BaptismsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = BaptismsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = BaptismsActionTypes.SuccessGetEntirely;
  constructor(public payload: BaptismResponse, public isDetailsList = false) {}
}

@RequestStatus('pending')
export class RequestSendToCuria implements Action {
  readonly type = BaptismsActionTypes.RequestSendToCuria;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendToCuria implements Action {
  readonly type = BaptismsActionTypes.SuccessSendToCuria;
  constructor(public payload: any[]) {}
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
  | SuccessGetEntirely
  | RequestSendToCuria
  | SuccessSendToCuria;
