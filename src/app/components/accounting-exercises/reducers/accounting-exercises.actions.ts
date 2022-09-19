import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingExerciseResponse,
  AccountingExercise,
} from '../accounting-exercise.model';

export enum AccountingExercisesActionTypes {
  RequestFail = '[Accounting Exercises] Request Fail',
  RequestGetAll = '[Accounting Exercises] Request Get All',
  SuccessGetAll = '[Accounting Exercises] Success Get All',
  RequestGet = '[Accounting Exercises] Request Get',
  SuccessGet = '[Accounting Exercises] Success Get',
  RequestPost = '[Accounting Exercises] Request Post',
  SuccessPost = '[Accounting Exercises] Success Post',
  RequestPut = '[Accounting Exercises] Request Put',
  SuccessPut = '[Accounting Exercises] Success Put',
  RequestDelete = '[Accounting Exercises] Request Delete',
  SuccessDelete = '[Accounting Exercises] Success Delete',
  // RequestBulkDelete= '[Accounting Exercises] Request Bulk Delete',
  // SuccessBulkDelete= '[Accounting Exercises] Success Bulk Delete',
  SetSelected = '[Accounting Exercises] Set Selected',
  RequestGetEntirely = '[Accounting Exercises] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Exercises] Success Get Entirely',
  RequestGetNew = '[Accounting Exercises] Request Get New',
  SuccessGetNew = '[Accounting Exercises] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingExercisesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingExercisesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingExercisesActionTypes.SuccessGetAll;
  constructor(public payload: AccountingExerciseResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingExercisesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingExercisesActionTypes.SuccessGet;
  constructor(public payload: AccountingExercise) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingExercisesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingExercisesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingExercisesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingExercisesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingExercisesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingExercisesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingExercisesActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingExercisesActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingExercisesActionTypes.SetSelected;
  constructor(public payload?: AccountingExercise[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingExercisesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingExercisesActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingExerciseResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingExercisesActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingExercisesActionTypes.SuccessGetNew;
  constructor(public payload: AccountingExercise) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestGet
  | SuccessGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  // | RequestBulkDelete
  // | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestGetNew
  | SuccessGetNew;
