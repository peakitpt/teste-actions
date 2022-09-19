import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  Catechism,
  CatechismIndividualDocumentResponse,
  CatechismResponse,
  CatechismSession,
  CatechismSessionResponse,
} from '../catechism.model';

export enum CatechismsActionTypes {
  RequestFail = '[Catechisms] Request Fail',
  RequestGetAll = '[Catechisms] Request Get All',
  SuccessGetAll = '[Catechisms] Success Get All',
  ClearGetAll = '[Catechisms] Clear Get All',
  RequestGet = '[Catechisms] Request Get',
  SuccessGet = '[Catechisms] Success Get',
  ClearGet = '[Catechisms] Clear Get',
  RequestPost = '[Catechisms] Request Post',
  SuccessPost = '[Catechisms] Success Post',
  RequestPut = '[Catechisms] Request Put',
  SuccessPut = '[Catechisms] Success Put',
  RequestDelete = '[Catechisms] Request Delete',
  SuccessDelete = '[Catechisms] Success Delete',
  RequestBulkDelete = '[Catechisms] Request Bulk Delete',
  SuccessBulkDelete = '[Catechisms] Success Bulk Delete',
  SetSelected = '[Catechisms] Set Selected',
  RequestGetEntirelyCatechisms = '[Catechisms] Request Get Entirely',
  SuccessGetEntirelyCatechisms = '[Catechisms] Success Get Entirely',
  RequestGetSessions = '[Catechisms] Request Get Sessions',
  SuccessGetSessions = '[Catechisms] Success Get Sessions',
  RequestPassGrade = '[Catechisms] Request Pass Grade',
  SuccessPassGrade = '[Catechisms] Success Pass Grade',
  RequestFinalize = '[Catechisms] Request Finalize',
  SuccessFinalize = '[Catechisms] Success Finalize',

  // SESSIONS
  RequestGetAllSessions = '[Catechisms] Request Get Sessions',
  SuccessGetAllSessions = '[Catechisms] Success Get Sessions',
  ClearGetAllSessions = '[Catechisms] Clear Get Sessions',
  RequestGetSession = '[Catechisms] Request Get Session',
  SuccessGetSession = '[Catechisms] Success Get Session',
  RequestPostSession = '[Catechisms] Request Post Session',
  SuccessPostSession = '[Catechisms] Success Post Session',
  RequestPutSession = '[Catechisms] Request Put Session',
  SuccessPutSession = '[Catechisms] Success Put Session',
  RequestDeleteSession = '[Catechisms] Request Delete Session',
  SuccessDeleteSession = '[Catechisms] Success Delete Session',
  SetSelectedSession = '[Catechisms] Set Selected Sessions',
  // INDIVIDUAL DOCUMENTS
  RequestGetAllIndividualDocuments = '[Catechisms] Request Get Individual Documents',
  SuccessGetAllIndividualDocuments = '[Catechisms] Success Get Individual Documents',
  ClearGetAllIndividualDocuments = '[Catechisms] Clear Get Individual Documents',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CatechismsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CatechismsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CatechismsActionTypes.SuccessGetAll;
  constructor(public payload: CatechismResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CatechismsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CatechismsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CatechismsActionTypes.SuccessGet;
  constructor(public payload: Catechism) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CatechismsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CatechismsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CatechismsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CatechismsActionTypes.RequestPut;
  constructor(public payload: Catechism) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CatechismsActionTypes.SuccessPut;
  constructor(public payload: Catechism) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CatechismsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CatechismsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CatechismsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CatechismsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CatechismsActionTypes.SetSelected;
  constructor(public payload?: Catechism[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCatechisms implements Action {
  readonly type = CatechismsActionTypes.RequestGetEntirelyCatechisms;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCatechisms implements Action {
  readonly type = CatechismsActionTypes.SuccessGetEntirelyCatechisms;
  constructor(public payload: CatechismResponse) {}
}

@RequestStatus('pending')
export class RequestPassGrade implements Action {
  readonly type = CatechismsActionTypes.RequestPassGrade;
  constructor(public payload: Catechism) {}
}

@RequestStatus('default')
export class SuccessPassGrade implements Action {
  readonly type = CatechismsActionTypes.SuccessPassGrade;
  constructor(public payload: Catechism) {}
}

@RequestStatus('pending')
export class RequestFinalize implements Action {
  readonly type = CatechismsActionTypes.RequestFinalize;
  constructor(public payload: Catechism) {}
}

@RequestStatus('default')
export class SuccessFinalize implements Action {
  readonly type = CatechismsActionTypes.SuccessFinalize;
  constructor(public payload: Catechism) {}
}

// SESSIONS
@RequestStatus('pending')
export class RequestGetAllSessions implements Action {
  readonly type = CatechismsActionTypes.RequestGetAllSessions;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllSessions implements Action {
  readonly type = CatechismsActionTypes.SuccessGetAllSessions;
  constructor(public payload: CatechismSessionResponse) {}
}

@RequestStatus('default')
export class ClearGetAllSessions implements Action {
  readonly type = CatechismsActionTypes.ClearGetAllSessions;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGetSession implements Action {
  readonly type = CatechismsActionTypes.RequestGetSession;
  constructor(public payload: {}) {}
}

@RequestStatus('default')
export class SuccessGetSession implements Action {
  readonly type = CatechismsActionTypes.SuccessGetSession;
  constructor(public payload: CatechismSession) {}
}

@RequestStatus('pending')
export class RequestPostSession implements Action {
  readonly type = CatechismsActionTypes.RequestPostSession;
  constructor(public payload: {}) {}
}

@RequestStatus('default')
export class SuccessPostSession implements Action {
  readonly type = CatechismsActionTypes.SuccessPostSession;
  constructor(public payload: CatechismSession) {}
}

@RequestStatus('pending')
export class RequestPutSession implements Action {
  readonly type = CatechismsActionTypes.RequestPutSession;
  constructor(public payload: {}) {}
}

@RequestStatus('default')
export class SuccessPutSession implements Action {
  readonly type = CatechismsActionTypes.SuccessPutSession;
  constructor(public payload: CatechismSession) {}
}

@RequestStatus('pending')
export class RequestDeleteSession implements Action {
  readonly type = CatechismsActionTypes.RequestDeleteSession;
  constructor(public payload: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteSession implements Action {
  readonly type = CatechismsActionTypes.SuccessDeleteSession;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedSession implements Action {
  readonly type = CatechismsActionTypes.SetSelectedSession;
  constructor(public payload?: CatechismSession[]) {}
}

// INDIVIDUAL DOCUMENTS
@RequestStatus('pending')
export class RequestGetAllIndividualDocuments implements Action {
  readonly type = CatechismsActionTypes.RequestGetAllIndividualDocuments;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllIndividualDocuments implements Action {
  readonly type = CatechismsActionTypes.SuccessGetAllIndividualDocuments;
  constructor(public payload: CatechismIndividualDocumentResponse) {}
}

@RequestStatus('default')
export class ClearGetAllIndividualDocuments implements Action {
  readonly type = CatechismsActionTypes.ClearGetAllIndividualDocuments;
  constructor() {}
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
  | RequestGetEntirelyCatechisms
  | SuccessGetEntirelyCatechisms
  | RequestPassGrade
  | SuccessPassGrade
  | RequestFinalize
  | SuccessFinalize
  | RequestGetAllSessions
  | SuccessGetAllSessions
  | ClearGetAllSessions
  | RequestGetSession
  | SuccessGetSession
  | RequestPostSession
  | SuccessPostSession
  | RequestPutSession
  | SuccessPutSession
  | RequestDeleteSession
  | SuccessDeleteSession
  | SetSelectedSession
  | RequestGetAllIndividualDocuments
  | SuccessGetAllIndividualDocuments
  | ClearGetAllIndividualDocuments;
