import { Action } from '@ngrx/store';
import * as actions from './newsletter-subscriptions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NewsletterSubscription,
  NewsletterSubscriptionResponse,
} from '../newsletter-subscription.model';

export interface State {
  newsletterSubscriptions: NewsletterSubscriptionResponse;
  newsletterSubscription: NewsletterSubscription;
  error: RequestError;
}

export const initialState: State = {
  newsletterSubscriptions: null,
  newsletterSubscription: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.NewsletterSubscriptionsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NewsletterSubscriptionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NewsletterSubscriptionsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, newsletterSubscriptions: successResult };

    case actions.NewsletterSubscriptionsActionTypes.ClearGetAll:
      return {
        ...state,
        newsletterSubscriptions: {
          results: [],
        } as NewsletterSubscriptionResponse,
      };

    case actions.NewsletterSubscriptionsActionTypes.RequestFailToggle:
      error = (action as actions.RequestFailToggle).payload;
      return { ...state, error };

    case actions.NewsletterSubscriptionsActionTypes.RequestToggle:
      return { ...state, error: null };

    case actions.NewsletterSubscriptionsActionTypes.SuccessToggle:
      successResult = (action as actions.SuccessToggle).payload;
      return { ...state, newsletterSubscription: successResult };

    default:
      return state;
  }
}
