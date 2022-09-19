import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityPersonResponse, EntityPerson } from '../person.model';
import { TaxpayerNameValidation } from '@peakitpt/ui-kyrios-api';

export enum PersonsActionTypes {
  RequestFail = '[Persons] Request Fail',
  RequestGetAll = '[Persons] Request Get All',
  SuccessGetAll = '[Persons] Success Get All',
  ClearGetAll = '[Persons] Clear Get All',
  RequestGet = '[Persons] Request Get',
  SuccessGet = '[Persons] Success Get',
  ClearGet = '[Persons] Clear Get',
  RequestPost = '[Persons] Request Post',
  SuccessPost = '[Persons] Success Post',
  RequestPut = '[Persons] Request Put',
  SuccessPut = '[Persons] Success Put',
  RequestDelete = '[Persons] Request Delete',
  SuccessDelete = '[Persons] Success Delete',
  RequestBulkDelete = '[Persons] Request Bulk Delete',
  SuccessBulkDelete = '[Persons] Success Bulk Delete',
  SetSelected = '[Persons] Set Selected',
  RequestGetByEntityId = '[Persons] Request By Entity Id',
  SuccessGetByEntityId = '[Persons] Success By Entity Id',
  ClearGetByEntityId = '[Persons] Clear By Entity Id',
  RequestCheckExistance = '[Persons] Request Check Existance',
  SuccessCheckExistance = '[Persons] Success Check Existance',
  ClearCheckExistance = '[Persons] Clear Check Existance',
  RequestGetEntirely = '[Persons] Request Get Entirely',
  SuccessGetEntirely = '[Persons] Success Get Entirely',

  RequestPostImage = '[Persons] Request Post Image',
  SuccessPostImage = '[Persons] Success Post Image',
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
  constructor(public payload: EntityPersonResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = PersonsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = PersonsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = PersonsActionTypes.SuccessGet;
  constructor(public payload: EntityPerson) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = PersonsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = PersonsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = PersonsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = PersonsActionTypes.RequestPut;
  constructor(public payload: EntityPerson) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = PersonsActionTypes.SuccessPut;
  constructor(public payload: EntityPerson) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = PersonsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = PersonsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = PersonsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = PersonsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = PersonsActionTypes.SetSelected;
  constructor(public payload?: EntityPerson[]) {}
}

@RequestStatus('pending')
export class RequestGetByEntityId implements Action {
  readonly type = PersonsActionTypes.RequestGetByEntityId;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetByEntityId implements Action {
  readonly type = PersonsActionTypes.SuccessGetByEntityId;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class ClearGetByEntityId implements Action {
  readonly type = PersonsActionTypes.ClearGetByEntityId;
  constructor() {}
}

@RequestStatus('pending')
export class RequestCheckExistance implements Action {
  readonly type = PersonsActionTypes.RequestCheckExistance;
  constructor(
    public payload: { id?: number; name?: string; taxpayer?: string }
  ) {}
}

@RequestStatus('default')
export class SuccessCheckExistance implements Action {
  readonly type = PersonsActionTypes.SuccessCheckExistance;
  constructor(public payload: TaxpayerNameValidation) {}
}

@RequestStatus('default')
export class ClearCheckExistance implements Action {
  readonly type = PersonsActionTypes.ClearCheckExistance;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = PersonsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = PersonsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: EntityPersonResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('pending')
export class RequestPostImage implements Action {
  readonly type = PersonsActionTypes.RequestPostImage;
  constructor(public payload?: FormData) {}
}

@RequestStatus('default')
export class SuccessPostImage implements Action {
  readonly type = PersonsActionTypes.SuccessPostImage;
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
  | RequestGetByEntityId
  | SuccessGetByEntityId
  | ClearGetByEntityId
  | RequestCheckExistance
  | SuccessCheckExistance
  | ClearCheckExistance
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestPostImage
  | SuccessPostImage;
