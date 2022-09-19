import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTransactionDocumentTypesResponse,
  AccountingTransactionDocumentType,
} from '../accounting-transaction-document-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingTransactionDocumentTypesActionTypes {
  RequestFail = '[AccountingTransactionDocumentTypesModal] Request Fail',
  RequestGetAll = '[AccountingTransactionDocumentTypesModal] Request Get All',
  SuccessGetAll = '[AccountingTransactionDocumentTypesModal] Success Get All',
  RequestSetSelected = '[AccountingTransactionDocumentTypesModal] Request Set Selected',
  SuccessSetSelected = '[AccountingTransactionDocumentTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingTransactionDocumentTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingTransactionDocumentTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingTransactionDocumentTypesActionTypes.SuccessGetAll;
  constructor(public payload: AccountingTransactionDocumentTypesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AccountingTransactionDocumentTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AccountingTransactionDocumentTypesActionTypes.SuccessSetSelected;
  constructor(public payload: AccountingTransactionDocumentType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
