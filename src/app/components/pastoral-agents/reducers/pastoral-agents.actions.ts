import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

import { EntityPastoralAgent } from '../../mecs/mecs.model';
import {
  PastoralAgentResponse,
  PastoralAgentTypesResponse
} from '../pastoral-agents.model';

export enum PastoralAgentsActionTypes {
  RequestFail = '[PastoralAgents] Request Fail',
  RequestGetAll = '[PastoralAgents] Request Get All',
  SuccessGetAll = '[PastoralAgents] Success Get All',
  RequestGet = '[PastoralAgents] Request Get',
  SuccessGet = '[PastoralAgents] Success Get',
  RequestGetTypes = '[PastoralAgents] Request Get Types',
  SuccessGetTypes = '[PastoralAgents] Success Get Types',
  RequestPost = '[PastoralAgents] Request Post',
  SuccessPost = '[PastoralAgents] Success Post',
  RequestPut = '[PastoralAgents] Request Put',
  SuccessPut = '[PastoralAgents] Success Put',
  RequestDelete = '[PastoralAgents] Request Delete',
  SuccessDelete = '[PastoralAgents] Success Delete',
  RequestBulkDelete = '[PastoralAgents] Request Bulk Delete',
  SuccessBulkDelete = '[PastoralAgents] Success Bulk Delete',
  SetSelected = '[PastoralAgents] Set Selected',
  RequestGetEntirelyPastoralAgents = '[PastoralAgents] Request Get Entirely',
  SuccessGetEntirelyPastoralAgents = '[PastoralAgents] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PastoralAgentsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PastoralAgentsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessGetAll;
  constructor(public payload: PastoralAgentResponse) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = PastoralAgentsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessGet;
  constructor(public payload: EntityPastoralAgent) {}
}
@RequestStatus('pending')
export class RequestGetTypes implements Action {
  readonly type = PastoralAgentsActionTypes.RequestGetTypes;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetTypes implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessGetTypes;
  constructor(public payload: PastoralAgentTypesResponse) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = PastoralAgentsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = PastoralAgentsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = PastoralAgentsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessDelete;
  constructor(public payload: number) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = PastoralAgentsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = PastoralAgentsActionTypes.SetSelected;
  constructor(public payload?: EntityPastoralAgent[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyPastoralAgents implements Action {
  readonly type = PastoralAgentsActionTypes.RequestGetEntirelyPastoralAgents;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyPastoralAgents implements Action {
  readonly type = PastoralAgentsActionTypes.SuccessGetEntirelyPastoralAgents;
  constructor(public payload: PastoralAgentResponse) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | RequestGet
  | SuccessGet
  | RequestGetTypes
  | SuccessGetTypes
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected
  | RequestGetEntirelyPastoralAgents
  | SuccessGetEntirelyPastoralAgents;
