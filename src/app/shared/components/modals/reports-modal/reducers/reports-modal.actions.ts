import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ReportResponse, Report } from '../reports-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ReportsActionTypes {
  RequestFail = '[ReportsModal] Request Fail',
  RequestGetAll = '[ReportsModal] Request Get All',
  SuccessGetAll = '[ReportsModal] Success Get All',
  ClearGetAll = '[ReportsModal] Clear Get All',
  RequestSetSelected = '[ReportsModal] Request Set Selected',
  SuccessSetSelected = '[ReportsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ReportsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ReportsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ReportsActionTypes.SuccessGetAll;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = ReportsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ReportsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ReportsActionTypes.SuccessSetSelected;
  constructor(public payload: Report) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
