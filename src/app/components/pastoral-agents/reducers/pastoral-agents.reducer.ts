import { Action } from '@ngrx/store';
import * as actions from './pastoral-agents.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityPastoralAgent } from '../../mecs/mecs.model';
import {
  PastoralAgentResponse,
  PastoralAgentTypesResponse
} from '../pastoral-agents.model';

export interface State {
  pastoralAgents: PastoralAgentResponse;
  pastoralagentsEntirely: PastoralAgentResponse;
  pastoralAgent: EntityPastoralAgent;
  pastoralAgentTypes: PastoralAgentTypesResponse;
  selectedIds: EntityPastoralAgent[];
  error: RequestError;
}

export const initialState: State = {
  pastoralAgents: null,
  pastoralagentsEntirely: null,
  pastoralAgentTypes: null,
  pastoralAgent: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let pastoralAgentTypes: any;
  let pastoralagentsEntirely: any;
  let pastoralAgents: any;
  let pastoralAgent: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.PastoralAgentsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PastoralAgentsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessGetAll:
      pastoralAgents = (action as actions.SuccessGetAll).payload;
      return { ...state, pastoralAgents };

    case actions.PastoralAgentsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessGet:
      pastoralAgent = (action as actions.SuccessGet).payload;
      return { ...state, pastoralAgent };

    case actions.PastoralAgentsActionTypes.RequestGetTypes:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessGetTypes:
      pastoralAgentTypes = (action as actions.SuccessGetTypes).payload;
      return { ...state, pastoralAgentTypes };

    case actions.PastoralAgentsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessPost:
      pastoralAgent = (action as actions.SuccessPost).payload;
      return { ...state, pastoralAgent };

    case actions.PastoralAgentsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessPut:
      pastoralAgent = (action as actions.SuccessPut).payload;
      return { ...state, pastoralAgent };

    case actions.PastoralAgentsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessDelete:
      pastoralAgent = (action as actions.SuccessDelete).payload;
      return { ...state, pastoralAgent };

    case actions.PastoralAgentsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessBulkDelete:
      pastoralAgent = (action as actions.SuccessBulkDelete).payload;
      return { ...state, pastoralAgent };

    case actions.PastoralAgentsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.PastoralAgentsActionTypes.RequestGetEntirelyPastoralAgents:
      return { ...state, error: null };

    case actions.PastoralAgentsActionTypes.SuccessGetEntirelyPastoralAgents:
      pastoralagentsEntirely = (action as actions.SuccessGetEntirelyPastoralAgents)
        .payload;
      return { ...state, pastoralagentsEntirely };

    default:
      return state;
  }
}
