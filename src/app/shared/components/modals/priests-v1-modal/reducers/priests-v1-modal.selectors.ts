import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './priests-v1-modal.reducer';
import { PriestsV1Response } from '../priests-v1-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('priests-v1-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getPriestsV1 = createSelector(getFeature, (state: State) => {
  return state.priestsV1 as PriestsV1Response;
});

export const getPriestsV1Selected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
