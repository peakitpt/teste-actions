import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { InstitutionResponse, Institution } from '../institution.model';

export enum InstitutionsActionTypes {
  RequestFail = '[Institutions] Request Fail',
  RequestGetAll = '[Institutions] Request Get All',
  SuccessGetAll = '[Institutions] Success Get All',
  ClearGetAll = '[Institutions] Clear Get All',
  RequestGet = '[Institutions] Request Get',
  SuccessGet = '[Institutions] Success Get',
  ClearGet = '[Institutions] Clear Get',
  RequestPost = '[Institutions] Request Post',
  SuccessPost = '[Institutions] Success Post',
  RequestPut = '[Institutions] Request Put',
  SuccessPut = '[Institutions] Success Put',
  RequestDelete = '[Institutions] Request Delete',
  SuccessDelete = '[Institutions] Success Delete',
  RequestBulkDelete = '[Institutions] Request Bulk Delete',
  SuccessBulkDelete = '[Institutions] Success Bulk Delete',
  SetSelected = '[Institutions] Set Selected',
  RequestFailSaveAndGenerateDocument = '[Institutions] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[Institutions] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[Institutions] Success Save And Generate Document',
  RequestGetEntirely = '[Institutions] Request Get Entirely',
  SuccessGetEntirely = '[Institutions] Success Get Entirely',

  RequestSendToCuria = '[Institutions] Request Send to Curia',
  SuccessSendToCuria = '[Institutions] Success Send to Curia',

  RequestPostInstitutionImage = '[Institutions] Request Post Image',
  SuccessPostInstitutionImage = '[Institutions] Success Post Image',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = InstitutionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = InstitutionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = InstitutionsActionTypes.SuccessGetAll;
  constructor(public payload: InstitutionResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = InstitutionsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = InstitutionsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = InstitutionsActionTypes.SuccessGet;
  constructor(public payload: Institution) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = InstitutionsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = InstitutionsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = InstitutionsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = InstitutionsActionTypes.RequestPut;
  constructor(public payload: Institution) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = InstitutionsActionTypes.SuccessPut;
  constructor(public payload: Institution) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = InstitutionsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = InstitutionsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = InstitutionsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = InstitutionsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = InstitutionsActionTypes.SetSelected;
  constructor(public payload?: Institution[]) {}
}

@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = InstitutionsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = InstitutionsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = InstitutionsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = InstitutionsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = InstitutionsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: InstitutionResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('pending')
export class RequestSendToCuria implements Action {
  readonly type = InstitutionsActionTypes.RequestSendToCuria;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendToCuria implements Action {
  readonly type = InstitutionsActionTypes.SuccessSendToCuria;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPostInstitutionImage implements Action {
  readonly type = InstitutionsActionTypes.RequestPostInstitutionImage;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostInstitutionImage implements Action {
  readonly type = InstitutionsActionTypes.SuccessPostInstitutionImage;
  constructor(public payload: any[]) {}
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
  | RequestFailSaveAndGenerateDocument
  | RequestSaveAndGenerateDocument
  | SuccessSaveAndGenerateDocument
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestSendToCuria
  | SuccessSendToCuria
  | RequestPostInstitutionImage
  | SuccessPostInstitutionImage;
