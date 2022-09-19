import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingChartAccountResponse,
  AccountingChartAccount,
} from '../accounting-chart-account.model';

export enum AccountingChartAccountsActionTypes {
  RequestFail = '[Accounting Chart Accounts] Request Fail',
  RequestGetAll = '[Accounting Chart Accounts] Request Get All',
  SuccessGetAll = '[Accounting Chart Accounts] Success Get All',
  RequestGet = '[Accounting Chart Accounts] Request Get',
  SuccessGet = '[Accounting Chart Accounts] Success Get',
  RequestPost = '[Accounting Chart Accounts] Request Post',
  SuccessPost = '[Accounting Chart Accounts] Success Post',
  RequestPut = '[Accounting Chart Accounts] Request Put',
  SuccessPut = '[Accounting Chart Accounts] Success Put',
  RequestDelete = '[Accounting Chart Accounts] Request Delete',
  SuccessDelete = '[Accounting Chart Accounts] Success Delete',
  // RequestBulkDelete= '[Accounting Chart Accounts] Request Bulk Delete',
  // SuccessBulkDelete= '[Accounting Chart Accounts] Success Bulk Delete',
  SetSelected = '[Accounting Chart Accounts] Set Selected',
  RequestGetEntirely = '[Accounting Chart Accounts] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Chart Accounts] Success Get Entirely',
  RequestGetNew = '[Accounting Chart Accounts] Request Get New',
  SuccessGetNew = '[Accounting Chart Accounts] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessGetAll;
  constructor(public payload: AccountingChartAccountResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessGet;
  constructor(public payload: AccountingChartAccount) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingChartAccountsActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingChartAccountsActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingChartAccountsActionTypes.SetSelected;
  constructor(public payload?: AccountingChartAccount[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingChartAccountResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessGetNew;
  constructor(public payload: AccountingChartAccount) {}
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
