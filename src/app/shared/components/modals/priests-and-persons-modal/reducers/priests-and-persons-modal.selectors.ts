import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './priests-and-persons-modal.reducer';
import { PriestsAndPersonsResponse } from '../priests-and-persons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('priests-and-persons-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getPriestsAndPersons = createSelector(
  getFeature,
  (state: State) => {
    return state.priestsAndPersons as PriestsAndPersonsResponse;
  }
);

export const getPriestsAndPersonsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
