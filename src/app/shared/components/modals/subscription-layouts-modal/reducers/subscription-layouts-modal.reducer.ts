import { Action } from '@ngrx/store';
import * as actions from './subscription-layouts-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SubscriptionLayoutsResponse } from '../subscription-layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  subscriptionLayouts: SubscriptionLayoutsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  subscriptionLayouts: { results: [] } as SubscriptionLayoutsResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let subscriptionLayouts: SubscriptionLayoutsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.SubscriptionLayoutsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.SubscriptionLayoutsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.SubscriptionLayoutsActionTypes.SuccessGetAll:
      subscriptionLayouts = (action as actions.SuccessGetAll).payload;
      return { ...state, subscriptionLayouts };

    case actions.SubscriptionLayoutsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.SubscriptionLayoutsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
