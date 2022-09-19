import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ChapelriesResponse, Chapelry } from '../chapelries-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ChapelriesActionTypes {
  RequestFail = '[ChapelriesModal] Request Fail',
  RequestGetAll = '[ChapelriesModal] Request Get All',
  SuccessGetAll = '[ChapelriesModal] Success Get All',
  RequestSetSelected = '[ChapelriesModal] Request Set Selected',
  SuccessSetSelected = '[ChapelriesModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ChapelriesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ChapelriesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ChapelriesActionTypes.SuccessGetAll;
  constructor(public payload: ChapelriesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ChapelriesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ChapelriesActionTypes.SuccessSetSelected;
  constructor(public payload: Chapelry) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
