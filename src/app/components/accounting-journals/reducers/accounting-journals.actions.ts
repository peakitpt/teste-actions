import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingJournal,
  AccountingJournalResponse,
} from '../accounting-journal.model';

export enum AccountingJournalsActionTypes {
  RequestFail = '[AccountingJournals] Request Fail',
  RequestGetAll = '[AccountingJournals] Request Get All',
  SuccessGetAll = '[AccountingJournals] Success Get All',
  ClearGetAll = '[AccountingJournals] Clear Get All',
  RequestGet = '[AccountingJournals] Request Get',
  SuccessGet = '[AccountingJournals] Success Get',
  RequestPost = '[AccountingJournals] Request Post',
  SuccessPost = '[AccountingJournals] Success Post',
  RequestPut = '[AccountingJournals] Request Put',
  SuccessPut = '[AccountingJournals] Success Put',
  RequestDelete = '[AccountingJournals] Request Delete',
  SuccessDelete = '[AccountingJournals] Success Delete',
  RequestBulkDelete = '[AccountingJournals] Request Bulk Delete',
  SuccessBulkDelete = '[AccountingJournals] Success Bulk Delete',
  SetSelected = '[AccountingJournals] Set Selected',
  RequestGetNew = '[AccountingJournals] Request Get New',
  SuccessGetNew = '[AccountingJournals] Success Get New',
}

@RequestStatus('error')
export class RequestFail implements Action {
  readonly type = AccountingJournalsActionTypes.RequestFail;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAll implements Action {
  readonly type = AccountingJournalsActionTypes.RequestGetAll;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAll implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessGetAll;
  constructor(public payload: AccountingJournalResponse) {}
}

@RequestStatus('default')
export class ClearGetAll implements Action {
  readonly type = AccountingJournalsActionTypes.ClearGetAll;
  constructor() {}
}

@RequestStatus('pending')
export class RequestGet implements Action {
  readonly type = AccountingJournalsActionTypes.RequestGet;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGet implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessGet;
  constructor(public payload: AccountingJournal) {}
}

@RequestStatus('pending')
export class RequestPost implements Action {
  readonly type = AccountingJournalsActionTypes.RequestPost;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPost implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessPost;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPut implements Action {
  readonly type = AccountingJournalsActionTypes.RequestPut;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPut implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessPut;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDelete implements Action {
  readonly type = AccountingJournalsActionTypes.RequestDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDelete implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestBulkDelete implements Action {
  readonly type = AccountingJournalsActionTypes.RequestBulkDelete;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessBulkDelete implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessBulkDelete;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelected implements Action {
  readonly type = AccountingJournalsActionTypes.SetSelected;
  constructor(public payload?: AccountingJournal[]) {}
}

@RequestStatus('pending')
export class RequestGetNew implements Action {
  readonly type = AccountingJournalsActionTypes.RequestGetNew;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetNew implements Action {
  readonly type = AccountingJournalsActionTypes.SuccessGetNew;
  constructor(public payload: AccountingJournal) {}
}

export type StatisticsActions =
  | RequestFail
  | RequestGetAll
  | SuccessGetAll
  | ClearGetAll
  | RequestGet
  | SuccessGet
  | RequestPost
  | SuccessPost
  | RequestPut
  | SuccessPut
  | RequestDelete
  | SuccessDelete
  | RequestBulkDelete
  | SuccessBulkDelete
  | SetSelected
  | RequestGetNew
  | SuccessGetNew;
