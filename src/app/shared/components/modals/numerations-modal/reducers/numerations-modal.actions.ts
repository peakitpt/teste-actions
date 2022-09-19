import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NumerationsResponse, FormationType } from '../numeration-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum NumerationsActionTypes {
  RequestFail = '[NumerationsModal] Request Fail',
  RequestGetAll = '[NumerationsModal] Request Get All',
  SuccessGetAll = '[NumerationsModal] Success Get All',
  RequestSetSelected = '[NumerationsModal] Request Set Selected',
  SuccessSetSelected = '[NumerationsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = NumerationsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = NumerationsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = NumerationsActionTypes.SuccessGetAll;
  constructor(public payload: NumerationsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = NumerationsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = NumerationsActionTypes.SuccessSetSelected;
  constructor(public payload: FormationType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
