import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  DocumentsTypesResponse,
  DocumentsType,
} from '../documents-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum DocumentsTypesActionTypes {
  RequestFail = '[DocumentsTypesModal] Request Fail',
  RequestGetAll = '[DocumentsTypesModal] Request Get All',
  SuccessGetAll = '[DocumentsTypesModal] Success Get All',
  RequestSetSelected = '[DocumentsTypesModal] Request Set Selected',
  SuccessSetSelected = '[DocumentsTypesModal] Success Set Selected',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = DocumentsTypesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = DocumentsTypesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessGetAll;
  constructor(public payload: DocumentsTypesResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = DocumentsTypesActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = DocumentsTypesActionTypes.SuccessSetSelected;
  constructor(public payload: DocumentsType) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
