import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './profile-priests.reducer';
import {
  ProfilePriestResponse,
  ProfilePriest,
  CurrentAccountLinesResponse,
  GroupsResponse,
} from '../profile-priest.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getProfilePriests = createFeatureSelector('profile-priests');

export const getError = createSelector(
  getProfilePriests,
  (state: State) => state.error
);

export const getGroups = createSelector(getProfilePriests, (state: State) => {
  return state.groups as GroupsResponse;
});

export const getCurrentAccountLinesListCuria = createSelector(
  getProfilePriests,
  (state: State) => {
    return state.current_account_lines_curia as CurrentAccountLinesResponse;
  }
);

export const getCurrentAccountLinesListProfilePriestlyFraternity =
  createSelector(getProfilePriests, (state: State) => {
    return state.current_account_lines_priestly_fraternity as CurrentAccountLinesResponse;
  });

export const getProfilePriest = createSelector(
  getProfilePriests,
  (state: State) => {
    return state.priest as ProfilePriest;
  }
);

export const getSelectedProfilePriests = createSelector(
  getProfilePriests,
  (state: State) => {
    return state.selectedIds as ProfilePriest[];
  }
);
