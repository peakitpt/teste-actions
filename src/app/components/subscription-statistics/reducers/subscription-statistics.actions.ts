import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SubscriptionStatistic } from '../subscription-statistic.model';

export enum SubscriptionStatisticsActionTypes {
  RequestFailSubscriptionStatistics = '[SubscriptionStatistics] Request Fail',
  RequestGetSubscriptionStatistic = '[SubscriptionStatistics] Request Get',
  SuccessGetSubscriptionStatistic = '[SubscriptionStatistics] Success Get',
  RequestPostSubscriptionStatistic = '[SubscriptionStatistics] Request Post',
  SuccessPostSubscriptionStatistic = '[SubscriptionStatistics] Success Post',
  RequestPutSubscriptionStatistic = '[SubscriptionStatistics] Request Put',
  SuccessPutSubscriptionStatistic = '[SubscriptionStatistics] Success Put',
  RequestDeleteSubscriptionStatistic = '[SubscriptionStatistics] Request Delete',
  SuccessDeleteSubscriptionStatistic = '[SubscriptionStatistics] Success Delete',
  SetSelectedSubscriptionStatistics = '[SubscriptionStatistics] Set Selected',
  RequestGetNew = '[SubscriptionStatistics] Request Get New',
  SuccessGetNew = '[SubscriptionStatistics] Success Get New',
  RequestPostUploadFile = '[SubscriptionStatistics] Request Post Upload File',
  SuccessPostUploadFile = '[SubscriptionStatistics] Success Post Upload File',
}

@RequestStatus('error')
export class RequestFailSubscriptionStatistics implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.RequestFailSubscriptionStatistics;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.RequestGetSubscriptionStatistic;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.SuccessGetSubscriptionStatistic;
  constructor(public payload: SubscriptionStatistic) {}
}

@RequestStatus('pending')
export class RequestPostSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.RequestPostSubscriptionStatistic;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.SuccessPostSubscriptionStatistic;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.RequestPutSubscriptionStatistic;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.SuccessPutSubscriptionStatistic;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.RequestDeleteSubscriptionStatistic;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteSubscriptionStatistic implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.SuccessDeleteSubscriptionStatistic;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedSubscriptionStatistics implements Action {
  readonly type =
    SubscriptionStatisticsActionTypes.SetSelectedSubscriptionStatistics;
  constructor(public payload?: SubscriptionStatistic[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = SubscriptionStatisticsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = SubscriptionStatisticsActionTypes.SuccessGetNew;
  constructor(public payload: SubscriptionStatistic) {}
}

@RequestStatus('pending')
export class RequestPostUploadFile implements Action {
  readonly type = SubscriptionStatisticsActionTypes.RequestPostUploadFile;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostUploadFile implements Action {
  readonly type = SubscriptionStatisticsActionTypes.SuccessPostUploadFile;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFailSubscriptionStatistics
  | RequestGetSubscriptionStatistic
  | SuccessGetSubscriptionStatistic
  | RequestPostSubscriptionStatistic
  | SuccessPostSubscriptionStatistic
  | RequestPutSubscriptionStatistic
  | SuccessPutSubscriptionStatistic
  | RequestDeleteSubscriptionStatistic
  | SuccessDeleteSubscriptionStatistic
  | SetSelectedSubscriptionStatistics
  | RequestGetNew
  | SuccessGetNew
  | RequestPostUploadFile
  | SuccessPostUploadFile;
