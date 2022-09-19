import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaFunctionResponse, CuriaFunction } from '../curia-function.model';

export enum CuriaFunctionsActionTypes {
  RequestFail = '[CuriaFunctions] Request Fail',
  RequestGetAll = '[CuriaFunctions] Request Get All',
  SuccessGetAll = '[CuriaFunctions] Success Get All',
  ClearGetAll = '[CuriaFunctions] Clear Get All',
  RequestGet = '[CuriaFunctions] Request Get',
  SuccessGet = '[CuriaFunctions] Success Get',
  ClearGet = '[CuriaFunctions] Clear Get',
  RequestPost = '[CuriaFunctions] Request Post',
  SuccessPost = '[CuriaFunctions] Success Post',
  RequestPut = '[CuriaFunctions] Request Put',
  SuccessPut = '[CuriaFunctions] Success Put',
  RequestDelete = '[CuriaFunctions] Request Delete',
  SuccessDelete = '[CuriaFunctions] Success Delete',
  RequestBulkDelete = '[CuriaFunctions] Request Bulk Delete',
  SuccessBulkDelete = '[CuriaFunctions] Success Bulk Delete',
  SetSelected = '[CuriaFunctions] Set Selected',
  RequestFailSaveAndGenerateDocument = '[CuriaFunctions] Request Fail Save And Generate Document',
  RequestSaveAndGenerateDocument = '[CuriaFunctions] Request Save And Generate Document',
  SuccessSaveAndGenerateDocument = '[CuriaFunctions] Success Save And Generate Document',
  RequestGetEntirely = '[CuriaFunctions] Request Get Entirely',
  SuccessGetEntirely = '[CuriaFunctions] Success Get Entirely',
  RequestGetNew = '[CuriaFunctions] Request Get New',
  SuccessGetNew = '[CuriaFunctions] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessGetAll;
  constructor(public payload: CuriaFunctionResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaFunctionsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessGet;
  constructor(public payload: CuriaFunction) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaFunctionsActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestPut;
  constructor(public payload: CuriaFunction) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessPut;
  constructor(public payload: CuriaFunction) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = CuriaFunctionsActionTypes.SetSelected;
  constructor(public payload?: CuriaFunction[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessGetEntirely;
  constructor(
    public payload: CuriaFunctionResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestGetNew;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessGetNew;
  constructor(public payload: any) {}
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
  | RequestGetEntirely
  | SuccessGetEntirely
  | RequestGetNew
  | SuccessGetNew;
