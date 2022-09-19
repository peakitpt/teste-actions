import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Family, FamilyResponse } from '../family.model';

export enum FamiliesActionTypes {
  RequestFail = '[Families] Request Fail',
  RequestGetAll = '[Families] Request Get All',
  SuccessGetAll = '[Families] Success Get All',
  ClearGetAll = '[Families] Clear Get All',
  RequestGet = '[Families] Request Get',
  SuccessGet = '[Families] Success Get',
  ClearGet = '[Families] Clear Get',
  RequestPost = '[Families] Request Post',
  SuccessPost = '[Families] Success Post',
  RequestPut = '[Families] Request Put',
  SuccessPut = '[Families] Success Put',
  RequestDelete = '[Families] Request Delete',
  SuccessDelete = '[Families] Success Delete',
  RequestBulkDelete = '[Families] Request Bulk Delete',
  SuccessBulkDelete = '[Families] Success Bulk Delete',
  SetSelected = '[Families] Set Selected',
  RequestGetEntirelyFamilies = '[Families] Request Get Entirely',
  SuccessGetEntirelyFamilies = '[Families] Success Get Entirely',
  RequestGetEntityFamilies = '[Families] Request Get Entity Families',
  SuccessGetEntityFamilies = '[Families] Success Get Entity Families',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = FamiliesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = FamiliesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = FamiliesActionTypes.SuccessGetAll;
  constructor(public payload: FamilyResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = FamiliesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = FamiliesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = FamiliesActionTypes.SuccessGet;
  constructor(public payload: Family) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = FamiliesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = FamiliesActionTypes.RequestPost;
  constructor(public payload: Family) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = FamiliesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = FamiliesActionTypes.RequestPut;
  constructor(public payload: Family) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = FamiliesActionTypes.SuccessPut;
  constructor(public payload: Family) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = FamiliesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = FamiliesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = FamiliesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = FamiliesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = FamiliesActionTypes.SetSelected;
  constructor(public payload?: Family[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyFamilies implements Action {
  readonly type = FamiliesActionTypes.RequestGetEntirelyFamilies;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyFamilies implements Action {
  readonly type = FamiliesActionTypes.SuccessGetEntirelyFamilies;
  constructor(public payload: FamilyResponse) {}
}

@RequestStatus('pending')
export class RequestGetEntityFamilies implements Action {
  readonly type = FamiliesActionTypes.RequestGetEntityFamilies;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetEntityFamilies implements Action {
  readonly type = FamiliesActionTypes.SuccessGetEntityFamilies;
  constructor(public payload: Array<{ id: number; name: string }>) {}
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
  | RequestGetEntirelyFamilies
  | SuccessGetEntirelyFamilies
  | RequestGetEntityFamilies
  | SuccessGetEntityFamilies;
