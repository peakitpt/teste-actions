import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Reportmanagment } from '../reportmanagment.model';

export enum ReportmanagmentsActionTypes {
  RequestFailReportmanagments = '[Reportmanagments] Request Fail',
  RequestGetAll = '[Reportmanagments] Request Get All',
  SuccessGetAll = '[Reportmanagments] Success Get All',
  RequestGetReportmanagment = '[Reportmanagments] Request Get',
  SuccessGetReportmanagment = '[Reportmanagments] Success Get',
  RequestPostReportmanagment = '[Reportmanagments] Request Post',
  SuccessPostReportmanagment = '[Reportmanagments] Success Post',
  RequestPutReportmanagment = '[Reportmanagments] Request Put',
  SuccessPutReportmanagment = '[Reportmanagments] Success Put',
  RequestDeleteReportmanagment = '[Reportmanagments] Request Delete',
  SuccessDeleteReportmanagment = '[Reportmanagments] Success Delete',
  SetSelectedReportmanagments = '[Reportmanagments] Set Selected',
  RequestGetNew = '[Reportmanagments] Request Get New',
  SuccessGetNew = '[Reportmanagments] Success Get New',
  RequestPostUploadFile = '[Reportmanagments] Request Post Upload File',
  SuccessPostUploadFile = '[Reportmanagments] Success Post Upload File',
}

@RequestStatus('error')
export class RequestFailReportmanagments implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestFailReportmanagments;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestGetReportmanagment;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.SuccessGetReportmanagment;
  constructor(public payload: Reportmanagment) {}
}

@RequestStatus('pending')
export class RequestPostReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestPostReportmanagment;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.SuccessPostReportmanagment;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestPutReportmanagment;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.SuccessPutReportmanagment;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestDeleteReportmanagment;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteReportmanagment implements Action {
  readonly type = ReportmanagmentsActionTypes.SuccessDeleteReportmanagment;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedReportmanagments implements Action {
  readonly type = ReportmanagmentsActionTypes.SetSelectedReportmanagments;
  constructor(public payload?: Reportmanagment[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = ReportmanagmentsActionTypes.SuccessGetNew;
  constructor(public payload: Reportmanagment) {}
}

@RequestStatus('pending')
export class RequestPostUploadFile implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestPostUploadFile;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostUploadFile implements Action {
  readonly type = ReportmanagmentsActionTypes.SuccessPostUploadFile;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ReportmanagmentsActionTypes.RequestGetAll;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ReportmanagmentsActionTypes.SuccessGetAll;
  constructor(public payload: Reportmanagment) {}
}

export type StatisticsActions =
  | RequestFailReportmanagments
  | RequestGetAll
  | SuccessGetAll
  | RequestGetReportmanagment
  | SuccessGetReportmanagment
  | RequestPostReportmanagment
  | SuccessPostReportmanagment
  | RequestPutReportmanagment
  | SuccessPutReportmanagment
  | RequestDeleteReportmanagment
  | SuccessDeleteReportmanagment
  | SetSelectedReportmanagments
  | RequestGetNew
  | SuccessGetNew
  | RequestPostUploadFile
  | SuccessPostUploadFile;
