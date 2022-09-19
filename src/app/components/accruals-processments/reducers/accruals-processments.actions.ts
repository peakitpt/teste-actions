import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccrualsProcessmentResponse,
  AccrualsProcessment,
} from '../accruals-processment.model';

export enum AccrualsProcessmentsActionTypes {
  RequestFailAccrualsProcessments = '[Accruals Processments] Request Fail',
  RequestGetAllAccrualsProcessments = '[Accruals Processments] Request Get All',
  SuccessGetAllAccrualsProcessments = '[Accruals Processments] Success Get All',
  RequestPostProcessAccrual = '[Accruals Processments] Request Post Process Accrual',
  SuccessPostProcessAccrual = '[Accruals Processments] Success Post Process Accrual',
  SetSelectedAccrualsProcessments = '[Accruals Processments] Set Selected',
  RequestGetEntirelyAccrualsProcessments = '[AccrualsProcessments] Request Get Entirely',
  SuccessGetEntirelyAccrualsProcessments = '[AccrualsProcessments] Success Get Entirely',
}

@RequestStatus('error')
export class RequestFailAccrualsProcessments implements Action {
  readonly type =
    AccrualsProcessmentsActionTypes.RequestFailAccrualsProcessments;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllAccrualsProcessments implements Action {
  readonly type =
    AccrualsProcessmentsActionTypes.RequestGetAllAccrualsProcessments;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllAccrualsProcessments implements Action {
  readonly type =
    AccrualsProcessmentsActionTypes.SuccessGetAllAccrualsProcessments;
  constructor(public payload: AccrualsProcessmentResponse) {}
}

@RequestStatus('pending')
export class RequestPostProcessAccrual implements Action {
  readonly type = AccrualsProcessmentsActionTypes.RequestPostProcessAccrual;
  constructor(public payload: number[]) {}
}

@RequestStatus('default')
export class SuccessPostProcessAccrual implements Action {
  readonly type = AccrualsProcessmentsActionTypes.SuccessPostProcessAccrual;
  constructor(public payload?: any[]) {}
}

@RequestStatus('default')
export class SetSelectedAccrualsProcessments implements Action {
  readonly type =
    AccrualsProcessmentsActionTypes.SetSelectedAccrualsProcessments;
  constructor(public payload?: AccrualsProcessment[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyAccrualsProcessments implements Action {
  readonly type =
    AccrualsProcessmentsActionTypes.RequestGetEntirelyAccrualsProcessments;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyAccrualsProcessments implements Action {
  readonly type =
    AccrualsProcessmentsActionTypes.SuccessGetEntirelyAccrualsProcessments;
  constructor(public payload: AccrualsProcessmentResponse) {}
}

export type StatisticsActions =
  | RequestFailAccrualsProcessments
  | RequestGetAllAccrualsProcessments
  | SuccessGetAllAccrualsProcessments
  | RequestPostProcessAccrual
  | SuccessPostProcessAccrual
  | SetSelectedAccrualsProcessments
  | RequestGetEntirelyAccrualsProcessments
  | SuccessGetEntirelyAccrualsProcessments;
