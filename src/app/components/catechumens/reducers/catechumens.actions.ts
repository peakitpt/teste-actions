import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CatechumenResponse, Catechumen } from '../catechumen.model';

export enum CatechumensActionTypes {
  RequestFail = '[Catechumens] Request Fail',
  RequestGetAll = '[Catechumens] Request Get All',
  SuccessGetAll = '[Catechumens] Success Get All',
  ClearGetAll = '[Catechumens] Clear Get All',
  RequestGet = '[Catechumens] Request Get',
  SuccessGet = '[Catechumens] Success Get',
  ClearGet = '[Catechumens] Clear Get',
  RequestPost = '[Catechumens] Request Post',
  SuccessPost = '[Catechumens] Success Post',
  RequestPut = '[Catechumens] Request Put',
  SuccessPut = '[Catechumens] Success Put',
  RequestDelete = '[Catechumens] Request Delete',
  SuccessDelete = '[Catechumens] Success Delete',
  RequestBulkDelete = '[Catechumens] Request Bulk Delete',
  SuccessBulkDelete = '[Catechumens] Success Bulk Delete',
  SetSelected = '[Catechumens] Set Selected',
  RequestFailSaveAndGenerateDocument = '[Catechumens] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[Catechumens] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[Catechumens] Success Save And Generate Document',
  RequestGetEntirely = '[Catechumens] Request Get Entirely',
  SuccessGetEntirely = '[Catechumens] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CatechumensActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CatechumensActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CatechumensActionTypes.SuccessGetAll;
  constructor(public payload: CatechumenResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CatechumensActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CatechumensActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CatechumensActionTypes.SuccessGet;
  constructor(public payload: Catechumen) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CatechumensActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CatechumensActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CatechumensActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CatechumensActionTypes.RequestPut;
  constructor(public payload: Catechumen) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CatechumensActionTypes.SuccessPut;
  constructor(public payload: Catechumen) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CatechumensActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CatechumensActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CatechumensActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CatechumensActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CatechumensActionTypes.SetSelected;
  constructor(public payload?: Catechumen[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = CatechumensActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = CatechumensActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = CatechumensActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = CatechumensActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = CatechumensActionTypes.SuccessGetEntirely;
  constructor(
    public payload: CatechumenResponse,
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
  | RequestFailSaveAndGenerateDocument
  | RequestSaveAndGenerateDocument
  | SuccessSaveAndGenerateDocument
  | RequestGetEntirely
  | SuccessGetEntirely;
