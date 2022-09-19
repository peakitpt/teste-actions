import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './priests.reducer';
import { PriestResponse, Priest, CurrentAccountLinesResponse, GroupsResponse } from '../priest.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getPriests = createFeatureSelector('priests');

export const getError = createSelector(
  getPriests,
  (state: State) => state.error
);

export const getGroups = createSelector(getPriests, (state: State) => {
  return state.groups as GroupsResponse;
});

export const getCurrentAccountLinesListCuria = createSelector(getPriests, (state: State) => {
  return state.current_account_lines_curia as CurrentAccountLinesResponse;
});

export const getCurrentAccountLinesListPriestlyFraternity = createSelector(getPriests, (state: State) => {
  return state.current_account_lines_priestly_fraternity as CurrentAccountLinesResponse;
});

export const getPriestsList = createSelector(getPriests, (state: State) => {
  return state.priests as PriestResponse;
});

export const getPriestsListEntirely = createSelector(
  getPriests,
  (state: State) => {
    return state.priestsEntirely as PriestResponse;
  }
);

export const getPriest = createSelector(getPriests, (state: State) => {
  return state.priest as Priest;
});

export const getSelectedPriests = createSelector(getPriests, (state: State) => {
  return state.selectedIds as Priest[];
});
