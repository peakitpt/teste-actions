import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import {
  BishopricIntegratedView,
  BishopricIntegratedViewResponse,
} from '../bishopric-integrated-view.model';

export enum BishopricIntegratedViewsActionTypes {
  RequestFail = '[BishopricIntegratedViews] Request Fail',
  RequestGetAll = '[BishopricIntegratedViews] Request Get All',
  SuccessGetAll = '[BishopricIntegratedViews] Success Get All',
  RequestGet = '[BishopricIntegratedViews] Request Get',
  SuccessGet = '[BishopricIntegratedViews] Success Get',
  SetSelected = '[BishopricIntegratedViews] Set Selected',
  RequestGetEntirelyBishopricIntegratedViews = '[BishopricIntegratedViews] Request Get Entirely',
  SuccessGetEntirelyBishopricIntegratedViews = '[BishopricIntegratedViews] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = BishopricIntegratedViewsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = BishopricIntegratedViewsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = BishopricIntegratedViewsActionTypes.SuccessGetAll;
  constructor(public payload: BishopricIntegratedViewResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = BishopricIntegratedViewsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = BishopricIntegratedViewsActionTypes.SuccessGet;
  constructor(public payload: BishopricIntegratedView) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = BishopricIntegratedViewsActionTypes.SetSelected;
  constructor(public payload?: BishopricIntegratedView[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyBishopricIntegratedViews implements Action {
  readonly type =
    BishopricIntegratedViewsActionTypes.RequestGetEntirelyBishopricIntegratedViews;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyBishopricIntegratedViews implements Action {
  readonly type =
    BishopricIntegratedViewsActionTypes.SuccessGetEntirelyBishopricIntegratedViews;
  constructor(public payload: BishopricIntegratedViewResponse) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestGet
  | SuccessGet
  | SetSelected
  | RequestGetEntirelyBishopricIntegratedViews
  | SuccessGetEntirelyBishopricIntegratedViews;
