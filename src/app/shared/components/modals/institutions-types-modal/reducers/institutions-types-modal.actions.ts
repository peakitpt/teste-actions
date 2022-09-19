import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { InstitutionTypeResponse, InstitutionType } from '../institutions-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum InstitutionsTypesActionTypes {
  RequestFail = '[InstitutionsTypesModal] Request Fail',
  RequestGetAll = '[InstitutionsTypesModal] Request Get All',
  SuccessGetAll = '[InstitutionsTypesModal] Success Get All',
  ClearGetAll = '[InstitutionsTypesModal] Clear Get All',
  RequestSetSelected = '[InstitutionsTypesModal] Request Set Selected',
  SuccessSetSelected = '[InstitutionsTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = InstitutionsTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = InstitutionsTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = InstitutionsTypesActionTypes.SuccessGetAll;
  constructor(public payload: InstitutionTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = InstitutionsTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = InstitutionsTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = InstitutionsTypesActionTypes.SuccessSetSelected;
  constructor(public payload: InstitutionType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
