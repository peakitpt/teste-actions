import { Action } from '@ngrx/store';
import * as actions from './countries.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Country, CountryResponse } from '../country.model';

export interface State {
  countries: CountryResponse;
  countriesEntirely: CountryResponse;
  country: Country;
  selectedIds: Country[];
  error: RequestError;
}

export const initialState: State = {
  countries: null,
  countriesEntirely: null,
  country: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let countries: any;
  let countriesEntirely: any;
  let country: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.CountriesActionTypes.RequestFailCountries:
      const error = (action as actions.RequestFailCountries).payload;
      return { ...state, error };

    case actions.CountriesActionTypes.RequestGetAllCountries:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessGetAllCountries:
      countries = (action as actions.SuccessGetAllCountries).payload;
      return { ...state, countries };

    case actions.CountriesActionTypes.RequestGetCountry:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessGetCountry:
      country = (action as actions.SuccessGetCountry).payload;
      return { ...state, country };

    case actions.CountriesActionTypes.RequestPostCountry:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessPostCountry:
      country = (action as actions.SuccessPostCountry).payload;
      return { ...state, country };

    case actions.CountriesActionTypes.RequestPutCountry:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessPutCountry:
      country = (action as actions.SuccessPutCountry).payload;
      return { ...state, country };

    case actions.CountriesActionTypes.RequestDeleteCountry:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessDeleteCountry:
      country = (action as actions.SuccessDeleteCountry).payload;
      return { ...state, country };

    // case actions.CountriesActionTypes.RequestBulkDeleteCountries:
    //   return { ...state, error: null };

    // case actions.CountriesActionTypes.SuccessBulkDeleteCountries:
    //   country = (action as actions.SuccessBulkDeleteCountries).payload;
    //   return { ...state, country };

    case actions.CountriesActionTypes.SetSelectedCountries:
      selectedIds = (action as actions.SetSelectedCountries).payload;
      return { ...state, selectedIds };

    case actions.CountriesActionTypes.RequestGetEntirelyCountries:
      return { ...state, error: null };

    case actions.CountriesActionTypes.SuccessGetEntirelyCountries:
      countriesEntirely = (action as actions.SuccessGetEntirelyCountries)
        .payload;
      return { ...state, countriesEntirely };

    default:
      return state;
  }
}
