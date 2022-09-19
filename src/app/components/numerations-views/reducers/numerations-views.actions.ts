import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NumerationsViewResponse,
  NumerationsView,
} from '../numerations-view.model';

export enum NumerationsViewsActionTypes {
  RequestFailNumerationsViews = '[NumerationsViews] Request Fail',
  RequestGetAllNumerationsViews = '[NumerationsViews] Request Get All',
  SuccessGetAllNumerationsViews = '[NumerationsViews] Success Get All',
  RequestGetNumerationsView = '[NumerationsViews] Request Get',
  SuccessGetNumerationsView = '[NumerationsViews] Success Get',
  RequestPostNumerationsView = '[NumerationsViews] Request Post',
  SuccessPostNumerationsView = '[NumerationsViews] Success Post',
  RequestPutNumerationsView = '[NumerationsViews] Request Put',
  SuccessPutNumerationsView = '[NumerationsViews] Success Put',
  RequestDeleteNumerationsView = '[NumerationsViews] Request Delete',
  SuccessDeleteNumerationsView = '[NumerationsViews] Success Delete',
  // RequestBulkDeleteNumerationsViews = '[NumerationsViews] Request Bulk Delete',
  // SuccessBulkDeleteNumerationsViews = '[NumerationsViews] Success Bulk Delete',
  SetSelectedNumerationsViews = '[NumerationsViews] Set Selected',
  RequestGetEntirelyNumerationsViews = '[NumerationsViews] Request Get Entirely',
  SuccessGetEntirelyNumerationsViews = '[NumerationsViews] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailNumerationsViews implements Action {
  readonly type = NumerationsViewsActionTypes.RequestFailNumerationsViews;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllNumerationsViews implements Action {
  readonly type = NumerationsViewsActionTypes.RequestGetAllNumerationsViews;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllNumerationsViews implements Action {
  readonly type = NumerationsViewsActionTypes.SuccessGetAllNumerationsViews;
  constructor(public payload: NumerationsViewResponse) {}
}

@RequestStatus('pending')
export class RequestGetNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.RequestGetNumerationsView;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.SuccessGetNumerationsView;
  constructor(public payload: NumerationsView) {}
}

@RequestStatus('pending')
export class RequestPostNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.RequestPostNumerationsView;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.SuccessPostNumerationsView;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.RequestPutNumerationsView;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.SuccessPutNumerationsView;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.RequestDeleteNumerationsView;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteNumerationsView implements Action {
  readonly type = NumerationsViewsActionTypes.SuccessDeleteNumerationsView;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteNumerationsViews implements Action {
//   readonly type = NumerationsViewsActionTypes.RequestBulkDeleteNumerationsViews;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteNumerationsViews implements Action {
//   readonly type = NumerationsViewsActionTypes.SuccessBulkDeleteNumerationsViews;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedNumerationsViews implements Action {
  readonly type = NumerationsViewsActionTypes.SetSelectedNumerationsViews;
  constructor(public payload?: NumerationsView[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyNumerationsViews implements Action {
  readonly type =
    NumerationsViewsActionTypes.RequestGetEntirelyNumerationsViews;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyNumerationsViews implements Action {
  readonly type =
    NumerationsViewsActionTypes.SuccessGetEntirelyNumerationsViews;
  constructor(public payload: NumerationsViewResponse) {}
}

export type StatisticsActions =
  | RequestFailNumerationsViews
  | RequestGetAllNumerationsViews
  | SuccessGetAllNumerationsViews
  | RequestGetNumerationsView
  | SuccessGetNumerationsView
  | RequestPostNumerationsView
  | SuccessPostNumerationsView
  | RequestPutNumerationsView
  | SuccessPutNumerationsView
  | RequestDeleteNumerationsView
  | SuccessDeleteNumerationsView
  // | RequestBulkDeleteNumerationsViews
  // | SuccessBulkDeleteNumerationsViews
  | SetSelectedNumerationsViews
  | RequestGetEntirelyNumerationsViews
  | SuccessGetEntirelyNumerationsViews;
