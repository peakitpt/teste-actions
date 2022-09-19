import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './newsletters-layouts.reducer';
import {
  NewslettersLayoutResponse,
  NewslettersLayout,
} from '../newsletters-layout.model';

export const getNewslettersLayouts = createFeatureSelector(
  'newsletters-layouts'
);

export const getError = createSelector(
  getNewslettersLayouts,
  (state: State) => state.error
);

export const getNewslettersLayoutsList = createSelector(
  getNewslettersLayouts,
  (state: State) => {
    return state.newslettersLayouts as NewslettersLayoutResponse;
  }
);

export const getNewslettersLayoutsListEntirely = createSelector(
  getNewslettersLayouts,
  (state: State) => {
    return state.newslettersLayoutsEntirely as NewslettersLayoutResponse;
  }
);

export const getNewslettersLayout = createSelector(
  getNewslettersLayouts,
  (state: State) => {
    return state.newslettersLayout as NewslettersLayout;
  }
);

export const getSelectedNewslettersLayouts = createSelector(
  getNewslettersLayouts,
  (state: State) => {
    return state.selectedIds as NewslettersLayout[];
  }
);
