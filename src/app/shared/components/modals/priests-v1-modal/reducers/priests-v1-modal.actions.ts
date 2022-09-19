import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PriestsV1Response, Priest } from '../priests-v1-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum PriestsV1ActionTypes {
  RequestFail = '[PriestsV1Modal] Request Fail',
  RequestGetAll = '[PriestsV1Modal] Request Get All',
  SuccessGetAll = '[PriestsV1Modal] Success Get All',
  ClearGetAll = '[PriestsV1Modal] Clear Get All',
  RequestSetSelected = '[PriestsV1Modal] Request Set Selected',
  SuccessSetSelected = '[PriestsV1Modal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PriestsV1ActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PriestsV1ActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PriestsV1ActionTypes.SuccessGetAll;
  constructor(public payload: PriestsV1Response) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = PriestsV1ActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = PriestsV1ActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = PriestsV1ActionTypes.SuccessSetSelected;
  constructor(public payload: Priest) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
