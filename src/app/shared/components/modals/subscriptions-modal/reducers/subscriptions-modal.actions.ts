import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  SubscriptionsResponse,
  Subscription
} from '../subscriptions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum SubscriptionsActionTypes {
  RequestFail = '[SubscriptionsModal] Request Fail',
  RequestGetAll = '[SubscriptionsModal] Request Get All',
  SuccessGetAll = '[SubscriptionsModal] Success Get All',
  RequestSetSelected = '[SubscriptionsModal] Request Set Selected',
  SuccessSetSelected = '[SubscriptionsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = SubscriptionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = SubscriptionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = SubscriptionsActionTypes.SuccessGetAll;
  constructor(public payload: SubscriptionsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = SubscriptionsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = SubscriptionsActionTypes.SuccessSetSelected;
  constructor(public payload: Subscription) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
