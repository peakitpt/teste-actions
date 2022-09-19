import { SelectedModalRow } from './../../../shared/shared.model';
import { Action } from '@ngrx/store';
import * as actions from './events.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Event, EventResponse } from '../event.model';

export interface State {
  events: EventResponse;
  eventsEntirely: EventResponse;
  event: Event;
  selectedIds: Event[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
  eventImage: any;
  contentFile: any;
  registrationHistory: any;
}

export const initialState: State = {
  events: null,
  eventsEntirely: null,
  event: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
  eventImage: null,
  contentFile: null,
  registrationHistory: null,
};

export function reducer(state = initialState, action: Action): State {
  let events: any;
  let eventsEntirely: any;
  let event: any;
  let selectedIds: any;
  let modalRowSelect: any;
  let eventImage: any;
  let contentFile: any;
  let registrationHistory: any;

  switch (action.type) {
    case actions.EventsActionTypes.RequestFailEvents:
      const error = (action as actions.RequestFailEvents).payload;
      return { ...state, error };

    case actions.EventsActionTypes.RequestGetAllEvents:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessGetAllEvents:
      events = (action as actions.SuccessGetAllEvents).payload;
      return { ...state, events };

    case actions.EventsActionTypes.RequestGetEvent:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessGetEvent:
      event = (action as actions.SuccessGetEvent).payload;
      return { ...state, event };

    case actions.EventsActionTypes.RequestPostEvent:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessPostEvent:
      event = (action as actions.SuccessPostEvent).payload;
      return { ...state, event };

    case actions.EventsActionTypes.RequestPostEventImage:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessPostEventImage:
      eventImage = (action as actions.SuccessPostEventImage).payload;
      return { ...state, event };

    case actions.EventsActionTypes.RequestPostContentFile:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessPostContentFile:
      contentFile = (action as actions.SuccessPostContentFile).payload;
      return { ...state, contentFile };

    case actions.EventsActionTypes.RequestPutEvent:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessPutEvent:
      event = (action as actions.SuccessPutEvent).payload;
      return { ...state, event };

    case actions.EventsActionTypes.RequestDeleteEvent:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessDeleteEvent:
      event = (action as actions.SuccessDeleteEvent).payload;
      return { ...state, event };

    // case actions.EventsActionTypes.RequestBulkDeleteEvents:
    //   return { ...state, error: null };

    // case actions.EventsActionTypes.SuccessBulkDeleteEvents:
    //   event = (action as actions.SuccessBulkDeleteEvents).payload;
    //   return { ...state, event };

    case actions.EventsActionTypes.RequestSendTestEvent:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessSendTestEvent:
      event = (action as actions.SuccessSendTestEvent).payload;
      return { ...state, event };

    case actions.EventsActionTypes.SetSelectedEvents:
      selectedIds = (action as actions.SetSelectedEvents).payload;
      return { ...state, selectedIds };

    case actions.EventsActionTypes.SetModalSelectEvent:
      modalRowSelect = (action as actions.SetModalSelectEvent).payload;
      return { ...state, modalRowSelect };

    case actions.EventsActionTypes.RequestGetEntirelyEvents:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessGetEntirelyEvents:
      eventsEntirely = (action as actions.SuccessGetEntirelyEvents).payload;
      return { ...state, eventsEntirely };

    case actions.EventsActionTypes.RequestNotifyEvents:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessNotifyEvents:
      event = (action as actions.SuccessNotifyEvents).payload;
      return { ...state, event };

    case actions.EventsActionTypes.RequestGetRegistrationHistory:
      return { ...state, error: null };

    case actions.EventsActionTypes.SuccessGetRegistrationHistory:
      registrationHistory = (action as actions.SuccessGetRegistrationHistory)
        .payload;
      return { ...state, registrationHistory };

    default:
      return state;
  }
}
