import { Action } from '@ngrx/store';
import * as actions from './clergy-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ClergyTypeResponse } from '../clergy-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  clergy_types: ClergyTypeResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  clergy_types: { results: [] } as ClergyTypeResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: ClergyTypeResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.ClergyTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ClergyTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ClergyTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, clergy_types: successResult };

    case actions.ClergyTypesActionTypes.ClearGetAll:
      return { ...state, clergy_types: { results: [] } as ClergyTypeResponse };

    case actions.ClergyTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.ClergyTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
