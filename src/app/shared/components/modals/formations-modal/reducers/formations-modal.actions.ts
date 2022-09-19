import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { FormationsResponse, Formation } from '../formations-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum FormationsActionTypes {
  RequestFail = '[FormationsModal] Request Fail',
  RequestGetAll = '[FormationsModal] Request Get All',
  SuccessGetAll = '[FormationsModal] Success Get All',
  RequestSetSelected = '[FormationsModal] Request Set Selected',
  SuccessSetSelected = '[FormationsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = FormationsActionTypes.RequestFail;
  constructor(public payload: RequestError) { }
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = FormationsActionTypes.RequestGetAll;
  constructor(public payload?: {}) { }
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = FormationsActionTypes.SuccessGetAll;
  constructor(public payload: FormationsResponse) { }
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = FormationsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) { }
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = FormationsActionTypes.SuccessSetSelected;
  constructor(public payload: Formation) { }
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
