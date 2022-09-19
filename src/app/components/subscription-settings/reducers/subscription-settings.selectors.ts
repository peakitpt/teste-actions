import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './subscription-settings.reducer';
import { SubscriptionSetting } from '../subscription-setting.model';

export const getSubscriptionSettings = createFeatureSelector(
  'subscription-settings'
);

export const getError = createSelector(
  getSubscriptionSettings,
  (state: State) => state.error
);

export const getSubscriptionSetting = createSelector(
  getSubscriptionSettings,
  (state: State) => {
    return state.subscriptionSetting as SubscriptionSetting;
  }
);

export const getFromSubscriptionSetting = createSelector(
  getSubscriptionSettings,
  (state: State) => {
    return state.subscriptionSetting as SubscriptionSetting;
  }
);
