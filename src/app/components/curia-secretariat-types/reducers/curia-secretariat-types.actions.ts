import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaSecretariatTypeResponse,
  CuriaSecretariatType,
} from '../curia-secretariat-type.model';

export enum CuriaSecretariatTypesActionTypes {
  RequestFail = '[CuriaSecretariatTypes] Request Fail',
  RequestGetAll = '[CuriaSecretariatTypes] Request Get All',
  SuccessGetAll = '[CuriaSecretariatTypes] Success Get All',
  ClearGetAll = '[CuriaSecretariatTypes] Clear Get All',
  RequestGet = '[CuriaSecretariatTypes] Request Get',
  SuccessGet = '[CuriaSecretariatTypes] Success Get',
  ClearGet = '[CuriaSecretariatTypes] Clear Get',
  RequestPost = '[CuriaSecretariatTypes] Request Post',
  SuccessPost = '[CuriaSecretariatTypes] Success Post',
  RequestPut = '[CuriaSecretariatTypes] Request Put',
  SuccessPut = '[CuriaSecretariatTypes] Success Put',
  RequestDelete = '[CuriaSecretariatTypes] Request Delete',
  SuccessDelete = '[CuriaSecretariatTypes] Success Delete',
  RequestBulkDelete = '[CuriaSecretariatTypes] Request Bulk Delete',
  SuccessBulkDelete = '[CuriaSecretariatTypes] Success Bulk Delete',
  SetSelected = '[CuriaSecretariatTypes] Set Selected',
  RequestGetEntirely = '[CuriaSecretariatTypes] Request Get Entirely',
  SuccessGetEntirely = '[CuriaSecretariatTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessGetAll;
  constructor(public payload: CuriaSecretariatTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessGet;
  constructor(public payload: CuriaSecretariatType) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestPut;
  constructor(public payload: CuriaSecretariatType) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessPut;
  constructor(public payload: CuriaSecretariatType) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SetSelected;
  constructor(public payload?: CuriaSecretariatType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessGetEntirely;
  constructor(
    public payload: CuriaSecretariatTypeResponse,
    public isDetailsList = false
  ) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestGet
  | SuccessGet
  | ClearGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirely
  | SuccessGetEntirely;
