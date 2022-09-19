import { Action } from '@ngrx/store';
import * as actions from './newsletter-subscriptions-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NewsletterSubscriptionsResponse } from '../newsletter-subscriptions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  newsletterSubscriptions: NewsletterSubscriptionsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  newsletterSubscriptions: { results: [] } as NewsletterSubscriptionsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let newsletterSubscriptions: NewsletterSubscriptionsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.NewsletterSubscriptionsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NewsletterSubscriptionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NewsletterSubscriptionsActionTypes.SuccessGetAll:
      newsletterSubscriptions = (action as actions.SuccessGetAll).payload;
      return { ...state, newsletterSubscriptions };

    case actions.NewsletterSubscriptionsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.NewsletterSubscriptionsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
