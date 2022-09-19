import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransactionDocumentTypeResponse,
  AccountingTransactionDocumentType,
} from '../accounting-transaction-document-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingTransactionDocumentTypesActionTypes {
  RequestFailAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Request Fail',
  RequestGetAllAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Request Get All',
  SuccessGetAllAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Success Get All',
  RequestGetAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Request Get',
  SuccessGetAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Success Get',
  RequestPostAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Request Post',
  SuccessPostAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Success Post',
  RequestPutAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Request Put',
  SuccessPutAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Success Put',
  RequestDeleteAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Request Delete',
  SuccessDeleteAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Success Delete',
  // RequestBulkDeleteAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Request Bulk Delete',
  // SuccessBulkDeleteAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Success Bulk Delete',
  RequestSendTestAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Request Send Test',
  SuccessSendTestAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Success Send Test',
  SetSelectedAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Set Selected',
  SetModalSelectAccountingTransactionDocumentType = '[AccountingTransactionDocumentTypes] Set Modal Select AccountingTransactionDocumentType',
  RequestGetEntirelyAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Request Get Entirely',
  SuccessGetEntirelyAccountingTransactionDocumentTypes = '[AccountingTransactionDocumentTypes] Success Get Entirely',
  RequestGetNew = '[AccountingTransactionDocumentTypes] Request Get New',
  SuccessGetNew = '[AccountingTransactionDocumentTypes] Success Get New',
}

@RequestStatus('error')
export class RequestFailAccountingTransactionDocumentTypes implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestFailAccountingTransactionDocumentTypes;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllAccountingTransactionDocumentTypes implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestGetAllAccountingTransactionDocumentTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllAccountingTransactionDocumentTypes implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SuccessGetAllAccountingTransactionDocumentTypes;
  constructor(public payload: AccountingTransactionDocumentTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestGetAccountingTransactionDocumentType;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SuccessGetAccountingTransactionDocumentType;
  constructor(public payload: AccountingTransactionDocumentType) {}
}

@RequestStatus('pending')
export class RequestPostAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestPostAccountingTransactionDocumentType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SuccessPostAccountingTransactionDocumentType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestPutAccountingTransactionDocumentType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SuccessPutAccountingTransactionDocumentType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestDeleteAccountingTransactionDocumentType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SuccessDeleteAccountingTransactionDocumentType;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteAccountingTransactionDocumentTypes implements Action {
//   readonly type = AccountingTransactionDocumentTypesActionTypes.RequestBulkDeleteAccountingTransactionDocumentTypes;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteAccountingTransactionDocumentTypes implements Action {
//   readonly type = AccountingTransactionDocumentTypesActionTypes.SuccessBulkDeleteAccountingTransactionDocumentTypes;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestAccountingTransactionDocumentType
  implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestSendTestAccountingTransactionDocumentType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestAccountingTransactionDocumentType
  implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SuccessSendTestAccountingTransactionDocumentType;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedAccountingTransactionDocumentTypes implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SetSelectedAccountingTransactionDocumentTypes;
  constructor(public payload?: AccountingTransactionDocumentType[]) {}
}

@RequestStatus('default')
export class SetModalSelectAccountingTransactionDocumentType implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SetModalSelectAccountingTransactionDocumentType;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyAccountingTransactionDocumentTypes
  implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.RequestGetEntirelyAccountingTransactionDocumentTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyAccountingTransactionDocumentTypes
  implements Action {
  readonly type =
    AccountingTransactionDocumentTypesActionTypes.SuccessGetEntirelyAccountingTransactionDocumentTypes;
  constructor(public payload: AccountingTransactionDocumentTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingTransactionDocumentTypesActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingTransactionDocumentTypesActionTypes.SuccessGetNew;
  constructor(public payload: AccountingTransactionDocumentType) {}
}

export type StatisticsActions =
  | RequestFailAccountingTransactionDocumentTypes
  | RequestGetAllAccountingTransactionDocumentTypes
  | SuccessGetAllAccountingTransactionDocumentTypes
  | RequestGetAccountingTransactionDocumentType
  | SuccessGetAccountingTransactionDocumentType
  | RequestPostAccountingTransactionDocumentType
  | SuccessPostAccountingTransactionDocumentType
  | RequestPutAccountingTransactionDocumentType
  | SuccessPutAccountingTransactionDocumentType
  | RequestDeleteAccountingTransactionDocumentType
  | SuccessDeleteAccountingTransactionDocumentType
  // | RequestBulkDeleteAccountingTransactionDocumentTypes
  // | SuccessBulkDeleteAccountingTransactionDocumentTypes
  | RequestSendTestAccountingTransactionDocumentType
  | SuccessSendTestAccountingTransactionDocumentType
  | SetSelectedAccountingTransactionDocumentTypes
  | SetModalSelectAccountingTransactionDocumentType
  | RequestGetEntirelyAccountingTransactionDocumentTypes
  | SuccessGetEntirelyAccountingTransactionDocumentTypes
  | RequestGetNew
  | SuccessGetNew;
