import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  UserNewsletterResponse,
  UserNewsletter
} from '../user-newsletter.model';

export enum UserNewslettersActionTypes {
  RequestFailUserNewsletters = '[UserNewsletters] Request Fail',
  RequestGetAllUserNewsletters = '[UserNewsletters] Request Get All',
  SuccessGetAllUserNewsletters = '[UserNewsletters] Success Get All',
  RequestGetUserNewsletter = '[UserNewsletters] Request Get',
  SuccessGetUserNewsletter = '[UserNewsletters] Success Get',
  RequestPostUserNewsletter = '[UserNewsletters] Request Post',
  SuccessPostUserNewsletter = '[UserNewsletters] Success Post',
  RequestPutUserNewsletter = '[UserNewsletters] Request Put',
  SuccessPutUserNewsletter = '[UserNewsletters] Success Put',
  RequestDeleteUserNewsletter = '[UserNewsletters] Request Delete',
  SuccessDeleteUserNewsletter = '[UserNewsletters] Success Delete',
  // RequestBulkDeleteUserNewsletters = '[UserNewsletters] Request Bulk Delete',
  // SuccessBulkDeleteUserNewsletters = '[UserNewsletters] Success Bulk Delete',
  SetSelectedUserNewsletters = '[UserNewsletters] Set Selected',
  RequestGetEntirelyUserNewsletters = '[UserNewsletters] Request Get Entirely',
  SuccessGetEntirelyUserNewsletters = '[UserNewsletters] Success Get Entirely',
  RequestToggleUserNewsletter = '[UserNewsletters] Request Toggle',
  SuccessToggleUserNewsletter = '[UserNewsletters] Success Toggle'
}

@RequestStatus('error')
export class RequestFailUserNewsletters implements Action {
  readonly type = UserNewslettersActionTypes.RequestFailUserNewsletters;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllUserNewsletters implements Action {
  readonly type = UserNewslettersActionTypes.RequestGetAllUserNewsletters;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllUserNewsletters implements Action {
  readonly type = UserNewslettersActionTypes.SuccessGetAllUserNewsletters;
  constructor(public payload: UserNewsletterResponse) {}
}

@RequestStatus('pending')
export class RequestGetUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.RequestGetUserNewsletter;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.SuccessGetUserNewsletter;
  constructor(public payload: UserNewsletter) {}
}

@RequestStatus('pending')
export class RequestPostUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.RequestPostUserNewsletter;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.SuccessPostUserNewsletter;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.RequestPutUserNewsletter;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.SuccessPutUserNewsletter;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.RequestDeleteUserNewsletter;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.SuccessDeleteUserNewsletter;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteUserNewsletters implements Action {
//   readonly type = UserNewslettersActionTypes.RequestBulkDeleteUserNewsletters;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteUserNewsletters implements Action {
//   readonly type = UserNewslettersActionTypes.SuccessBulkDeleteUserNewsletters;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedUserNewsletters implements Action {
  readonly type = UserNewslettersActionTypes.SetSelectedUserNewsletters;
  constructor(public payload?: UserNewsletter[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyUserNewsletters implements Action {
  readonly type = UserNewslettersActionTypes.RequestGetEntirelyUserNewsletters;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyUserNewsletters implements Action {
  readonly type = UserNewslettersActionTypes.SuccessGetEntirelyUserNewsletters;
  constructor(public payload: UserNewsletterResponse) {}
}

@RequestStatus('pending')
export class RequestToggleUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.RequestToggleUserNewsletter;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessToggleUserNewsletter implements Action {
  readonly type = UserNewslettersActionTypes.SuccessToggleUserNewsletter;
  constructor(public payload: UserNewsletter) {}
}

export type StatisticsActions =
  | RequestFailUserNewsletters
  | RequestGetAllUserNewsletters
  | SuccessGetAllUserNewsletters
  | RequestGetUserNewsletter
  | SuccessGetUserNewsletter
  | RequestPostUserNewsletter
  | SuccessPostUserNewsletter
  | RequestPutUserNewsletter
  | SuccessPutUserNewsletter
  | RequestDeleteUserNewsletter
  | SuccessDeleteUserNewsletter
  // | RequestBulkDeleteUserNewsletters
  // | SuccessBulkDeleteUserNewsletters
  | SetSelectedUserNewsletters
  | RequestGetEntirelyUserNewsletters
  | SuccessGetEntirelyUserNewsletters
  | RequestToggleUserNewsletter
  | SuccessToggleUserNewsletter;
