import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityPriestsResponse, EntityPriest } from '../priests-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum PriestsActionTypes {
  RequestFail = '[PriestsModal] Request Fail',
  RequestGetAll = '[PriestsModal] Request Get All',
  SuccessGetAll = '[PriestsModal] Success Get All',
  ClearGetAll = '[PriestsModal] Clear Get All',
  RequestSetSelected = '[PriestsModal] Request Set Selected',
  SuccessSetSelected = '[PriestsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PriestsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PriestsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PriestsActionTypes.SuccessGetAll;
  constructor(public payload: EntityPriestsResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = PriestsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = PriestsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = PriestsActionTypes.SuccessSetSelected;
  constructor(public payload: EntityPriest) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
