import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  MassIntentionsTypeResponse,
  MassIntentionsType,
} from '../mass-intentions-type.model';

export enum MassIntentionsTypesActionTypes {
  RequestFail = '[MassIntentionsTypes] Request Fail',
  RequestGetAll = '[MassIntentionsTypes] Request Get All',
  SuccessGetAll = '[MassIntentionsTypes] Success Get All',
  ClearGetAll = '[MassIntentionsTypes] Clear Get All',
  RequestGet = '[MassIntentionsTypes] Request Get',
  SuccessGet = '[MassIntentionsTypes] Success Get',
  ClearGet = '[MassIntentionsTypes] Clear Get',
  RequestPost = '[MassIntentionsTypes] Request Post',
  SuccessPost = '[MassIntentionsTypes] Success Post',
  RequestPut = '[MassIntentionsTypes] Request Put',
  SuccessPut = '[MassIntentionsTypes] Success Put',
  RequestDelete = '[MassIntentionsTypes] Request Delete',
  SuccessDelete = '[MassIntentionsTypes] Success Delete',
  RequestBulkDelete = '[MassIntentionsTypes] Request Bulk Delete',
  SuccessBulkDelete = '[MassIntentionsTypes] Success Bulk Delete',
  SetSelected = '[MassIntentionsTypes] Set Selected',
  RequestGetEntirely = '[MassIntentionsTypes] Request Get Entirely',
  SuccessGetEntirely = '[MassIntentionsTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = MassIntentionsTypesActionTypes.SuccessGetAll;
  constructor(public payload: MassIntentionsTypeResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = MassIntentionsTypesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = MassIntentionsTypesActionTypes.SuccessGet;
  constructor(public payload: MassIntentionsType) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = MassIntentionsTypesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = MassIntentionsTypesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestPut;
  constructor(public payload: MassIntentionsType) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = MassIntentionsTypesActionTypes.SuccessPut;
  constructor(public payload: MassIntentionsType) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = MassIntentionsTypesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = MassIntentionsTypesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = MassIntentionsTypesActionTypes.SetSelected;
  constructor(public payload?: MassIntentionsType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = MassIntentionsTypesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = MassIntentionsTypesActionTypes.SuccessGetEntirely;
  constructor(
    public payload: MassIntentionsTypeResponse,
    public isDetailsList = false
  ) {}
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
  | SuccessGetEntirely;
