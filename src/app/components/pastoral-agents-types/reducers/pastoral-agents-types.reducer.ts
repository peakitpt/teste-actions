import { Action } from '@ngrx/store';
import * as actions from './pastoral-agents-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  PastoralAgentsType,
  PastoralAgentsTypeResponse
} from '../pastoral-agents-type.model';

export interface State {
  pastoralAgentsTypes: PastoralAgentsTypeResponse;
  pastoralagenttypesEntirely: PastoralAgentsTypeResponse;
  pastoralAgentsType: PastoralAgentsType;
  selectedIds: PastoralAgentsType[];
  error: RequestError;
}

export const initialState: State = {
  pastoralAgentsTypes: null,
  pastoralagenttypesEntirely: null,
  pastoralAgentsType: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let pastoralAgentsTypes: any;
  let pastoralagenttypesEntirely: any;
  let pastoralAgentsType: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.PastoralAgentsTypesActionTypes.RequestFailPastoralAgentsTypes:
      const error = (action as actions.RequestFailPastoralAgentsTypes).payload;
      return { ...state, error };

    case actions.PastoralAgentsTypesActionTypes
      .RequestGetAllPastoralAgentsTypes:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesActionTypes
      .SuccessGetAllPastoralAgentsTypes:
      pastoralAgentsTypes = (action as actions.SuccessGetAllPastoralAgentsTypes)
        .payload;
      return { ...state, pastoralAgentsTypes };

    case actions.PastoralAgentsTypesActionTypes.RequestGetPastoralAgentsType:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesActionTypes.SuccessGetPastoralAgentsType:
      pastoralAgentsType = (action as actions.SuccessGetPastoralAgentsType)
        .payload;
      return { ...state, pastoralAgentsType };

    case actions.PastoralAgentsTypesActionTypes.RequestPostPastoralAgentsType:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesActionTypes.SuccessPostPastoralAgentsType:
      pastoralAgentsType = (action as actions.SuccessPostPastoralAgentsType)
        .payload;
      return { ...state, pastoralAgentsType };

    case actions.PastoralAgentsTypesActionTypes.RequestPutPastoralAgentsType:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesActionTypes.SuccessPutPastoralAgentsType:
      pastoralAgentsType = (action as actions.SuccessPutPastoralAgentsType)
        .payload;
      return { ...state, pastoralAgentsType };

    case actions.PastoralAgentsTypesActionTypes.RequestDeletePastoralAgentsType:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesActionTypes.SuccessDeletePastoralAgentsType:
      pastoralAgentsType = (action as actions.SuccessDeletePastoralAgentsType)
        .payload;
      return { ...state, pastoralAgentsType };

    // case actions.PastoralAgentsTypesActionTypes.RequestBulkDeletePastoralAgentsTypes:
    //   return { ...state, error: null };

    // case actions.PastoralAgentsTypesActionTypes.SuccessBulkDeletePastoralAgentsTypes:
    //   pastoralAgentsType = (action as actions.SuccessBulkDeletePastoralAgentsTypes).payload;
    //   return { ...state, pastoralAgentsType };

    case actions.PastoralAgentsTypesActionTypes.SetSelectedPastoralAgentsTypes:
      selectedIds = (action as actions.SetSelectedPastoralAgentsTypes).payload;
      return { ...state, selectedIds };

    case actions.PastoralAgentsTypesActionTypes
      .RequestGetEntirelyPastoralAgentsTypes:
      return { ...state, error: null };

    case actions.PastoralAgentsTypesActionTypes
      .SuccessGetEntirelyPastoralAgentsTypes:
      pastoralagenttypesEntirely = (action as actions.SuccessGetEntirelyPastoralAgentsTypes)
        .payload;
      return { ...state, pastoralagenttypesEntirely };

    default:
      return state;
  }
}
