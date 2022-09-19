import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingCostCenterResponse,
  AccountingCostCenter,
} from '../accounting-cost-center.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingCostCentersActionTypes {
  RequestFail = '[Accounting Cost Centers] Request Fail',
  RequestGetAll = '[Accounting Cost Centers] Request Get All',
  SuccessGetAll = '[Accounting Cost Centers] Success Get All',
  RequestGet = '[Accounting Cost Centers] Request Get',
  SuccessGet = '[Accounting Cost Centers] Success Get',
  RequestPost = '[Accounting Cost Centers] Request Post',
  SuccessPost = '[Accounting Cost Centers] Success Post',
  RequestPut = '[Accounting Cost Centers] Request Put',
  SuccessPut = '[Accounting Cost Centers] Success Put',
  RequestDelete = '[Accounting Cost Centers] Request Delete',
  SuccessDelete = '[Accounting Cost Centers] Success Delete',
  // RequestBulkDelete= '[Accounting Cost Centers] Request Bulk Delete',
  // SuccessBulkDelete= '[Accounting Cost Centers] Success Bulk Delete',
  RequestSendTest = '[Accounting Cost Centers] Request Send Test',
  SuccessSendTest = '[Accounting Cost Centers] Success Send Test',
  SetSelected = '[Accounting Cost Centers] Set Selected',
  SetModalSelect = '[Accounting Cost Centers] Set Modal Select AccountingCostCenter',
  RequestGetEntirely = '[Accounting Cost Centers] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Cost Centers] Success Get Entirely',
  RequestGetNew = '[Accounting Cost Centers] Request Get New',
  SuccessGetNew = '[Accounting Cost Centers] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessGetAll;
  constructor(public payload: AccountingCostCenterResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessGet;
  constructor(public payload: AccountingCostCenter) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingCostCentersActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingCostCentersActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTest implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestSendTest;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTest implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessSendTest;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingCostCentersActionTypes.SetSelected;
  constructor(public payload?: AccountingCostCenter[]) {}
}

@RequestStatus('default')
export class SetModalSelect implements Action {
  readonly type = AccountingCostCentersActionTypes.SetModalSelect;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingCostCenterResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessGetNew;
  constructor(public payload: AccountingCostCenter) {}
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
  | RequestSendTest
  | SuccessSendTest
  | SetSelected
  | SetModalSelect
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestGetNew
  | SuccessGetNew;
