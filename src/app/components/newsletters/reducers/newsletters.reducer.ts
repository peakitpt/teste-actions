import { Action } from '@ngrx/store';
import * as actions from './newsletters.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Newsletter, NewsletterResponse } from '../newsletter.model';

export interface State {
  newsletters: NewsletterResponse;
  newslettersEntirely: NewsletterResponse;
  newsletter: Newsletter;
  selectedIds: Newsletter[];

  error: RequestError;
}

export const initialState: State = {
  newsletters: null,
  newslettersEntirely: null,
  newsletter: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.NewslettersActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NewslettersActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, newsletters: successResult };

    case actions.NewslettersActionTypes.ClearGetAll:
      return { ...state, newsletters: { results: [] } as NewsletterResponse };

    case actions.NewslettersActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, newsletter: successResult };

    case actions.NewslettersActionTypes.ClearGet:
      return { ...state, newsletter: null };

    case actions.NewslettersActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, newsletter: successResult };

    case actions.NewslettersActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, newsletter: successResult };

    case actions.NewslettersActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, newsletter: successResult };

    case actions.NewslettersActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, newsletter: successResult };

    case actions.NewslettersActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.NewslettersActionTypes.RequestFailSendTest:
      error = (action as actions.RequestFailSendTest).payload;
      return { ...state, error };

    case actions.NewslettersActionTypes.RequestSendTest:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessSendTest:
      successResult = (action as actions.SuccessSendTest).payload;
      return { ...state, newsletter: successResult };

    case actions.NewslettersActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.NewslettersActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, newslettersEntirely: successResult };

    default:
      return state;
  }
}
