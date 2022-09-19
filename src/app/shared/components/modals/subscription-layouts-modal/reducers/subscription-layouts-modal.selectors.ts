import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './subscription-layouts-modal.reducer';
import { SubscriptionLayoutsResponse } from '../subscription-layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('subscription-layouts-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getSubscriptionLayouts = createSelector(
  getFeature,
  (state: State) => {
    return state.subscriptionLayouts as SubscriptionLayoutsResponse;
  }
);

export const getSubscriptionLayoutsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
