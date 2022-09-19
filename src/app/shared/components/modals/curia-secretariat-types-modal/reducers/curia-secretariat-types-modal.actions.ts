import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaSecretariatTypesResponse,
  CuriaSecretariatType,
} from '../curia-secretariat-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum CuriaSecretariatTypesActionTypes {
  RequestFail = '[CuriaSecretariatTypesModal] Request Fail',
  RequestGetAll = '[CuriaSecretariatTypesModal] Request Get All',
  SuccessGetAll = '[CuriaSecretariatTypesModal] Success Get All',
  ClearGetAll = '[CuriaSecretariatTypesModal] Clear Get All',
  RequestSetSelected = '[CuriaSecretariatTypesModal] Request Set Selected',
  SuccessSetSelected = '[CuriaSecretariatTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessGetAll;
  constructor(public payload: CuriaSecretariatTypesResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = CuriaSecretariatTypesActionTypes.SuccessSetSelected;
  constructor(public payload: CuriaSecretariatType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
