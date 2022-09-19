import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NewsletterSubscriptionResponse } from '../newsletter-subscription.model';

export enum NewsletterSubscriptionsActionTypes {
  RequestFail = '[NewsletterSubscriptions] Request Fail',
  RequestGetAll = '[NewsletterSubscriptions] Request Get All',
  SuccessGetAll = '[NewsletterSubscriptions] Success Get All',
  ClearGetAll = '[NewsletterSubscriptions] Clear Get All',
  RequestFailToggle = '[NewsletterSubscriptions] Request Fail Toggle',
  RequestToggle = '[NewsletterSubscriptions] Request Toggle',
  SuccessToggle = '[NewsletterSubscriptions] Success Toggle',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.SuccessGetAll;
  constructor(public payload: NewsletterSubscriptionResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('error')
export class RequestFailToggle implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.RequestFailToggle;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestToggle implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.RequestToggle;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessToggle implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.SuccessToggle;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestFailToggle
  | RequestToggle
  | SuccessToggle;
