import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { LayoutsResponse, Layout } from '../layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum LayoutsActionTypes {
  RequestFail = '[LayoutsModal] Request Fail',
  RequestGetAll = '[LayoutsModal] Request Get All',
  SuccessGetAll = '[LayoutsModal] Success Get All',
  RequestSetSelected = '[LayoutsModal] Request Set Selected',
  SuccessSetSelected = '[LayoutsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = LayoutsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = LayoutsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = LayoutsActionTypes.SuccessGetAll;
  constructor(public payload: LayoutsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = LayoutsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = LayoutsActionTypes.SuccessSetSelected;
  constructor(public payload: Layout) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
