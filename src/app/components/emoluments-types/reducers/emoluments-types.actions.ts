import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EmolumentTypeResponse, EmolumentType } from '../emoluments-type.model';

export enum EmolumentsTypesActionTypes {
  RequestFailEmolumentsTypes = '[EmolumentsTypes] Request Fail',
  RequestGetAllEmolumentsTypes = '[EmolumentsTypes] Request Get All',
  SuccessGetAllEmolumentsTypes = '[EmolumentsTypes] Success Get All',
  RequestGetEmolumentType = '[EmolumentsTypes] Request Get',
  SuccessGetEmolumentType = '[EmolumentsTypes] Success Get',
  RequestPostEmolumentType = '[EmolumentsTypes] Request Post',
  SuccessPostEmolumentType = '[EmolumentsTypes] Success Post',
  RequestPutEmolumentType = '[EmolumentsTypes] Request Put',
  SuccessPutEmolumentType = '[EmolumentsTypes] Success Put',
  RequestDeleteEmolumentType = '[EmolumentsTypes] Request Delete',
  SuccessDeleteEmolumentType = '[EmolumentsTypes] Success Delete',
  // RequestBulkDeleteEmolumentsTypes = '[EmolumentsTypes] Request Bulk Delete',
  // SuccessBulkDeleteEmolumentsTypes = '[EmolumentsTypes] Success Bulk Delete',
  SetSelectedEmolumentsTypes = '[EmolumentsTypes] Set Selected',
  RequestGetEntirelyEmolumentsTypes = '[EmolumentsTypes] Request Get Entirely',
  SuccessGetEntirelyEmolumentsTypes = '[EmolumentsTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailEmolumentsTypes implements Action {
  readonly type = EmolumentsTypesActionTypes.RequestFailEmolumentsTypes;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllEmolumentsTypes implements Action {
  readonly type = EmolumentsTypesActionTypes.RequestGetAllEmolumentsTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllEmolumentsTypes implements Action {
  readonly type = EmolumentsTypesActionTypes.SuccessGetAllEmolumentsTypes;
  constructor(public payload: EmolumentTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.RequestGetEmolumentType;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.SuccessGetEmolumentType;
  constructor(public payload: EmolumentType) {}
}

@RequestStatus('pending')
export class RequestPostEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.RequestPostEmolumentType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.SuccessPostEmolumentType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.RequestPutEmolumentType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.SuccessPutEmolumentType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.RequestDeleteEmolumentType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteEmolumentType implements Action {
  readonly type = EmolumentsTypesActionTypes.SuccessDeleteEmolumentType;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteEmolumentsTypes implements Action {
//   readonly type = EmolumentsTypesActionTypes.RequestBulkDeleteEmolumentsTypes;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteEmolumentsTypes implements Action {
//   readonly type = EmolumentsTypesActionTypes.SuccessBulkDeleteEmolumentsTypes;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedEmolumentsTypes implements Action {
  readonly type = EmolumentsTypesActionTypes.SetSelectedEmolumentsTypes;
  constructor(public payload?: EmolumentType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyEmolumentsTypes implements Action {
  readonly type = EmolumentsTypesActionTypes.RequestGetEntirelyEmolumentsTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyEmolumentsTypes implements Action {
  readonly type = EmolumentsTypesActionTypes.SuccessGetEntirelyEmolumentsTypes;
  constructor(public payload: EmolumentTypeResponse) {}
}

export type StatisticsActions =
  | RequestFailEmolumentsTypes
  | RequestGetAllEmolumentsTypes
  | SuccessGetAllEmolumentsTypes
  | RequestGetEmolumentType
  | SuccessGetEmolumentType
  | RequestPostEmolumentType
  | SuccessPostEmolumentType
  | RequestPutEmolumentType
  | SuccessPutEmolumentType
  | RequestDeleteEmolumentType
  | SuccessDeleteEmolumentType
  // | RequestBulkDeleteEmolumentsTypes
  // | SuccessBulkDeleteEmolumentsTypes
  | SetSelectedEmolumentsTypes
  | RequestGetEntirelyEmolumentsTypes
  | SuccessGetEntirelyEmolumentsTypes;
