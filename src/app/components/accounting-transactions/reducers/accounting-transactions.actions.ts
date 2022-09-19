import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransactionResponse,
  AccountingTransaction,
} from '../accounting-transaction.model';

export enum AccountingTransactionsActionTypes {
  RequestFail = '[Accounting Transactions] Request Fail',
  RequestGetAll = '[Accounting Transactions] Request Get All',
  SuccessGetAll = '[Accounting Transactions] Success Get All',
  RequestGet = '[Accounting Transactions] Request Get',
  SuccessGet = '[Accounting Transactions] Success Get',
  RequestPost = '[Accounting Transactions] Request Post',
  SuccessPost = '[Accounting Transactions] Success Post',
  RequestPut = '[Accounting Transactions] Request Put',
  SuccessPut = '[Accounting Transactions] Success Put',
  RequestDelete = '[Accounting Transactions] Request Delete',
  SuccessDelete = '[Accounting Transactions] Success Delete',
  // RequestBulkDelete = '[Accounting Transactions] Request Bulk Delete',
  // SuccessBulkDelete = '[Accounting Transactions] Success Bulk Delete',
  SetSelected = '[Accounting Transactions] Set Selected',
  RequestGetEntirely = '[Accounting Transactions] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Transactions] Success Get Entirely',
  RequestGetNew = '[Accounting Transactions] Request Get New',
  SuccessGetNew = '[Accounting Transactions] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingTransactionsActionTypes.SuccessGetAll;
  constructor(public payload: AccountingTransactionResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingTransactionsActionTypes.SuccessGet;
  constructor(public payload: AccountingTransaction) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingTransactionsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingTransactionsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingTransactionsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingTransactionsActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingTransactionsActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingTransactionsActionTypes.SetSelected;
  constructor(public payload?: AccountingTransaction[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingTransactionsActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingTransactionResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingTransactionsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingTransactionsActionTypes.SuccessGetNew;
  constructor(public payload: AccountingTransaction) {}
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
