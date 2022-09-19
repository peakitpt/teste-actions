import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingChartAccountsResponse,
  AccountingChartAccount,
} from '../accounting-chart-accounts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingChartAccountsActionTypes {
  RequestFail = '[AccountingChartAccountsModal] Request Fail',
  RequestGetAll = '[AccountingChartAccountsModal] Request Get All',
  SuccessGetAll = '[AccountingChartAccountsModal] Success Get All',
  RequestSetSelected = '[AccountingChartAccountsModal] Request Set Selected',
  SuccessSetSelected = '[AccountingChartAccountsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessGetAll;
  constructor(public payload: AccountingChartAccountsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AccountingChartAccountsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AccountingChartAccountsActionTypes.SuccessSetSelected;
  constructor(public payload: AccountingChartAccount) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
