import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaWeddingResponse, CuriaWedding } from '../curia-wedding.model';

export enum CuriaWeddingsActionTypes {
  RequestFail = '[CuriaWeddings] Request Fail',
  RequestGetAll = '[CuriaWeddings] Request Get All',
  SuccessGetAll = '[CuriaWeddings] Success Get All',
  ClearGetAll = '[CuriaWeddings] Clear Get All',
  RequestGet = '[CuriaWeddings] Request Get',
  SuccessGet = '[CuriaWeddings] Success Get',
  ClearGet = '[CuriaWeddings] Clear Get',
  RequestPost = '[CuriaWeddings] Request Post',
  SuccessPost = '[CuriaWeddings] Success Post',
  RequestPut = '[CuriaWeddings] Request Put',
  SuccessPut = '[CuriaWeddings] Success Put',
  RequestDelete = '[CuriaWeddings] Request Delete',
  SuccessDelete = '[CuriaWeddings] Success Delete',
  RequestBulkDelete = '[CuriaWeddings] Request Bulk Delete',
  SuccessBulkDelete = '[CuriaWeddings] Success Bulk Delete',
  SetSelected = '[CuriaWeddings] Set Selected',
  RequestFailSaveAndGenerateDocument = '[CuriaWeddings] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[CuriaWeddings] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[CuriaWeddings] Success Save And Generate Document',
  RequestGetEntirely = '[CuriaWeddings] Request Get Entirely',
  SuccessGetEntirely = '[CuriaWeddings] Success Get Entirely',
  RequestSendToCuria = '[CuriaWeddings] Request Send to Curia',
  SuccessSendToCuria = '[CuriaWeddings] Success Send to Curia',
  RequestGetNew = '[CuriaWeddings] Request Get New Curia',
  SuccessGetNew = '[CuriaWeddings] Success Get New Curia',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessGetAll;
  constructor(public payload: CuriaWeddingResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaWeddingsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessGet;
  constructor(public payload: CuriaWedding) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaWeddingsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestPut;
  constructor(public payload: CuriaWedding) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessPut;
  constructor(public payload: CuriaWedding) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CuriaWeddingsActionTypes.SetSelected;
  constructor(public payload?: CuriaWedding[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: CuriaWeddingResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('pending')
export class RequestSendToCuria implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestSendToCuria;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendToCuria implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessSendToCuria;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaWeddingsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaWeddingsActionTypes.SuccessGetNew;
  constructor(public payload: CuriaWedding) {}
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
