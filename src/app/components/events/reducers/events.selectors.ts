import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './events.reducer';
import { EventResponse, Event } from '../event.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getEvents = createFeatureSelector('events');

export const getError = createSelector(
  getEvents,
  (state: State) => state.error
);

export const getEventsList = createSelector(getEvents, (state: State) => {
  return state.events as EventResponse;
});

export const getEventsListEntirely = createSelector(
  getEvents,
  (state: State) => {
    return state.eventsEntirely;
  }
);

export const getEvent = createSelector(getEvents, (state: State) => {
  return state.event as Event;
});

export const getSelectedEvents = createSelector(getEvents, (state: State) => {
  return state.selectedIds as Event[];
});

export const getModalRowEvent = createSelector(getEvents, (state: State) => {
  if (state) {
    return state.modalRowSelect as SelectedModalRow;
  }
});

export const getRegistrationHistory = createSelector(
  getEvents,
  (state: State) => {
    return state.registrationHistory as any;
  }
);
