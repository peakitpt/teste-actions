import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { MassIntentionResponse, MassIntention } from '../mass-intention.model';

export enum MassIntentionsActionTypes {
  RequestFail = '[MassIntentions] Request Fail',
  RequestGetAll = '[MassIntentions] Request Get All',
  SuccessGetAll = '[MassIntentions] Success Get All',
  ClearGetAll = '[MassIntentions] Clear Get All',
  RequestGet = '[MassIntentions] Request Get',
  SuccessGet = '[MassIntentions] Success Get',
  ClearGet = '[MassIntentions] Clear Get',
  RequestPost = '[MassIntentions] Request Post',
  SuccessPost = '[MassIntentions] Success Post',
  RequestPut = '[MassIntentions] Request Put',
  SuccessPut = '[MassIntentions] Success Put',
  RequestDelete = '[MassIntentions] Request Delete',
  SuccessDelete = '[MassIntentions] Success Delete',
  RequestBulkDelete = '[MassIntentions] Request Bulk Delete',
  SuccessBulkDelete = '[MassIntentions] Success Bulk Delete',
  SetSelected = '[MassIntentions] Set Selected',
  RequestFailSaveAndGenerateDocument = '[MassIntentions] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[MassIntentions] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[MassIntentions] Success Save And Generate Document',
  RequestGetEntirely = '[MassIntentions] Request Get Entirely',
  SuccessGetEntirely = '[MassIntentions] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = MassIntentionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = MassIntentionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = MassIntentionsActionTypes.SuccessGetAll;
  constructor(public payload: MassIntentionResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = MassIntentionsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = MassIntentionsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = MassIntentionsActionTypes.SuccessGet;
  constructor(public payload: MassIntention) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = MassIntentionsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = MassIntentionsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = MassIntentionsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = MassIntentionsActionTypes.RequestPut;
  constructor(public payload: MassIntention) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = MassIntentionsActionTypes.SuccessPut;
  constructor(public payload: MassIntention) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = MassIntentionsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = MassIntentionsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = MassIntentionsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = MassIntentionsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = MassIntentionsActionTypes.SetSelected;
  constructor(public payload?: MassIntention[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = MassIntentionsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = MassIntentionsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = MassIntentionsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = MassIntentionsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = MassIntentionsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: MassIntentionResponse,
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
