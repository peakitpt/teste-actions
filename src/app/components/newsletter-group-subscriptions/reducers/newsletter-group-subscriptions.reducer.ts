import { Action } from '@ngrx/store';
import * as actions from './newsletter-group-subscriptions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NewsletterGroupSubscription,
  NewsletterGroupSubscriptionResponse,
} from '../newsletter-group-subscription.model';

export interface State {
  newsletterGroupSubscriptions: NewsletterGroupSubscriptionResponse;
  newslettersEntirely: NewsletterGroupSubscriptionResponse;
  newsletterGroupSubscription: NewsletterGroupSubscription;
  selectedIds: NewsletterGroupSubscription[];

  error: RequestError;
}

export const initialState: State = {
  newsletterGroupSubscriptions: null,
  newslettersEntirely: null,
  newsletterGroupSubscription: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.NewsletterGroupSubscriptionsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NewsletterGroupSubscriptionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NewsletterGroupSubscriptionsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, newsletterGroupSubscriptions: successResult };

    case actions.NewsletterGroupSubscriptionsActionTypes.ClearGetAll:
      return {
        ...state,
        newsletterGroupSubscriptions: {
          results: [],
        } as NewsletterGroupSubscriptionResponse,
      };

    case actions.NewsletterGroupSubscriptionsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.NewsletterGroupSubscriptionsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, newsletterGroupSubscription: successResult };

    case actions.NewsletterGroupSubscriptionsActionTypes.ClearGet:
      return { ...state, newsletterGroupSubscription: null };

    case actions.NewsletterGroupSubscriptionsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.NewsletterGroupSubscriptionsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, newsletterGroupSubscription: successResult };

    case actions.NewsletterGroupSubscriptionsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.NewsletterGroupSubscriptionsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, newsletterGroupSubscription: successResult };

    case actions.NewsletterGroupSubscriptionsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.NewsletterGroupSubscriptionsActionTypes.RequestToggle:
      return { ...state, error: null };

    case actions.NewsletterGroupSubscriptionsActionTypes.SuccessToggle:
      successResult = (action as actions.SuccessToggle).payload;
      return { ...state, newsletterGroupSubscription: successResult };

    case actions.NewsletterGroupSubscriptionsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.NewsletterGroupSubscriptionsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, newslettersEntirely: successResult };

    default:
      return state;
  }
}
