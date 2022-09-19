import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { WeddingResponse, Wedding } from '../wedding.model';

export enum WeddingsActionTypes {
  RequestFail = '[Weddings] Request Fail',
  RequestGetAll = '[Weddings] Request Get All',
  SuccessGetAll = '[Weddings] Success Get All',
  ClearGetAll = '[Weddings] Clear Get All',
  RequestGet = '[Weddings] Request Get',
  SuccessGet = '[Weddings] Success Get',
  ClearGet = '[Weddings] Clear Get',
  RequestPost = '[Weddings] Request Post',
  SuccessPost = '[Weddings] Success Post',
  RequestPut = '[Weddings] Request Put',
  SuccessPut = '[Weddings] Success Put',
  RequestDelete = '[Weddings] Request Delete',
  SuccessDelete = '[Weddings] Success Delete',
  RequestBulkDelete = '[Weddings] Request Bulk Delete',
  SuccessBulkDelete = '[Weddings] Success Bulk Delete',
  SetSelected = '[Weddings] Set Selected',
  RequestFailSaveAndGenerateDocument = '[Weddings] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[Weddings] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[Weddings] Success Save And Generate Document',
  RequestGetEntirely = '[Weddings] Request Get Entirely',
  SuccessGetEntirely = '[Weddings] Success Get Entirely',

  RequestSendToCuria = '[Weddings] Request Send to Curia',
  SuccessSendToCuria = '[Weddings] Success Send to Curia',
  RequestGetNew = '[Weddings] Request Get New Curia',
  SuccessGetNew = '[Weddings] Success Get New Curia',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = WeddingsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = WeddingsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = WeddingsActionTypes.SuccessGetAll;
  constructor(public payload: WeddingResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = WeddingsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = WeddingsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = WeddingsActionTypes.SuccessGet;
  constructor(public payload: Wedding) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = WeddingsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = WeddingsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = WeddingsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = WeddingsActionTypes.RequestPut;
  constructor(public payload: Wedding) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = WeddingsActionTypes.SuccessPut;
  constructor(public payload: Wedding) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = WeddingsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = WeddingsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = WeddingsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = WeddingsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = WeddingsActionTypes.SetSelected;
  constructor(public payload?: Wedding[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = WeddingsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = WeddingsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = WeddingsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = WeddingsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = WeddingsActionTypes.SuccessGetEntirely;
  constructor(public payload: WeddingResponse, public isDetailsList = false) {}
}

@RequestStatus('pending')
export class RequestSendToCuria implements Action {
  readonly type = WeddingsActionTypes.RequestSendToCuria;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendToCuria implements Action {
  readonly type = WeddingsActionTypes.SuccessSendToCuria;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = WeddingsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = WeddingsActionTypes.SuccessGetNew;
  constructor(public payload: Wedding) {}
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
  | SuccessSendToCuria
  | RequestGetNew
  | SuccessGetNew;
