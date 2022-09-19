import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaFunctionsResponse,
  CuriaFunction,
} from '../curia-functions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum CuriaFunctionsActionTypes {
  RequestFail = '[CuriaFunctionsModal] Request Fail',
  RequestGetAll = '[CuriaFunctionsModal] Request Get All',
  SuccessGetAll = '[CuriaFunctionsModal] Success Get All',
  ClearGetAll = '[CuriaFunctionsModal] Clear Get All',
  RequestSetSelected = '[CuriaFunctionsModal] Request Set Selected',
  SuccessSetSelected = '[CuriaFunctionsModal] Success Set Selected',
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
  constructor(public payload: CuriaFunctionsResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = CuriaFunctionsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = CuriaFunctionsActionTypes.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = CuriaFunctionsActionTypes.SuccessSetSelected;
  constructor(public payload: CuriaFunction) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestSetSelected
  | SuccessSetSelected;
