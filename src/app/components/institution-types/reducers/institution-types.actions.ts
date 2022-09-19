import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { InstitutionTypeResponse, InstitutionType } from '../institution-type.model';

export enum InstitutionTypeActionTypes {
  RequestFail = '[InstitutionTypes] Request Fail',
  RequestGetAll = '[InstitutionTypes] Request Get All',
  SuccessGetAll = '[InstitutionTypes] Success Get All',
  ClearGetAll = '[InstitutionTypes] Clear Get All',
  RequestGet = '[InstitutionTypes] Request Get',
  SuccessGet = '[InstitutionTypes] Success Get',
  ClearGet = '[InstitutionTypes] Clear Get',
  RequestPost = '[InstitutionTypes] Request Post',
  SuccessPost = '[InstitutionTypes] Success Post',
  RequestPut = '[InstitutionTypes] Request Put',
  SuccessPut = '[InstitutionTypes] Success Put',
  RequestDelete = '[InstitutionTypes] Request Delete',
  SuccessDelete = '[InstitutionTypes] Success Delete',
  RequestBulkDelete = '[InstitutionTypes] Request Bulk Delete',
  SuccessBulkDelete = '[InstitutionTypes] Success Bulk Delete',
  SetSelected = '[InstitutionTypes] Set Selected',
  RequestGetEntirely = '[InstitutionTypes] Request Get Entirely',
  SuccessGetEntirely = '[InstitutionTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = InstitutionTypeActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = InstitutionTypeActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = InstitutionTypeActionTypes.SuccessGetAll;
  constructor(public payload: InstitutionTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = InstitutionTypeActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = InstitutionTypeActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = InstitutionTypeActionTypes.SuccessGet;
  constructor(public payload: InstitutionType) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = InstitutionTypeActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = InstitutionTypeActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = InstitutionTypeActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = InstitutionTypeActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = InstitutionTypeActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = InstitutionTypeActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = InstitutionTypeActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = InstitutionTypeActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = InstitutionTypeActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = InstitutionTypeActionTypes.SetSelected;
  constructor(public payload?: InstitutionType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = InstitutionTypeActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = InstitutionTypeActionTypes.SuccessGetEntirely;
  constructor(public payload: InstitutionTypeResponse) {}
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
