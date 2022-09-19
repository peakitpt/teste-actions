import { Action } from '@ngrx/store';
import * as actions from './emoluments-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EmolumentsResponse } from '../emoluments-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  emoluments: EmolumentsResponse;
  modalRowSelect: SelectedModalRow;
  emolumentTypes: any;
  error: RequestError;
}

export const initialState: State = {
  emoluments: { results: [] } as EmolumentsResponse,
  emolumentTypes: { results: [] } as any,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: EmolumentsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.EmolumentsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.EmolumentsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, emoluments: successResult };

    case actions.EmolumentsActionTypes.ClearGetAll:
      return { ...state, emoluments: { results: [] } as EmolumentsResponse };

    case actions.EmolumentsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    case actions.EmolumentsActionTypes.RequestGetAllEmolumentTypes:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessGetAllEmolumentTypes:
      successResult = (action as actions.SuccessGetAllEmolumentTypes).payload;
      return { ...state, emolumentTypes: successResult };

    default:
      return state;
  }
}
