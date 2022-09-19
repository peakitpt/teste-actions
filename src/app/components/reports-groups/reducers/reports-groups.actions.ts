import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ReportsGroupResponse, ReportsGroup } from '../reports-group.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ReportsGroupsActionTypes {
  RequestFailReportsGroups = '[ReportsGroups] Request Fail',
  RequestGetAllReportsGroups = '[ReportsGroups] Request Get All',
  SuccessGetAllReportsGroups = '[ReportsGroups] Success Get All',
  RequestGetReportsGroup = '[ReportsGroups] Request Get',
  SuccessGetReportsGroup = '[ReportsGroups] Success Get',
  RequestPostReportsGroup = '[ReportsGroups] Request Post',
  SuccessPostReportsGroup = '[ReportsGroups] Success Post',
  RequestPutReportsGroup = '[ReportsGroups] Request Put',
  SuccessPutReportsGroup = '[ReportsGroups] Success Put',
  RequestDeleteReportsGroup = '[ReportsGroups] Request Delete',
  SuccessDeleteReportsGroup = '[ReportsGroups] Success Delete',
  // RequestBulkDeleteReportsGroups = '[ReportsGroups] Request Bulk Delete',
  // SuccessBulkDeleteReportsGroups = '[ReportsGroups] Success Bulk Delete',
  SetSelectedReportsGroups = '[ReportsGroups] Set Selected',
  SetModalSelectReportsGroup = '[ReportsGroups] Set Modal Select ReportsGroup',
  RequestGetEntirelyReportsGroups = '[ReportsGroups] Request Get Entirely',
  SuccessGetEntirelyReportsGroups = '[ReportsGroups] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailReportsGroups implements Action {
  readonly type = ReportsGroupsActionTypes.RequestFailReportsGroups;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllReportsGroups implements Action {
  readonly type = ReportsGroupsActionTypes.RequestGetAllReportsGroups;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllReportsGroups implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessGetAllReportsGroups;
  constructor(public payload: ReportsGroupResponse) {}
}

@RequestStatus('pending')
export class RequestGetReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.RequestGetReportsGroup;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessGetReportsGroup;
  constructor(public payload: ReportsGroup) {}
}

@RequestStatus('pending')
export class RequestPostReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.RequestPostReportsGroup;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessPostReportsGroup;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.RequestPutReportsGroup;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessPutReportsGroup;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.RequestDeleteReportsGroup;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessDeleteReportsGroup;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteReportsGroups implements Action {
//   readonly type = ReportsGroupsActionTypes.RequestBulkDeleteReportsGroups;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteReportsGroups implements Action {
//   readonly type = ReportsGroupsActionTypes.SuccessBulkDeleteReportsGroups;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedReportsGroups implements Action {
  readonly type = ReportsGroupsActionTypes.SetSelectedReportsGroups;
  constructor(public payload?: ReportsGroup[]) {}
}

@RequestStatus('default')
export class SetModalSelectReportsGroup implements Action {
  readonly type = ReportsGroupsActionTypes.SetModalSelectReportsGroup;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyReportsGroups implements Action {
  readonly type = ReportsGroupsActionTypes.RequestGetEntirelyReportsGroups;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyReportsGroups implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessGetEntirelyReportsGroups;
  constructor(public payload: ReportsGroupResponse) {}
}

export type StatisticsActions =
  | RequestFailReportsGroups
  | RequestGetAllReportsGroups
  | SuccessGetAllReportsGroups
  | RequestGetReportsGroup
  | SuccessGetReportsGroup
  | RequestPostReportsGroup
  | SuccessPostReportsGroup
  | RequestPutReportsGroup
  | SuccessPutReportsGroup
  | RequestDeleteReportsGroup
  | SuccessDeleteReportsGroup
  // | RequestBulkDeleteReportsGroups
  // | SuccessBulkDeleteReportsGroups
  | SetSelectedReportsGroups
  | SetModalSelectReportsGroup
  | RequestGetEntirelyReportsGroups
  | SuccessGetEntirelyReportsGroups;
