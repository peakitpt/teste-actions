import { Action } from '@ngrx/store';
import * as actions from './bishoprics-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { BishopricsResponse } from '../bishoprics-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  bishoprics: BishopricsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  bishoprics: { results: [] } as BishopricsResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let bishoprics: BishopricsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.BishopricsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.BishopricsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessGetAll:
      bishoprics = (action as actions.SuccessGetAll).payload;
      return { ...state, bishoprics };

    case actions.BishopricsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.BishopricsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
