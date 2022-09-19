import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './sections-modal.reducer';
import { SectionsResponse } from '../sections-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('sections-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getSections = createSelector(getFeature, (state: State) => {
  return state.sections as SectionsResponse;
});

export const getSectionsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
