import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './newsletter-group-subscriptions.reducer';
import {
  NewsletterGroupSubscriptionResponse,
  NewsletterGroupSubscription,
} from '../newsletter-group-subscription.model';

export const getNewsletterGroupSubscriptions = createFeatureSelector(
  'newsletter-group-subscriptions'
);

export const getError = createSelector(
  getNewsletterGroupSubscriptions,
  (state: State) => state.error
);

export const getNewsletterGroupSubscriptionsList = createSelector(
  getNewsletterGroupSubscriptions,
  (state: State) => {
    return state.newsletterGroupSubscriptions as NewsletterGroupSubscriptionResponse;
  }
);

export const getNewsletterGroupSubscriptionsListEntirely = createSelector(
  getNewsletterGroupSubscriptions,
  (state: State) => {
    return state.newslettersEntirely as NewsletterGroupSubscriptionResponse;
  }
);

export const getNewsletterGroupSubscription = createSelector(
  getNewsletterGroupSubscriptions,
  (state: State) => {
    return state.newsletterGroupSubscription as NewsletterGroupSubscription;
  }
);

export const getSelectedNewsletterGroupSubscriptions = createSelector(
  getNewsletterGroupSubscriptions,
  (state: State) => {
    return state.selectedIds as NewsletterGroupSubscription[];
  }
);
