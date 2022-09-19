import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './subscriptions-modal.reducer';
import { SubscriptionsResponse } from '../subscriptions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('subscriptions-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getSubscriptions = createSelector(getFeature, (state: State) => {
  return state.subscriptions as SubscriptionsResponse;
});

export const getSubscriptionsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
