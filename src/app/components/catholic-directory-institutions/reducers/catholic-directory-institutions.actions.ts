import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CatholicDirectoryInstitutionResponse,
  CatholicDirectoryInstitution,
} from '../catholic-directory-institution.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum CatholicDirectoryInstitutionsActionTypes {
  RequestFailCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Request Fail',
  RequestGetAllCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Request Get All',
  SuccessGetAllCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Success Get All',
  RequestGetCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Request Get',
  SuccessGetCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Success Get',
  RequestPostCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Request Post',
  SuccessPostCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Success Post',
  RequestPutCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Request Put',
  SuccessPutCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Success Put',
  RequestDeleteCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Request Delete',
  SuccessDeleteCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Success Delete',
  // RequestBulkDeleteCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Request Bulk Delete',
  // SuccessBulkDeleteCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Success Bulk Delete',
  SetSelectedCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Set Selected',
  SetModalSelectCatholicDirectoryInstitution = '[CatholicDirectoryInstitutions] Set Modal Select CatholicDirectoryInstitution',
  RequestGetEntirelyCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Request Get Entirely',
  SuccessGetEntirelyCatholicDirectoryInstitutions = '[CatholicDirectoryInstitutions] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailCatholicDirectoryInstitutions implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.RequestFailCatholicDirectoryInstitutions;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCatholicDirectoryInstitutions implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.RequestGetAllCatholicDirectoryInstitutions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCatholicDirectoryInstitutions implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SuccessGetAllCatholicDirectoryInstitutions;
  constructor(public payload: CatholicDirectoryInstitutionResponse) {}
}

@RequestStatus('pending')
export class RequestGetCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.RequestGetCatholicDirectoryInstitution;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SuccessGetCatholicDirectoryInstitution;
  constructor(public payload: CatholicDirectoryInstitution) {}
}

@RequestStatus('pending')
export class RequestPostCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.RequestPostCatholicDirectoryInstitution;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SuccessPostCatholicDirectoryInstitution;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.RequestPutCatholicDirectoryInstitution;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SuccessPutCatholicDirectoryInstitution;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.RequestDeleteCatholicDirectoryInstitution;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SuccessDeleteCatholicDirectoryInstitution;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCatholicDirectoryInstitutions implements Action {
//   readonly type = CatholicDirectoryInstitutionsActionTypes.RequestBulkDeleteCatholicDirectoryInstitutions;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCatholicDirectoryInstitutions implements Action {
//   readonly type = CatholicDirectoryInstitutionsActionTypes.SuccessBulkDeleteCatholicDirectoryInstitutions;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedCatholicDirectoryInstitutions implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SetSelectedCatholicDirectoryInstitutions;
  constructor(public payload?: CatholicDirectoryInstitution[]) {}
}

@RequestStatus('default')
export class SetModalSelectCatholicDirectoryInstitution implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SetModalSelectCatholicDirectoryInstitution;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCatholicDirectoryInstitutions implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.RequestGetEntirelyCatholicDirectoryInstitutions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCatholicDirectoryInstitutions implements Action {
  readonly type =
    CatholicDirectoryInstitutionsActionTypes.SuccessGetEntirelyCatholicDirectoryInstitutions;
  constructor(public payload: CatholicDirectoryInstitutionResponse) {}
}

export type StatisticsActions =
  | RequestFailCatholicDirectoryInstitutions
  | RequestGetAllCatholicDirectoryInstitutions
  | SuccessGetAllCatholicDirectoryInstitutions
  | RequestGetCatholicDirectoryInstitution
  | SuccessGetCatholicDirectoryInstitution
  | RequestPostCatholicDirectoryInstitution
  | SuccessPostCatholicDirectoryInstitution
  | RequestPutCatholicDirectoryInstitution
  | SuccessPutCatholicDirectoryInstitution
  | RequestDeleteCatholicDirectoryInstitution
  | SuccessDeleteCatholicDirectoryInstitution
  // | RequestBulkDeleteCatholicDirectoryInstitutions
  // | SuccessBulkDeleteCatholicDirectoryInstitutions
  | SetSelectedCatholicDirectoryInstitutions
  | SetModalSelectCatholicDirectoryInstitution
  | RequestGetEntirelyCatholicDirectoryInstitutions
  | SuccessGetEntirelyCatholicDirectoryInstitutions;
