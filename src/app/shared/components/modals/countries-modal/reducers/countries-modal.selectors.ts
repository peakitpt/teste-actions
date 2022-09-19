import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './countries-modal.reducer';
import { CountriesResponse } from '../countries-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('countries-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getCountries = createSelector(getFeature, (state: State) => {
  return state.countries as CountriesResponse;
});

export const getCountriesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
