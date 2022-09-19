import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  RelationshipDegree,
  RelationshipDegreeResponse,
} from '../relationship-degree.model';

export enum RelationshipDegreesActionTypes {
  RequestFail = '[RelationshipDegrees] Request Fail',
  RequestGetAll = '[RelationshipDegrees] Request Get All',
  SuccessGetAll = '[RelationshipDegrees] Success Get All',
  ClearGetAll = '[RelationshipDegrees] Clear Get All',
  RequestGet = '[RelationshipDegrees] Request Get',
  SuccessGet = '[RelationshipDegrees] Success Get',
  RequestPost = '[RelationshipDegrees] Request Post',
  SuccessPost = '[RelationshipDegrees] Success Post',
  RequestPut = '[RelationshipDegrees] Request Put',
  SuccessPut = '[RelationshipDegrees] Success Put',
  RequestDelete = '[RelationshipDegrees] Request Delete',
  SuccessDelete = '[RelationshipDegrees] Success Delete',
  RequestBulkDelete = '[RelationshipDegrees] Request Bulk Delete',
  SuccessBulkDelete = '[RelationshipDegrees] Success Bulk Delete',
  SetSelected = '[RelationshipDegrees] Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = RelationshipDegreesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = RelationshipDegreesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = RelationshipDegreesActionTypes.SuccessGetAll;
  constructor(public payload: RelationshipDegreeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = RelationshipDegreesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = RelationshipDegreesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = RelationshipDegreesActionTypes.SuccessGet;
  constructor(public payload: RelationshipDegree) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = RelationshipDegreesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = RelationshipDegreesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = RelationshipDegreesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = RelationshipDegreesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = RelationshipDegreesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = RelationshipDegreesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = RelationshipDegreesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = RelationshipDegreesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = RelationshipDegreesActionTypes.SetSelected;
  constructor(public payload?: RelationshipDegree[]) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestGet
  | SuccessGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected;
