import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './subscriptions.reducer';
import { SubscriptionResponse, Subscription } from '../subscription.model';

export const getSubscriptions = createFeatureSelector('subscriptions');

export const getError = createSelector(
  getSubscriptions,
  (state: State) => state.error
);

export const getSubscriptionsList = createSelector(
  getSubscriptions,
  (state: State) => {
    return state.subscriptions as SubscriptionResponse;
  }
);

export const getSubscriptionsListEntirely = createSelector(
  getSubscriptions,
  (state: State) => {
    return state.subscriptionsEntirely as SubscriptionResponse;
  }
);

export const getSubscription = createSelector(
  getSubscriptions,
  (state: State) => {
    return state.subscription as Subscription;
  }
);

export const getSelectedSubscriptions = createSelector(
  getSubscriptions,
  (state: State) => {
    return state.selectedIds as Subscription[];
  }
);
