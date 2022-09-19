import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ReportsGroupResponse,
  ReportsGroup,
} from '../reports-groups-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ReportsGroupsActionTypes {
  RequestFail = '[ReportsGroupsModal] Request Fail',
  RequestGetAll = '[ReportsGroupsModal] Request Get All',
  SuccessGetAll = '[ReportsGroupsModal] Success Get All',
  ClearGetAll = '[ReportsGroupsModal] Clear Get All',
  RequestSetSelected = '[ReportsGroupsModal] Request Set Selected',
  SuccessSetSelected = '[ReportsGroupsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ReportsGroupsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ReportsGroupsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessGetAll;
  constructor(public payload: ReportsGroupResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = ReportsGroupsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ReportsGroupsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ReportsGroupsActionTypes.SuccessSetSelected;
  constructor(public payload: ReportsGroup) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
