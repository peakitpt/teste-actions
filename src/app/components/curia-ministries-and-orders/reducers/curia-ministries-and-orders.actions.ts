import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaMinistryAndOrderResponse,
  CuriaMinistryAndOrder,
} from '../curia-ministry-and-order.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { DocumentsActionTypes } from '../../documents/reducers/documents.actions';

export enum CuriaMinistriesAndOrdersActionTypes {
  RequestFailCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Request Fail',
  RequestGetAllCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Request Get All',
  SuccessGetAllCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Success Get All',
  RequestGetCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Request Get',
  SuccessGetCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Success Get',
  RequestPostCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Request Post',
  SuccessPostCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Success Post',
  RequestPutCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Request Put',
  SuccessPutCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Success Put',
  RequestDeleteCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Request Delete',
  SuccessDeleteCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Success Delete',
  // RequestBulkDeleteCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Request Bulk Delete',
  // SuccessBulkDeleteCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Success Bulk Delete',
  RequestSendTestCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Request Send Test',
  SuccessSendTestCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Success Send Test',
  SetSelectedCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Set Selected',
  SetModalSelectCuriaMinistryAndOrder = '[CuriaMinistriesAndOrders] Set Modal Select CuriaMinistryAndOrder',
  RequestGetEntirelyCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Request Get Entirely',
  SuccessGetEntirelyCuriaMinistriesAndOrders = '[CuriaMinistriesAndOrders] Success Get Entirely',
  RequestGetNew = '[CuriaMinistriesAndOrders] Request Get New',
  SuccessGetNew = '[CuriaMinistriesAndOrders] Success Get New',
  ClearGet = '[CuriaMinistriesAndOrders] Clear Get',
}

@RequestStatus('error')
export class RequestFailCuriaMinistriesAndOrders implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestFailCuriaMinistriesAndOrders;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCuriaMinistriesAndOrders implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestGetAllCuriaMinistriesAndOrders;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCuriaMinistriesAndOrders implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SuccessGetAllCuriaMinistriesAndOrders;
  constructor(public payload: CuriaMinistryAndOrderResponse) {}
}

@RequestStatus('pending')
export class RequestGetCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestGetCuriaMinistryAndOrder;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SuccessGetCuriaMinistryAndOrder;
  constructor(public payload: CuriaMinistryAndOrder) {}
}

@RequestStatus('pending')
export class RequestPostCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestPostCuriaMinistryAndOrder;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SuccessPostCuriaMinistryAndOrder;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestPutCuriaMinistryAndOrder;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SuccessPutCuriaMinistryAndOrder;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestDeleteCuriaMinistryAndOrder;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SuccessDeleteCuriaMinistryAndOrder;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCuriaMinistriesAndOrders implements Action {
//   readonly type = CuriaMinistriesAndOrdersActionTypes.RequestBulkDeleteCuriaMinistriesAndOrders;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCuriaMinistriesAndOrders implements Action {
//   readonly type = CuriaMinistriesAndOrdersActionTypes.SuccessBulkDeleteCuriaMinistriesAndOrders;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestSendTestCuriaMinistryAndOrder;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SuccessSendTestCuriaMinistryAndOrder;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedCuriaMinistriesAndOrders implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SetSelectedCuriaMinistriesAndOrders;
  constructor(public payload?: CuriaMinistryAndOrder[]) {}
}

@RequestStatus('default')
export class SetModalSelectCuriaMinistryAndOrder implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SetModalSelectCuriaMinistryAndOrder;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCuriaMinistriesAndOrders implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.RequestGetEntirelyCuriaMinistriesAndOrders;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCuriaMinistriesAndOrders implements Action {
  readonly type =
    CuriaMinistriesAndOrdersActionTypes.SuccessGetEntirelyCuriaMinistriesAndOrders;
  constructor(public payload: CuriaMinistryAndOrderResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaMinistriesAndOrdersActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaMinistriesAndOrdersActionTypes.SuccessGetNew;
  constructor(public payload: CuriaMinistryAndOrder) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaMinistriesAndOrdersActionTypes.ClearGet;
  constructor() {}
}

export type StatisticsActions =
  | RequestFailCuriaMinistriesAndOrders
  | RequestGetAllCuriaMinistriesAndOrders
  | SuccessGetAllCuriaMinistriesAndOrders
  | RequestGetCuriaMinistryAndOrder
  | SuccessGetCuriaMinistryAndOrder
  | RequestPostCuriaMinistryAndOrder
  | SuccessPostCuriaMinistryAndOrder
  | RequestPutCuriaMinistryAndOrder
  | SuccessPutCuriaMinistryAndOrder
  | RequestDeleteCuriaMinistryAndOrder
  | SuccessDeleteCuriaMinistryAndOrder
  // | RequestBulkDeleteCuriaMinistriesAndOrders
  // | SuccessBulkDeleteCuriaMinistriesAndOrders
  | RequestSendTestCuriaMinistryAndOrder
  | SuccessSendTestCuriaMinistryAndOrder
  | SetSelectedCuriaMinistriesAndOrders
  | SetModalSelectCuriaMinistryAndOrder
  | RequestGetEntirelyCuriaMinistriesAndOrders
  | SuccessGetEntirelyCuriaMinistriesAndOrders
  | RequestGetNew
  | SuccessGetNew
  | ClearGet;
