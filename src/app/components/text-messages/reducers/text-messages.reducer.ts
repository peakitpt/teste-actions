import { Action } from '@ngrx/store';
import * as actions from './text-messages.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { TextMessage, TextMessageResponse } from '../text-message.model';

export interface State {
  textMessages: TextMessageResponse;
  textMessagesEntirely: TextMessageResponse;
  textMessage: TextMessage;
  selectedIds: TextMessage[];
  error: RequestError;
}

export const initialState: State = {
  textMessages: null,
  textMessagesEntirely: null,
  textMessage: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let error: any;
  let successResult: any;

  switch (action.type) {
    case actions.TextMessagesActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.TextMessagesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, textMessages: successResult };

    case actions.TextMessagesActionTypes.ClearGetAll:
      return { ...state, textMessages: { results: [] } as TextMessageResponse };

    case actions.TextMessagesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, textMessage: successResult };

    case actions.TextMessagesActionTypes.ClearGet:
      return { ...state, textMessage: null };

    case actions.TextMessagesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, textMessage: successResult };

    case actions.TextMessagesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, textMessage: successResult };

    case actions.TextMessagesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, textMessage: successResult };

    case actions.TextMessagesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, textMessage: successResult };

    case actions.TextMessagesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.TextMessagesActionTypes.RequestFailSendTest:
      error = (action as actions.RequestFailSendTest).payload;
      return { ...state, error };

    case actions.TextMessagesActionTypes.RequestSendTest:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessSendTest:
      successResult = (action as actions.SuccessSendTest).payload;
      return { ...state, textMessage: successResult };

    case actions.TextMessagesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.TextMessagesActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, textMessagesEntirely: successResult };

    default:
      return state;
  }
}
