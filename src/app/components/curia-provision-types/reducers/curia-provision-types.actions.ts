import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaProvisionTypeResponse,
  CuriaProvisionType,
} from '../curia-provision-type.model';

export enum CuriaProvisionTypesActionTypes {
  RequestFail = '[CuriaProvisionTypes] Request Fail',
  RequestGetAll = '[CuriaProvisionTypes] Request Get All',
  SuccessGetAll = '[CuriaProvisionTypes] Success Get All',
  ClearGetAll = '[CuriaProvisionTypes] Clear Get All',
  RequestGet = '[CuriaProvisionTypes] Request Get',
  SuccessGet = '[CuriaProvisionTypes] Success Get',
  ClearGet = '[CuriaProvisionTypes] Clear Get',
  RequestPost = '[CuriaProvisionTypes] Request Post',
  SuccessPost = '[CuriaProvisionTypes] Success Post',
  RequestPut = '[CuriaProvisionTypes] Request Put',
  SuccessPut = '[CuriaProvisionTypes] Success Put',
  RequestDelete = '[CuriaProvisionTypes] Request Delete',
  SuccessDelete = '[CuriaProvisionTypes] Success Delete',
  RequestBulkDelete = '[CuriaProvisionTypes] Request Bulk Delete',
  SuccessBulkDelete = '[CuriaProvisionTypes] Success Bulk Delete',
  SetSelected = '[CuriaProvisionTypes] Set Selected',
  RequestGetEntirely = '[CuriaProvisionTypes] Request Get Entirely',
  SuccessGetEntirely = '[CuriaProvisionTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessGetAll;
  constructor(public payload: CuriaProvisionTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaProvisionTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessGet;
  constructor(public payload: CuriaProvisionType) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaProvisionTypesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestPut;
  constructor(public payload: CuriaProvisionType) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessPut;
  constructor(public payload: CuriaProvisionType) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SetSelected;
  constructor(public payload?: CuriaProvisionType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessGetEntirely;
  constructor(
    public payload: CuriaProvisionTypeResponse,
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
