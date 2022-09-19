import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EmenuResponse, Emenu } from '../emenu.model';

export enum EmenusActionTypes {
  RequestFailEmenus = '[Emenus] Request Fail',
  RequestGetAllEmenus = '[Emenus] Request Get All',
  SuccessGetAllEmenus = '[Emenus] Success Get All',
  RequestGetEmenu = '[Emenus] Request Get',
  SuccessGetEmenu = '[Emenus] Success Get',
  RequestPostEmenu = '[Emenus] Request Post',
  SuccessPostEmenu = '[Emenus] Success Post',
  RequestPutEmenu = '[Emenus] Request Put',
  SuccessPutEmenu = '[Emenus] Success Put',
  RequestDeleteEmenu = '[Emenus] Request Delete',
  SuccessDeleteEmenu = '[Emenus] Success Delete',
  // RequestBulkDeleteEmenus = '[Emenus] Request Bulk Delete',
  // SuccessBulkDeleteEmenus = '[Emenus] Success Bulk Delete',
  SetSelectedEmenus = '[Emenus] Set Selected',
  RequestGetEntirelyEmenus = '[Emenus] Request Get Entirely',
  SuccessGetEntirelyEmenus = '[Emenus] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailEmenus implements Action {
  readonly type = EmenusActionTypes.RequestFailEmenus;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllEmenus implements Action {
  readonly type = EmenusActionTypes.RequestGetAllEmenus;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllEmenus implements Action {
  readonly type = EmenusActionTypes.SuccessGetAllEmenus;
  constructor(public payload: EmenuResponse) {}
}

@RequestStatus('pending')
export class RequestGetEmenu implements Action {
  readonly type = EmenusActionTypes.RequestGetEmenu;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetEmenu implements Action {
  readonly type = EmenusActionTypes.SuccessGetEmenu;
  constructor(public payload: Emenu) {}
}

@RequestStatus('pending')
export class RequestPostEmenu implements Action {
  readonly type = EmenusActionTypes.RequestPostEmenu;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostEmenu implements Action {
  readonly type = EmenusActionTypes.SuccessPostEmenu;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutEmenu implements Action {
  readonly type = EmenusActionTypes.RequestPutEmenu;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutEmenu implements Action {
  readonly type = EmenusActionTypes.SuccessPutEmenu;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteEmenu implements Action {
  readonly type = EmenusActionTypes.RequestDeleteEmenu;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteEmenu implements Action {
  readonly type = EmenusActionTypes.SuccessDeleteEmenu;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteEmenus implements Action {
//   readonly type = EmenusActionTypes.RequestBulkDeleteEmenus;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteEmenus implements Action {
//   readonly type = EmenusActionTypes.SuccessBulkDeleteEmenus;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('default')
export class SetSelectedEmenus implements Action {
  readonly type = EmenusActionTypes.SetSelectedEmenus;
  constructor(public payload?: Emenu[]) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyEmenus implements Action {
  readonly type = EmenusActionTypes.RequestGetEntirelyEmenus;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyEmenus implements Action {
  readonly type = EmenusActionTypes.SuccessGetEntirelyEmenus;
  constructor(public payload: EmenuResponse) {}
}

export type StatisticsActions =
  | RequestFailEmenus
  | RequestGetAllEmenus
  | SuccessGetAllEmenus
  | RequestGetEmenu
  | SuccessGetEmenu
  | RequestPostEmenu
  | SuccessPostEmenu
  | RequestPutEmenu
  | SuccessPutEmenu
  | RequestDeleteEmenu
  | SuccessDeleteEmenu
  // | RequestBulkDeleteEmenus
  // | SuccessBulkDeleteEmenus
  | SetSelectedEmenus
  | RequestGetEntirelyEmenus
  | SuccessGetEntirelyEmenus;
