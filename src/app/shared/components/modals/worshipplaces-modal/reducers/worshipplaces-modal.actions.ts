import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  WorshipplacesResponse,
  Worshipplace
} from '../worshipplaces-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum WorshipplacesActionTypes {
  RequestFail = '[WorshipplacesModal] Request Fail',
  RequestGetAll = '[WorshipplacesModal] Request Get All',
  SuccessGetAll = '[WorshipplacesModal] Success Get All',
  RequestSetSelected = '[WorshipplacesModal] Request Set Selected',
  SuccessSetSelected = '[WorshipplacesModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = WorshipplacesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = WorshipplacesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = WorshipplacesActionTypes.SuccessGetAll;
  constructor(public payload: WorshipplacesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = WorshipplacesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = WorshipplacesActionTypes.SuccessSetSelected;
  constructor(public payload: Worshipplace) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
