import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AcceptPendingEntity,
  CountPendingEntities,
  PendingEntityEntity,
  PendingEntityResponse,
} from '../pending-entity.model';
import { TaxpayerNameValidation } from '@peakitpt/ui-kyrios-api';
import { Entity } from 'src/app/shared/reducers/entities/entity.model';

export enum PendingEntitiesActionTypes {
  RequestFail = '[PendingEntity] Request Fail',
  RequestGetAll = '[PendingEntity] Request Get All',
  SuccessGetAll = '[PendingEntity] Success Get All',
  ClearGetAll = '[PendingEntity] Clear Get All',
  RequestGet = '[PendingEntity] Request Get',
  SuccessGet = '[PendingEntity] Success Get',
  ClearGet = '[PendingEntity] Clear Get',
  RequestPost = '[PendingEntity] Request Post',
  SuccessPost = '[PendingEntity] Success Post',
  RequestPut = '[PendingEntity] Request Put',
  SuccessPut = '[PendingEntity] Success Put',
  RequestDelete = '[PendingEntity] Request Delete',
  SuccessDelete = '[PendingEntity] Success Delete',
  RequestBulkDelete = '[PendingEntity] Request Bulk Delete',
  SuccessBulkDelete = '[PendingEntity] Success Bulk Delete',
  SetSelected = '[PendingEntity] Set Selected',
  RequestGetByEntityId = '[PendingEntity] Request By Entity Id',
  SuccessGetByEntityId = '[PendingEntity] Success By Entity Id',
  ClearGetByEntityId = '[PendingEntity] Clear By Entity Id',
  RequestCheckExistance = '[PendingEntity] Request Check Existance',
  SuccessCheckExistance = '[PendingEntity] Success Check Existance',
  ClearCheckExistance = '[PendingEntity] Clear Check Existance',
  RequestGetEntirely = '[PendingEntity] Request Get Entirely',
  SuccessGetEntirely = '[PendingEntity] Success Get Entirely',

  RequestRejectPendingEntity = '[PendingEntity] Request Reject Pending Entity',
  SuccessRejectPendingEntity = '[PendingEntity] Success Reject Pending Entity',
  RequestAcceptPendingEntity = '[PendingEntity] Request Accept Pending Entity',
  SuccessAcceptPendingEntity = '[PendingEntity] Success Accept Pending Entity',

  RequestCountPendingEntity = '[PendingEntity] Request Count Pending Entity',
  SuccessCountPendingEntity = '[PendingEntity] Success Count Pending Entity',

  RequestSimilarEntity = '[PendingEntity] Request Similar Entity',
  SuccessSimilarEntity = '[PendingEntity] Success Similar Entity',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = PendingEntitiesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = PendingEntitiesActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessGetAll;
  constructor(public payload: PendingEntityResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = PendingEntitiesActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = PendingEntitiesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessGet;
  constructor(public payload: PendingEntityEntity) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = PendingEntitiesActionTypes.ClearGet;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = PendingEntitiesActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = PendingEntitiesActionTypes.RequestPut;
  constructor(public payload: PendingEntityEntity) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessPut;
  constructor(public payload: PendingEntityEntity) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = PendingEntitiesActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = PendingEntitiesActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = PendingEntitiesActionTypes.SetSelected;
  constructor(public payload?: PendingEntityEntity[]) {}
}

@RequestStatus('pending')
export class RequestGetByEntityId implements Action {
  readonly type = PendingEntitiesActionTypes.RequestGetByEntityId;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetByEntityId implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessGetByEntityId;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class ClearGetByEntityId implements Action {
  readonly type = PendingEntitiesActionTypes.ClearGetByEntityId;
  constructor() {}
}

@RequestStatus('pending')
export class RequestCheckExistance implements Action {
  readonly type = PendingEntitiesActionTypes.RequestCheckExistance;
  constructor(
    public payload: { id?: number; name?: string; taxpayer?: string }
  ) {}
}

@RequestStatus('default')
export class SuccessCheckExistance implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessCheckExistance;
  constructor(public payload: TaxpayerNameValidation) {}
}

@RequestStatus('default')
export class ClearCheckExistance implements Action {
  readonly type = PendingEntitiesActionTypes.ClearCheckExistance;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGetEntirely implements Action {
  readonly type = PendingEntitiesActionTypes.RequestGetEntirely;
  constructor(public payload?: {}, public isDetailsList = false) {}
}

@RequestStatus('default')
export class SuccessGetEntirely implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessGetEntirely;
  constructor(
    public payload: PendingEntityResponse,
    public isDetailsList = false
  ) {}
}

@RequestStatus('pending')
export class RequestRejectPendingEntity implements Action {
  readonly type = PendingEntitiesActionTypes.RequestRejectPendingEntity;
  constructor(public payload?: PendingEntityEntity) {}
}

@RequestStatus('default')
export class SuccessRejectPendingEntity implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessRejectPendingEntity;
  constructor(public payload: PendingEntityEntity) {}
}

@RequestStatus('pending')
export class RequestAcceptPendingEntity implements Action {
  readonly type = PendingEntitiesActionTypes.RequestAcceptPendingEntity;
  constructor(public payload?: AcceptPendingEntity) {}
}

@RequestStatus('default')
export class SuccessAcceptPendingEntity implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessAcceptPendingEntity;
  constructor(public payload: AcceptPendingEntity) {}
}

@RequestStatus('pending')
export class RequestCountPendingEntity implements Action {
  readonly type = PendingEntitiesActionTypes.RequestCountPendingEntity;
  constructor(public payload?: PendingEntityEntity) {}
}

@RequestStatus('default')
export class SuccessCountPendingEntity implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessCountPendingEntity;
  constructor(public payload: CountPendingEntities) {}
}

@RequestStatus('pending')
export class RequestSimilarEntity implements Action {
  readonly type = PendingEntitiesActionTypes.RequestSimilarEntity;
  constructor(public payload?: PendingEntityEntity) {}
}

@RequestStatus('default')
export class SuccessSimilarEntity implements Action {
  readonly type = PendingEntitiesActionTypes.SuccessSimilarEntity;
  constructor(public payload: Entity[]) {}
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
  | RequestGetByEntityId
  | SuccessGetByEntityId
  | ClearGetByEntityId
  | RequestCheckExistance
  | SuccessCheckExistance
  | ClearCheckExistance
  | RequestGetEntirely
  | SuccessGetEntirely
  | SuccessAcceptPendingEntity
  | RequestAcceptPendingEntity
  | SuccessRejectPendingEntity
  | RequestRejectPendingEntity
  | RequestCountPendingEntity
  | SuccessCountPendingEntity
  | RequestSimilarEntity
  | SuccessSimilarEntity;
