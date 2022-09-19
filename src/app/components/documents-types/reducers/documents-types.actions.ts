import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { DocumentsTypeResponse, DocumentsType } from '../documents-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum DocumentsTypesActionTypes {
  RequestFailDocumentsTypes = '[DocumentsTypes] Request Fail',
  RequestGetAllDocumentsTypes = '[DocumentsTypes] Request Get All',
  SuccessGetAllDocumentsTypes = '[DocumentsTypes] Success Get All',
  RequestGetDocumentsType = '[DocumentsTypes] Request Get',
  SuccessGetDocumentsType = '[DocumentsTypes] Success Get',
  RequestPostDocumentsType = '[DocumentsTypes] Request Post',
  SuccessPostDocumentsType = '[DocumentsTypes] Success Post',
  RequestPutDocumentsType = '[DocumentsTypes] Request Put',
  SuccessPutDocumentsType = '[DocumentsTypes] Success Put',
  RequestDeleteDocumentsType = '[DocumentsTypes] Request Delete',
  SuccessDeleteDocumentsType = '[DocumentsTypes] Success Delete',
  // RequestBulkDeleteDocumentsTypes = '[DocumentsTypes] Request Bulk Delete',
  // SuccessBulkDeleteDocumentsTypes = '[DocumentsTypes] Success Bulk Delete',
  RequestSendTestDocumentsType = '[DocumentsTypes] Request Send Test',
  SuccessSendTestDocumentsType = '[DocumentsTypes] Success Send Test',
  SetSelectedDocumentsTypes = '[DocumentsTypes] Set Selected',
  SetModalSelectDocumentsType = '[DocumentsTypes] Set Modal Select DocumentsType',
  RequestGetEntirelyDocumentsTypes = '[DocumentsTypes] Request Get Entirely',
  SuccessGetEntirelyDocumentsTypes = '[DocumentsTypes] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailDocumentsTypes implements Action {
  readonly type = DocumentsTypesActionTypes.RequestFailDocumentsTypes;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllDocumentsTypes implements Action {
  readonly type = DocumentsTypesActionTypes.RequestGetAllDocumentsTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllDocumentsTypes implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessGetAllDocumentsTypes;
  constructor(public payload: DocumentsTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.RequestGetDocumentsType;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessGetDocumentsType;
  constructor(public payload: DocumentsType) {}
}

@RequestStatus('pending')
export class RequestPostDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.RequestPostDocumentsType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessPostDocumentsType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.RequestPutDocumentsType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessPutDocumentsType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.RequestDeleteDocumentsType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessDeleteDocumentsType;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteDocumentsTypes implements Action {
//   readonly type = DocumentsTypesActionTypes.RequestBulkDeleteDocumentsTypes;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteDocumentsTypes implements Action {
//   readonly type = DocumentsTypesActionTypes.SuccessBulkDeleteDocumentsTypes;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.RequestSendTestDocumentsType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessSendTestDocumentsType;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedDocumentsTypes implements Action {
  readonly type = DocumentsTypesActionTypes.SetSelectedDocumentsTypes;
  constructor(public payload?: DocumentsType[]) {}
}

@RequestStatus('default')
export class SetModalSelectDocumentsType implements Action {
  readonly type = DocumentsTypesActionTypes.SetModalSelectDocumentsType;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyDocumentsTypes implements Action {
  readonly type = DocumentsTypesActionTypes.RequestGetEntirelyDocumentsTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyDocumentsTypes implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessGetEntirelyDocumentsTypes;
  constructor(public payload: DocumentsTypeResponse) {}
}

export type StatisticsActions =
  | RequestFailDocumentsTypes
  | RequestGetAllDocumentsTypes
  | SuccessGetAllDocumentsTypes
  | RequestGetDocumentsType
  | SuccessGetDocumentsType
  | RequestPostDocumentsType
  | SuccessPostDocumentsType
  | RequestPutDocumentsType
  | SuccessPutDocumentsType
  | RequestDeleteDocumentsType
  | SuccessDeleteDocumentsType
  // | RequestBulkDeleteDocumentsTypes
  // | SuccessBulkDeleteDocumentsTypes
  | RequestSendTestDocumentsType
  | SuccessSendTestDocumentsType
  | SetSelectedDocumentsTypes
  | SetModalSelectDocumentsType
  | RequestGetEntirelyDocumentsTypes
  | SuccessGetEntirelyDocumentsTypes;
