import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  TreasuryLocationResponse,
  TreasuryLocation,
} from '../treasury-location.model';

export enum TreasuryLocationsActionTypes {
  RequestFailTreasuryLocations = '[TreasuryLocations] Request Fail',
  RequestGetAllTreasuryLocations = '[TreasuryLocations] Request Get All',
  SuccessGetAllTreasuryLocations = '[TreasuryLocations] Success Get All',
  RequestGetTreasuryLocation = '[TreasuryLocations] Request Get',
  SuccessGetTreasuryLocation = '[TreasuryLocations] Success Get',
  RequestPostTreasuryLocation = '[TreasuryLocations] Request Post',
  SuccessPostTreasuryLocation = '[TreasuryLocations] Success Post',
  RequestPutTreasuryLocation = '[TreasuryLocations] Request Put',
  SuccessPutTreasuryLocation = '[TreasuryLocations] Success Put',
  RequestDeleteTreasuryLocation = '[TreasuryLocations] Request Delete',
  SuccessDeleteTreasuryLocation = '[TreasuryLocations] Success Delete',
  // RequestBulkDeleteTreasuryLocations = '[TreasuryLocations] Request Bulk Delete',
  // SuccessBulkDeleteTreasuryLocations = '[TreasuryLocations] Success Bulk Delete',
  SetSelectedTreasuryLocations = '[TreasuryLocations] Set Selected',
  RequestGetEntirelyTreasuryLocations = '[TreasuryLocations] Request Get Entirely',
  SuccessGetEntirelyTreasuryLocations = '[TreasuryLocations] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailTreasuryLocations implements Action {
  readonly type = TreasuryLocationsActionTypes.RequestFailTreasuryLocations;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllTreasuryLocations implements Action {
  readonly type = TreasuryLocationsActionTypes.RequestGetAllTreasuryLocations;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllTreasuryLocations implements Action {
  readonly type = TreasuryLocationsActionTypes.SuccessGetAllTreasuryLocations;
  constructor(public payload: TreasuryLocationResponse) {}
}

@RequestStatus('pending')
export class RequestGetTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.RequestGetTreasuryLocation;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.SuccessGetTreasuryLocation;
  constructor(public payload: TreasuryLocation) {}
}

@RequestStatus('pending')
export class RequestPostTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.RequestPostTreasuryLocation;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.SuccessPostTreasuryLocation;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.RequestPutTreasuryLocation;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.SuccessPutTreasuryLocation;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.RequestDeleteTreasuryLocation;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteTreasuryLocation implements Action {
  readonly type = TreasuryLocationsActionTypes.SuccessDeleteTreasuryLocation;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteTreasuryLocations implements Action {
//   readonly type = TreasuryLocationsActionTypes.RequestBulkDeleteTreasuryLocations;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteTreasuryLocations implements Action {
//   readonly type = TreasuryLocationsActionTypes.SuccessBulkDeleteTreasuryLocations;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedTreasuryLocations implements Action {
  readonly type = TreasuryLocationsActionTypes.SetSelectedTreasuryLocations;
  constructor(public payload?: TreasuryLocation[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyTreasuryLocations implements Action {
  readonly type =
    TreasuryLocationsActionTypes.RequestGetEntirelyTreasuryLocations;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyTreasuryLocations implements Action {
  readonly type =
    TreasuryLocationsActionTypes.SuccessGetEntirelyTreasuryLocations;
  constructor(public payload: TreasuryLocationResponse) {}
}

export type StatisticsActions =
  | RequestFailTreasuryLocations
  | RequestGetAllTreasuryLocations
  | SuccessGetAllTreasuryLocations
  | RequestGetTreasuryLocation
  | SuccessGetTreasuryLocation
  | RequestPostTreasuryLocation
  | SuccessPostTreasuryLocation
  | RequestPutTreasuryLocation
  | SuccessPutTreasuryLocation
  | RequestDeleteTreasuryLocation
  | SuccessDeleteTreasuryLocation
  // | RequestBulkDeleteTreasuryLocations
  // | SuccessBulkDeleteTreasuryLocations
  | SetSelectedTreasuryLocations
  | RequestGetEntirelyTreasuryLocations
  | SuccessGetEntirelyTreasuryLocations;
