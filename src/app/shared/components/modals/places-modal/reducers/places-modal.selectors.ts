import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './places-modal.reducer';
import { PlacesResponse } from '../places-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('places-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getPlaces = createSelector(getFeature, (state: State) => {
  return state.places as PlacesResponse;
});

export const getPlacesSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
