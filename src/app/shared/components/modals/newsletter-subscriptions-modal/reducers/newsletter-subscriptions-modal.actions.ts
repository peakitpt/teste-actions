import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NewsletterSubscriptionsResponse,
  NewsletterSubscription,
} from '../newsletter-subscriptions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum NewsletterSubscriptionsActionTypes {
  RequestFail = '[NewsletterSubscriptionsModal] Request Fail',
  RequestGetAll = '[NewsletterSubscriptionsModal] Request Get All',
  SuccessGetAll = '[NewsletterSubscriptionsModal] Success Get All',
  RequestSetSelected = '[NewsletterSubscriptionsModal] Request Set Selected',
  SuccessSetSelected = '[NewsletterSubscriptionsModal] Success Set Selected',
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
  constructor(public payload: NewsletterSubscriptionsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = NewsletterSubscriptionsActionTypes.SuccessSetSelected;
  constructor(public payload: NewsletterSubscription) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
