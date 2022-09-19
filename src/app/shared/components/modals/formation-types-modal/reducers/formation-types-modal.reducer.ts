import { Action } from '@ngrx/store';
import * as actions from './formation-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { FormationTypesResponse } from '../formation-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  formationtypes: FormationTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  formationtypes: { results: [] } as FormationTypesResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let formationtypes: FormationTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.FormationTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.FormationTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessGetAll:
      formationtypes = (action as actions.SuccessGetAll).payload;
      return { ...state, formationtypes };

    case actions.FormationTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
