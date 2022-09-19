import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './newsletter-subscriptions-modal.reducer';
import { NewsletterSubscriptionsResponse } from '../newsletter-subscriptions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'newsletter-subscriptions-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getNewsletterSubscriptions = createSelector(
  getFeature,
  (state: State) => {
    return state.newsletterSubscriptions as NewsletterSubscriptionsResponse;
  }
);

export const getNewsletterSubscriptionsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
