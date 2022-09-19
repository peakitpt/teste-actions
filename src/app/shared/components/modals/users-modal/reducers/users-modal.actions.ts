import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { UsersResponse, User } from '../users-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum UsersActionTypes {
  RequestFail = '[UsersModal] Request Fail',
  RequestGetAll = '[UsersModal] Request Get All',
  SuccessGetAll = '[UsersModal] Success Get All',
  RequestSetSelected = '[UsersModal] Request Set Selected',
  SuccessSetSelected = '[UsersModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = UsersActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = UsersActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = UsersActionTypes.SuccessGetAll;
  constructor(public payload: UsersResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = UsersActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = UsersActionTypes.SuccessSetSelected;
  constructor(public payload: User) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
