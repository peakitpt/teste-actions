import { Action } from '@ngrx/store';
import * as actions from './newsletters-layouts-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NewslettersLayoutsResponse } from '../newsletters-layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  newslettersLayouts: NewslettersLayoutsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  newslettersLayouts: { results: [] } as NewslettersLayoutsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let newslettersLayouts: NewslettersLayoutsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.NewslettersLayoutsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NewslettersLayoutsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessGetAll:
      newslettersLayouts = (action as actions.SuccessGetAll).payload;
      return { ...state, newslettersLayouts };

    case actions.NewslettersLayoutsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
