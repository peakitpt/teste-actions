import { Action } from '@ngrx/store';
import * as actions from './countries-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CountriesResponse } from '../countries-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  countries: CountriesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  countries: { results: [] } as CountriesResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let countries: CountriesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CountriesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CountriesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessGetAll:
      countries = (action as actions.SuccessGetAll).payload;
      return { ...state, countries };

    case actions.CountriesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
