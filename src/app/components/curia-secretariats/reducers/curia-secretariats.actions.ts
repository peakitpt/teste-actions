import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaSecretariatResponse,
  CuriaSecretariat,
} from '../curia-secretariat.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { DocumentsActionTypes } from '../../documents/reducers/documents.actions';

export enum CuriaSecretariatsActionTypes {
  RequestFailCuriaSecretariats = '[CuriaSecretariats] Request Fail',
  RequestGetAllCuriaSecretariats = '[CuriaSecretariats] Request Get All',
  SuccessGetAllCuriaSecretariats = '[CuriaSecretariats] Success Get All',
  RequestGetCuriaSecretariat = '[CuriaSecretariats] Request Get',
  SuccessGetCuriaSecretariat = '[CuriaSecretariats] Success Get',
  RequestPostCuriaSecretariat = '[CuriaSecretariats] Request Post',
  SuccessPostCuriaSecretariat = '[CuriaSecretariats] Success Post',
  RequestPutCuriaSecretariat = '[CuriaSecretariats] Request Put',
  SuccessPutCuriaSecretariat = '[CuriaSecretariats] Success Put',
  RequestDeleteCuriaSecretariat = '[CuriaSecretariats] Request Delete',
  SuccessDeleteCuriaSecretariat = '[CuriaSecretariats] Success Delete',
  // RequestBulkDeleteCuriaSecretariats = '[CuriaSecretariats] Request Bulk Delete',
  // SuccessBulkDeleteCuriaSecretariats = '[CuriaSecretariats] Success Bulk Delete',
  RequestSendTestCuriaSecretariat = '[CuriaSecretariats] Request Send Test',
  SuccessSendTestCuriaSecretariat = '[CuriaSecretariats] Success Send Test',
  SetSelectedCuriaSecretariats = '[CuriaSecretariats] Set Selected',
  SetModalSelectCuriaSecretariat = '[CuriaSecretariats] Set Modal Select CuriaSecretariat',
  RequestGetEntirelyCuriaSecretariats = '[CuriaSecretariats] Request Get Entirely',
  SuccessGetEntirelyCuriaSecretariats = '[CuriaSecretariats] Success Get Entirely',
  RequestGetNew = '[CuriaSecretariats] Request Get New',
  SuccessGetNew = '[CuriaSecretariats] Success Get New',
  ClearGet = '[CuriaSecretariats] Request Clear Get',
  RequestGetNewCMODocument = '[CuriaSecretariats] Request Get New Curia Secretariats and Orders Document',
}

@RequestStatus('error')
export class RequestFailCuriaSecretariats implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestFailCuriaSecretariats;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllCuriaSecretariats implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestGetAllCuriaSecretariats;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllCuriaSecretariats implements Action {
  readonly type = CuriaSecretariatsActionTypes.SuccessGetAllCuriaSecretariats;
  constructor(public payload: CuriaSecretariatResponse) {}
}

@RequestStatus('pending')
export class RequestGetCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestGetCuriaSecretariat;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.SuccessGetCuriaSecretariat;
  constructor(public payload: CuriaSecretariat) {}
}

@RequestStatus('pending')
export class RequestPostCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestPostCuriaSecretariat;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.SuccessPostCuriaSecretariat;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestPutCuriaSecretariat;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.SuccessPutCuriaSecretariat;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestDeleteCuriaSecretariat;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.SuccessDeleteCuriaSecretariat;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteCuriaSecretariats implements Action {
//   readonly type = CuriaSecretariatsActionTypes.RequestBulkDeleteCuriaSecretariats;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteCuriaSecretariats implements Action {
//   readonly type = CuriaSecretariatsActionTypes.SuccessBulkDeleteCuriaSecretariats;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestSendTestCuriaSecretariat;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.SuccessSendTestCuriaSecretariat;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedCuriaSecretariats implements Action {
  readonly type = CuriaSecretariatsActionTypes.SetSelectedCuriaSecretariats;
  constructor(public payload?: CuriaSecretariat[]) {}
}

@RequestStatus('default')
export class SetModalSelectCuriaSecretariat implements Action {
  readonly type = CuriaSecretariatsActionTypes.SetModalSelectCuriaSecretariat;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyCuriaSecretariats implements Action {
  readonly type =
    CuriaSecretariatsActionTypes.RequestGetEntirelyCuriaSecretariats;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyCuriaSecretariats implements Action {
  readonly type =
    CuriaSecretariatsActionTypes.SuccessGetEntirelyCuriaSecretariats;
  constructor(public payload: CuriaSecretariatResponse) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = CuriaSecretariatsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = CuriaSecretariatsActionTypes.SuccessGetNew;
  constructor(public payload: CuriaSecretariat) {}
}

@RequestStatus('default')
export class ClearGet implements Action {
  readonly type = CuriaSecretariatsActionTypes.ClearGet;
  constructor() {}
}

export type StatisticsActions =
  | RequestFailCuriaSecretariats
  | RequestGetAllCuriaSecretariats
  | SuccessGetAllCuriaSecretariats
  | RequestGetCuriaSecretariat
  | SuccessGetCuriaSecretariat
  | RequestPostCuriaSecretariat
  | SuccessPostCuriaSecretariat
  | RequestPutCuriaSecretariat
  | SuccessPutCuriaSecretariat
  | RequestDeleteCuriaSecretariat
  | SuccessDeleteCuriaSecretariat
  // | RequestBulkDeleteCuriaSecretariats
  // | SuccessBulkDeleteCuriaSecretariats
  | RequestSendTestCuriaSecretariat
  | SuccessSendTestCuriaSecretariat
  | SetSelectedCuriaSecretariats
  | SetModalSelectCuriaSecretariat
  | RequestGetEntirelyCuriaSecretariats
  | SuccessGetEntirelyCuriaSecretariats
  | RequestGetNew
  | SuccessGetNew
  | ClearGet;
