import { Action } from '@ngrx/store';
import * as actions from './views-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ViewsResponse } from '../views-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  views: ViewsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  views: { results: [] } as ViewsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let views: ViewsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ViewsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ViewsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ViewsActionTypes.SuccessGetAll:
      views = (action as actions.SuccessGetAll).payload;
      return { ...state, views };

    case actions.ViewsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ViewsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
