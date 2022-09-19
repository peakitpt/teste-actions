import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Entity } from './entity.model';

export enum EntitiesActionTypes {
  RequestFail = '[Entities] Request Fail',
  RequestGet = '[Entities] Request Get',
  SuccessGet = '[Entities] Success Get'
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = EntitiesActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = EntitiesActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = EntitiesActionTypes.SuccessGet;
  constructor(public payload: Entity) {}
}

export type StatisticsActions = RequestFail | RequestGet | SuccessGet;
