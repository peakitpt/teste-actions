import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { FormationResponse, Formation } from '../formation.model';

export enum FormationsActionTypes {
  RequestFailFormations = '[Formations] Request Fail',
  RequestGetAllFormations = '[Formations] Request Get All',
  SuccessGetAllFormations = '[Formations] Success Get All',
  RequestGetFormation = '[Formations] Request Get',
  SuccessGetFormation = '[Formations] Success Get',
  RequestPostFormation = '[Formations] Request Post',
  SuccessPostFormation = '[Formations] Success Post',
  RequestPutFormation = '[Formations] Request Put',
  SuccessPutFormation = '[Formations] Success Put',
  RequestDeleteFormation = '[Formations] Request Delete',
  SuccessDeleteFormation = '[Formations] Success Delete',
  // RequestBulkDeleteFormations = '[Formations] Request Bulk Delete',
  // SuccessBulkDeleteFormations = '[Formations] Success Bulk Delete',
  RequestSendTestFormation = '[Formations] Request Send Test',
  SuccessSendTestFormation = '[Formations] Success Send Test',
  SetSelectedFormations = '[Formations] Set Selected',
  RequestGetEntirelyFormations = '[Formations] Request Get Entirely',
  SuccessGetEntirelyFormations = '[Formations] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailFormations implements Action {
  readonly type = FormationsActionTypes.RequestFailFormations;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllFormations implements Action {
  readonly type = FormationsActionTypes.RequestGetAllFormations;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllFormations implements Action {
  readonly type = FormationsActionTypes.SuccessGetAllFormations;
  constructor(public payload: FormationResponse) {}
}

@RequestStatus('pending')
export class RequestGetFormation implements Action {
  readonly type = FormationsActionTypes.RequestGetFormation;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetFormation implements Action {
  readonly type = FormationsActionTypes.SuccessGetFormation;
  constructor(public payload: Formation) {}
}

@RequestStatus('pending')
export class RequestPostFormation implements Action {
  readonly type = FormationsActionTypes.RequestPostFormation;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostFormation implements Action {
  readonly type = FormationsActionTypes.SuccessPostFormation;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutFormation implements Action {
  readonly type = FormationsActionTypes.RequestPutFormation;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutFormation implements Action {
  readonly type = FormationsActionTypes.SuccessPutFormation;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteFormation implements Action {
  readonly type = FormationsActionTypes.RequestDeleteFormation;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteFormation implements Action {
  readonly type = FormationsActionTypes.SuccessDeleteFormation;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteFormations implements Action {
//   readonly type = FormationsActionTypes.RequestBulkDeleteFormations;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteFormations implements Action {
//   readonly type = FormationsActionTypes.SuccessBulkDeleteFormations;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestFormation implements Action {
  readonly type = FormationsActionTypes.RequestSendTestFormation;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestFormation implements Action {
  readonly type = FormationsActionTypes.SuccessSendTestFormation;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedFormations implements Action {
  readonly type = FormationsActionTypes.SetSelectedFormations;
  constructor(public payload?: Formation[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyFormations implements Action {
  readonly type = FormationsActionTypes.RequestGetEntirelyFormations;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyFormations implements Action {
  readonly type = FormationsActionTypes.SuccessGetEntirelyFormations;
  constructor(public payload: FormationResponse) {}
}

export type StatisticsActions =
  | RequestFailFormations
  | RequestGetAllFormations
  | SuccessGetAllFormations
  | RequestGetFormation
  | SuccessGetFormation
  | RequestPostFormation
  | SuccessPostFormation
  | RequestPutFormation
  | SuccessPutFormation
  | RequestDeleteFormation
  | SuccessDeleteFormation
  // | RequestBulkDeleteFormations
  // | SuccessBulkDeleteFormations
  | RequestSendTestFormation
  | SuccessSendTestFormation
  | SetSelectedFormations
  | RequestGetEntirelyFormations
  | SuccessGetEntirelyFormations;
