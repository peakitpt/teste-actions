import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ChrismResponse, Chrism } from '../chrism.model';
import { ReportResponse } from '../../reports/report.model';

export enum ChrismsActionTypes {
  RequestFail = '[Chrisms] Request Fail',
  RequestGetAll = '[Chrisms] Request Get All',
  SuccessGetAll = '[Chrisms] Success Get All',
  ClearGetAll = '[Chrisms] Clear Get All',
  RequestGet = '[Chrisms] Request Get',
  SuccessGet = '[Chrisms] Success Get',
  ClearGet = '[Chrisms] Clear Get',
  RequestPost = '[Chrisms] Request Post',
  SuccessPost = '[Chrisms] Success Post',
  RequestPut = '[Chrisms] Request Put',
  SuccessPut = '[Chrisms] Success Put',
  RequestDelete = '[Chrisms] Request Delete',
  SuccessDelete = '[Chrisms] Success Delete',
  RequestBulkDelete = '[Chrisms] Request Bulk Delete',
  SuccessBulkDelete = '[Chrisms] Success Bulk Delete',
  SetSelected = '[Chrisms] Set Selected',
  RequestGetEntirely = '[Chrisms] Request Get Entirely',
  SuccessGetEntirely = '[Chrisms] Success Get Entirely',

  // Chrisms Entities
  RequestFailSaveAndGenerateDocument = '[chrisms Entities] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[chrisms Entities] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[chrisms Entities] Success Save And Generate Document',

  // Reports
  RequestFailChrismEntitiesReports = '[Chrisms] Request Fail Chrism Entities Form Reports',
  RequestGetChrismEntitiesFormReports = '[Chrisms] Request Get Chrism Entities Form Reports',
  SuccessGetChrismEntitiesFormReports = '[Chrisms] Success Get Chrism Entities Form Reports',
  RequestGetChrismEntitiesFormSubscriptionReports = '[Chrisms] Request Get Form Chrism Entities Subscription Reports',
  SuccessGetChrismEntitiesFormSubscriptionReports = '[Chrisms] Success Get Form Chrism Entities Subscription Reports',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ChrismsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ChrismsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ChrismsActionTypes.SuccessGetAll;
  constructor(public payload: ChrismResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = ChrismsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = ChrismsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = ChrismsActionTypes.SuccessGet;
  constructor(public payload: Chrism) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = ChrismsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = ChrismsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = ChrismsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = ChrismsActionTypes.RequestPut;
  constructor(public payload: Chrism) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = ChrismsActionTypes.SuccessPut;
  constructor(public payload: Chrism) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = ChrismsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = ChrismsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = ChrismsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = ChrismsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = ChrismsActionTypes.SetSelected;
  constructor(public payload?: Chrism[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = ChrismsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = ChrismsActionTypes.SuccessGetEntirely;
  constructor(public payload: ChrismResponse, public isDetailsList = false) {}
}

// CHRISMS ENTITIES
@RequestStatus('error')
export class RequestFailSaveAndGenerateDocument implements Action {
  readonly type = ChrismsActionTypes.RequestFailSaveAndGenerateDocument;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestSaveAndGenerateDocument implements Action {
  readonly type = ChrismsActionTypes.RequestSaveAndGenerateDocument;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSaveAndGenerateDocument implements Action {
  readonly type = ChrismsActionTypes.SuccessSaveAndGenerateDocument;
  constructor(public payload: any[]) {}
}

// REPORTS
@RequestStatus('error')
export class RequestFailChrismEntitiesReports implements Action {
  readonly type = ChrismsActionTypes.RequestFailChrismEntitiesReports;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetChrismEntitiesFormReports implements Action {
  readonly type = ChrismsActionTypes.RequestGetChrismEntitiesFormReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetChrismEntitiesFormReports implements Action {
  readonly type = ChrismsActionTypes.SuccessGetChrismEntitiesFormReports;
  constructor(public payload: ReportResponse) {}
}

@RequestStatus('pending')
export class RequestGetChrismEntitiesFormSubscriptionReports implements Action {
  readonly type =
    ChrismsActionTypes.RequestGetChrismEntitiesFormSubscriptionReports;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetChrismEntitiesFormSubscriptionReports implements Action {
  readonly type =
    ChrismsActionTypes.SuccessGetChrismEntitiesFormSubscriptionReports;
  constructor(public payload: ReportResponse) {}
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
  | RequestFailSaveAndGenerateDocument
  | RequestSaveAndGenerateDocument
  | SuccessSaveAndGenerateDocument
  | RequestFailChrismEntitiesReports
  | RequestGetChrismEntitiesFormReports
  | SuccessGetChrismEntitiesFormReports
  | RequestGetChrismEntitiesFormSubscriptionReports
  | SuccessGetChrismEntitiesFormSubscriptionReports;
