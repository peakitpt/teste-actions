import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ReportsGrouperResponse,
  ReportsGrouper,
} from '../reports-groupers-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ReportsGroupersActionTypes {
  RequestFail = '[ReportsGroupersModal] Request Fail',
  RequestGetAll = '[ReportsGroupersModal] Request Get All',
  SuccessGetAll = '[ReportsGroupersModal] Success Get All',
  ClearGetAll = '[ReportsGroupersModal] Clear Get All',
  RequestSetSelected = '[ReportsGroupersModal] Request Set Selected',
  SuccessSetSelected = '[ReportsGroupersModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ReportsGroupersActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ReportsGroupersActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessGetAll;
  constructor(public payload: ReportsGrouperResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = ReportsGroupersActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ReportsGroupersActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ReportsGroupersActionTypes.SuccessSetSelected;
  constructor(public payload: ReportsGrouper) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
