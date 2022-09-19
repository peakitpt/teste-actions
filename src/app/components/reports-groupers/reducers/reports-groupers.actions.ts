import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ReportsGrouperResponse,
  ReportsGrouper,
} from '../reports-grouper.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ReportsGroupersActionTypes {
  RequestFailReportsGroupers = '[ReportsGroupers] Request Fail',
  RequestGetAllReportsGroupers = '[ReportsGroupers] Request Get All',
  SuccessGetAllReportsGroupers = '[ReportsGroupers] Success Get All',
  RequestGetReportsGrouper = '[ReportsGroupers] Request Get',
  SuccessGetReportsGrouper = '[ReportsGroupers] Success Get',
  RequestPostReportsGrouper = '[ReportsGroupers] Request Post',
  SuccessPostReportsGrouper = '[ReportsGroupers] Success Post',
  RequestPutReportsGrouper = '[ReportsGroupers] Request Put',
  SuccessPutReportsGrouper = '[ReportsGroupers] Success Put',
  RequestDeleteReportsGrouper = '[ReportsGroupers] Request Delete',
  SuccessDeleteReportsGrouper = '[ReportsGroupers] Success Delete',
  // RequestBulkDeleteReportsGroupers = '[ReportsGroupers] Request Bulk Delete',
  // SuccessBulkDeleteReportsGroupers = '[ReportsGroupers] Success Bulk Delete',
  SetSelectedReportsGroupers = '[ReportsGroupers] Set Selected',
  SetModalSelectReportsGrouper = '[ReportsGroupers] Set Modal Select ReportsGrouper',
  RequestGetEntirelyReportsGroupers = '[ReportsGroupers] Request Get Entirely',
  SuccessGetEntirelyReportsGroupers = '[ReportsGroupers] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailReportsGroupers implements Action {
  readonly type = ReportsGroupersActionTypes.RequestFailReportsGroupers;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllReportsGroupers implements Action {
  readonly type = ReportsGroupersActionTypes.RequestGetAllReportsGroupers;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllReportsGroupers implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessGetAllReportsGroupers;
  constructor(public payload: ReportsGrouperResponse) {}
}

@RequestStatus('pending')
export class RequestGetReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.RequestGetReportsGrouper;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessGetReportsGrouper;
  constructor(public payload: ReportsGrouper) {}
}

@RequestStatus('pending')
export class RequestPostReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.RequestPostReportsGrouper;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessPostReportsGrouper;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.RequestPutReportsGrouper;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessPutReportsGrouper;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.RequestDeleteReportsGrouper;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessDeleteReportsGrouper;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteReportsGroupers implements Action {
//   readonly type = ReportsGroupersActionTypes.RequestBulkDeleteReportsGroupers;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteReportsGroupers implements Action {
//   readonly type = ReportsGroupersActionTypes.SuccessBulkDeleteReportsGroupers;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedReportsGroupers implements Action {
  readonly type = ReportsGroupersActionTypes.SetSelectedReportsGroupers;
  constructor(public payload?: ReportsGrouper[]) {}
}

@RequestStatus('default')
export class SetModalSelectReportsGrouper implements Action {
  readonly type = ReportsGroupersActionTypes.SetModalSelectReportsGrouper;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyReportsGroupers implements Action {
  readonly type = ReportsGroupersActionTypes.RequestGetEntirelyReportsGroupers;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyReportsGroupers implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessGetEntirelyReportsGroupers;
  constructor(public payload: ReportsGrouperResponse) {}
}

export type StatisticsActions =
  | RequestFailReportsGroupers
  | RequestGetAllReportsGroupers
  | SuccessGetAllReportsGroupers
  | RequestGetReportsGrouper
  | SuccessGetReportsGrouper
  | RequestPostReportsGrouper
  | SuccessPostReportsGrouper
  | RequestPutReportsGrouper
  | SuccessPutReportsGrouper
  | RequestDeleteReportsGrouper
  | SuccessDeleteReportsGrouper
  // | RequestBulkDeleteReportsGroupers
  // | SuccessBulkDeleteReportsGroupers
  | SetSelectedReportsGroupers
  | SetModalSelectReportsGrouper
  | RequestGetEntirelyReportsGroupers
  | SuccessGetEntirelyReportsGroupers;
