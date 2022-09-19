import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ValencesResponse, Valence } from '../valences-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ValencesActionTypes {
  RequestFail = '[ValencesModal] Request Fail',
  RequestGetAll = '[ValencesModal] Request Get All',
  SuccessGetAll = '[ValencesModal] Success Get All',
  ClearGetAll = '[ValencesModal] Clear Get All',
  RequestSetSelected = '[ValencesModal] Request Set Selected',
  SuccessSetSelected = '[ValencesModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ValencesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ValencesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ValencesActionTypes.SuccessGetAll;
  constructor(public payload: ValencesResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = ValencesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ValencesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ValencesActionTypes.SuccessSetSelected;
  constructor(public payload: Valence) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
