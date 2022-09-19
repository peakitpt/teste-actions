import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ModuleDocumentationLinkResponse,
  ModuleDocumentationLink,
} from '../module-documentation-link.model';

export enum ModuleDocumentationLinksActionTypes {
  RequestFail = '[Accounting Transaction Types] Request Fail',
  RequestGetAll = '[Accounting Transaction Types] Request Get All',
  SuccessGetAll = '[Accounting Transaction Types] Success Get All',
  RequestGet = '[Accounting Transaction Types] Request Get',
  SuccessGet = '[Accounting Transaction Types] Success Get',
  RequestPost = '[Accounting Transaction Types] Request Post',
  SuccessPost = '[Accounting Transaction Types] Success Post',
  RequestPut = '[Accounting Transaction Types] Request Put',
  SuccessPut = '[Accounting Transaction Types] Success Put',
  RequestDelete = '[Accounting Transaction Types] Request Delete',
  SuccessDelete = '[Accounting Transaction Types] Success Delete',
  // RequestBulkDelete= '[Accounting Transaction Types] Request Bulk Delete',
  // SuccessBulkDelete= '[Accounting Transaction Types] Success Bulk Delete',
  SetSelected = '[Accounting Transaction Types] Set Selected',
  RequestGetEntirely = '[Accounting Transaction Types] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Transaction Types] Success Get Entirely',
  RequestGetNew = '[Accounting Transaction Types] Request Get New',
  SuccessGetNew = '[Accounting Transaction Types] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SuccessGetAll;
  constructor(public payload: ModuleDocumentationLinkResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SuccessGet;
  constructor(public payload: ModuleDocumentationLink) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = ModuleDocumentationLinksActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = ModuleDocumentationLinksActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SetSelected;
  constructor(public payload?: ModuleDocumentationLink[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SuccessGetEntirely;
  constructor(public payload: ModuleDocumentationLinkResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = ModuleDocumentationLinksActionTypes.SuccessGetNew;
  constructor(public payload: ModuleDocumentationLink) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestGet
  | SuccessGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  // | RequestBulkDelete
  // | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestGetNew
  | SuccessGetNew;
