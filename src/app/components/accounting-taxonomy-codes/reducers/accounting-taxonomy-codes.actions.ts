import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTaxonomyCodeResponse,
  AccountingTaxonomyCode,
} from '../accounting-taxonomy-code.model';

export enum AccountingTaxonomyCodesActionTypes {
  RequestFail = '[Accounting Taxonomy Codes] Request Fail',
  RequestGetAll = '[Accounting Taxonomy Codes] Request Get All',
  SuccessGetAll = '[Accounting Taxonomy Codes] Success Get All',
  RequestGet = '[Accounting Taxonomy Codes] Request Get',
  SuccessGet = '[Accounting Taxonomy Codes] Success Get',
  RequestPost = '[Accounting Taxonomy Codes] Request Post',
  SuccessPost = '[Accounting Taxonomy Codes] Success Post',
  RequestPut = '[Accounting Taxonomy Codes] Request Put',
  SuccessPut = '[Accounting Taxonomy Codes] Success Put',
  RequestDelete = '[Accounting Taxonomy Codes] Request Delete',
  SuccessDelete = '[Accounting Taxonomy Codes] Success Delete',
  // RequestBulkDelete= '[Accounting Taxonomy Codes] Request Bulk Delete',
  // SuccessBulkDelete= '[Accounting Taxonomy Codes] Success Bulk Delete',
  SetSelected = '[Accounting Taxonomy Codes] Set Selected',
  RequestGetEntirely = '[Accounting Taxonomy Codes] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Taxonomy Codes] Success Get Entirely',
  RequestGetNew = '[Accounting Taxonomy Codes] Request Get New',
  SuccessGetNew = '[Accounting Taxonomy Codes] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessGetAll;
  constructor(public payload: AccountingTaxonomyCodeResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessGet;
  constructor(public payload: AccountingTaxonomyCode) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingTaxonomyCodesActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingTaxonomyCodesActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SetSelected;
  constructor(public payload?: AccountingTaxonomyCode[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingTaxonomyCodeResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessGetNew;
  constructor(public payload: AccountingTaxonomyCode) {}
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
