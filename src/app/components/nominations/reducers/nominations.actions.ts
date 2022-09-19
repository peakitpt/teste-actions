import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NominationResponse, Nomination } from '../nomination.model';

export enum NominationsActionTypes {
  RequestFail = '[Nominations] Request Fail',
  RequestGetAll = '[Nominations] Request Get All',
  SuccessGetAll = '[Nominations] Success Get All',
  RequestGet = '[Nominations] Request Get',
  SuccessGet = '[Nominations] Success Get',
  RequestPost = '[Nominations] Request Post',
  SuccessPost = '[Nominations] Success Post',
  RequestPut = '[Nominations] Request Put',
  SuccessPut = '[Nominations] Success Put',
  RequestDelete = '[Nominations] Request Delete',
  SuccessDelete = '[Nominations] Success Delete',
  // RequestBulkDelete = '[Nominations] Request Bulk Delete',
  // SuccessBulkDelete = '[Nominations] Success Bulk Delete',
  SetSelected = '[Nominations] Set Selected',
  RequestGetEntirely = '[Nominations] Request Get Entirely',
  SuccessGetEntirely = '[Nominations] Success Get Entirely',
  RequestGetNew = '[Nominations] Request Get New',
  SuccessGetNew = '[Nominations] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = NominationsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = NominationsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = NominationsActionTypes.SuccessGetAll;
  constructor(public payload: NominationResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = NominationsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = NominationsActionTypes.SuccessGet;
  constructor(public payload: Nomination) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = NominationsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = NominationsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = NominationsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = NominationsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = NominationsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = NominationsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = NominationsActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = NominationsActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = NominationsActionTypes.SetSelected;
  constructor(public payload?: Nomination[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = NominationsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = NominationsActionTypes.SuccessGetEntirely;
  constructor(public payload: NominationResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = NominationsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = NominationsActionTypes.SuccessGetNew;
  constructor(public payload: Nomination) {}
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
