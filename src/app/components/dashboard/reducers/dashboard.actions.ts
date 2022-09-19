import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

export enum DashboardActionTypes {
  RequestFail = '[Dashboard] Request Fail',
  RequestGetEntities = '[Dashboard] Request Get Entities',
  SuccessGetEntities = '[Dashboard] Success Get Entities',
  RequestGetBaptisms = '[Dashboard] Request Get Baptisms',
  SuccessGetBaptisms = '[Dashboard] Success Get Baptisms',
  RequestGetBaptismsCuria = '[Dashboard] Request Get BaptismsCuria',
  SuccessGetBaptismsCuria = '[Dashboard] Success Get BaptismsCuria',
  RequestGetWeddings = '[Dashboard] Request Get Weddings',
  SuccessGetWeddings = '[Dashboard] Success Get Weddings',
  RequestGetWeddingsCuria = '[Dashboard] Request Get WeddingsCuria',
  SuccessGetWeddingsCuria = '[Dashboard] Success Get WeddingsCuria',
  RequestGetAccounting = '[Dashboard] Request Get Accounting',
  SuccessGetAccounting = '[Dashboard] Success Get Accounting',
  RequestGetPendingProcesses = '[Dashboard] Request Get PendingProcesses',
  SuccessGetPendingProcesses = '[Dashboard] Success Get PendingProcesses',
  RequestGetCuriaPendingProcesses = '[Dashboard] Request Get CuriaPendingProcesses',
  SuccessGetCuriaPendingProcesses = '[Dashboard] Success Get CuriaPendingProcesses',
  RequestGetLastProcesses = '[Dashboard] Request Get LastProcesses',
  SuccessGetLastProcesses = '[Dashboard] Success Get LastProcesses',
  RequestGetAlerts = '[Dashboard] Request Get Alerts',
  SuccessGetAlerts = '[Dashboard] Success Get Alerts',
  RequestGetPriestsChangesRequests = '[Dashboard] Request Get PriestsChangesRequests',
  SuccessGetPriestsChangesRequests = '[Dashboard] Success Get PriestsChangesRequests',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = DashboardActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetEntities implements Action {
  readonly type = DashboardActionTypes.RequestGetEntities;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetEntities implements Action {
  readonly type = DashboardActionTypes.SuccessGetEntities;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetBaptisms implements Action {
  readonly type = DashboardActionTypes.RequestGetBaptisms;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetBaptisms implements Action {
  readonly type = DashboardActionTypes.SuccessGetBaptisms;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetBaptismsCuria implements Action {
  readonly type = DashboardActionTypes.RequestGetBaptismsCuria;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetBaptismsCuria implements Action {
  readonly type = DashboardActionTypes.SuccessGetBaptismsCuria;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetWeddings implements Action {
  readonly type = DashboardActionTypes.RequestGetWeddings;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetWeddings implements Action {
  readonly type = DashboardActionTypes.SuccessGetWeddings;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetWeddingsCuria implements Action {
  readonly type = DashboardActionTypes.RequestGetWeddingsCuria;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetWeddingsCuria implements Action {
  readonly type = DashboardActionTypes.SuccessGetWeddingsCuria;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetAccounting implements Action {
  readonly type = DashboardActionTypes.RequestGetAccounting;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetAccounting implements Action {
  readonly type = DashboardActionTypes.SuccessGetAccounting;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetPendingProcesses implements Action {
  readonly type = DashboardActionTypes.RequestGetPendingProcesses;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetPendingProcesses implements Action {
  readonly type = DashboardActionTypes.SuccessGetPendingProcesses;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetCuriaPendingProcesses implements Action {
  readonly type = DashboardActionTypes.RequestGetCuriaPendingProcesses;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCuriaPendingProcesses implements Action {
  readonly type = DashboardActionTypes.SuccessGetCuriaPendingProcesses;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetLastProcesses implements Action {
  readonly type = DashboardActionTypes.RequestGetLastProcesses;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetLastProcesses implements Action {
  readonly type = DashboardActionTypes.SuccessGetLastProcesses;
  constructor(public payload: any) {}
}
@RequestStatus('pending')
export class RequestGetAlerts implements Action {
  readonly type = DashboardActionTypes.RequestGetAlerts;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetAlerts implements Action {
  readonly type = DashboardActionTypes.SuccessGetAlerts;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestGetPriestsChangesRequests implements Action {
  readonly type = DashboardActionTypes.RequestGetPriestsChangesRequests;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetPriestsChangesRequests implements Action {
  readonly type = DashboardActionTypes.SuccessGetPriestsChangesRequests;
  constructor(public payload: any) {}
}

export type DashboardActions =
  | RequestFail
  | RequestGetEntities
  | SuccessGetEntities
  | RequestGetBaptisms
  | SuccessGetBaptisms
  | RequestGetBaptismsCuria
  | SuccessGetBaptismsCuria
  | RequestGetWeddings
  | SuccessGetWeddings
  | RequestGetWeddingsCuria
  | SuccessGetWeddingsCuria
  | RequestGetAccounting
  | SuccessGetAccounting
  | RequestGetPendingProcesses
  | SuccessGetPendingProcesses
  | RequestGetCuriaPendingProcesses
  | SuccessGetCuriaPendingProcesses
  | RequestGetLastProcesses
  | SuccessGetLastProcesses
  | RequestGetAlerts
  | SuccessGetAlerts
  | RequestGetPriestsChangesRequests
  | SuccessGetPriestsChangesRequests;
