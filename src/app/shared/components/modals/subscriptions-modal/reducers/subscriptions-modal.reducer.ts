import { Action } from '@ngrx/store';
import * as actions from './subscriptions-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SubscriptionsResponse } from '../subscriptions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  subscriptions: SubscriptionsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  subscriptions: { results: [] } as SubscriptionsResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let subscriptions: SubscriptionsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.SubscriptionsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.SubscriptionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessGetAll:
      subscriptions = (action as actions.SuccessGetAll).payload;
      return { ...state, subscriptions };

    case actions.SubscriptionsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.SubscriptionsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
