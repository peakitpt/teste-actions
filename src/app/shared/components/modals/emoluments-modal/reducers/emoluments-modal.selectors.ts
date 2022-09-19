import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './emoluments-modal.reducer';
import { EmolumentsResponse } from '../emoluments-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('emoluments-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getEmoluments = createSelector(getFeature, (state: State) => {
  return state.emoluments as EmolumentsResponse;
});

export const getEmolumentTypes = createSelector(getFeature, (state: State) => {
  return state.emolumentTypes as any;
});

export const getEmolumentsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
