import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CurrentAccountResponse,
  CurrentAccount,
  CurrentAccountReceipt,
} from '../current-account.model';

export enum CurrentAccountsActionTypes {
  RequestFailCurrentAccounts = '[CurrentAccounts] Request Fail',
  RequestGetAllCurrentAccounts = '[CurrentAccounts] Request Get All',
  SuccessGetAllCurrentAccounts = '[CurrentAccounts] Success Get All',
  RequestGetCurrentAccount = '[CurrentAccounts] Request Get',
  SuccessGetCurrentAccount = '[CurrentAccounts] Success Get',
  RequestPostCurrentAccount = '[CurrentAccounts] Request Post',
  SuccessPostCurrentAccount = '[CurrentAccounts] Success Post',
  RequestPutCurrentAccount = '[CurrentAccounts] Request Put',
  SuccessPutCurrentAccount = '[CurrentAccounts] Success Put',
  RequestDeleteCurrentAccount = '[CurrentAccounts] Request Delete',
  SuccessDeleteCurrentAccount = '[CurrentAccounts] Success Delete',
  // RequestBulkDeleteCurrentAccounts = '[CurrentAccounts] Request Bulk Delete',
  // SuccessBulkDeleteCurrentAccounts = '[CurrentAccounts] Success Bulk Delete',
  SetSelectedCurrentAccounts = '[CurrentAccounts] Set Selected',
  RequestGetEntirelyCurrentAccounts = '[CurrentAccounts] Request Get Entirely',
  SuccessGetEntirelyCurrentAccounts = '[CurrentAccounts] Success Get Entirely',
  RequestGetNew = '[CurrentAccounts] Request Get New',
  SuccessGetNew = '[CurrentAccounts] Success Get New',
  RequestGetCurrentAccountsReceipts = '[CurrentAccounts] Request Get Current Accounts Receipts',
  SuccessGetCurrentAccountsReceipts = '[CurrentAccounts] Success Get Current Accounts Receipts',
  RequestGetCurrentAccountsReceipt = '[CurrentAccounts] Request Get Current Accounts Receipt',
  SuccessGetCurrentAccountsReceipt = '[CurrentAccounts] Success Get Current Accounts Receipt',
}

@RequestStatus('error')
export class RequestFailCurrentAccounts implements Action {
  readonly type = CurrentAccountsActionTypes.RequestFailCurrentAccounts;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCurrentAccounts implements Action {
  readonly type = CurrentAccountsActionTypes.RequestGetAllCurrentAccounts;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCurrentAccounts implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessGetAllCurrentAccounts;
  constructor(public payload: CurrentAccountResponse) {}
}

@RequestStatus('pending')
export class RequestGetCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.RequestGetCurrentAccount;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessGetCurrentAccount;
  constructor(public payload: CurrentAccount) {}
}

@RequestStatus('pending')
export class RequestPostCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.RequestPostCurrentAccount;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessPostCurrentAccount;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.RequestPutCurrentAccount;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessPutCurrentAccount;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.RequestDeleteCurrentAccount;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCurrentAccount implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessDeleteCurrentAccount;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCurrentAccounts implements Action {
//   readonly type = CurrentAccountsActionTypes.RequestBulkDeleteCurrentAccounts;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCurrentAccounts implements Action {
//   readonly type = CurrentAccountsActionTypes.SuccessBulkDeleteCurrentAccounts;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedCurrentAccounts implements Action {
  readonly type = CurrentAccountsActionTypes.SetSelectedCurrentAccounts;
  constructor(public payload?: CurrentAccount[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCurrentAccounts implements Action {
  readonly type = CurrentAccountsActionTypes.RequestGetEntirelyCurrentAccounts;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCurrentAccounts implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessGetEntirelyCurrentAccounts;
  constructor(public payload: CurrentAccountResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CurrentAccountsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessGetNew;
  constructor(public payload: CurrentAccount) {}
}

@RequestStatus('pending')
export class RequestGetCurrentAccountsReceipts implements Action {
  readonly type = CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipts;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetCurrentAccountsReceipts implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessGetCurrentAccountsReceipts;
  constructor(public payload: CurrentAccountResponse) {}
}

@RequestStatus('pending')
export class RequestGetCurrentAccountsReceipt implements Action {
  readonly type = CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipt;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCurrentAccountsReceipt implements Action {
  readonly type = CurrentAccountsActionTypes.SuccessGetCurrentAccountsReceipt;
  constructor(public payload: CurrentAccountReceipt) {}
}

export type StatisticsActions =
  | RequestFailCurrentAccounts
  | RequestGetAllCurrentAccounts
  | SuccessGetAllCurrentAccounts
  | RequestGetCurrentAccount
  | SuccessGetCurrentAccount
  | RequestPostCurrentAccount
  | SuccessPostCurrentAccount
  | RequestPutCurrentAccount
  | SuccessPutCurrentAccount
  | RequestDeleteCurrentAccount
  | SuccessDeleteCurrentAccount
  // | RequestBulkDeleteCurrentAccounts
  // | SuccessBulkDeleteCurrentAccounts
  | SetSelectedCurrentAccounts
  | RequestGetEntirelyCurrentAccounts
  | SuccessGetEntirelyCurrentAccounts
  | RequestGetNew
  | SuccessGetNew
  | RequestGetCurrentAccountsReceipts
  | SuccessGetCurrentAccountsReceipts
  | RequestGetCurrentAccountsReceipt
  | SuccessGetCurrentAccountsReceipt;
