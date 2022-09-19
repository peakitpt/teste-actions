import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTaxonomyCodesResponse,
  AccountingTaxonomyCodes,
} from '../accounting-taxonomy-codes-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingTaxonomyCodesActionTypes {
  RequestFail = '[AccountingTaxonomyCodesModal] Request Fail',
  RequestGetAll = '[AccountingTaxonomyCodesModal] Request Get All',
  SuccessGetAll = '[AccountingTaxonomyCodesModal] Success Get All',
  RequestSetSelected = '[AccountingTaxonomyCodesModal] Request Set Selected',
  SuccessSetSelected = '[AccountingTaxonomyCodesModal] Success Set Selected',
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
  constructor(public payload: AccountingTaxonomyCodesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AccountingTaxonomyCodesActionTypes.SuccessSetSelected;
  constructor(public payload: AccountingTaxonomyCodes) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
