import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CatholicDirectoryPriestResponse,
  CatholicDirectoryPriest,
} from '../catholic-directory-priest.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum CatholicDirectoryPriestsActionTypes {
  RequestFailCatholicDirectoryPriests = '[CatholicDirectoryPriests] Request Fail',
  RequestGetAllCatholicDirectoryPriests = '[CatholicDirectoryPriests] Request Get All',
  SuccessGetAllCatholicDirectoryPriests = '[CatholicDirectoryPriests] Success Get All',
  RequestGetCatholicDirectoryPriest = '[CatholicDirectoryPriests] Request Get',
  SuccessGetCatholicDirectoryPriest = '[CatholicDirectoryPriests] Success Get',
  RequestPostCatholicDirectoryPriest = '[CatholicDirectoryPriests] Request Post',
  SuccessPostCatholicDirectoryPriest = '[CatholicDirectoryPriests] Success Post',
  RequestPutCatholicDirectoryPriest = '[CatholicDirectoryPriests] Request Put',
  SuccessPutCatholicDirectoryPriest = '[CatholicDirectoryPriests] Success Put',
  RequestDeleteCatholicDirectoryPriest = '[CatholicDirectoryPriests] Request Delete',
  SuccessDeleteCatholicDirectoryPriest = '[CatholicDirectoryPriests] Success Delete',
  // RequestBulkDeleteCatholicDirectoryPriests = '[CatholicDirectoryPriests] Request Bulk Delete',
  // SuccessBulkDeleteCatholicDirectoryPriests = '[CatholicDirectoryPriests] Success Bulk Delete',
  SetSelectedCatholicDirectoryPriests = '[CatholicDirectoryPriests] Set Selected',
  SetModalSelectCatholicDirectoryPriest = '[CatholicDirectoryPriests] Set Modal Select CatholicDirectoryPriest',
  RequestGetEntirelyCatholicDirectoryPriests = '[CatholicDirectoryPriests] Request Get Entirely',
  SuccessGetEntirelyCatholicDirectoryPriests = '[CatholicDirectoryPriests] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailCatholicDirectoryPriests implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.RequestFailCatholicDirectoryPriests;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCatholicDirectoryPriests implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.RequestGetAllCatholicDirectoryPriests;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCatholicDirectoryPriests implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SuccessGetAllCatholicDirectoryPriests;
  constructor(public payload: CatholicDirectoryPriestResponse) {}
}

@RequestStatus('pending')
export class RequestGetCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.RequestGetCatholicDirectoryPriest;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SuccessGetCatholicDirectoryPriest;
  constructor(public payload: CatholicDirectoryPriest) {}
}

@RequestStatus('pending')
export class RequestPostCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.RequestPostCatholicDirectoryPriest;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SuccessPostCatholicDirectoryPriest;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.RequestPutCatholicDirectoryPriest;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SuccessPutCatholicDirectoryPriest;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.RequestDeleteCatholicDirectoryPriest;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SuccessDeleteCatholicDirectoryPriest;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCatholicDirectoryPriests implements Action {
//   readonly type = CatholicDirectoryPriestsActionTypes.RequestBulkDeleteCatholicDirectoryPriests;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCatholicDirectoryPriests implements Action {
//   readonly type = CatholicDirectoryPriestsActionTypes.SuccessBulkDeleteCatholicDirectoryPriests;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedCatholicDirectoryPriests implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SetSelectedCatholicDirectoryPriests;
  constructor(public payload?: CatholicDirectoryPriest[]) {}
}

@RequestStatus('default')
export class SetModalSelectCatholicDirectoryPriest implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SetModalSelectCatholicDirectoryPriest;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCatholicDirectoryPriests implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.RequestGetEntirelyCatholicDirectoryPriests;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCatholicDirectoryPriests implements Action {
  readonly type =
    CatholicDirectoryPriestsActionTypes.SuccessGetEntirelyCatholicDirectoryPriests;
  constructor(public payload: CatholicDirectoryPriestResponse) {}
}

export type StatisticsActions =
  | RequestFailCatholicDirectoryPriests
  | RequestGetAllCatholicDirectoryPriests
  | SuccessGetAllCatholicDirectoryPriests
  | RequestGetCatholicDirectoryPriest
  | SuccessGetCatholicDirectoryPriest
  | RequestPostCatholicDirectoryPriest
  | SuccessPostCatholicDirectoryPriest
  | RequestPutCatholicDirectoryPriest
  | SuccessPutCatholicDirectoryPriest
  | RequestDeleteCatholicDirectoryPriest
  | SuccessDeleteCatholicDirectoryPriest
  // | RequestBulkDeleteCatholicDirectoryPriests
  // | SuccessBulkDeleteCatholicDirectoryPriests
  | SetSelectedCatholicDirectoryPriests
  | SetModalSelectCatholicDirectoryPriest
  | RequestGetEntirelyCatholicDirectoryPriests
  | SuccessGetEntirelyCatholicDirectoryPriests;
