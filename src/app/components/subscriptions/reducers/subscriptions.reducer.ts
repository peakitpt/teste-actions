import { Action } from '@ngrx/store';
import * as actions from './subscriptions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Subscription, SubscriptionResponse } from '../subscription.model';

export interface State {
  subscriptions: SubscriptionResponse;
  subscriptionsEntirely: SubscriptionResponse;
  subscription: Subscription;
  selectedIds: Subscription[];
  error: RequestError;
}

export const initialState: State = {
  subscriptions: null,
  subscriptionsEntirely: null,
  subscription: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let subscriptions: any;
  let subscriptionsEntirely: any;
  let subscription: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.SubscriptionsActionTypes.RequestFailSubscriptions:
      const error = (action as actions.RequestFailSubscriptions).payload;
      return { ...state, error };

    case actions.SubscriptionsActionTypes.RequestGetAllSubscriptions:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessGetAllSubscriptions:
      subscriptions = (action as actions.SuccessGetAllSubscriptions).payload;
      return { ...state, subscriptions };

    case actions.SubscriptionsActionTypes.RequestBulkDisableUsersSubscriptions:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessBulkDisableUsersSubscriptions:
      subscription = (action as actions.SuccessBulkDisableUsersSubscriptions)
        .payload;
      return { ...state, subscription };

    case actions.SubscriptionsActionTypes.RequestBulkEnableUsersSubscriptions:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessBulkEnableUsersSubscriptions:
      subscription = (action as actions.SuccessBulkEnableUsersSubscriptions)
        .payload;
      return { ...state, subscription };

    case actions.SubscriptionsActionTypes.RequestBulkDisableSubscriptions:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessBulkDisableSubscriptions:
      subscription = (action as actions.SuccessBulkDisableSubscriptions)
        .payload;
      return { ...state, subscription };

    case actions.SubscriptionsActionTypes.SetSelectedSubscriptions:
      selectedIds = (action as actions.SetSelectedSubscriptions).payload;
      return { ...state, selectedIds };

    case actions.SubscriptionsActionTypes.RequestGetEntirelySubscriptions:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessGetEntirelySubscriptions:
      subscriptionsEntirely = (action as actions.SuccessGetEntirelySubscriptions)
        .payload;
      return { ...state, subscriptionsEntirely };

    case actions.SubscriptionsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessPost:
      subscription = (action as actions.SuccessPost).payload;
      return { ...state, subscription };
    case actions.SubscriptionsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessGetNew:
      subscription = (action as actions.SuccessGetNew).payload;
      return { ...state, subscription };

    default:
      return state;
  }
}
