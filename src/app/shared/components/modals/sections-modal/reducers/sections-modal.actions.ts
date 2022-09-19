import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SectionsResponse, Section } from '../sections-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum SectionsActionTypes {
  RequestFail = '[SectionsModal] Request Fail',
  RequestGetAll = '[SectionsModal] Request Get All',
  SuccessGetAll = '[SectionsModal] Success Get All',
  RequestSetSelected = '[SectionsModal] Request Set Selected',
  SuccessSetSelected = '[SectionsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = SectionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = SectionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = SectionsActionTypes.SuccessGetAll;
  constructor(public payload: SectionsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = SectionsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = SectionsActionTypes.SuccessSetSelected;
  constructor(public payload: Section) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
