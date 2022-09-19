import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AppointmentTypeResponse,
  AppointmentType,
} from '../appointment-type.model';

export enum AppointmentTypesActionTypes {
  RequestFail = '[AppointmentTypes] Request Fail',
  RequestGetAll = '[AppointmentTypes] Request Get All',
  SuccessGetAll = '[AppointmentTypes] Success Get All',
  ClearGetAll = '[AppointmentTypes] Clear Get All',
  RequestGet = '[AppointmentTypes] Request Get',
  SuccessGet = '[AppointmentTypes] Success Get',
  ClearGet = '[AppointmentTypes] Clear Get',
  RequestPost = '[AppointmentTypes] Request Post',
  SuccessPost = '[AppointmentTypes] Success Post',
  RequestPut = '[AppointmentTypes] Request Put',
  SuccessPut = '[AppointmentTypes] Success Put',
  RequestDelete = '[AppointmentTypes] Request Delete',
  SuccessDelete = '[AppointmentTypes] Success Delete',
  RequestBulkDelete = '[AppointmentTypes] Request Bulk Delete',
  SuccessBulkDelete = '[AppointmentTypes] Success Bulk Delete',
  SetSelected = '[AppointmentTypes] Set Selected',
  RequestGetEntirely = '[AppointmentTypes] Request Get Entirely',
  SuccessGetEntirely = '[AppointmentTypes] Success Get Entirely',
  RequestGetNew = '[AppointmentTypes] Request Get New',
  SuccessGetNew = '[AppointmentTypes] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AppointmentTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AppointmentTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessGetAll;
  constructor(public payload: AppointmentTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = AppointmentTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AppointmentTypesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessGet;
  constructor(public payload: AppointmentType) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = AppointmentTypesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AppointmentTypesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AppointmentTypesActionTypes.RequestPut;
  constructor(public payload: AppointmentType) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessPut;
  constructor(public payload: AppointmentType) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AppointmentTypesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = AppointmentTypesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AppointmentTypesActionTypes.SetSelected;
  constructor(public payload?: AppointmentType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = AppointmentTypesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessGetEntirely;
  constructor(
    public payload: AppointmentTypeResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AppointmentTypesActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AppointmentTypesActionTypes.SuccessGetNew;
  constructor(public payload: any) {}
}

export type StatisticsActions =
  | RequestFail
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
  | RequestGetNew
  | SuccessGetNew;
