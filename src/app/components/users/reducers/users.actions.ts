import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { UserResponse, User } from '../user.model';

export enum UsersActionTypes {
  RequestFailUsers = '[Users] Request Fail',
  RequestGetAllUsers = '[Users] Request Get All',
  SuccessGetAllUsers = '[Users] Success Get All',
  RequestGetUser = '[Users] Request Get',
  SuccessGetUser = '[Users] Success Get',
  RequestPostUser = '[Users] Request Post',
  SuccessPostUser = '[Users] Success Post',
  RequestPutUser = '[Users] Request Put',
  SuccessPutUser = '[Users] Success Put',
  RequestDeleteUser = '[Users] Request Delete',
  SuccessDeleteUser = '[Users] Success Delete',
  // RequestBulkDeleteUsers = '[Users] Request Bulk Delete',
  // SuccessBulkDeleteUsers = '[Users] Success Bulk Delete',
  SetSelectedUsers = '[Users] Set Selected',
  RequestGetEntirelyUsers = '[Users] Request Get Entirely',
  SuccessGetEntirelyUsers = '[Users] Success Get Entirely',
  RequestChangeUserPassword = '[Users] Request Change User Password',
  SuccessChangeUserPassword = '[Users] Success Change User Password',
}

@RequestStatus('error')
export class RequestFailUsers implements Action {
  readonly type = UsersActionTypes.RequestFailUsers;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllUsers implements Action {
  readonly type = UsersActionTypes.RequestGetAllUsers;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllUsers implements Action {
  readonly type = UsersActionTypes.SuccessGetAllUsers;
  constructor(public payload: UserResponse) {}
}

@RequestStatus('pending')
export class RequestGetUser implements Action {
  readonly type = UsersActionTypes.RequestGetUser;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetUser implements Action {
  readonly type = UsersActionTypes.SuccessGetUser;
  constructor(public payload: User) {}
}

@RequestStatus('pending')
export class RequestPostUser implements Action {
  readonly type = UsersActionTypes.RequestPostUser;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostUser implements Action {
  readonly type = UsersActionTypes.SuccessPostUser;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutUser implements Action {
  readonly type = UsersActionTypes.RequestPutUser;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutUser implements Action {
  readonly type = UsersActionTypes.SuccessPutUser;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestChangeUserPassword implements Action {
  readonly type = UsersActionTypes.RequestChangeUserPassword;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessChangeUserPassword implements Action {
  readonly type = UsersActionTypes.SuccessChangeUserPassword;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteUser implements Action {
  readonly type = UsersActionTypes.RequestDeleteUser;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteUser implements Action {
  readonly type = UsersActionTypes.SuccessDeleteUser;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteUsers implements Action {
//   readonly type = UsersActionTypes.RequestBulkDeleteUsers;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteUsers implements Action {
//   readonly type = UsersActionTypes.SuccessBulkDeleteUsers;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedUsers implements Action {
  readonly type = UsersActionTypes.SetSelectedUsers;
  constructor(public payload?: User[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyUsers implements Action {
  readonly type = UsersActionTypes.RequestGetEntirelyUsers;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyUsers implements Action {
  readonly type = UsersActionTypes.SuccessGetEntirelyUsers;
  constructor(public payload: UserResponse) {}
}

export type StatisticsActions =
  | RequestFailUsers
  | RequestGetAllUsers
  | SuccessGetAllUsers
  | RequestGetUser
  | SuccessGetUser
  | RequestPostUser
  | SuccessPostUser
  | RequestPutUser
  | SuccessPutUser
  | RequestDeleteUser
  | SuccessDeleteUser
  // | RequestBulkDeleteUsers
  // | SuccessBulkDeleteUsers
  | SetSelectedUsers
  | RequestGetEntirelyUsers
  | SuccessGetEntirelyUsers;
