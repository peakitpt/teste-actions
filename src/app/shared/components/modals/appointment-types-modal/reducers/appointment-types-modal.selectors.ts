import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './appointment-types-modal.reducer';
import { AppointmentTypesResponse } from '../appointment-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('appointment-types-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getAppointmentTypes = createSelector(
  getFeature,
  (state: State) => {
    return state.appointmentTypes as AppointmentTypesResponse;
  }
);

export const getAppointmentTypesSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
