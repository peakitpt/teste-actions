import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  SubscriptionUserResponse,
  SubscriptionUser,
} from '../subscription-user.model';

export enum SubscriptionUsersActionTypes {
  RequestFailSubscriptionUsers = '[SubscriptionUsers] Request Fail',
  RequestGetAllSubscriptionUsers = '[SubscriptionUsers] Request Get All',
  SuccessGetAllSubscriptionUsers = '[SubscriptionUsers] Success Get All',
  RequestGetSubscriptionUser = '[SubscriptionUsers] Request Get',
  SuccessGetSubscriptionUser = '[SubscriptionUsers] Success Get',
  RequestPostSubscriptionUser = '[SubscriptionUsers] Request Post',
  SuccessPostSubscriptionUser = '[SubscriptionUsers] Success Post',
  RequestPutSubscriptionUser = '[SubscriptionUsers] Request Put',
  SuccessPutSubscriptionUser = '[SubscriptionUsers] Success Put',
  RequestDeleteSubscriptionUser = '[SubscriptionUsers] Request Delete',
  SuccessDeleteSubscriptionUser = '[SubscriptionUsers] Success Delete',
  // RequestBulkDeleteSubscriptionUsers = '[SubscriptionUsers] Request Bulk Delete',
  // SuccessBulkDeleteSubscriptionUsers = '[SubscriptionUsers] Success Bulk Delete',
  SetSelectedSubscriptionUsers = '[SubscriptionUsers] Set Selected',
  RequestGetEntirelySubscriptionUsers = '[SubscriptionUsers] Request Get Entirely',
  SuccessGetEntirelySubscriptionUsers = '[SubscriptionUsers] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailSubscriptionUsers implements Action {
  readonly type = SubscriptionUsersActionTypes.RequestFailSubscriptionUsers;
  constructor(public payload: RequestError) {
    // I need the following line in order to load error data
    // in the response hearders such as the X-Flash-Messages
    payload.error.headers.get('');
  }
}

@RequestStatus('pending')
export class RequestGetAllSubscriptionUsers implements Action {
  readonly type = SubscriptionUsersActionTypes.RequestGetAllSubscriptionUsers;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllSubscriptionUsers implements Action {
  readonly type = SubscriptionUsersActionTypes.SuccessGetAllSubscriptionUsers;
  constructor(public payload: SubscriptionUserResponse) {}
}

@RequestStatus('pending')
export class RequestGetSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.RequestGetSubscriptionUser;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.SuccessGetSubscriptionUser;
  constructor(public payload: SubscriptionUser) {}
}

@RequestStatus('pending')
export class RequestPostSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.RequestPostSubscriptionUser;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.SuccessPostSubscriptionUser;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.RequestPutSubscriptionUser;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.SuccessPutSubscriptionUser;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.RequestDeleteSubscriptionUser;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteSubscriptionUser implements Action {
  readonly type = SubscriptionUsersActionTypes.SuccessDeleteSubscriptionUser;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteSubscriptionUsers implements Action {
//   readonly type = SubscriptionUsersActionTypes.RequestBulkDeleteSubscriptionUsers;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteSubscriptionUsers implements Action {
//   readonly type = SubscriptionUsersActionTypes.SuccessBulkDeleteSubscriptionUsers;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedSubscriptionUsers implements Action {
  readonly type = SubscriptionUsersActionTypes.SetSelectedSubscriptionUsers;
  constructor(public payload?: SubscriptionUser[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelySubscriptionUsers implements Action {
  readonly type =
    SubscriptionUsersActionTypes.RequestGetEntirelySubscriptionUsers;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelySubscriptionUsers implements Action {
  readonly type =
    SubscriptionUsersActionTypes.SuccessGetEntirelySubscriptionUsers;
  constructor(public payload: SubscriptionUserResponse) {}
}

export type StatisticsActions =
  | RequestFailSubscriptionUsers
  | RequestGetAllSubscriptionUsers
  | SuccessGetAllSubscriptionUsers
  | RequestGetSubscriptionUser
  | SuccessGetSubscriptionUser
  | RequestPostSubscriptionUser
  | SuccessPostSubscriptionUser
  | RequestPutSubscriptionUser
  | SuccessPutSubscriptionUser
  | RequestDeleteSubscriptionUser
  | SuccessDeleteSubscriptionUser
  // | RequestBulkDeleteSubscriptionUsers
  // | SuccessBulkDeleteSubscriptionUsers
  | SetSelectedSubscriptionUsers
  | RequestGetEntirelySubscriptionUsers
  | SuccessGetEntirelySubscriptionUsers;
