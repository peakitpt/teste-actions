import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  SubscriptionLayoutsResponse,
  SubscriptionLayout
} from '../subscription-layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum SubscriptionLayoutsActionTypes {
  RequestFail = '[SubscriptionLayoutsModal] Request Fail',
  RequestGetAll = '[SubscriptionLayoutsModal] Request Get All',
  SuccessGetAll = '[SubscriptionLayoutsModal] Success Get All',
  RequestSetSelected = '[SubscriptionLayoutsModal] Request Set Selected',
  SuccessSetSelected = '[SubscriptionLayoutsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = SubscriptionLayoutsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = SubscriptionLayoutsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = SubscriptionLayoutsActionTypes.SuccessGetAll;
  constructor(public payload: SubscriptionLayoutsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = SubscriptionLayoutsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = SubscriptionLayoutsActionTypes.SuccessSetSelected;
  constructor(public payload: SubscriptionLayout) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
