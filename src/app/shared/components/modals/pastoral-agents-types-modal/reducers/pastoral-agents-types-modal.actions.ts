import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PastoralAgentsTypesResponse, PastoralAgentsType } from '../pastoral-agents-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum PastoralAgentsTypesAction {
  RequestFail = '[PastoralAgentsTypesModal] Request Fail',
  RequestGetAll = '[PastoralAgentsTypesentsTypesModal] Request Get All',
  SuccessGetAll = '[PastoralAgentsTypesentsTypesentsTypesentsTypesModal] Success Get All',
  RequestSetSelected = '[PastoralAgentsTypesentsTypesModal] Request Set Selected',
  SuccessSetSelected = '[PastoralAgentsTypesentsTypesModal] Success Set Selected'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PastoralAgentsTypesAction.RequestFail;
  constructor(public payload: RequestError) { }
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PastoralAgentsTypesAction.RequestGetAll;
  constructor(public payload?: {}) { }
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PastoralAgentsTypesAction.SuccessGetAll;
  constructor(public payload: PastoralAgentsTypesResponse) { }
}

@RequestStatus('pending')
export class RequestSetSelected implements Action {
  readonly type = PastoralAgentsTypesAction.RequestSetSelected;
  constructor(public payload?: SelectedModalRow) { }
}

@RequestStatus('default')
export class SuccessSetSelected implements Action {
  readonly type = PastoralAgentsTypesAction.SuccessSetSelected;
  constructor(public payload: PastoralAgentsType) { }
}

export type PastoralAgentsTypesActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestSetSelected
  | SuccessSetSelected;
