import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityAccessResponse, EntityAccess } from '../entity-access.model';

export enum EntitysAccessActionTypes {
  RequestFailEntitysAccess = '[EntitysAccess] Request Fail',
  RequestGetAllEntitysAccess = '[EntitysAccess] Request Get All',
  SuccessGetAllEntitysAccess = '[EntitysAccess] Success Get All',
  RequestGetEntityAccess = '[EntitysAccess] Request Get',
  SuccessGetEntityAccess = '[EntitysAccess] Success Get',
  RequestDeleteEntityAccess = '[EntitysAccess] Request Delete',
  SuccessDeleteEntityAccess = '[EntitysAccess] Success Delete',
  // RequestBulkDeleteEntitysAccess = '[EntitysAccess] Request Bulk Delete',
  // SuccessBulkDeleteEntitysAccess = '[EntitysAccess] Success Bulk Delete',
  SetSelectedEntitysAccess = '[EntitysAccess] Set Selected',
}

@RequestStatus('error')
export class RequestFailEntitysAccess implements Action {
  readonly type = EntitysAccessActionTypes.RequestFailEntitysAccess;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllEntitysAccess implements Action {
  readonly type = EntitysAccessActionTypes.RequestGetAllEntitysAccess;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllEntitysAccess implements Action {
  readonly type = EntitysAccessActionTypes.SuccessGetAllEntitysAccess;
  constructor(public payload: EntityAccessResponse) {}
}

@RequestStatus('pending')
export class RequestGetEntityAccess implements Action {
  readonly type = EntitysAccessActionTypes.RequestGetEntityAccess;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetEntityAccess implements Action {
  readonly type = EntitysAccessActionTypes.SuccessGetEntityAccess;
  constructor(public payload: EntityAccess) {}
}

@RequestStatus('pending')
export class RequestDeleteEntityAccess implements Action {
  readonly type = EntitysAccessActionTypes.RequestDeleteEntityAccess;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteEntityAccess implements Action {
  readonly type = EntitysAccessActionTypes.SuccessDeleteEntityAccess;
  constructor(public payload: any) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteEntitysAccess implements Action {
//   readonly type = EntitysAccessActionTypes.RequestBulkDeleteEntitysAccess;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteEntitysAccess implements Action {
//   readonly type = EntitysAccessActionTypes.SuccessBulkDeleteEntitysAccess;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedEntitysAccess implements Action {
  readonly type = EntitysAccessActionTypes.SetSelectedEntitysAccess;
  constructor(public payload?: EntityAccess[]) {}
}

export type StatisticsActions =
  | RequestFailEntitysAccess
  | RequestGetAllEntitysAccess
  | SuccessGetAllEntitysAccess
  | RequestGetEntityAccess
  | SuccessGetEntityAccess
  | RequestDeleteEntityAccess
  | SuccessDeleteEntityAccess
  // | RequestBulkDeleteEntitysAccess
  // | SuccessBulkDeleteEntitysAccess
  | SetSelectedEntitysAccess;
