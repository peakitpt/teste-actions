import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Document, DocumentResponse } from '../document.model';

export enum DocumentsActionTypes {
  RequestFail = '[Documents] Request Fail',
  RequestGetAll = '[Documents] Request Get All',
  SuccessGetAll = '[Documents] Success Get All',
  ClearGetAll = '[Documents] Clear Get All',
  RequestGet = '[Documents] Request Get',
  SuccessGet = '[Documents] Success Get',
  ClearGet = '[Baptisms] Clear Get',
  RequestPost = '[Documents] Request Post',
  SuccessPost = '[Documents] Success Post',
  RequestPut = '[Documents] Request Put',
  SuccessPut = '[Documents] Success Put',
  RequestDelete = '[Documents] Request Delete',
  SuccessDelete = '[Documents] Success Delete',
  RequestBulkDelete = '[Documents] Request Bulk Delete',
  SuccessBulkDelete = '[Documents] Success Bulk Delete',
  SetSelected = '[Documents] Set Selected',
  RequestFamily = '[Documents] Request Family Documents',
  SuccessFamily = '[Documents] Success Family Documents',
  RequestGetEntirely = '[Documents] Request Get Entirely',
  SuccessGetEntirely = '[Documents] Success Get Entirely',
  RequestGetNew = '[Documents] Request Get New',
  SuccessGetNew = '[Documents] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = DocumentsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = DocumentsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = DocumentsActionTypes.SuccessGetAll;
  constructor(public payload: DocumentResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = DocumentsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = DocumentsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = DocumentsActionTypes.SuccessGet;
  constructor(public payload: Document) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = DocumentsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = DocumentsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = DocumentsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = DocumentsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = DocumentsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = DocumentsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = DocumentsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = DocumentsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = DocumentsActionTypes.SetSelected;
  constructor(public payload?: Document[]) {}
}

@RequestStatus('pending')
export class RequestFamily implements Action {
  readonly type = DocumentsActionTypes.RequestFamily;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessFamily implements Action {
  readonly type = DocumentsActionTypes.SuccessFamily;
  constructor(public payload: DocumentResponse) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = DocumentsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = DocumentsActionTypes.SuccessGetEntirely;
  constructor(public payload: DocumentResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = DocumentsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = DocumentsActionTypes.SuccessGetNew;
  constructor(public payload: Document) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = DocumentsActionTypes.ClearGet;
  constructor() {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
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
  | RequestFamily
  | SuccessFamily
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestGetNew
  | SuccessGetNew
  | ClearGet;
