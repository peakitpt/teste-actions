import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  PastoralAgentsType,
  PastoralAgentsTypeResponse
} from '../pastoral-agents-type.model';

export enum PastoralAgentsTypesActionTypes {
  RequestFailPastoralAgentsTypes = '[PastoralAgentsTypes] Request Fail',
  RequestGetAllPastoralAgentsTypes = '[PastoralAgentsTypes] Request Get All',
  SuccessGetAllPastoralAgentsTypes = '[PastoralAgentsTypes] Success Get All',
  RequestGetPastoralAgentsType = '[PastoralAgentsTypes] Request Get',
  SuccessGetPastoralAgentsType = '[PastoralAgentsTypes] Success Get',
  RequestPostPastoralAgentsType = '[PastoralAgentsTypes] Request Post',
  SuccessPostPastoralAgentsType = '[PastoralAgentsTypes] Success Post',
  RequestPutPastoralAgentsType = '[PastoralAgentsTypes] Request Put',
  SuccessPutPastoralAgentsType = '[PastoralAgentsTypes] Success Put',
  RequestDeletePastoralAgentsType = '[PastoralAgentsTypes] Request Delete',
  SuccessDeletePastoralAgentsType = '[PastoralAgentsTypes] Success Delete',
  // RequestBulkDeletePastoralAgentsTypes = '[PastoralAgentsTypes] Request Bulk Delete',
  // SuccessBulkDeletePastoralAgentsTypes = '[PastoralAgentsTypes] Success Bulk Delete',
  SetSelectedPastoralAgentsTypes = '[PastoralAgentsTypes] Set Selected',
  RequestGetEntirelyPastoralAgentsTypes = '[PastoralAgentsTypes] Request Get Entirely',
  SuccessGetEntirelyPastoralAgentsTypes = '[PastoralAgentsTypes] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailPastoralAgentsTypes implements Action {
  readonly type = PastoralAgentsTypesActionTypes.RequestFailPastoralAgentsTypes;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllPastoralAgentsTypes implements Action {
  readonly type =
    PastoralAgentsTypesActionTypes.RequestGetAllPastoralAgentsTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllPastoralAgentsTypes implements Action {
  readonly type =
    PastoralAgentsTypesActionTypes.SuccessGetAllPastoralAgentsTypes;
  constructor(public payload: PastoralAgentsTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetPastoralAgentsType implements Action {
  readonly type = PastoralAgentsTypesActionTypes.RequestGetPastoralAgentsType;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetPastoralAgentsType implements Action {
  readonly type = PastoralAgentsTypesActionTypes.SuccessGetPastoralAgentsType;
  constructor(public payload: PastoralAgentsType) {}
}

@RequestStatus('pending')
export class RequestPostPastoralAgentsType implements Action {
  readonly type = PastoralAgentsTypesActionTypes.RequestPostPastoralAgentsType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostPastoralAgentsType implements Action {
  readonly type = PastoralAgentsTypesActionTypes.SuccessPostPastoralAgentsType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutPastoralAgentsType implements Action {
  readonly type = PastoralAgentsTypesActionTypes.RequestPutPastoralAgentsType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutPastoralAgentsType implements Action {
  readonly type = PastoralAgentsTypesActionTypes.SuccessPutPastoralAgentsType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeletePastoralAgentsType implements Action {
  readonly type =
    PastoralAgentsTypesActionTypes.RequestDeletePastoralAgentsType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeletePastoralAgentsType implements Action {
  readonly type =
    PastoralAgentsTypesActionTypes.SuccessDeletePastoralAgentsType;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeletePastoralAgentsTypes implements Action {
//   readonly type = PastoralAgentsTypesActionTypes.RequestBulkDeletePastoralAgentsTypes;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeletePastoralAgentsTypes implements Action {
//   readonly type = PastoralAgentsTypesActionTypes.SuccessBulkDeletePastoralAgentsTypes;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedPastoralAgentsTypes implements Action {
  readonly type = PastoralAgentsTypesActionTypes.SetSelectedPastoralAgentsTypes;
  constructor(public payload?: PastoralAgentsType[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyPastoralAgentsTypes implements Action {
  readonly type =
    PastoralAgentsTypesActionTypes.RequestGetEntirelyPastoralAgentsTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyPastoralAgentsTypes implements Action {
  readonly type =
    PastoralAgentsTypesActionTypes.SuccessGetEntirelyPastoralAgentsTypes;
  constructor(public payload: PastoralAgentsTypeResponse) {}
}

export type StatisticsActions =
  | RequestFailPastoralAgentsTypes
  | RequestGetAllPastoralAgentsTypes
  | SuccessGetAllPastoralAgentsTypes
  | RequestGetPastoralAgentsType
  | SuccessGetPastoralAgentsType
  | RequestPostPastoralAgentsType
  | SuccessPostPastoralAgentsType
  | RequestPutPastoralAgentsType
  | SuccessPutPastoralAgentsType
  | RequestDeletePastoralAgentsType
  | SuccessDeletePastoralAgentsType
  // | RequestBulkDeletePastoralAgentsTypes
  // | SuccessBulkDeletePastoralAgentsTypes
  | SetSelectedPastoralAgentsTypes
  | RequestGetEntirelyPastoralAgentsTypes
  | SuccessGetEntirelyPastoralAgentsTypes;
