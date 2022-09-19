import { Action } from '@ngrx/store';
import * as actions from './priests-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityPriestsResponse } from '../priests-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  priests: EntityPriestsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  priests: { results: [] } as EntityPriestsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: EntityPriestsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.PriestsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PriestsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PriestsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, priests: successResult };

    case actions.PriestsActionTypes.ClearGetAll:
      return { ...state, priests: { results: [] } as EntityPriestsResponse };

    case actions.PriestsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.PriestsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
