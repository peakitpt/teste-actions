import { Action } from '@ngrx/store';
import * as actions from './curia-administrative-process-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaAdministrativeProcessTypesResponse } from '../curia-administrative-process-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaAdministrativeProcessTypes: CuriaAdministrativeProcessTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaAdministrativeProcessTypes: {
    results: [],
  } as CuriaAdministrativeProcessTypesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: CuriaAdministrativeProcessTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaAdministrativeProcessTypes: successResult };

    case actions.CuriaAdministrativeProcessTypesActionTypes.ClearGetAll:
      return {
        ...state,
        curiaAdministrativeProcessTypes: {
          results: [],
        } as CuriaAdministrativeProcessTypesResponse,
      };

    case actions.CuriaAdministrativeProcessTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.CuriaAdministrativeProcessTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
