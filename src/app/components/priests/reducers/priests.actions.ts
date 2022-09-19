import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PriestResponse, Priest, CurrentAccountLinesResponse, GroupsResponse } from '../priest.model';

export enum PriestActionTypes {
  RequestFail = '[Priests] Request Fail',
  RequestGetAll = '[Priests] Request Get All',
  SuccessGetAll = '[Priests] Success Get All',
  ClearGetAll = '[Priests] Clear Get All',
  RequestGet = '[Priests] Request Get',
  SuccessGet = '[Priests] Success Get',
  ClearGet = '[Priests] Clear Get',
  RequestPost = '[Priests] Request Post',
  SuccessPost = '[Priests] Success Post',
  RequestPut = '[Priests] Request Put',
  SuccessPut = '[Priests] Success Put',
  RequestDelete = '[Priests] Request Delete',
  SuccessDelete = '[Priests] Success Delete',
  RequestBulkDelete = '[Priests] Request Bulk Delete',
  SuccessBulkDelete = '[Priests] Success Bulk Delete',
  SetSelected = '[Priests] Set Selected',
  RequestGetEntirely = '[Priests] Request Get Entirely',
  SuccessGetEntirely = '[Priests] Success Get Entirely',
  RequestGetAllCurrentAccountLinesPriestlyFraternity = '[Priests] Request Get All CurrentAccountLinesPriestlyFraternity',
  SuccessGetAllCurrentAccountLinesPriestlyFraternity = '[Priests] Success Get All CurrentAccountLinesPriestlyFraternity',
  RequestGetAllCurrentAccountLinesCuria = '[Priests] Request Get All CurrentAccountLinesCuria',
  SuccessGetAllCurrentAccountLinesCuria = '[Priests] Success Get All CurrentAccountLinesCuria',
  RequestGetAllGroups = '[Priests] Request Get All Groups',
  SuccessGetAllGroups = '[Priests] Success Get All Groups',
  RequestActivateDeactivateGroup = '[Priests] Request Activate/Deactivate Group',
  SuccessActivateDeactivateGroup = '[Priests] Success Activate/Deactivate Group',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PriestActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestActivateDeactivateGroup implements Action {
  readonly type = PriestActionTypes.RequestActivateDeactivateGroup;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessActivateDeactivateGroup implements Action {
  readonly type = PriestActionTypes.SuccessActivateDeactivateGroup;
  constructor(public payload: {}) {}
}

@RequestStatus('pending')
export class RequestGetAllGroups implements Action {
  readonly type = PriestActionTypes.RequestGetAllGroups;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllGroups implements Action {
  readonly type = PriestActionTypes.SuccessGetAllGroups;
  constructor(public payload: GroupsResponse) {}
}

@RequestStatus('pending')
export class RequestGetAllCurrentAccountLinesCuria implements Action {
  readonly type = PriestActionTypes.RequestGetAllCurrentAccountLinesCuria;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCurrentAccountLinesCuria implements Action {
  readonly type = PriestActionTypes.SuccessGetAllCurrentAccountLinesCuria;
  constructor(public payload: CurrentAccountLinesResponse) {}
}

@RequestStatus('pending')
export class RequestGetAllCurrentAccountLinesPriestlyFraternity implements Action {
  readonly type = PriestActionTypes.RequestGetAllCurrentAccountLinesPriestlyFraternity;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCurrentAccountLinesPriestlyFraternity implements Action {
  readonly type = PriestActionTypes.SuccessGetAllCurrentAccountLinesPriestlyFraternity;
  constructor(public payload: CurrentAccountLinesResponse) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PriestActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PriestActionTypes.SuccessGetAll;
  constructor(public payload: PriestResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = PriestActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = PriestActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = PriestActionTypes.SuccessGet;
  constructor(public payload: Priest) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = PriestActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = PriestActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = PriestActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = PriestActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = PriestActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = PriestActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = PriestActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = PriestActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = PriestActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = PriestActionTypes.SetSelected;
  constructor(public payload?: Priest[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = PriestActionTypes.RequestGetEntirely;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = PriestActionTypes.SuccessGetEntirely;
  constructor(public payload: PriestResponse) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAllGroups
  | SuccessGetAllGroups
  | RequestGetAllCurrentAccountLinesPriestlyFraternity
  | SuccessGetAllCurrentAccountLinesPriestlyFraternity
  | RequestGetAllCurrentAccountLinesPriestlyFraternity
  | SuccessGetAllCurrentAccountLinesPriestlyFraternity
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestGet
  | SuccessGet
  | ClearGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestActivateDeactivateGroup
  | SuccessActivateDeactivateGroup;
