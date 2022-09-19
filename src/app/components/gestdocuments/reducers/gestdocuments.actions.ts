import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { GestdocumentResponse, Gestdocument } from '../gestdocument.model';

export enum GestdocumentsActionTypes {
  RequestFail = '[Gestdocuments] Request Fail',
  RequestGetAll = '[Gestdocuments] Request Get All',
  SuccessGetAll = '[Gestdocuments] Success Get All',
  ClearGetAll = '[Gestdocuments] Clear Get All',
  RequestGet = '[Gestdocuments] Request Get',
  SuccessGet = '[Gestdocuments] Success Get',
  ClearGet = '[Gestdocuments] Clear Get',
  RequestPost = '[Gestdocuments] Request Post',
  SuccessPost = '[Gestdocuments] Success Post',
  RequestPut = '[Gestdocuments] Request Put',
  SuccessPut = '[Gestdocuments] Success Put',
  RequestDelete = '[Gestdocuments] Request Delete',
  SuccessDelete = '[Gestdocuments] Success Delete',
  RequestBulkDelete = '[Gestdocuments] Request Bulk Delete',
  SuccessBulkDelete = '[Gestdocuments] Success Bulk Delete',
  SetSelected = '[Gestdocuments] Set Selected',
  RequestGetEntirely = '[Gestdocuments] Request Get Entirely',
  SuccessGetEntirely = '[Gestdocuments] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = GestdocumentsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = GestdocumentsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = GestdocumentsActionTypes.SuccessGetAll;
  constructor(public payload: GestdocumentResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = GestdocumentsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = GestdocumentsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = GestdocumentsActionTypes.SuccessGet;
  constructor(public payload: Gestdocument) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = GestdocumentsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = GestdocumentsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = GestdocumentsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = GestdocumentsActionTypes.RequestPut;
  constructor(public payload: Gestdocument) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = GestdocumentsActionTypes.SuccessPut;
  constructor(public payload: Gestdocument) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = GestdocumentsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = GestdocumentsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = GestdocumentsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = GestdocumentsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = GestdocumentsActionTypes.SetSelected;
  constructor(public payload?: Gestdocument[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = GestdocumentsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = GestdocumentsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: GestdocumentResponse,
    public isDetailsList = false
  ) {}
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
