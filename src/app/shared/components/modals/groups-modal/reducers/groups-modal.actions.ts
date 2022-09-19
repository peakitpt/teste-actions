import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { GroupResponse, Group } from '../groups-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum GroupsActionTypes {
  RequestFail = '[GroupsModal] Request Fail',
  RequestGetAll = '[GroupsModal] Request Get All',
  SuccessGetAll = '[GroupsModal] Success Get All',
  ClearGetAll = '[GroupsModal] Clear Get All',
  RequestSetSelected = '[GroupsModal] Request Set Selected',
  SuccessSetSelected = '[GroupsModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = GroupsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = GroupsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = GroupsActionTypes.SuccessGetAll;
  constructor(public payload: GroupResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = GroupsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = GroupsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = GroupsActionTypes.SuccessSetSelected;
  constructor(public payload: Group) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
