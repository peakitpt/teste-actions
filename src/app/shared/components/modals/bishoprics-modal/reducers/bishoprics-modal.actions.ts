import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { BishopricsResponse, Bishopric } from '../bishoprics-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum BishopricsActionTypes {
  RequestFail = '[BishopricsModal] Request Fail',
  RequestGetAll = '[BishopricsModal] Request Get All',
  SuccessGetAll = '[BishopricsModal] Success Get All',
  RequestSetSelected = '[BishopricsModal] Request Set Selected',
  SuccessSetSelected = '[BishopricsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = BishopricsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = BishopricsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = BishopricsActionTypes.SuccessGetAll;
  constructor(public payload: BishopricsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = BishopricsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = BishopricsActionTypes.SuccessSetSelected;
  constructor(public payload: Bishopric) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
