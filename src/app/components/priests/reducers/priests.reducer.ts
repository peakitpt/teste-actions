import { Action } from '@ngrx/store';
import * as actions from './priests.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CurrentAccountLinesResponse, GroupsResponse, Priest, PriestResponse } from '../priest.model';

export interface State {
  priests: PriestResponse;
  priestsEntirely: PriestResponse;
  priest: Priest;
  selectedIds: Priest[];
  error: RequestError;
  current_account_lines_priestly_fraternity: CurrentAccountLinesResponse;
  current_account_lines_curia: CurrentAccountLinesResponse;
  groups: GroupsResponse;
}

export const initialState: State = {
  priests: null,
  priestsEntirely: null,
  priest: null,
  selectedIds: null,
  error: null,
  current_account_lines_priestly_fraternity: null,
  current_account_lines_curia: null,
  groups: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.PriestActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PriestActionTypes.RequestActivateDeactivateGroup:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessActivateDeactivateGroup:
      successResult = (action as actions.SuccessActivateDeactivateGroup).payload;
      return { ...state };

    case actions.PriestActionTypes.RequestGetAllGroups:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessGetAllGroups:
      successResult = (action as actions.SuccessGetAllGroups).payload;
      return { ...state, groups: successResult };

    case actions.PriestActionTypes.RequestGetAllCurrentAccountLinesCuria:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessGetAllCurrentAccountLinesCuria:
      successResult = (action as actions.SuccessGetAllCurrentAccountLinesCuria).payload;
      return { ...state, current_account_lines_curia: successResult };

    case actions.PriestActionTypes.RequestGetAllCurrentAccountLinesPriestlyFraternity:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessGetAllCurrentAccountLinesPriestlyFraternity:
      successResult = (action as actions.SuccessGetAllCurrentAccountLinesPriestlyFraternity).payload;
      return { ...state, current_account_lines_priestly_fraternity: successResult };

    case actions.PriestActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, priests: successResult };

    case actions.PriestActionTypes.ClearGetAll:
      return { ...state, priests: { results: [] } as PriestResponse };

    case actions.PriestActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, priest: successResult };

    case actions.PriestActionTypes.ClearGet:
      return { ...state, priest: undefined };

    case actions.PriestActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, priest: successResult };

    case actions.PriestActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, priest: successResult };

    case actions.PriestActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, priest: successResult };

    case actions.PriestActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, priest: successResult };

    case actions.PriestActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.PriestActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.PriestActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, priestsEntirely: successResult };

    default:
      return state;
  }
}
