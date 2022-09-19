import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './text-messages.reducer';
import { TextMessageResponse, TextMessage } from '../text-message.model';

export const getTextMessages = createFeatureSelector('text-messages');

export const getError = createSelector(
  getTextMessages,
  (state: State) => state.error
);

export const getTextMessagesList = createSelector(
  getTextMessages,
  (state: State) => {
    return state.textMessages as TextMessageResponse;
  }
);

export const getTextMessagesListEntirely = createSelector(
  getTextMessages,
  (state: State) => {
    return state.textMessagesEntirely as TextMessageResponse;
  }
);

export const getTextMessage = createSelector(
  getTextMessages,
  (state: State) => {
    return state.textMessage as TextMessage;
  }
);

export const getSelectedTextMessages = createSelector(
  getTextMessages,
  (state: State) => {
    return state.selectedIds as TextMessage[];
  }
);
