import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingCostCentersResponse,
  AccountingCostCenter,
} from '../accounting-cost-centers-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingCostCentersActionTypes {
  RequestFail = '[AccountingCostCentersModal] Request Fail',
  RequestGetAll = '[AccountingCostCentersModal] Request Get All',
  SuccessGetAll = '[AccountingCostCentersModal] Success Get All',
  RequestSetSelected = '[AccountingCostCentersModal] Request Set Selected',
  SuccessSetSelected = '[AccountingCostCentersModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessGetAll;
  constructor(public payload: AccountingCostCentersResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AccountingCostCentersActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AccountingCostCentersActionTypes.SuccessSetSelected;
  constructor(public payload: AccountingCostCenter) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
