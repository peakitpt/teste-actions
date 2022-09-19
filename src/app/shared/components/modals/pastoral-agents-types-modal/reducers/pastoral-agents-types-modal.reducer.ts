import { Action } from '@ngrx/store';
import * as actions from './pastoral-agents-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PastoralAgentsTypesResponse } from '../pastoral-agents-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  pastoralAgentsTypes: PastoralAgentsTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  pastoralAgentsTypes: { results: [] } as PastoralAgentsTypesResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let pastoralAgentsTypes: PastoralAgentsTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.PastoralAgentsTypesAction.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PastoralAgentsTypesAction.RequestGetAll:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesAction.SuccessGetAll:
      pastoralAgentsTypes = (action as actions.SuccessGetAll).payload;
      return { ...state, pastoralAgentsTypes };

    case actions.PastoralAgentsTypesAction.RequestSetSelected:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesAction.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
