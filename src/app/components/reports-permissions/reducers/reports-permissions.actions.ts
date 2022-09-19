import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ReportPermissionResponse,
  ReportPermission
} from '../report-permission.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ReportsPermissionsActionTypes {
  RequestFailReportsPermissions = '[ReportsPermissions] Request Fail',
  RequestGetAllReportsPermissions = '[ReportsPermissions] Request Get All',
  SuccessGetAllReportsPermissions = '[ReportsPermissions] Success Get All',
  RequestGetReport = '[ReportsPermissions] Request Get',
  SuccessGetReport = '[ReportsPermissions] Success Get',
  RequestPostReport = '[ReportsPermissions] Request Post',
  SuccessPostReport = '[ReportsPermissions] Success Post',
  RequestPutReport = '[ReportsPermissions] Request Put',
  SuccessPutReport = '[ReportsPermissions] Success Put',
  RequestUpdateReportPermission = '[ReportsPermissions] Request Update',
  SuccessUpdateReportPermission = '[ReportsPermissions] Success Update',
  RequestDeleteReport = '[ReportsPermissions] Request Delete',
  SuccessDeleteReport = '[ReportsPermissions] Success Delete',
  // RequestBulkDeleteReportsPermissions = '[ReportsPermissions] Request Bulk Delete',
  // SuccessBulkDeleteReportsPermissions = '[ReportsPermissions] Success Bulk Delete',
  SetSelectedReportsPermissions = '[ReportsPermissions] Set Selected',
  SetModalSelectReport = '[ReportsPermissions] Set Modal Select Report',
  RequestGetAllViews = '[Views] Request Get All Views',
  SuccessGetAllViews = '[Views] Success Get All Views'
}

@RequestStatus('error')
export class RequestFailReportsPermissions implements Action {
  readonly type = ReportsPermissionsActionTypes.RequestFailReportsPermissions;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllReportsPermissions implements Action {
  readonly type = ReportsPermissionsActionTypes.RequestGetAllReportsPermissions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllReportsPermissions implements Action {
  readonly type = ReportsPermissionsActionTypes.SuccessGetAllReportsPermissions;
  constructor(public payload: ReportPermissionResponse) {}
}

@RequestStatus('pending')
export class RequestGetReport implements Action {
  readonly type = ReportsPermissionsActionTypes.RequestGetReport;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetReport implements Action {
  readonly type = ReportsPermissionsActionTypes.SuccessGetReport;
  constructor(public payload: ReportPermission) {}
}

@RequestStatus('pending')
export class RequestPostReport implements Action {
  readonly type = ReportsPermissionsActionTypes.RequestPostReport;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostReport implements Action {
  readonly type = ReportsPermissionsActionTypes.SuccessPostReport;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutReport implements Action {
  readonly type = ReportsPermissionsActionTypes.RequestPutReport;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutReport implements Action {
  readonly type = ReportsPermissionsActionTypes.SuccessPutReport;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestUpdateReportPermission implements Action {
  readonly type = ReportsPermissionsActionTypes.RequestUpdateReportPermission;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessUpdateReportPermission implements Action {
  readonly type = ReportsPermissionsActionTypes.SuccessUpdateReportPermission;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteReport implements Action {
  readonly type = ReportsPermissionsActionTypes.RequestDeleteReport;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteReport implements Action {
  readonly type = ReportsPermissionsActionTypes.SuccessDeleteReport;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteReportsPermissions implements Action {
//   readonly type = ReportsPermissionsActionTypes.RequestBulkDeleteReportsPermissions;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteReportsPermissions implements Action {
//   readonly type = ReportsPermissionsActionTypes.SuccessBulkDeleteReportsPermissions;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedReportsPermissions implements Action {
  readonly type = ReportsPermissionsActionTypes.SetSelectedReportsPermissions;
  constructor(public payload?: ReportPermission[]) {}
}

@RequestStatus('default')
export class SetModalSelectReport implements Action {
  readonly type = ReportsPermissionsActionTypes.SetModalSelectReport;
  constructor(public payload?: SelectedModalRow) {}
}

export type StatisticsActions =
  | RequestFailReportsPermissions
  | RequestGetAllReportsPermissions
  | SuccessGetAllReportsPermissions
  | RequestGetReport
  | SuccessGetReport
  | RequestPostReport
  | SuccessPostReport
  | RequestPutReport
  | SuccessPutReport
  | RequestUpdateReportPermission
  | SuccessUpdateReportPermission
  | RequestDeleteReport
  | SuccessDeleteReport
  // | RequestBulkDeleteReportsPermissions
  // | SuccessBulkDeleteReportsPermissions
  | SetSelectedReportsPermissions
  | SetModalSelectReport;
