import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

export enum AuthActionTypes {
  RequestFailLogIn = '[Log In] Request Fail',
  RequestPostLogIn = '[Log In] Request Post LogIn',
  SuccessPostLogIn = '[Log In] Success Post LogIn',
  RequestLogOut = '[Log Out] Request LogOut',
  SuccessLogOut = '[Log Out] Success LogOut',
}

@RequestStatus('error')
export class RequestFailLogIn implements Action {
  readonly type = AuthActionTypes.RequestFailLogIn;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestPostLogIn implements Action {
  readonly type = AuthActionTypes.RequestPostLogIn;
  constructor(public payload: any) {}
}

@RequestStatus('default')
export class SuccessPostLogIn implements Action {
  readonly type = AuthActionTypes.SuccessPostLogIn;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestLogOut implements Action {
  readonly type = AuthActionTypes.RequestLogOut;
  constructor() {}
}

@RequestStatus('default')
export class SuccessLogOut implements Action {
  readonly type = AuthActionTypes.SuccessLogOut;
  constructor(public payload: any) {}
}

export type StatisticsActions =
  | RequestFailLogIn
  | RequestPostLogIn
  | SuccessPostLogIn
  | RequestLogOut
  | SuccessLogOut;
