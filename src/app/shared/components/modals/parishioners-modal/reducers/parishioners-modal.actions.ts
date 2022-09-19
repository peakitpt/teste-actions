import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ParishionersResponse, Parishioner } from '../parishioners-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ParishionersActionTypes {
  RequestFail = '[ParishionersModal] Request Fail',
  RequestGetAll = '[ParishionersModal] Request Get All',
  SuccessGetAll = '[ParishionersModal] Success Get All',
  RequestSetSelected = '[ParishionersModal] Request Set Selected',
  SuccessSetSelected = '[ParishionersModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ParishionersActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ParishionersActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ParishionersActionTypes.SuccessGetAll;
  constructor(public payload: ParishionersResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ParishionersActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ParishionersActionTypes.SuccessSetSelected;
  constructor(public payload: Parishioner) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
