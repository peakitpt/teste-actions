import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ProfilePriestResponse,
  ProfilePriest,
  CurrentAccountLinesResponse,
  GroupsResponse,
} from '../profile-priest.model';

export enum ProfilePriestActionTypes {
  RequestFail = '[ProfilePriests] Request Fail',
  RequestGet = '[ProfilePriests] Request Get',
  SuccessGet = '[ProfilePriests] Success Get',
  ClearGet = '[ProfilePriests] Clear Get',
  RequestPut = '[ProfilePriests] Request Put',
  SuccessPut = '[ProfilePriests] Success Put',
  SetSelected = '[ProfilePriests] Set Selected',
  RequestGetAllCurrentAccountLinesProfilePriestlyFraternity = '[ProfilePriests] Request Get All CurrentAccountLinesProfilePriestlyFraternity',
  SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity = '[ProfilePriests] Success Get All CurrentAccountLinesProfilePriestlyFraternity',
  RequestGetAllCurrentAccountLinesCuria = '[ProfilePriests] Request Get All CurrentAccountLinesCuria',
  SuccessGetAllCurrentAccountLinesCuria = '[ProfilePriests] Success Get All CurrentAccountLinesCuria',
  RequestGetAllGroups = '[ProfilePriests] Request Get All Groups',
  SuccessGetAllGroups = '[ProfilePriests] Success Get All Groups',
  RequestActivateDeactivateGroup = '[ProfilePriests] Request Activate/Deactivate Group',
  SuccessActivateDeactivateGroup = '[ProfilePriests] Success Activate/Deactivate Group',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ProfilePriestActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestActivateDeactivateGroup implements Action {
  readonly type = ProfilePriestActionTypes.RequestActivateDeactivateGroup;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessActivateDeactivateGroup implements Action {
  readonly type = ProfilePriestActionTypes.SuccessActivateDeactivateGroup;
  constructor(public payload: {}) {}
}

@RequestStatus('pending')
export class RequestGetAllGroups implements Action {
  readonly type = ProfilePriestActionTypes.RequestGetAllGroups;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllGroups implements Action {
  readonly type = ProfilePriestActionTypes.SuccessGetAllGroups;
  constructor(public payload: GroupsResponse) {}
}

@RequestStatus('pending')
export class RequestGetAllCurrentAccountLinesCuria implements Action {
  readonly type =
    ProfilePriestActionTypes.RequestGetAllCurrentAccountLinesCuria;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCurrentAccountLinesCuria implements Action {
  readonly type =
    ProfilePriestActionTypes.SuccessGetAllCurrentAccountLinesCuria;
  constructor(public payload: CurrentAccountLinesResponse) {}
}

@RequestStatus('pending')
export class RequestGetAllCurrentAccountLinesProfilePriestlyFraternity
  implements Action
{
  readonly type =
    ProfilePriestActionTypes.RequestGetAllCurrentAccountLinesProfilePriestlyFraternity;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity
  implements Action
{
  readonly type =
    ProfilePriestActionTypes.SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity;
  constructor(public payload: CurrentAccountLinesResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = ProfilePriestActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = ProfilePriestActionTypes.SuccessGet;
  constructor(public payload: ProfilePriest) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = ProfilePriestActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = ProfilePriestActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = ProfilePriestActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = ProfilePriestActionTypes.SetSelected;
  constructor(public payload?: ProfilePriest[]) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAllGroups
  | SuccessGetAllGroups
  | RequestGetAllCurrentAccountLinesProfilePriestlyFraternity
  | SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity
  | RequestGetAllCurrentAccountLinesProfilePriestlyFraternity
  | SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity
  | RequestGet
  | SuccessGet
  | ClearGet
  | RequestPut
  | SuccessPut
  | SetSelected
  | RequestActivateDeactivateGroup
  | SuccessActivateDeactivateGroup;
