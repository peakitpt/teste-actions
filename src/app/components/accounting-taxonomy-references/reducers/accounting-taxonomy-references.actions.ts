import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTaxonomyReferenceResponse,
  AccountingTaxonomyReference,
} from '../accounting-taxonomy-reference.model';

export enum AccountingTaxonomyReferencesActionTypes {
  RequestFail = '[Accounting Taxonomy References] Request Fail',
  RequestGetAll = '[Accounting Taxonomy References] Request Get All',
  SuccessGetAll = '[Accounting Taxonomy References] Success Get All',
  RequestGet = '[Accounting Taxonomy References] Request Get',
  SuccessGet = '[Accounting Taxonomy References] Success Get',
  RequestPost = '[Accounting Taxonomy References] Request Post',
  SuccessPost = '[Accounting Taxonomy References] Success Post',
  RequestPut = '[Accounting Taxonomy References] Request Put',
  SuccessPut = '[Accounting Taxonomy References] Success Put',
  RequestDelete = '[Accounting Taxonomy References] Request Delete',
  SuccessDelete = '[Accounting Taxonomy References] Success Delete',
  // RequestBulkDelete= '[Accounting Taxonomy References] Request Bulk Delete',
  // SuccessBulkDelete= '[Accounting Taxonomy References] Success Bulk Delete',
  SetSelected = '[Accounting Taxonomy References] Set Selected',
  RequestGetEntirely = '[Accounting Taxonomy References] Request Get Entirely',
  SuccessGetEntirely = '[Accounting Taxonomy References] Success Get Entirely',
  RequestGetNew = '[Accounting Taxonomy References] Request Get New',
  SuccessGetNew = '[Accounting Taxonomy References] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessGetAll;
  constructor(public payload: AccountingTaxonomyReferenceResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessGet;
  constructor(public payload: AccountingTaxonomyReference) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDelete implements Action {
//   readonly type = AccountingTaxonomyReferencesActionTypes.RequestBulkDelete;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDelete implements Action {
//   readonly type = AccountingTaxonomyReferencesActionTypes.SuccessBulkDelete;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SetSelected;
  constructor(public payload?: AccountingTaxonomyReference[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessGetEntirely;
  constructor(public payload: AccountingTaxonomyReferenceResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessGetNew;
  constructor(public payload: AccountingTaxonomyReference) {}
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
