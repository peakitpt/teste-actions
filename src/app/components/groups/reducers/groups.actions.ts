import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { GroupResponse, Group } from '../group.model';

export enum GroupsActionTypes {
  RequestFail = '[Groups] Request Fail',
  RequestGetAll = '[Groups] Request Get All',
  SuccessGetAll = '[Groups] Success Get All',
  ClearGetAll = '[Groups] Clear Get All',
  RequestGet = '[Groups] Request Get',
  SuccessGet = '[Groups] Success Get',
  ClearGet = '[Groups] Clear Get',
  RequestPost = '[Groups] Request Post',
  SuccessPost = '[Groups] Success Post',
  RequestPut = '[Groups] Request Put',
  SuccessPut = '[Groups] Success Put',
  RequestDelete = '[Groups] Request Delete',
  SuccessDelete = '[Groups] Success Delete',
  RequestBulkDelete = '[Groups] Request Bulk Delete',
  SuccessBulkDelete = '[Groups] Success Bulk Delete',
  SetSelected = '[Groups] Set Selected',
  RequestGetEntirely = '[Groups] Request Get Entirely',
  SuccessGetEntirely = '[Groups] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = GroupsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = GroupsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = GroupsActionTypes.SuccessGetAll;
  constructor(public payload: GroupResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = GroupsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = GroupsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = GroupsActionTypes.SuccessGet;
  constructor(public payload: Group) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = GroupsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = GroupsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = GroupsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = GroupsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = GroupsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = GroupsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = GroupsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = GroupsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = GroupsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = GroupsActionTypes.SetSelected;
  constructor(public payload?: Group[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = GroupsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = GroupsActionTypes.SuccessGetEntirely;
  constructor(public payload: GroupResponse) {}
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
