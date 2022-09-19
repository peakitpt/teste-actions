import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './newsletters-layouts-modal.reducer';
import { NewslettersLayoutsResponse } from '../newsletters-layouts-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('newsletters-layouts-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getNewslettersLayouts = createSelector(
  getFeature,
  (state: State) => {
    return state.newslettersLayouts as NewslettersLayoutsResponse;
  }
);

export const getNewslettersLayoutsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
