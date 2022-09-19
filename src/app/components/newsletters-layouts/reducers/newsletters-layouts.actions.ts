import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NewslettersLayoutResponse,
  NewslettersLayout,
} from '../newsletters-layout.model';

export enum NewslettersLayoutsActionTypes {
  RequestFail = '[NewslettersLayouts] Request Fail',
  RequestGetAll = '[NewslettersLayouts] Request Get All',
  SuccessGetAll = '[NewslettersLayouts] Success Get All',
  ClearGetAll = '[NewslettersLayouts] Clear Get All',
  RequestGet = '[NewslettersLayouts] Request Get',
  SuccessGet = '[NewslettersLayouts] Success Get',
  ClearGet = '[NewslettersLayouts] Clear Get',
  RequestPost = '[NewslettersLayouts] Request Post',
  SuccessPost = '[NewslettersLayouts] Success Post',
  RequestPut = '[NewslettersLayouts] Request Put',
  SuccessPut = '[NewslettersLayouts] Success Put',
  RequestDelete = '[NewslettersLayouts] Request Delete',
  SuccessDelete = '[NewslettersLayouts] Success Delete',
  RequestBulkDelete = '[NewslettersLayouts] Request Bulk Delete',
  SuccessBulkDelete = '[NewslettersLayouts] Success Bulk Delete',
  SetSelected = '[NewslettersLayouts] Set Selected',
  RequestGetEntirely = '[NewslettersLayouts] Request Get Entirely',
  SuccessGetEntirely = '[NewslettersLayouts] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessGetAll;
  constructor(public payload: NewslettersLayoutResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = NewslettersLayoutsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessGet;
  constructor(public payload: NewslettersLayout) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = NewslettersLayoutsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = NewslettersLayoutsActionTypes.SetSelected;
  constructor(public payload?: NewslettersLayout[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessGetEntirely;
  constructor(public payload: NewslettersLayoutResponse) {}
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
