import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './contents-modal.reducer';
import { ContentsResponse } from '../contents-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('contents-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getContents = createSelector(getFeature, (state: State) => {
  return state.contents as ContentsResponse;
});

export const getContentsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
