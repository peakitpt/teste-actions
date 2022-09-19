import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ReportResponse, Report } from '../report.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ReportsActionTypes {
  RequestFailReports = '[Reports] Request Fail',
  RequestGetAllReports = '[Reports] Request Get All',
  SuccessGetAllReports = '[Reports] Success Get All',
  RequestGetListReports = '[Reports] Request Get List Reports',
  SuccessGetListReports = '[Reports] Success Get List Reports',
  RequestGetFormReports = '[Reports] Request Get Form Reports',
  SuccessGetFormReports = '[Reports] Success Get Form Reports',
  RequestGetReport = '[Reports] Request Get',
  SuccessGetReport = '[Reports] Success Get',
  RequestPostReport = '[Reports] Request Post',
  SuccessPostReport = '[Reports] Success Post',
  RequestPutReport = '[Reports] Request Put',
  SuccessPutReport = '[Reports] Success Put',
  RequestDeleteReport = '[Reports] Request Delete',
  SuccessDeleteReport = '[Reports] Success Delete',
  // RequestBulkDeleteReports = '[Reports] Request Bulk Delete',
  // SuccessBulkDeleteReports = '[Reports] Success Bulk Delete',
  SetSelectedReports = '[Reports] Set Selected',
  SetModalSelectReport = '[Reports] Set Modal Select Report',
  RequestGetAllViews = '[Views] Request Get All Views',
  SuccessGetAllViews = '[Views] Success Get All Views',
  RequestGetListSubscriptionReports = '[Subscription Reports] Request Get List Subscription Reports',
  SuccessGetListSubscriptionReports = '[Subscription Reports] Success Get List Subscription Reports',
  RequestGetFormSubscriptionReports = '[Subscription Reports] Request Get Form Subscription Reports',
  SuccessGetFormSubscriptionReports = '[Subscription Reports] Success Get Form Subscription Reports',
  RequestGetEntirelyReports = '[Reports] Request Get Entirely',
  SuccessGetEntirelyReports = '[Reports] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailReports implements Action {
  readonly type = ReportsActionTypes.RequestFailReports;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllReports implements Action {
  readonly type = ReportsActionTypes.RequestGetAllReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllReports implements Action {
  readonly type = ReportsActionTypes.SuccessGetAllReports;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('pending')
export class RequestGetListReports implements Action {
  readonly type = ReportsActionTypes.RequestGetListReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetListReports implements Action {
  readonly type = ReportsActionTypes.SuccessGetListReports;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('pending')
export class RequestGetFormReports implements Action {
  readonly type = ReportsActionTypes.RequestGetFormReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetFormReports implements Action {
  readonly type = ReportsActionTypes.SuccessGetFormReports;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('pending')
export class RequestGetReport implements Action {
  readonly type = ReportsActionTypes.RequestGetReport;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetReport implements Action {
  readonly type = ReportsActionTypes.SuccessGetReport;
  constructor(public payload: Report) {}
}

@RequestStatus('pending')
export class RequestPostReport implements Action {
  readonly type = ReportsActionTypes.RequestPostReport;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostReport implements Action {
  readonly type = ReportsActionTypes.SuccessPostReport;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutReport implements Action {
  readonly type = ReportsActionTypes.RequestPutReport;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutReport implements Action {
  readonly type = ReportsActionTypes.SuccessPutReport;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestDeleteReport implements Action {
  readonly type = ReportsActionTypes.RequestDeleteReport;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteReport implements Action {
  readonly type = ReportsActionTypes.SuccessDeleteReport;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteReports implements Action {
//   readonly type = ReportsActionTypes.RequestBulkDeleteReports;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteReports implements Action {
//   readonly type = ReportsActionTypes.SuccessBulkDeleteReports;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedReports implements Action {
  readonly type = ReportsActionTypes.SetSelectedReports;
  constructor(public payload?: Report[]) {}
}

@RequestStatus('default')
export class SetModalSelectReport implements Action {
  readonly type = ReportsActionTypes.SetModalSelectReport;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetAllViews implements Action {
  readonly type = ReportsActionTypes.RequestGetAllViews;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllViews implements Action {
  readonly type = ReportsActionTypes.SuccessGetAllViews;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('pending')
export class RequestGetListSubscriptionReports implements Action {
  readonly type = ReportsActionTypes.RequestGetListSubscriptionReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetListSubscriptionReports implements Action {
  readonly type = ReportsActionTypes.SuccessGetListSubscriptionReports;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('pending')
export class RequestGetFormSubscriptionReports implements Action {
  readonly type = ReportsActionTypes.RequestGetFormSubscriptionReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetFormSubscriptionReports implements Action {
  readonly type = ReportsActionTypes.SuccessGetFormSubscriptionReports;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyReports implements Action {
  readonly type = ReportsActionTypes.RequestGetEntirelyReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyReports implements Action {
  readonly type = ReportsActionTypes.SuccessGetEntirelyReports;
  constructor(public payload: ReportResponse) {}
}

export type StatisticsActions =
  | RequestFailReports
  | RequestGetAllReports
  | SuccessGetAllReports
  | RequestGetListReports
  | SuccessGetListReports
  | RequestGetFormReports
  | SuccessGetFormReports
  | RequestGetReport
  | SuccessGetReport
  | RequestPostReport
  | SuccessPostReport
  | RequestPutReport
  | SuccessPutReport
  | RequestDeleteReport
  | SuccessDeleteReport
  // | RequestBulkDeleteReports
  // | SuccessBulkDeleteReports
  | SetSelectedReports
  | SetModalSelectReport
  | RequestGetAllViews
  | SuccessGetAllViews
  | RequestGetListSubscriptionReports
  | SuccessGetListSubscriptionReports
  | RequestGetFormSubscriptionReports
  | SuccessGetFormSubscriptionReports
  | RequestGetEntirelyReports
  | SuccessGetEntirelyReports;
