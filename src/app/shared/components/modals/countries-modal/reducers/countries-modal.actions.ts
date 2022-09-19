import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CountriesResponse, Country } from '../countries-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum CountriesActionTypes {
  RequestFail = '[CountriesModal] Request Fail',
  RequestGetAll = '[CountriesModal] Request Get All',
  SuccessGetAll = '[CountriesModal] Success Get All',
  RequestSetSelected = '[CountriesModal] Request Set Selected',
  SuccessSetSelected = '[CountriesModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CountriesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CountriesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CountriesActionTypes.SuccessGetAll;
  constructor(public payload: CountriesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = CountriesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = CountriesActionTypes.SuccessSetSelected;
  constructor(public payload: Country) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
