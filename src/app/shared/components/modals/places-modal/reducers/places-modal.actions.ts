import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PlacesResponse, Place } from '../places-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum PlacesActionTypes {
  RequestFail = '[PlacesModal] Request Fail',
  RequestGetAll = '[PlacesModal] Request Get All',
  SuccessGetAll = '[PlacesModal] Success Get All',
  RequestSetSelected = '[PlacesModal] Request Set Selected',
  SuccessSetSelected = '[PlacesModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PlacesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PlacesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PlacesActionTypes.SuccessGetAll;
  constructor(public payload: PlacesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = PlacesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = PlacesActionTypes.SuccessSetSelected;
  constructor(public payload: Place) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
