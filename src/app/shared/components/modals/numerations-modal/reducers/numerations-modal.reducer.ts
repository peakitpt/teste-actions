import { Action } from '@ngrx/store';
import * as actions from './numerations-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { NumerationsResponse } from '../numeration-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  numerations: NumerationsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  numerations: { results: [] } as NumerationsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let numerations: NumerationsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.NumerationsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NumerationsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessGetAll:
      numerations = (action as actions.SuccessGetAll).payload;
      return { ...state, numerations };

    case actions.NumerationsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
