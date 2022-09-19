import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { Chapelry, ChapelryResponse } from '../chapelry.model';

export enum ChapelriesActionTypes {
  RequestFail = '[Chapelries] Request Fail',
  RequestGetAll = '[Chapelries] Request Get All',
  SuccessGetAll = '[Chapelries] Success Get All',
  RequestGet = '[Chapelries] Request Get',
  SuccessGet = '[Chapelries] Success Get',
  RequestPost = '[Chapelries] Request Post',
  SuccessPost = '[Chapelries] Success Post',
  RequestPut = '[Chapelries] Request Put',
  SuccessPut = '[Chapelries] Success Put',
  RequestDelete = '[Chapelries] Request Delete',
  SuccessDelete = '[Chapelries] Success Delete',
  RequestBulkDelete = '[Chapelries] Request Bulk Delete',
  SuccessBulkDelete = '[Chapelries] Success Bulk Delete',
  SetSelected = '[Chapelries] Set Selected',
  RequestGetEntirelyChapelries = '[Chapelries] Request Get Entirely',
  SuccessGetEntirelyChapelries = '[Chapelries] Success Get Entirely',
  RequestPostChapelryImage = '[Chapelrys] Request Post Image',
  SuccessPostChapelryImage = '[Chapelrys] Success Post Image',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = ChapelriesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = ChapelriesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = ChapelriesActionTypes.SuccessGetAll;
  constructor(public payload: ChapelryResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = ChapelriesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = ChapelriesActionTypes.SuccessGet;
  constructor(public payload: Chapelry) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = ChapelriesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = ChapelriesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = ChapelriesActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = ChapelriesActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = ChapelriesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = ChapelriesActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = ChapelriesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = ChapelriesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = ChapelriesActionTypes.SetSelected;
  constructor(public payload?: Chapelry[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyChapelries implements Action {
  readonly type = ChapelriesActionTypes.RequestGetEntirelyChapelries;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyChapelries implements Action {
  readonly type = ChapelriesActionTypes.SuccessGetEntirelyChapelries;
  constructor(public payload: ChapelryResponse) {}
}

@RequestStatus('pending')
export class RequestPostChapelryImage implements Action {
  readonly type = ChapelriesActionTypes.RequestPostChapelryImage;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostChapelryImage implements Action {
  readonly type = ChapelriesActionTypes.SuccessPostChapelryImage;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestGet
  | SuccessGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirelyChapelries
  | SuccessGetEntirelyChapelries
  | RequestPostChapelryImage
  | SuccessPostChapelryImage;
