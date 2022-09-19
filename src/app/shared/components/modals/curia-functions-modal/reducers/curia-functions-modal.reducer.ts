import { Action } from '@ngrx/store';
import * as actions from './curia-functions-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CuriaFunctionsResponse } from '../curia-functions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaFunctions: CuriaFunctionsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaFunctions: { results: [] } as CuriaFunctionsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: CuriaFunctionsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaFunctionsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CuriaFunctionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, curiaFunctions: successResult };

    case actions.CuriaFunctionsActionTypes.ClearGetAll:
      return {
        ...state,
        curiaFunctions: { results: [] } as CuriaFunctionsResponse,
      };

    case actions.CuriaFunctionsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.CuriaFunctionsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
