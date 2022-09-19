import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './countries.reducer';
import { CountryResponse, Country } from '../country.model';

export const getCountries = createFeatureSelector('countries');

export const getError = createSelector(
  getCountries,
  (state: State) => state.error
);

export const getCountriesList = createSelector(getCountries, (state: State) => {
  return state.countries as CountryResponse;
});

export const getCountriesListEntirely = createSelector(
  getCountries,
  (state: State) => {
    return state.countriesEntirely as CountryResponse;
  }
);

export const getCountry = createSelector(getCountries, (state: State) => {
  return state.country as Country;
});

export const getSelectedCountries = createSelector(
  getCountries,
  (state: State) => {
    return state.selectedIds as Country[];
  }
);
