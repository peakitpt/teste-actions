import { Action } from '@ngrx/store';
import * as actions from './accrual-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccrualTypesResponse } from '../accrual-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accrualtypes: AccrualTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accrualtypes: { results: [] } as AccrualTypesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accrualtypes: AccrualTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccrualTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccrualTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessGetAll:
      accrualtypes = (action as actions.SuccessGetAll).payload;
      return { ...state, accrualtypes };

    case actions.AccrualTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
