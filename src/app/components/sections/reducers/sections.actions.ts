import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SectionResponse, Section } from '../section.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum SectionsActionTypes {
  RequestFailSections = '[Sections] Request Fail',
  RequestGetAllSections = '[Sections] Request Get All',
  SuccessGetAllSections = '[Sections] Success Get All',
  RequestGetSection = '[Sections] Request Get',
  SuccessGetSection = '[Sections] Success Get',
  RequestPostSection = '[Sections] Request Post',
  SuccessPostSection = '[Sections] Success Post',
  RequestPutSection = '[Sections] Request Put',
  SuccessPutSection = '[Sections] Success Put',
  RequestDeleteSection = '[Sections] Request Delete',
  SuccessDeleteSection = '[Sections] Success Delete',
  // RequestBulkDeleteSections = '[Sections] Request Bulk Delete',
  // SuccessBulkDeleteSections = '[Sections] Success Bulk Delete',
  RequestSendTestSection = '[Sections] Request Send Test',
  SuccessSendTestSection = '[Sections] Success Send Test',
  SetSelectedSections = '[Sections] Set Selected',
  SetModalSelectSection = '[Sections] Set Modal Select Section',
  RequestGetEntirelySections = '[Sections] Request Get Entirely',
  SuccessGetEntirelySections = '[Sections] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailSections implements Action {
  readonly type = SectionsActionTypes.RequestFailSections;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllSections implements Action {
  readonly type = SectionsActionTypes.RequestGetAllSections;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllSections implements Action {
  readonly type = SectionsActionTypes.SuccessGetAllSections;
  constructor(public payload: SectionResponse) {}
}

@RequestStatus('pending')
export class RequestGetSection implements Action {
  readonly type = SectionsActionTypes.RequestGetSection;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetSection implements Action {
  readonly type = SectionsActionTypes.SuccessGetSection;
  constructor(public payload: Section) {}
}

@RequestStatus('pending')
export class RequestPostSection implements Action {
  readonly type = SectionsActionTypes.RequestPostSection;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostSection implements Action {
  readonly type = SectionsActionTypes.SuccessPostSection;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutSection implements Action {
  readonly type = SectionsActionTypes.RequestPutSection;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutSection implements Action {
  readonly type = SectionsActionTypes.SuccessPutSection;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteSection implements Action {
  readonly type = SectionsActionTypes.RequestDeleteSection;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteSection implements Action {
  readonly type = SectionsActionTypes.SuccessDeleteSection;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteSections implements Action {
//   readonly type = SectionsActionTypes.RequestBulkDeleteSections;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteSections implements Action {
//   readonly type = SectionsActionTypes.SuccessBulkDeleteSections;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestSection implements Action {
  readonly type = SectionsActionTypes.RequestSendTestSection;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestSection implements Action {
  readonly type = SectionsActionTypes.SuccessSendTestSection;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedSections implements Action {
  readonly type = SectionsActionTypes.SetSelectedSections;
  constructor(public payload?: Section[]) {}
}

@RequestStatus('default')
export class SetModalSelectSection implements Action {
  readonly type = SectionsActionTypes.SetModalSelectSection;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelySections implements Action {
  readonly type = SectionsActionTypes.RequestGetEntirelySections;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelySections implements Action {
  readonly type = SectionsActionTypes.SuccessGetEntirelySections;
  constructor(public payload: SectionResponse) {}
}

export type StatisticsActions =
  | RequestFailSections
  | RequestGetAllSections
  | SuccessGetAllSections
  | RequestGetSection
  | SuccessGetSection
  | RequestPostSection
  | SuccessPostSection
  | RequestPutSection
  | SuccessPutSection
  | RequestDeleteSection
  | SuccessDeleteSection
  // | RequestBulkDeleteSections
  // | SuccessBulkDeleteSections
  | RequestSendTestSection
  | SuccessSendTestSection
  | SetSelectedSections
  | SetModalSelectSection
  | RequestGetEntirelySections
  | SuccessGetEntirelySections;
