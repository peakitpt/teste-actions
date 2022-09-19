import { Action } from '@ngrx/store';
import * as actions from './places-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { PlacesResponse } from '../places-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  places: PlacesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  places: { results: [] } as PlacesResponse,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let places: PlacesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.PlacesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PlacesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PlacesActionTypes.SuccessGetAll:
      places = (action as actions.SuccessGetAll).payload;
      return { ...state, places };

    case actions.PlacesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.PlacesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
