import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { TextMessageResponse, TextMessage } from '../text-message.model';

export enum TextMessagesActionTypes {
  RequestFail = '[TextMessages] Request Fail',
  RequestGetAll = '[TextMessages] Request Get All',
  SuccessGetAll = '[TextMessages] Success Get All',
  ClearGetAll = '[TextMessages] Clear Get All',
  RequestGet = '[TextMessages] Request Get',
  SuccessGet = '[TextMessages] Success Get',
  ClearGet = '[TextMessages] Clear Get',
  RequestPost = '[TextMessages] Request Post',
  SuccessPost = '[TextMessages] Success Post',
  RequestPut = '[TextMessages] Request Put',
  SuccessPut = '[TextMessages] Success Put',
  RequestDelete = '[TextMessages] Request Delete',
  SuccessDelete = '[TextMessages] Success Delete',
  RequestBulkDelete = '[TextMessages] Request Bulk Delete',
  SuccessBulkDelete = '[TextMessages] Success Bulk Delete',
  SetSelected = '[TextMessages] Set Selected',
  RequestFailSendTest = '[TextMessages] Request Fail Send Test',
  RequestSendTest = '[TextMessages] Request Send Test',
  SuccessSendTest = '[TextMessages] Success Send Test',
  RequestGetEntirely = '[TextMessages] Request Get Entirely',
  SuccessGetEntirely = '[TextMessages] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = TextMessagesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = TextMessagesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = TextMessagesActionTypes.SuccessGetAll;
  constructor(public payload: TextMessageResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = TextMessagesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = TextMessagesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = TextMessagesActionTypes.SuccessGet;
  constructor(public payload: TextMessage) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = TextMessagesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = TextMessagesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = TextMessagesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = TextMessagesActionTypes.RequestPut;
  constructor(public payload: TextMessage) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = TextMessagesActionTypes.SuccessPut;
  constructor(public payload: TextMessage) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = TextMessagesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = TextMessagesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = TextMessagesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = TextMessagesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = TextMessagesActionTypes.SetSelected;
  constructor(public payload?: TextMessage[]) {}
}

@RequestStatus('error')
export class RequestFailSendTest implements Action {
  readonly type = TextMessagesActionTypes.RequestFailSendTest;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSendTest implements Action {
  readonly type = TextMessagesActionTypes.RequestSendTest;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTest implements Action {
  readonly type = TextMessagesActionTypes.SuccessSendTest;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = TextMessagesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = TextMessagesActionTypes.SuccessGetEntirely;
  constructor(public payload: TextMessageResponse) {}
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
