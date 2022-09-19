import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './groups.reducer';
import { GroupResponse, Group } from '../group.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getGroups = createFeatureSelector('groups');

export const getError = createSelector(
  getGroups,
  (state: State) => state.error
);

export const getGroupsList = createSelector(getGroups, (state: State) => {
  return state.groups as GroupResponse;
});

export const getGroupsListEntirely = createSelector(
  getGroups,
  (state: State) => {
    return state.groupsEntirely as GroupResponse;
  }
);

export const getGroup = createSelector(getGroups, (state: State) => {
  return state.group as Group;
});

export const getSelectedGroups = createSelector(getGroups, (state: State) => {
  return state.selectedIds as Group[];
});
