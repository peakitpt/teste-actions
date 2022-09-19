import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { RecordsImporter } from '../records-importer.model';

export enum RecordsImportersActionTypes {
  RequestFailRecordsImporters = '[RecordsImporters] Request Fail',
  RequestGetRecordsImporter = '[RecordsImporters] Request Get',
  SuccessGetRecordsImporter = '[RecordsImporters] Success Get',
  RequestPostRecordsImporter = '[RecordsImporters] Request Post',
  SuccessPostRecordsImporter = '[RecordsImporters] Success Post',
  RequestPutRecordsImporter = '[RecordsImporters] Request Put',
  SuccessPutRecordsImporter = '[RecordsImporters] Success Put',
  RequestDeleteRecordsImporter = '[RecordsImporters] Request Delete',
  SuccessDeleteRecordsImporter = '[RecordsImporters] Success Delete',
  SetSelectedRecordsImporters = '[RecordsImporters] Set Selected',
  RequestGetNew = '[RecordsImporters] Request Get New',
  SuccessGetNew = '[RecordsImporters] Success Get New',
  RequestPostUploadFile = '[RecordsImporters] Request Post Upload File',
  SuccessPostUploadFile = '[RecordsImporters] Success Post Upload File',
}

@RequestStatus('error')
export class RequestFailRecordsImporters implements Action {
  readonly type = RecordsImportersActionTypes.RequestFailRecordsImporters;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.RequestGetRecordsImporter;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.SuccessGetRecordsImporter;
  constructor(public payload: RecordsImporter) {}
}

@RequestStatus('pending')
export class RequestPostRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.RequestPostRecordsImporter;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.SuccessPostRecordsImporter;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.RequestPutRecordsImporter;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.SuccessPutRecordsImporter;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.RequestDeleteRecordsImporter;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteRecordsImporter implements Action {
  readonly type = RecordsImportersActionTypes.SuccessDeleteRecordsImporter;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedRecordsImporters implements Action {
  readonly type = RecordsImportersActionTypes.SetSelectedRecordsImporters;
  constructor(public payload?: RecordsImporter[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = RecordsImportersActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = RecordsImportersActionTypes.SuccessGetNew;
  constructor(public payload: RecordsImporter) {}
}

@RequestStatus('pending')
export class RequestPostUploadFile implements Action {
  readonly type = RecordsImportersActionTypes.RequestPostUploadFile;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostUploadFile implements Action {
  readonly type = RecordsImportersActionTypes.SuccessPostUploadFile;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFailRecordsImporters
  | RequestGetRecordsImporter
  | SuccessGetRecordsImporter
  | RequestPostRecordsImporter
  | SuccessPostRecordsImporter
  | RequestPutRecordsImporter
  | SuccessPutRecordsImporter
  | RequestDeleteRecordsImporter
  | SuccessDeleteRecordsImporter
  | SetSelectedRecordsImporters
  | RequestGetNew
  | SuccessGetNew
  | RequestPostUploadFile
  | SuccessPostUploadFile;
