import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './subscription-users.reducer';
import {
  SubscriptionUserResponse,
  SubscriptionUser
} from '../subscription-user.model';

export const getSubscriptionUsers = createFeatureSelector('subscription-users');

export const getError = createSelector(
  getSubscriptionUsers,
  (state: State) => state.error
);

export const getSubscriptionUsersList = createSelector(
  getSubscriptionUsers,
  (state: State) => {
    return state.subscriptionUsers as SubscriptionUserResponse;
  }
);

export const getSubscriptionUsersListEntirely = createSelector(
  getSubscriptionUsers,
  (state: State) => {
    return state.subscriptionusersEntirely as SubscriptionUserResponse;
  }
);

export const getSubscriptionUser = createSelector(
  getSubscriptionUsers,
  (state: State) => {
    return state.subscriptionUser as SubscriptionUser;
  }
);

export const getSelectedSubscriptionUsers = createSelector(
  getSubscriptionUsers,
  (state: State) => {
    return state.selectedIds as SubscriptionUser[];
  }
);
