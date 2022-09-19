import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PatronsResponse, Patron } from '../patrons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum PatronsActionTypes {
  RequestFail = '[PatronsModal] Request Fail',
  RequestGetAll = '[PatronsModal] Request Get All',
  SuccessGetAll = '[PatronsModal] Success Get All',
  RequestSetSelected = '[PatronsModal] Request Set Selected',
  SuccessSetSelected = '[PatronsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PatronsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PatronsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PatronsActionTypes.SuccessGetAll;
  constructor(public payload: PatronsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = PatronsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = PatronsActionTypes.SuccessSetSelected;
  constructor(public payload: Patron) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
