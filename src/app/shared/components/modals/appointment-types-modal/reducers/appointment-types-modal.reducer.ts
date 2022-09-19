import { Action } from '@ngrx/store';
import * as actions from './appointment-types-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AppointmentTypesResponse } from '../appointment-types-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  appointmentTypes: AppointmentTypesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  appointmentTypes: { results: [] } as AppointmentTypesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: AppointmentTypesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AppointmentTypesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AppointmentTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, appointmentTypes: successResult };

    case actions.AppointmentTypesActionTypes.ClearGetAll:
      return {
        ...state,
        appointmentTypes: { results: [] } as AppointmentTypesResponse,
      };

    case actions.AppointmentTypesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
