import { Action } from '@ngrx/store';
import * as actions from './priests-v1-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PriestsV1Response } from '../priests-v1-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  priestsV1: PriestsV1Response;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  priestsV1: { results: [] } as PriestsV1Response,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: PriestsV1Response;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.PriestsV1ActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PriestsV1ActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PriestsV1ActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, priestsV1: successResult };

    case actions.PriestsV1ActionTypes.ClearGetAll:
      return {
        ...state,
        priestsV1: { results: [] } as PriestsV1Response,
      };

    case actions.PriestsV1ActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.PriestsV1ActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
