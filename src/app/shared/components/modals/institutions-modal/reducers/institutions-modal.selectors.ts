import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './institutions-modal.reducer';
import { InstitutionsResponse } from '../institutions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('institutions-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getInstitutions = createSelector(getFeature, (state: State) => {
  return state.institutions as InstitutionsResponse;
});

export const getInstitutionsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
