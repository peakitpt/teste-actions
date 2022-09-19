import { Action } from '@ngrx/store';
import * as actions from './chapelries-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ChapelriesResponse } from '../chapelries-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  chapelries: ChapelriesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  chapelries: { results: [] } as ChapelriesResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let chapelries: ChapelriesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ChapelriesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ChapelriesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessGetAll:
      chapelries = (action as actions.SuccessGetAll).payload;
      return { ...state, chapelries };

    case actions.ChapelriesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
