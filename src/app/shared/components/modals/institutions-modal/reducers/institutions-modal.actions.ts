import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { InstitutionsResponse, Institution } from '../institutions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum InstitutionsActionTypes {
  RequestFail = '[InstitutionsModal] Request Fail',
  RequestGetAll = '[InstitutionsModal] Request Get All',
  SuccessGetAll = '[InstitutionsModal] Success Get All',
  RequestSetSelected = '[InstitutionsModal] Request Set Selected',
  SuccessSetSelected = '[InstitutionsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = InstitutionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = InstitutionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = InstitutionsActionTypes.SuccessGetAll;
  constructor(public payload: InstitutionsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = InstitutionsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = InstitutionsActionTypes.SuccessSetSelected;
  constructor(public payload: Institution) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
