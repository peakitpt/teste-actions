import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AppointmentTypesResponse,
  AppointmentType,
} from '../appointment-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum AppointmentTypesActionTypes {
  RequestFail = '[AppointmentTypesModal] Request Fail',
  RequestGetAll = '[AppointmentTypesModal] Request Get All',
  SuccessGetAll = '[AppointmentTypesModal] Success Get All',
  ClearGetAll = '[AppointmentTypesModal] Clear Get All',
  RequestSetSelected = '[AppointmentTypesModal] Request Set Selected',
  SuccessSetSelected = '[AppointmentTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AppointmentTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AppointmentTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessGetAll;
  constructor(public payload: AppointmentTypesResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = AppointmentTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = AppointmentTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessSetSelected;
  constructor(public payload: AppointmentType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
