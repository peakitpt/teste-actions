import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransactionLineResponse,
  AccountingTransactionLine,
} from '../accounting-transaction-line.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingTransactionLinesActionTypes {
  RequestFail = '[Accounting Transaction Lines] Request Fail',
  RequestGetAll = '[Accounting Transaction Lines] Request Get All',
  SuccessGetAll = '[Accounting Transaction Lines] Success Get All',
  RequestGet = '[Accounting Transaction Lines] Request Get',
  SuccessGet = '[Accounting Transaction Lines] Success Get',
  RequestPost = '[Accounting Transaction Lines] Request Post',
  SuccessPost = '[Accounting Transaction Lines] Success Post',
  RequestPut = '[Accounting Transaction Lines] Request Put',
  SuccessPut = '[Accounting Transaction Lines] Success Put',
  RequestDelete = '[Accounting Transaction Lines] Request Delete',
  SuccessDelete = '[Accounting Transaction Lines] Success Delete',
  // RequestBulkDelete= '[Accounting Transaction Lines] Request Bulk Delete',
  // SuccessBulkDelete= '[Accounting Transaction Lines] Success Bulk Delete',
  RequestSendTest = '[Accounting Transaction Lines] Request Send Test',
  SuccessSendTest = '[Accounting Transaction Lines] Success Send Test',
  SetSelected = '[Accounting Transaction Lines] Set Selected',
  SetModalSelect = '[Accounting Transaction Lines] Set Modal Select AccountingTransactionLine',
  RequestGetEntirely = '[Accounting Transaction Lines] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Transaction Lines] Success Get Entirely',
  RequestGetNew = '[Accounting Transaction Lines] Request Get New',
  SuccessGetNew = '[Accounting Transaction Lines] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessGetAll;
  constructor(public payload: AccountingTransactionLineResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessGet;
  constructor(public payload: AccountingTransactionLine) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingTransactionLinesActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingTransactionLinesActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTest implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestSendTest;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTest implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessSendTest;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SetSelected;
  constructor(public payload?: AccountingTransactionLine[]) {}
}

@RequestStatus('default')
export class SetModalSelect implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SetModalSelect;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingTransactionLineResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingTransactionLinesActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingTransactionLinesActionTypes.SuccessGetNew;
  constructor(public payload: AccountingTransactionLine) {}
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
