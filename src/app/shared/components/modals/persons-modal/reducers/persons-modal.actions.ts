import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PersonsResponse, EntityPerson } from '../persons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum PersonsActionTypes {
  RequestFail = '[PersonsModal] Request Fail',
  RequestGetAll = '[PersonsModal] Request Get All',
  SuccessGetAll = '[PersonsModal] Success Get All',
  ClearGetAll = '[PersonsModal] Clear Get All',
  RequestSetSelected = '[PersonsModal] Request Set Selected',
  SuccessSetSelected = '[PersonsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PersonsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PersonsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PersonsActionTypes.SuccessGetAll;
  constructor(public payload: PersonsResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = PersonsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = PersonsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = PersonsActionTypes.SuccessSetSelected;
  constructor(public payload: EntityPerson) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
