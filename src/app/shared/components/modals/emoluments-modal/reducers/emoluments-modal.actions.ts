import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EmolumentsResponse, Emolument } from '../emoluments-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum EmolumentsActionTypes {
  RequestFail = '[EmolumentsModal] Request Fail',
  RequestGetAll = '[EmolumentsModal] Request Get All',
  SuccessGetAll = '[EmolumentsModal] Success Get All',
  ClearGetAll = '[EmolumentsModal] Clear Get All',
  RequestSetSelected = '[EmolumentsModal] Request Set Selected',
  SuccessSetSelected = '[EmolumentsModal] Success Set Selected',
  RequestGetAllEmolumentTypes = '[EmolumentsModal] Request Get All Emolument Types',
  SuccessGetAllEmolumentTypes = '[EmolumentsModal] Success Get All Emolument Types',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = EmolumentsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = EmolumentsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = EmolumentsActionTypes.SuccessGetAll;
  constructor(public payload: EmolumentsResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = EmolumentsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = EmolumentsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = EmolumentsActionTypes.SuccessSetSelected;
  constructor(public payload: Emolument) {}
}

@RequestStatus('pending')
export class RequestGetAllEmolumentTypes implements Action {
  readonly type = EmolumentsActionTypes.RequestGetAllEmolumentTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllEmolumentTypes implements Action {
  readonly type = EmolumentsActionTypes.SuccessGetAllEmolumentTypes;
  constructor(public payload: EmolumentsResponse) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestGetAllEmolumentTypes
  | SuccessGetAllEmolumentTypes
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
