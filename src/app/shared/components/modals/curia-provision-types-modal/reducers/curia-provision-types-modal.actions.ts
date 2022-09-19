import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaProvisionTypesResponse,
  CuriaProvisionType,
} from '../curia-provision-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum CuriaProvisionTypesActionTypes {
  RequestFail = '[CuriaProvisionTypesModal] Request Fail',
  RequestGetAll = '[CuriaProvisionTypesModal] Request Get All',
  SuccessGetAll = '[CuriaProvisionTypesModal] Success Get All',
  ClearGetAll = '[CuriaProvisionTypesModal] Clear Get All',
  RequestSetSelected = '[CuriaProvisionTypesModal] Request Set Selected',
  SuccessSetSelected = '[CuriaProvisionTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessGetAll;
  constructor(public payload: CuriaProvisionTypesResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaProvisionTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = CuriaProvisionTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = CuriaProvisionTypesActionTypes.SuccessSetSelected;
  constructor(public payload: CuriaProvisionType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
