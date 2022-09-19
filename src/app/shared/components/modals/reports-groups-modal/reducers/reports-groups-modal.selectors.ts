import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reports-groups-modal.reducer';
import { ReportsGroupResponse } from '../reports-groups-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('reports-groups-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getReportsGroups = createSelector(getFeature, (state: State) => {
  return state.reportsGroups as ReportsGroupResponse;
});

export const getReportsGroupsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
