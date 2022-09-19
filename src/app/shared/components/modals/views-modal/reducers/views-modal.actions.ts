import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ViewsResponse, View } from '../views-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ViewsActionTypes {
  RequestFail = '[ViewsModal] Request Fail',
  RequestGetAll = '[ViewsModal] Request Get All',
  SuccessGetAll = '[ViewsModal] Success Get All',
  RequestSetSelected = '[ViewsModal] Request Set Selected',
  SuccessSetSelected = '[ViewsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ViewsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ViewsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ViewsActionTypes.SuccessGetAll;
  constructor(public payload: ViewsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ViewsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ViewsActionTypes.SuccessSetSelected;
  constructor(public payload: View) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
