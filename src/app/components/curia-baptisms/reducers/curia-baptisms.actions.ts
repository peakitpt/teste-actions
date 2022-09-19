import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaBaptismResponse, CuriaBaptism } from '../curia-baptism.model';

export enum CuriaBaptismsActionTypes {
  RequestFail = '[CuriaBaptisms] Request Fail',
  RequestGetAll = '[CuriaBaptisms] Request Get All',
  SuccessGetAll = '[CuriaBaptisms] Success Get All',
  ClearGetAll = '[CuriaBaptisms] Clear Get All',
  RequestGet = '[CuriaBaptisms] Request Get',
  SuccessGet = '[CuriaBaptisms] Success Get',
  ClearGet = '[CuriaBaptisms] Clear Get',
  RequestPost = '[CuriaBaptisms] Request Post',
  SuccessPost = '[CuriaBaptisms] Success Post',
  RequestPut = '[CuriaBaptisms] Request Put',
  SuccessPut = '[CuriaBaptisms] Success Put',
  RequestDelete = '[CuriaBaptisms] Request Delete',
  SuccessDelete = '[CuriaBaptisms] Success Delete',
  RequestBulkDelete = '[CuriaBaptisms] Request Bulk Delete',
  SuccessBulkDelete = '[CuriaBaptisms] Success Bulk Delete',
  SetSelected = '[CuriaBaptisms] Set Selected',
  RequestFailSaveAndGenerateDocument = '[CuriaBaptisms] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[CuriaBaptisms] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[CuriaBaptisms] Success Save And Generate Document',
  RequestGetEntirely = '[CuriaBaptisms] Request Get Entirely',
  SuccessGetEntirely = '[CuriaBaptisms] Success Get Entirely',

  RequestSendToCuria = '[CuriaBaptisms] Request Send to Curia',
  SuccessSendToCuria = '[CuriaBaptisms] Success Send to Curia',
  RequestGetNew = '[CuriaBaptisms] Request Get New',
  SuccessGetNew = '[CuriaBaptisms] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessGetAll;
  constructor(public payload: CuriaBaptismResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaBaptismsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessGet;
  constructor(public payload: CuriaBaptism) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaBaptismsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestPut;
  constructor(public payload: CuriaBaptism) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessPut;
  constructor(public payload: CuriaBaptism) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CuriaBaptismsActionTypes.SetSelected;
  constructor(public payload?: CuriaBaptism[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: CuriaBaptismResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('pending')
export class RequestSendToCuria implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestSendToCuria;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendToCuria implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessSendToCuria;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaBaptismsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaBaptismsActionTypes.SuccessGetNew;
  constructor(public payload: CuriaBaptism) {}
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
