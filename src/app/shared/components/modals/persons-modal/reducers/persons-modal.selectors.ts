import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './persons-modal.reducer';
import { PersonsResponse } from '../persons-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('persons-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getPersons = createSelector(getFeature, (state: State) => {
  return state.persons as PersonsResponse;
});

export const getPersonsSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
