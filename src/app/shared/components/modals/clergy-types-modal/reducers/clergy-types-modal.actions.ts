import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ClergyTypeResponse, ClergyType } from '../clergy-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ClergyTypesActionTypes {
  RequestFail = '[ClergyTypesModal] Request Fail',
  RequestGetAll = '[ClergyTypesModal] Request Get All',
  SuccessGetAll = '[ClergyTypesModal] Success Get All',
  ClearGetAll = '[ClergyTypesModal] Clear Get All',
  RequestSetSelected = '[ClergyTypesModal] Request Set Selected',
  SuccessSetSelected = '[ClergyTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ClergyTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ClergyTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ClergyTypesActionTypes.SuccessGetAll;
  constructor(public payload: ClergyTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = ClergyTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ClergyTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ClergyTypesActionTypes.SuccessSetSelected;
  constructor(public payload: ClergyType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
