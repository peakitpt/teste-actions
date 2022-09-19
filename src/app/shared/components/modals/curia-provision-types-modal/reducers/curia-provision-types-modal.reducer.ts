import { Action } from '@ngrx/store';
import * as actions from './curia-provision-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaProvisionTypesResponse } from '../curia-provision-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaProvisionTypes: CuriaProvisionTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaProvisionTypes: { results: [] } as CuriaProvisionTypesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: CuriaProvisionTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaProvisionTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaProvisionTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaProvisionTypes: successResult };

    case actions.CuriaProvisionTypesActionTypes.ClearGetAll:
      return {
        ...state,
        curiaProvisionTypes: { results: [] } as CuriaProvisionTypesResponse,
      };

    case actions.CuriaProvisionTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.CuriaProvisionTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
