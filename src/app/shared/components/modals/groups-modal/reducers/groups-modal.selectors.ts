import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './groups-modal.reducer';
import { GroupResponse } from '../groups-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('groups-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getGroups = createSelector(getFeature, (state: State) => {
  return state.groups as GroupResponse;
});

export const getGroupsSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
