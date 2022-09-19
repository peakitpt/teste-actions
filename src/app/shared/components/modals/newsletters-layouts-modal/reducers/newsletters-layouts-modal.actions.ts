import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NewslettersLayoutsResponse,
  NewslettersLayout,
} from '../newsletters-layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum NewslettersLayoutsActionTypes {
  RequestFail = '[NewslettersLayoutsModal] Request Fail',
  RequestGetAll = '[NewslettersLayoutsModal] Request Get All',
  SuccessGetAll = '[NewslettersLayoutsModal] Success Get All',
  RequestSetSelected = '[NewslettersLayoutsModal] Request Set Selected',
  SuccessSetSelected = '[NewslettersLayoutsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessGetAll;
  constructor(public payload: NewslettersLayoutsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = NewslettersLayoutsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = NewslettersLayoutsActionTypes.SuccessSetSelected;
  constructor(public payload: NewslettersLayout) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
