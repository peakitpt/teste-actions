import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingBalanceSheetResponse,
  AccountingBalanceSheet,
} from '../accounting-balance-sheet.model';

export enum AccountingBalanceSheetsActionTypes {
  RequestFail = '[AccountingBalanceSheets] Request Fail',
  RequestGetAll = '[AccountingBalanceSheets] Request Get All',
  SuccessGetAll = '[AccountingBalanceSheets] Success Get All',
  RequestGet = '[AccountingBalanceSheets] Request Get',
  SuccessGet = '[AccountingBalanceSheets] Success Get',
  RequestPost = '[AccountingBalanceSheets] Request Post',
  SuccessPost = '[AccountingBalanceSheets] Success Post',
  RequestPut = '[AccountingBalanceSheets] Request Put',
  SuccessPut = '[AccountingBalanceSheets] Success Put',
  RequestDelete = '[AccountingBalanceSheets] Request Delete',
  SuccessDelete = '[AccountingBalanceSheets] Success Delete',
  // RequestBulkDelete = '[AccountingBalanceSheets] Request Bulk Delete',
  // SuccessBulkDelete = '[AccountingBalanceSheets] Success Bulk Delete',
  SetSelected = '[AccountingBalanceSheets] Set Selected',
  RequestGetEntirely = '[AccountingBalanceSheets] Request Get Entirely',
  SuccessGetEntirely = '[AccountingBalanceSheets] Success Get Entirely',
  RequestGetNew = '[AccountingBalanceSheets] Request Get New',
  SuccessGetNew = '[AccountingBalanceSheets] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SuccessGetAll;
  constructor(public payload: AccountingBalanceSheetResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SuccessGet;
  constructor(public payload: AccountingBalanceSheet) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingBalanceSheetsActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingBalanceSheetsActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SetSelected;
  constructor(public payload?: AccountingBalanceSheet[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingBalanceSheetResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingBalanceSheetsActionTypes.SuccessGetNew;
  constructor(public payload: AccountingBalanceSheet) {}
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
