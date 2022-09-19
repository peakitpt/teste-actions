import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccrualTypesResponse,
  AccrualType,
} from '../accrual-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccrualTypesActionTypes {
  RequestFail = '[AccrualTypesModal] Request Fail',
  RequestGetAll = '[AccrualTypesModal] Request Get All',
  SuccessGetAll = '[AccrualTypesModal] Success Get All',
  RequestSetSelected = '[AccrualTypesModal] Request Set Selected',
  SuccessSetSelected = '[AccrualTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccrualTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccrualTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccrualTypesActionTypes.SuccessGetAll;
  constructor(public payload: AccrualTypesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AccrualTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AccrualTypesActionTypes.SuccessSetSelected;
  constructor(public payload: AccrualType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
