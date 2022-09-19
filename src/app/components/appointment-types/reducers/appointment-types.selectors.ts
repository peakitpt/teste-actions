import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './appointment-types.reducer';
import {
  AppointmentTypeResponse,
  AppointmentType,
} from '../appointment-type.model';

export const getAppointmentTypes = createFeatureSelector('appointment-types');

export const getError = createSelector(
  getAppointmentTypes,
  (state: State) => state.error
);

export const getAppointmentTypesList = createSelector(
  getAppointmentTypes,
  (state: State) => {
    return state.appointmentTypes as AppointmentTypeResponse;
  }
);

export const getAppointmentTypesListEntirely = createSelector(
  getAppointmentTypes,
  (state: State) => {
    return state.appointmentTypesEntirely as AppointmentTypeResponse;
  }
);

export const getAppointmentType = createSelector(
  getAppointmentTypes,
  (state: State) => {
    return state.appointmentType as AppointmentType;
  }
);

export const getSelectedAppointmentTypes = createSelector(
  getAppointmentTypes,
  (state: State) => {
    return state.selectedIds as AppointmentType[];
  }
);
