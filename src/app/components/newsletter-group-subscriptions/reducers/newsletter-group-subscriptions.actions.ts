import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NewsletterGroupSubscriptionResponse,
  NewsletterGroupSubscription,
} from '../newsletter-group-subscription.model';

export enum NewsletterGroupSubscriptionsActionTypes {
  RequestFail = '[NewsletterGroupSubscriptions] Request Fail',
  RequestGetAll = '[NewsletterGroupSubscriptions] Request Get All',
  SuccessGetAll = '[NewsletterGroupSubscriptions] Success Get All',
  ClearGetAll = '[NewsletterGroupSubscriptions] Clear Get All',
  RequestGet = '[NewsletterGroupSubscriptions] Request Get',
  SuccessGet = '[NewsletterGroupSubscriptions] Success Get',
  ClearGet = '[NewsletterGroupSubscriptions] Clear Get',
  RequestPost = '[NewsletterGroupSubscriptions] Request Post',
  SuccessPost = '[NewsletterGroupSubscriptions] Success Post',
  RequestPut = '[NewsletterGroupSubscriptions] Request Put',
  SuccessPut = '[NewsletterGroupSubscriptions] Success Put',
  SetSelected = '[NewsletterGroupSubscriptions] Set Selected',
  RequestGetEntirely = '[NewsletterGroupSubscriptions] Request Get Entirely',
  SuccessGetEntirely = '[NewsletterGroupSubscriptions] Success Get Entirely',

  RequestFailToggle = '[NewsletterGroupSubscriptions] Request Fail Toggle',
  RequestToggle = '[NewsletterGroupSubscriptions] Request Toggle',
  SuccessToggle = '[NewsletterGroupSubscriptions] Success Toggle',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.SuccessGetAll;
  constructor(public payload: NewsletterGroupSubscriptionResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.SuccessGet;
  constructor(public payload: NewsletterGroupSubscription) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestPut;
  constructor(public payload: NewsletterGroupSubscription) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.SuccessPut;
  constructor(public payload: NewsletterGroupSubscription) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.SetSelected;
  constructor(public payload?: NewsletterGroupSubscription[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: NewsletterGroupSubscriptionResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('error')
export class RequestFailToggle implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestFailToggle;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestToggle implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.RequestToggle;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessToggle implements Action {
  readonly type = NewsletterGroupSubscriptionsActionTypes.SuccessToggle;
  constructor(public payload: string) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestGet
  | SuccessGet
  | ClearGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | SetSelected
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestFailToggle
  | RequestToggle
  | SuccessToggle;
