import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingJournalsResponse,
  AccountingJournal,
} from '../accounting-journals-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AccountingJournalsActionTypes {
  RequestFail = '[AccountingJournalsModal] Request Fail',
  RequestGetAll = '[AccountingJournalsModal] Request Get All',
  SuccessGetAll = '[AccountingJournalsModal] Success Get All',
  RequestSetSelected = '[AccountingJournalsModal] Request Set Selected',
  SuccessSetSelected = '[AccountingJournalsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingJournalsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingJournalsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessGetAll;
  constructor(public payload: AccountingJournalsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AccountingJournalsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessSetSelected;
  constructor(public payload: AccountingJournal) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
