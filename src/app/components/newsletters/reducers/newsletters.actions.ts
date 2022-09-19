import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NewsletterResponse, Newsletter } from '../newsletter.model';

export enum NewslettersActionTypes {
  RequestFail = '[Newsletters] Request Fail',
  RequestGetAll = '[Newsletters] Request Get All',
  SuccessGetAll = '[Newsletters] Success Get All',
  ClearGetAll = '[Newsletters] Clear Get All',
  RequestGet = '[Newsletters] Request Get',
  SuccessGet = '[Newsletters] Success Get',
  ClearGet = '[Newsletters] Clear Get',
  RequestPost = '[Newsletters] Request Post',
  SuccessPost = '[Newsletters] Success Post',
  RequestPut = '[Newsletters] Request Put',
  SuccessPut = '[Newsletters] Success Put',
  RequestDelete = '[Newsletters] Request Delete',
  SuccessDelete = '[Newsletters] Success Delete',
  RequestBulkDelete = '[Newsletters] Request Bulk Delete',
  SuccessBulkDelete = '[Newsletters] Success Bulk Delete',
  SetSelected = '[Newsletters] Set Selected',
  RequestFailSendTest = '[Newsletters] Request Fail Send Test',
  RequestSendTest = '[Newsletters] Request Send Test',
  SuccessSendTest = '[Newsletters] Success Send Test',
  RequestGetEntirely = '[Newsletters] Request Get Entirely',
  SuccessGetEntirely = '[Newsletters] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = NewslettersActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = NewslettersActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = NewslettersActionTypes.SuccessGetAll;
  constructor(public payload: NewsletterResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = NewslettersActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = NewslettersActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = NewslettersActionTypes.SuccessGet;
  constructor(public payload: Newsletter) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = NewslettersActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = NewslettersActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = NewslettersActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = NewslettersActionTypes.RequestPut;
  constructor(public payload: Newsletter) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = NewslettersActionTypes.SuccessPut;
  constructor(public payload: Newsletter) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = NewslettersActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = NewslettersActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = NewslettersActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = NewslettersActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = NewslettersActionTypes.SetSelected;
  constructor(public payload?: Newsletter[]) {}
}

@RequestStatus('error')
export class RequestFailSendTest implements Action {
  readonly type = NewslettersActionTypes.RequestFailSendTest;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSendTest implements Action {
  readonly type = NewslettersActionTypes.RequestSendTest;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTest implements Action {
  readonly type = NewslettersActionTypes.SuccessSendTest;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = NewslettersActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = NewslettersActionTypes.SuccessGetEntirely;
  constructor(
    public payload: NewsletterResponse,
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
  | RequestFailSendTest
  | RequestSendTest
  | SuccessSendTest
  | RequestGetEntirely
  | SuccessGetEntirely;
