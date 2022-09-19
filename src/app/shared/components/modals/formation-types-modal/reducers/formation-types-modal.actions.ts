import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  FormationTypesResponse,
  FormationType
} from '../formation-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum FormationTypesActionTypes {
  RequestFail = '[FormationTypesModal] Request Fail',
  RequestGetAll = '[FormationTypesModal] Request Get All',
  SuccessGetAll = '[FormationTypesModal] Success Get All',
  RequestSetSelected = '[FormationTypesModal] Request Set Selected',
  SuccessSetSelected = '[FormationTypesModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = FormationTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = FormationTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = FormationTypesActionTypes.SuccessGetAll;
  constructor(public payload: FormationTypesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = FormationTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = FormationTypesActionTypes.SuccessSetSelected;
  constructor(public payload: FormationType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
