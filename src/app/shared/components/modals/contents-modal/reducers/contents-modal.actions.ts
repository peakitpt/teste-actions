import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ContentsResponse, Content } from '../contents-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ContentsActionTypes {
  RequestFail = '[ContentsModal] Request Fail',
  RequestGetAll = '[ContentsModal] Request Get All',
  SuccessGetAll = '[ContentsModal] Success Get All',
  RequestSetSelected = '[ContentsModal] Request Set Selected',
  SuccessSetSelected = '[ContentsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ContentsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ContentsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ContentsActionTypes.SuccessGetAll;
  constructor(public payload: ContentsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ContentsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ContentsActionTypes.SuccessSetSelected;
  constructor(public payload: Content) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
