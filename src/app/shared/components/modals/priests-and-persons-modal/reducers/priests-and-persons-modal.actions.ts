import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  PriestsAndPersonsResponse,
  PriestsAndPerson,
} from '../priests-and-persons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum PriestsAndPersonsActionTypes {
  RequestFail = '[PriestsAndPersonsModal] Request Fail',
  RequestGetAll = '[PriestsAndPersonsModal] Request Get All',
  SuccessGetAll = '[PriestsAndPersonsModal] Success Get All',
  ClearGetAll = '[PriestsAndPersonsModal] Clear Get All',
  RequestSetSelected = '[PriestsAndPersonsModal] Request Set Selected',
  SuccessSetSelected = '[PriestsAndPersonsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PriestsAndPersonsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PriestsAndPersonsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PriestsAndPersonsActionTypes.SuccessGetAll;
  constructor(public payload: PriestsAndPersonsResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = PriestsAndPersonsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = PriestsAndPersonsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = PriestsAndPersonsActionTypes.SuccessSetSelected;
  constructor(public payload: PriestsAndPerson) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
