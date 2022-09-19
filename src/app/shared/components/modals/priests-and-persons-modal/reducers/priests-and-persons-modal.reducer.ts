import { Action } from '@ngrx/store';
import * as actions from './priests-and-persons-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PriestsAndPersonsResponse } from '../priests-and-persons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  priestsAndPersons: PriestsAndPersonsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  priestsAndPersons: { results: [] } as PriestsAndPersonsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: PriestsAndPersonsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.PriestsAndPersonsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PriestsAndPersonsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PriestsAndPersonsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, priestsAndPersons: successResult };

    case actions.PriestsAndPersonsActionTypes.ClearGetAll:
      return {
        ...state,
        priestsAndPersons: { results: [] } as PriestsAndPersonsResponse,
      };

    case actions.PriestsAndPersonsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.PriestsAndPersonsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
