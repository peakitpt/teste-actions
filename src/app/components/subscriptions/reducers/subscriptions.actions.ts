import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SubscriptionResponse, Subscription } from '../subscription.model';

export enum SubscriptionsActionTypes {
  RequestFailSubscriptions = '[Subscriptions] Request Fail',
  RequestGetAllSubscriptions = '[Subscriptions] Request Get All',
  SuccessGetAllSubscriptions = '[Subscriptions] Success Get All',
  RequestBulkDisableUsersSubscriptions = '[Subscriptions] Request Bulk Disable Users',
  SuccessBulkDisableUsersSubscriptions = '[Subscriptions] Success Bulk Disable Users',
  RequestBulkEnableUsersSubscriptions = '[Subscriptions] Request Bulk Enable Users',
  SuccessBulkEnableUsersSubscriptions = '[Subscriptions] Success Bulk Enable Users',
  RequestBulkDisableSubscriptions = '[Subscriptions] Request Bulk Disable Subscriptions',
  SuccessBulkDisableSubscriptions = '[Subscriptions] Success Bulk Disable Subscriptions',
  RequestSendTestSubscription = '[Subscriptions] Request Send Test',
  SuccessSendTestSubscription = '[Subscriptions] Success Send Test',
  SetSelectedSubscriptions = '[Subscriptions] Set Selected',
  RequestGetEntirelySubscriptions = '[Subscriptions] Request Get Entirely',
  SuccessGetEntirelySubscriptions = '[Subscriptions] Success Get Entirely',
  RequestPost = '[Subscriptions] Request Post',
  SuccessPost = '[Subscriptions] Success Post',
  RequestGetNew = '[Emoluments] Request Get New',
  SuccessGetNew = '[Emoluments] Success Get New',
}

@RequestStatus('error')
export class RequestFailSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.RequestFailSubscriptions;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.RequestGetAllSubscriptions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.SuccessGetAllSubscriptions;
  constructor(public payload: SubscriptionResponse) {}
}

@RequestStatus('pending')
export class RequestBulkDisableUsersSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.RequestBulkDisableUsersSubscriptions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDisableUsersSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.SuccessBulkDisableUsersSubscriptions;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkEnableUsersSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.RequestBulkEnableUsersSubscriptions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkEnableUsersSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.SuccessBulkEnableUsersSubscriptions;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDisableSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.RequestBulkDisableSubscriptions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDisableSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.SuccessBulkDisableSubscriptions;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedSubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.SetSelectedSubscriptions;
  constructor(public payload?: Subscription[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelySubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.RequestGetEntirelySubscriptions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelySubscriptions implements Action {
  readonly type = SubscriptionsActionTypes.SuccessGetEntirelySubscriptions;
  constructor(public payload: SubscriptionResponse) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = SubscriptionsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = SubscriptionsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = SubscriptionsActionTypes.RequestGetNew;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = SubscriptionsActionTypes.SuccessGetNew;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFailSubscriptions
  | RequestGetAllSubscriptions
  | SuccessGetAllSubscriptions
  | RequestBulkDisableUsersSubscriptions
  | SuccessBulkDisableUsersSubscriptions
  | RequestBulkEnableUsersSubscriptions
  | SuccessBulkEnableUsersSubscriptions
  | RequestBulkDisableSubscriptions
  | SuccessBulkDisableSubscriptions
  | SetSelectedSubscriptions
  | RequestGetEntirelySubscriptions
  | SuccessGetEntirelySubscriptions
  | RequestPost
  | SuccessPost
  | RequestGetNew
  | SuccessGetNew;
