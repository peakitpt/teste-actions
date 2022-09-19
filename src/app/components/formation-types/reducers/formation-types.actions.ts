import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { FormationTypeResponse, FormationType } from '../formation-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum FormationTypesActionTypes {
  RequestFailFormationTypes = '[FormationTypes] Request Fail',
  RequestGetAllFormationTypes = '[FormationTypes] Request Get All',
  SuccessGetAllFormationTypes = '[FormationTypes] Success Get All',
  RequestGetFormationType = '[FormationTypes] Request Get',
  SuccessGetFormationType = '[FormationTypes] Success Get',
  RequestPostFormationType = '[FormationTypes] Request Post',
  SuccessPostFormationType = '[FormationTypes] Success Post',
  RequestPutFormationType = '[FormationTypes] Request Put',
  SuccessPutFormationType = '[FormationTypes] Success Put',
  RequestDeleteFormationType = '[FormationTypes] Request Delete',
  SuccessDeleteFormationType = '[FormationTypes] Success Delete',
  // RequestBulkDeleteFormationTypes = '[FormationTypes] Request Bulk Delete',
  // SuccessBulkDeleteFormationTypes = '[FormationTypes] Success Bulk Delete',
  RequestSendTestFormationType = '[FormationTypes] Request Send Test',
  SuccessSendTestFormationType = '[FormationTypes] Success Send Test',
  SetSelectedFormationTypes = '[FormationTypes] Set Selected',
  SetModalSelectFormationType = '[FormationTypes] Set Modal Select FormationType',
  RequestGetEntirelyFormationTypes = '[FormationTypes] Request Get Entirely',
  SuccessGetEntirelyFormationTypes = '[FormationTypes] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailFormationTypes implements Action {
  readonly type = FormationTypesActionTypes.RequestFailFormationTypes;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllFormationTypes implements Action {
  readonly type = FormationTypesActionTypes.RequestGetAllFormationTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllFormationTypes implements Action {
  readonly type = FormationTypesActionTypes.SuccessGetAllFormationTypes;
  constructor(public payload: FormationTypeResponse) {}
}

@RequestStatus('pending')
export class RequestGetFormationType implements Action {
  readonly type = FormationTypesActionTypes.RequestGetFormationType;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetFormationType implements Action {
  readonly type = FormationTypesActionTypes.SuccessGetFormationType;
  constructor(public payload: FormationType) {}
}

@RequestStatus('pending')
export class RequestPostFormationType implements Action {
  readonly type = FormationTypesActionTypes.RequestPostFormationType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostFormationType implements Action {
  readonly type = FormationTypesActionTypes.SuccessPostFormationType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutFormationType implements Action {
  readonly type = FormationTypesActionTypes.RequestPutFormationType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutFormationType implements Action {
  readonly type = FormationTypesActionTypes.SuccessPutFormationType;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteFormationType implements Action {
  readonly type = FormationTypesActionTypes.RequestDeleteFormationType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteFormationType implements Action {
  readonly type = FormationTypesActionTypes.SuccessDeleteFormationType;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteFormationTypes implements Action {
//   readonly type = FormationTypesActionTypes.RequestBulkDeleteFormationTypes;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteFormationTypes implements Action {
//   readonly type = FormationTypesActionTypes.SuccessBulkDeleteFormationTypes;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestFormationType implements Action {
  readonly type = FormationTypesActionTypes.RequestSendTestFormationType;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestFormationType implements Action {
  readonly type = FormationTypesActionTypes.SuccessSendTestFormationType;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedFormationTypes implements Action {
  readonly type = FormationTypesActionTypes.SetSelectedFormationTypes;
  constructor(public payload?: FormationType[]) {}
}

@RequestStatus('default')
export class SetModalSelectFormationType implements Action {
  readonly type = FormationTypesActionTypes.SetModalSelectFormationType;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyFormationTypes implements Action {
  readonly type = FormationTypesActionTypes.RequestGetEntirelyFormationTypes;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyFormationTypes implements Action {
  readonly type = FormationTypesActionTypes.SuccessGetEntirelyFormationTypes;
  constructor(public payload: FormationTypeResponse) {}
}

export type StatisticsActions =
  | RequestFailFormationTypes
  | RequestGetAllFormationTypes
  | SuccessGetAllFormationTypes
  | RequestGetFormationType
  | SuccessGetFormationType
  | RequestPostFormationType
  | SuccessPostFormationType
  | RequestPutFormationType
  | SuccessPutFormationType
  | RequestDeleteFormationType
  | SuccessDeleteFormationType
  // | RequestBulkDeleteFormationTypes
  // | SuccessBulkDeleteFormationTypes
  | RequestSendTestFormationType
  | SuccessSendTestFormationType
  | SetSelectedFormationTypes
  | SetModalSelectFormationType
  | RequestGetEntirelyFormationTypes
  | SuccessGetEntirelyFormationTypes;
