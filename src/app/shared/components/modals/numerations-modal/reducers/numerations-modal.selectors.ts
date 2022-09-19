import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './numerations-modal.reducer';
import { NumerationsResponse } from '../numeration-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('numerations-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getNumerations = createSelector(getFeature, (state: State) => {
  return state.numerations as NumerationsResponse;
});

export const getNumerationsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
