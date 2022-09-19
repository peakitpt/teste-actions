import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccrualsTypeResponse, AccrualsType } from '../accruals-type.model';

export enum AccrualTypesActionTypes {
  RequestFailAccrualTypes = '[AccrualTypes] Request Fail',
  RequestGetAllAccrualTypes = '[AccrualTypes] Request Get All',
  SuccessGetAllAccrualTypes = '[AccrualTypes] Success Get All',
  RequestGetAccrualType = '[AccrualTypes] Request Get',
  SuccessGetAccrualType = '[AccrualTypes] Success Get',
  RequestPostAccrualType = '[AccrualTypes] Request Post',
  SuccessPostAccrualType = '[AccrualTypes] Success Post',
  RequestPutAccrualType = '[AccrualTypes] Request Put',
  SuccessPutAccrualType = '[AccrualTypes] Success Put',
  RequestDeleteAccrualType = '[AccrualTypes] Request Delete',
  SuccessDeleteAccrualType = '[AccrualTypes] Success Delete',
  // RequestBulkDeleteAccrualTypes = '[AccrualTypes] Request Bulk Delete',
  // SuccessBulkDeleteAccrualTypes = '[AccrualTypes] Success Bulk Delete',
  SetSelectedAccrualTypes = '[AccrualTypes] Set Selected',
  RequestGetEntirelyAccrualTypes = '[AccrualTypes] Request Get Entirely',
  SuccessGetEntirelyAccrualTypes = '[AccrualTypes] Success Get Entirely',
  RequestGetNew = '[AccrualTypes] Request Get New',
  SuccessGetNew = '[AccrualTypes] Success Get New',
}

@RequestStatus('error')
export class RequestFailAccrualTypes implements Action {
  readonly type = AccrualTypesActionTypes.RequestFailAccrualTypes;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllAccrualTypes implements Action {
  readonly type = AccrualTypesActionTypes.RequestGetAllAccrualTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllAccrualTypes implements Action {
  readonly type = AccrualTypesActionTypes.SuccessGetAllAccrualTypes;
  constructor(public payload: AccrualsTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.RequestGetAccrualType;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.SuccessGetAccrualType;
  constructor(public payload: AccrualsType) {}
}

@RequestStatus('pending')
export class RequestPostAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.RequestPostAccrualType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.SuccessPostAccrualType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.RequestPutAccrualType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.SuccessPutAccrualType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.RequestDeleteAccrualType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteAccrualType implements Action {
  readonly type = AccrualTypesActionTypes.SuccessDeleteAccrualType;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteAccrualTypes implements Action {
//   readonly type = AccrualTypesActionTypes.RequestBulkDeleteAccrualTypes;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteAccrualTypes implements Action {
//   readonly type = AccrualTypesActionTypes.SuccessBulkDeleteAccrualTypes;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedAccrualTypes implements Action {
  readonly type = AccrualTypesActionTypes.SetSelectedAccrualTypes;
  constructor(public payload?: AccrualsType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyAccrualTypes implements Action {
  readonly type = AccrualTypesActionTypes.RequestGetEntirelyAccrualTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyAccrualTypes implements Action {
  readonly type = AccrualTypesActionTypes.SuccessGetEntirelyAccrualTypes;
  constructor(public payload: AccrualsTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccrualTypesActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccrualTypesActionTypes.SuccessGetNew;
  constructor(public payload: AccrualsType) {}
}

export type StatisticsActions =
  | RequestFailAccrualTypes
  | RequestGetAllAccrualTypes
  | SuccessGetAllAccrualTypes
  | RequestGetAccrualType
  | SuccessGetAccrualType
  | RequestPostAccrualType
  | SuccessPostAccrualType
  | RequestPutAccrualType
  | SuccessPutAccrualType
  | RequestDeleteAccrualType
  | SuccessDeleteAccrualType
  // | RequestBulkDeleteAccrualTypes
  // | SuccessBulkDeleteAccrualTypes
  | SetSelectedAccrualTypes
  | RequestGetEntirelyAccrualTypes
  | SuccessGetEntirelyAccrualTypes
  | RequestGetNew
  | SuccessGetNew;
