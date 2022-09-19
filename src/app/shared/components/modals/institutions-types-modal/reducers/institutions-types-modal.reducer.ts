import { Action } from '@ngrx/store';
import * as actions from './institutions-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { InstitutionTypeResponse } from '../institutions-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  institutions_types: InstitutionTypeResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  institutions_types: { results: [] } as InstitutionTypeResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: InstitutionTypeResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.InstitutionsTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.InstitutionsTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.InstitutionsTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, institutions_types: successResult };

    case actions.InstitutionsTypesActionTypes.ClearGetAll:
      return { ...state, institutions_types: { results: [] } as InstitutionTypeResponse };

    case actions.InstitutionsTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.InstitutionsTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
