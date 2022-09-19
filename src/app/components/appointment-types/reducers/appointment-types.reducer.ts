import { Action } from '@ngrx/store';
import * as actions from './appointment-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AppointmentType,
  AppointmentTypeResponse,
} from '../appointment-type.model';

export interface State {
  appointmentTypes: AppointmentTypeResponse;
  appointmentTypesEntirely: AppointmentTypeResponse;
  appointmentType: AppointmentType;
  selectedIds: AppointmentType[];
  error: RequestError;
}

export const initialState: State = {
  appointmentTypes: null,
  appointmentTypesEntirely: null,
  appointmentType: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.AppointmentTypesActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AppointmentTypesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, appointmentTypes: successResult };

    case actions.AppointmentTypesActionTypes.ClearGetAll:
      return {
        ...state,
        appointmentTypes: { results: [] } as AppointmentTypeResponse,
      };

    case actions.AppointmentTypesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, appointmentType: successResult };

    case actions.AppointmentTypesActionTypes.ClearGet:
      return { ...state, appointmentType: null };

    case actions.AppointmentTypesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, appointmentType: successResult };

    case actions.AppointmentTypesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, appointmentType: successResult };

    case actions.AppointmentTypesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, appointmentType: successResult };

    case actions.AppointmentTypesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, appointmentType: successResult };

    case actions.AppointmentTypesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.AppointmentTypesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, appointmentTypesEntirely: successResult };

    case actions.AppointmentTypesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AppointmentTypesActionTypes.SuccessGetNew:
      successResult = (action as actions.SuccessGetNew).payload;
      return { ...state, appointmentType: successResult };

    default:
      return state;
  }
}
