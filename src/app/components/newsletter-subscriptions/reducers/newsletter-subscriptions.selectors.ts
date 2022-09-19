import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './newsletter-subscriptions.reducer';
import {
  NewsletterSubscriptionResponse,
  NewsletterSubscription,
} from '../newsletter-subscription.model';

export const getNewsletterSubscriptions = createFeatureSelector(
  'newsletter-subscriptions'
);

export const getError = createSelector(
  getNewsletterSubscriptions,
  (state: State) => state.error
);

export const getNewsletterSubscriptionsList = createSelector(
  getNewsletterSubscriptions,
  (state: State) => {
    return state.newsletterSubscriptions as NewsletterSubscriptionResponse;
  }
);
