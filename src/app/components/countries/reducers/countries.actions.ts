import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CountryResponse, Country } from '../country.model';

export enum CountriesActionTypes {
  RequestFailCountries = '[Countries] Request Fail',
  RequestGetAllCountries = '[Countries] Request Get All',
  SuccessGetAllCountries = '[Countries] Success Get All',
  RequestGetCountry = '[Countries] Request Get',
  SuccessGetCountry = '[Countries] Success Get',
  RequestPostCountry = '[Countries] Request Post',
  SuccessPostCountry = '[Countries] Success Post',
  RequestPutCountry = '[Countries] Request Put',
  SuccessPutCountry = '[Countries] Success Put',
  RequestDeleteCountry = '[Countries] Request Delete',
  SuccessDeleteCountry = '[Countries] Success Delete',
  // RequestBulkDeleteCountries = '[Countries] Request Bulk Delete',
  // SuccessBulkDeleteCountries = '[Countries] Success Bulk Delete',
  SetSelectedCountries = '[Countries] Set Selected',
  RequestGetEntirelyCountries = '[Countries] Request Get Entirely',
  SuccessGetEntirelyCountries = '[Countries] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailCountries implements Action {
  readonly type = CountriesActionTypes.RequestFailCountries;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCountries implements Action {
  readonly type = CountriesActionTypes.RequestGetAllCountries;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCountries implements Action {
  readonly type = CountriesActionTypes.SuccessGetAllCountries;
  constructor(public payload: CountryResponse) {}
}

@RequestStatus('pending')
export class RequestGetCountry implements Action {
  readonly type = CountriesActionTypes.RequestGetCountry;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCountry implements Action {
  readonly type = CountriesActionTypes.SuccessGetCountry;
  constructor(public payload: Country) {}
}

@RequestStatus('pending')
export class RequestPostCountry implements Action {
  readonly type = CountriesActionTypes.RequestPostCountry;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCountry implements Action {
  readonly type = CountriesActionTypes.SuccessPostCountry;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCountry implements Action {
  readonly type = CountriesActionTypes.RequestPutCountry;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCountry implements Action {
  readonly type = CountriesActionTypes.SuccessPutCountry;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCountry implements Action {
  readonly type = CountriesActionTypes.RequestDeleteCountry;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCountry implements Action {
  readonly type = CountriesActionTypes.SuccessDeleteCountry;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCountries implements Action {
//   readonly type = CountriesActionTypes.RequestBulkDeleteCountries;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCountries implements Action {
//   readonly type = CountriesActionTypes.SuccessBulkDeleteCountries;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedCountries implements Action {
  readonly type = CountriesActionTypes.SetSelectedCountries;
  constructor(public payload?: Country[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCountries implements Action {
  readonly type = CountriesActionTypes.RequestGetEntirelyCountries;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCountries implements Action {
  readonly type = CountriesActionTypes.SuccessGetEntirelyCountries;
  constructor(public payload: CountryResponse) {}
}

export type StatisticsActions =
  | RequestFailCountries
  | RequestGetAllCountries
  | SuccessGetAllCountries
  | RequestGetCountry
  | SuccessGetCountry
  | RequestPostCountry
  | SuccessPostCountry
  | RequestPutCountry
  | SuccessPutCountry
  | RequestDeleteCountry
  | SuccessDeleteCountry
  // | RequestBulkDeleteCountries
  // | SuccessBulkDeleteCountries
  | SetSelectedCountries
  | RequestGetEntirelyCountries
  | SuccessGetEntirelyCountries;
