import { Action } from '@ngrx/store';
import * as actions from './subscription-users.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  SubscriptionUser,
  SubscriptionUserResponse
} from '../subscription-user.model';

export interface State {
  subscriptionUsers: SubscriptionUserResponse;
  subscriptionusersEntirely: SubscriptionUserResponse;
  subscriptionUser: SubscriptionUser;
  selectedIds: SubscriptionUser[];
  error: RequestError;
}

export const initialState: State = {
  subscriptionUsers: null,
  subscriptionusersEntirely: null,
  subscriptionUser: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let subscriptionUsers: any;
  let subscriptionusersEntirely: any;
  let subscriptionUser: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.SubscriptionUsersActionTypes.RequestFailSubscriptionUsers:
      const error = (action as actions.RequestFailSubscriptionUsers).payload;
      return { ...state, error };

    case actions.SubscriptionUsersActionTypes.RequestGetAllSubscriptionUsers:
      return { ...state, error: null };

    case actions.SubscriptionUsersActionTypes.SuccessGetAllSubscriptionUsers:
      subscriptionUsers = (action as actions.SuccessGetAllSubscriptionUsers)
        .payload;
      return { ...state, subscriptionUsers };

    case actions.SubscriptionUsersActionTypes.RequestGetSubscriptionUser:
      return { ...state, error: null };

    case actions.SubscriptionUsersActionTypes.SuccessGetSubscriptionUser:
      subscriptionUser = (action as actions.SuccessGetSubscriptionUser).payload;
      return { ...state, subscriptionUser };

    case actions.SubscriptionUsersActionTypes.RequestPostSubscriptionUser:
      return { ...state, error: null };

    case actions.SubscriptionUsersActionTypes.SuccessPostSubscriptionUser:
      subscriptionUser = (action as actions.SuccessPostSubscriptionUser)
        .payload;
      return { ...state, subscriptionUser };

    case actions.SubscriptionUsersActionTypes.RequestPutSubscriptionUser:
      return { ...state, error: null };

    case actions.SubscriptionUsersActionTypes.SuccessPutSubscriptionUser:
      subscriptionUser = (action as actions.SuccessPutSubscriptionUser).payload;
      return { ...state, subscriptionUser };

    case actions.SubscriptionUsersActionTypes.RequestDeleteSubscriptionUser:
      return { ...state, error: null };

    case actions.SubscriptionUsersActionTypes.SuccessDeleteSubscriptionUser:
      subscriptionUser = (action as actions.SuccessDeleteSubscriptionUser)
        .payload;
      return { ...state, subscriptionUser };

    // case actions.SubscriptionUsersActionTypes.RequestBulkDeleteSubscriptionUsers:
    //   return { ...state, error: null };

    // case actions.SubscriptionUsersActionTypes.SuccessBulkDeleteSubscriptionUsers:
    //   subscriptionUser = (action as actions.SuccessBulkDeleteSubscriptionUsers).payload;
    //   return { ...state, subscriptionUser };

    case actions.SubscriptionUsersActionTypes.SetSelectedSubscriptionUsers:
      selectedIds = (action as actions.SetSelectedSubscriptionUsers).payload;
      return { ...state, selectedIds };

    case actions.SubscriptionUsersActionTypes
      .RequestGetEntirelySubscriptionUsers:
      return { ...state, error: null };

    case actions.SubscriptionUsersActionTypes
      .SuccessGetEntirelySubscriptionUsers:
      subscriptionusersEntirely = (action as actions.SuccessGetEntirelySubscriptionUsers)
        .payload;
      return { ...state, subscriptionusersEntirely };

    default:
      return state;
  }
}
