import { Action } from '@ngrx/store';
import * as actions from './institutions-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { InstitutionsResponse } from '../institutions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  institutions: InstitutionsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  institutions: { results: [] } as InstitutionsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let institutions: InstitutionsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.InstitutionsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.InstitutionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessGetAll:
      institutions = (action as actions.SuccessGetAll).payload;
      return { ...state, institutions };

    case actions.InstitutionsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.InstitutionsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
