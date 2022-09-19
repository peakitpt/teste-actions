import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTaxonomyReferencesResponse,
  AccountingTaxonomyReference,
} from '../accounting-taxonomy-references-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingTaxonomyReferencesActionTypes {
  RequestFail = '[AccountingTaxonomyReferencesModal] Request Fail',
  RequestGetAll = '[AccountingTaxonomyReferencesModal] Request Get All',
  SuccessGetAll = '[AccountingTaxonomyReferencesModal] Success Get All',
  RequestSetSelected = '[AccountingTaxonomyReferencesModal] Request Set Selected',
  SuccessSetSelected = '[AccountingTaxonomyReferencesModal] Success Set Selected',
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
  constructor(public payload: AccountingTaxonomyReferencesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AccountingTaxonomyReferencesActionTypes.SuccessSetSelected;
  constructor(public payload: AccountingTaxonomyReference) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
