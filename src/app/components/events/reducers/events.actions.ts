import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EventResponse, Event } from '../event.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum EventsActionTypes {
  RequestFailEvents = '[Events] Request Fail',
  RequestGetAllEvents = '[Events] Request Get All',
  SuccessGetAllEvents = '[Events] Success Get All',
  RequestGetEvent = '[Events] Request Get',
  SuccessGetEvent = '[Events] Success Get',
  RequestPostEvent = '[Events] Request Post',
  SuccessPostEvent = '[Events] Success Post',
  RequestPostEventImage = '[Events] Request Post Image',
  SuccessPostEventImage = '[Events] Success Post Image',
  RequestPostContentFile = '[Contents] Request Post File',
  SuccessPostContentFile = '[Contents] Success Post File',
  RequestPutEvent = '[Events] Request Put',
  SuccessPutEvent = '[Events] Success Put',
  RequestDeleteEvent = '[Events] Request Delete',
  SuccessDeleteEvent = '[Events] Success Delete',
  // RequestBulkDeleteEvents = '[Events] Request Bulk Delete',
  // SuccessBulkDeleteEvents = '[Events] Success Bulk Delete',
  RequestSendTestEvent = '[Events] Request Send Test',
  SuccessSendTestEvent = '[Events] Success Send Test',
  SetSelectedEvents = '[Events] Set Selected',
  SetModalSelectEvent = '[Events] Set Modal Select Event',
  RequestGetEntirelyEvents = '[Events] Request Get Entirely',
  SuccessGetEntirelyEvents = '[Events] Success Get Entirely',
  RequestNotifyEvents = '[Events] Request Notify Events',
  SuccessNotifyEvents = '[Events] Success Notify Events',
  RequestGetRegistrationHistory = '[Events] Request Get Registration History',
  SuccessGetRegistrationHistory = '[Events] Success Get Registration History',
}

@RequestStatus('error')
export class RequestFailEvents implements Action {
  readonly type = EventsActionTypes.RequestFailEvents;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllEvents implements Action {
  readonly type = EventsActionTypes.RequestGetAllEvents;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllEvents implements Action {
  readonly type = EventsActionTypes.SuccessGetAllEvents;
  constructor(public payload: EventResponse) {}
}

@RequestStatus('pending')
export class RequestGetEvent implements Action {
  readonly type = EventsActionTypes.RequestGetEvent;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetEvent implements Action {
  readonly type = EventsActionTypes.SuccessGetEvent;
  constructor(public payload: Event) {}
}

@RequestStatus('pending')
export class RequestPostEvent implements Action {
  readonly type = EventsActionTypes.RequestPostEvent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostEvent implements Action {
  readonly type = EventsActionTypes.SuccessPostEvent;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPostEventImage implements Action {
  readonly type = EventsActionTypes.RequestPostEventImage;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostEventImage implements Action {
  readonly type = EventsActionTypes.SuccessPostEventImage;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPostContentFile implements Action {
  readonly type = EventsActionTypes.RequestPostContentFile;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostContentFile implements Action {
  readonly type = EventsActionTypes.SuccessPostContentFile;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutEvent implements Action {
  readonly type = EventsActionTypes.RequestPutEvent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutEvent implements Action {
  readonly type = EventsActionTypes.SuccessPutEvent;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteEvent implements Action {
  readonly type = EventsActionTypes.RequestDeleteEvent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteEvent implements Action {
  readonly type = EventsActionTypes.SuccessDeleteEvent;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteEvents implements Action {
//   readonly type = EventsActionTypes.RequestBulkDeleteEvents;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteEvents implements Action {
//   readonly type = EventsActionTypes.SuccessBulkDeleteEvents;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestEvent implements Action {
  readonly type = EventsActionTypes.RequestSendTestEvent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestEvent implements Action {
  readonly type = EventsActionTypes.SuccessSendTestEvent;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedEvents implements Action {
  readonly type = EventsActionTypes.SetSelectedEvents;
  constructor(public payload?: Event[]) {}
}

@RequestStatus('default')
export class SetModalSelectEvent implements Action {
  readonly type = EventsActionTypes.SetModalSelectEvent;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyEvents implements Action {
  readonly type = EventsActionTypes.RequestGetEntirelyEvents;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyEvents implements Action {
  readonly type = EventsActionTypes.SuccessGetEntirelyEvents;
  constructor(public payload: EventResponse) {}
}

@RequestStatus('pending')
export class RequestNotifyEvents implements Action {
  readonly type = EventsActionTypes.RequestNotifyEvents;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessNotifyEvents implements Action {
  readonly type = EventsActionTypes.SuccessNotifyEvents;
  constructor(public payload: EventResponse) {}
}

@RequestStatus('pending')
export class RequestGetRegistrationHistory implements Action {
  readonly type = EventsActionTypes.RequestGetRegistrationHistory;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetRegistrationHistory implements Action {
  readonly type = EventsActionTypes.SuccessGetRegistrationHistory;
  constructor(public payload: EventResponse) {}
}

export type StatisticsActions =
  | RequestFailEvents
  | RequestGetAllEvents
  | SuccessGetAllEvents
  | RequestGetEvent
  | SuccessGetEvent
  | RequestPostEvent
  | SuccessPostEvent
  | RequestPostEventImage
  | SuccessPostEventImage
  | RequestPutEvent
  | SuccessPutEvent
  | RequestDeleteEvent
  | SuccessDeleteEvent
  // | RequestBulkDeleteEvents
  // | SuccessBulkDeleteEvents
  | RequestSendTestEvent
  | SuccessSendTestEvent
  | SetSelectedEvents
  | SetModalSelectEvent
  | RequestGetEntirelyEvents
  | SuccessGetEntirelyEvents
  | RequestNotifyEvents
  | SuccessNotifyEvents
  | RequestGetRegistrationHistory
  | SuccessGetRegistrationHistory;
