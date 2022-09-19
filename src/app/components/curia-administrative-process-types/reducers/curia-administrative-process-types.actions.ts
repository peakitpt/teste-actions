import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaAdministrativeProcessTypeResponse,
  CuriaAdministrativeProcessType,
} from '../curia-administrative-process-type.model';

export enum CuriaAdministrativeProcessTypesActionTypes {
  RequestFail = '[CuriaAdministrativeProcessTypes] Request Fail',
  RequestGetAll = '[CuriaAdministrativeProcessTypes] Request Get All',
  SuccessGetAll = '[CuriaAdministrativeProcessTypes] Success Get All',
  ClearGetAll = '[CuriaAdministrativeProcessTypes] Clear Get All',
  RequestGet = '[CuriaAdministrativeProcessTypes] Request Get',
  SuccessGet = '[CuriaAdministrativeProcessTypes] Success Get',
  ClearGet = '[CuriaAdministrativeProcessTypes] Clear Get',
  RequestPost = '[CuriaAdministrativeProcessTypes] Request Post',
  SuccessPost = '[CuriaAdministrativeProcessTypes] Success Post',
  RequestPut = '[CuriaAdministrativeProcessTypes] Request Put',
  SuccessPut = '[CuriaAdministrativeProcessTypes] Success Put',
  RequestDelete = '[CuriaAdministrativeProcessTypes] Request Delete',
  SuccessDelete = '[CuriaAdministrativeProcessTypes] Success Delete',
  RequestBulkDelete = '[CuriaAdministrativeProcessTypes] Request Bulk Delete',
  SuccessBulkDelete = '[CuriaAdministrativeProcessTypes] Success Bulk Delete',
  SetSelected = '[CuriaAdministrativeProcessTypes] Set Selected',
  RequestGetEntirely = '[CuriaAdministrativeProcessTypes] Request Get Entirely',
  SuccessGetEntirely = '[CuriaAdministrativeProcessTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessGetAll;
  constructor(public payload: CuriaAdministrativeProcessTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessGet;
  constructor(public payload: CuriaAdministrativeProcessType) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestPut;
  constructor(public payload: CuriaAdministrativeProcessType) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessPut;
  constructor(public payload: CuriaAdministrativeProcessType) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SetSelected;
  constructor(public payload?: CuriaAdministrativeProcessType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessGetEntirely;
  constructor(
    public payload: CuriaAdministrativeProcessTypeResponse,
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
