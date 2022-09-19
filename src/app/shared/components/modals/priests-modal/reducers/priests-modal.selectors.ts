import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './priests-modal.reducer';
import { EntityPriestsResponse } from '../priests-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('priests-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getPriests = createSelector(getFeature, (state: State) => {
  return state.priests as EntityPriestsResponse;
});

export const getPriestsSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
