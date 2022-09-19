import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ArchpristshipsResponse,
  Archpristship
} from '../archpristships-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ArchpristshipsActionTypes {
  RequestFail = '[archpristshipsModal] Request Fail',
  RequestGetAll = '[archpristshipsModal] Request Get All',
  SuccessGetAll = '[archpristshipsModal] Success Get All',
  RequestSetSelected = '[archpristshipsModal] Request Set Selected',
  SuccessSetSelected = '[archpristshipsModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ArchpristshipsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ArchpristshipsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessGetAll;
  constructor(public payload: ArchpristshipsResponse) {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = ArchpristshipsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = ArchpristshipsActionTypes.SuccessSetSelected;
  constructor(public payload: Archpristship) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
