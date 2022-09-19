import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './layouts-modal.reducer';
import { LayoutsResponse } from '../layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('layouts-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getLayouts = createSelector(getFeature, (state: State) => {
  return state.layouts as LayoutsResponse;
});

export const getLayoutsSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
