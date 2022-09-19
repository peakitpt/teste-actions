import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './views-modal.reducer';
import { ViewsResponse } from '../views-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('views-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getViews = createSelector(getFeature, (state: State) => {
  return state.views as ViewsResponse;
});

export const getViewsSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
