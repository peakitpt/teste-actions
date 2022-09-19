import { Action } from '@ngrx/store';
import * as actions from './profile-priests.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CurrentAccountLinesResponse,
  GroupsResponse,
  ProfilePriest,
  ProfilePriestResponse,
} from '../profile-priest.model';

export interface State {
  priests: ProfilePriestResponse;
  priest: ProfilePriest;
  selectedIds: ProfilePriest[];
  error: RequestError;
  current_account_lines_priestly_fraternity: CurrentAccountLinesResponse;
  current_account_lines_curia: CurrentAccountLinesResponse;
  groups: GroupsResponse;
}

export const initialState: State = {
  priests: null,
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
    case actions.ProfilePriestActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ProfilePriestActionTypes.RequestActivateDeactivateGroup:
      return { ...state, error: null };

    case actions.ProfilePriestActionTypes.SuccessActivateDeactivateGroup:
      successResult = (action as actions.SuccessActivateDeactivateGroup)
        .payload;
      return { ...state };

    case actions.ProfilePriestActionTypes.RequestGetAllGroups:
      return { ...state, error: null };

    case actions.ProfilePriestActionTypes.SuccessGetAllGroups:
      successResult = (action as actions.SuccessGetAllGroups).payload;
      return { ...state, groups: successResult };

    case actions.ProfilePriestActionTypes.RequestGetAllCurrentAccountLinesCuria:
      return { ...state, error: null };

    case actions.ProfilePriestActionTypes.SuccessGetAllCurrentAccountLinesCuria:
      successResult = (action as actions.SuccessGetAllCurrentAccountLinesCuria)
        .payload;
      return { ...state, current_account_lines_curia: successResult };

    case actions.ProfilePriestActionTypes
      .RequestGetAllCurrentAccountLinesProfilePriestlyFraternity:
      return { ...state, error: null };

    case actions.ProfilePriestActionTypes
      .SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity:
      successResult = (
        action as actions.SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity
      ).payload;
      return {
        ...state,
        current_account_lines_priestly_fraternity: successResult,
      };

    case actions.ProfilePriestActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.ProfilePriestActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, priest: successResult };

    case actions.ProfilePriestActionTypes.ClearGet:
      return { ...state, priest: undefined };

    case actions.ProfilePriestActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.ProfilePriestActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, priest: successResult };

    case actions.ProfilePriestActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    default:
      return state;
  }
}
