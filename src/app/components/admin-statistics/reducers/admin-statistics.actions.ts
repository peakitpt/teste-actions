import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AdminStatistic } from '../admin-statistic.model';

export enum AdminStatisticsActionTypes {
  RequestFailAdminStatistics = '[AdminStatistics] Request Fail',
  RequestGetAdminStatistic = '[AdminStatistics] Request Get',
  SuccessGetAdminStatistic = '[AdminStatistics] Success Get',
  RequestPostAdminStatistic = '[AdminStatistics] Request Post',
  SuccessPostAdminStatistic = '[AdminStatistics] Success Post',
  RequestPutAdminStatistic = '[AdminStatistics] Request Put',
  SuccessPutAdminStatistic = '[AdminStatistics] Success Put',
  RequestDeleteAdminStatistic = '[AdminStatistics] Request Delete',
  SuccessDeleteAdminStatistic = '[AdminStatistics] Success Delete',
  SetSelectedAdminStatistics = '[AdminStatistics] Set Selected',
  RequestGetNew = '[AdminStatistics] Request Get New',
  SuccessGetNew = '[AdminStatistics] Success Get New',
  RequestPostUploadFile = '[AdminStatistics] Request Post Upload File',
  SuccessPostUploadFile = '[AdminStatistics] Success Post Upload File',
}

@RequestStatus('error')
export class RequestFailAdminStatistics implements Action {
  readonly type = AdminStatisticsActionTypes.RequestFailAdminStatistics;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.RequestGetAdminStatistic;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.SuccessGetAdminStatistic;
  constructor(public payload: AdminStatistic) {}
}

@RequestStatus('pending')
export class RequestPostAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.RequestPostAdminStatistic;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.SuccessPostAdminStatistic;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.RequestPutAdminStatistic;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.SuccessPutAdminStatistic;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.RequestDeleteAdminStatistic;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteAdminStatistic implements Action {
  readonly type = AdminStatisticsActionTypes.SuccessDeleteAdminStatistic;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedAdminStatistics implements Action {
  readonly type = AdminStatisticsActionTypes.SetSelectedAdminStatistics;
  constructor(public payload?: AdminStatistic[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AdminStatisticsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AdminStatisticsActionTypes.SuccessGetNew;
  constructor(public payload: AdminStatistic) {}
}

@RequestStatus('pending')
export class RequestPostUploadFile implements Action {
  readonly type = AdminStatisticsActionTypes.RequestPostUploadFile;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostUploadFile implements Action {
  readonly type = AdminStatisticsActionTypes.SuccessPostUploadFile;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFailAdminStatistics
  | RequestGetAdminStatistic
  | SuccessGetAdminStatistic
  | RequestPostAdminStatistic
  | SuccessPostAdminStatistic
  | RequestPutAdminStatistic
  | SuccessPutAdminStatistic
  | RequestDeleteAdminStatistic
  | SuccessDeleteAdminStatistic
  | SetSelectedAdminStatistics
  | RequestGetNew
  | SuccessGetNew
  | RequestPostUploadFile
  | SuccessPostUploadFile;
