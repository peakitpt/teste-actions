import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaAdministrativeProcessTypesResponse,
  CuriaAdministrativeProcessType,
} from '../curia-administrative-process-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum CuriaAdministrativeProcessTypesActionTypes {
  RequestFail = '[CuriaAdministrativeProcessTypesModal] Request Fail',
  RequestGetAll = '[CuriaAdministrativeProcessTypesModal] Request Get All',
  SuccessGetAll = '[CuriaAdministrativeProcessTypesModal] Success Get All',
  ClearGetAll = '[CuriaAdministrativeProcessTypesModal] Clear Get All',
  RequestSetSelected = '[CuriaAdministrativeProcessTypesModal] Request Set Selected',
  SuccessSetSelected = '[CuriaAdministrativeProcessTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessGetAll;
  constructor(public payload: CuriaAdministrativeProcessTypesResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = CuriaAdministrativeProcessTypesActionTypes.SuccessSetSelected;
  constructor(public payload: CuriaAdministrativeProcessType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
