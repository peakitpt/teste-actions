import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-administrative-process-types-modal.reducer';
import { CuriaAdministrativeProcessTypesResponse } from '../curia-administrative-process-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector(
  'curia-administrative-process-types-modal'
);

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getCuriaAdministrativeProcessTypes = createSelector(
  getFeature,
  (state: State) => {
    return state.curiaAdministrativeProcessTypes as CuriaAdministrativeProcessTypesResponse;
  }
);

export const getCuriaAdministrativeProcessTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
