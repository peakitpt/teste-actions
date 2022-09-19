import { Action } from '@ngrx/store';
import * as actions from './valences.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Valence, ValenceResponse } from '../valence.model';

export interface State {
  valences: ValenceResponse;
  valencesEntirely: ValenceResponse;
  valence: Valence;
  selectedIds: Valence[];
  error: RequestError;
}

export const initialState: State = {
  valences: null,
  valencesEntirely: null,
  valence: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let valences: any;
  let valencesEntirely: any;
  let valence: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.ValencesActionTypes.RequestFailValences:
      const error = (action as actions.RequestFailValences).payload;
      return { ...state, error };

    case actions.ValencesActionTypes.RequestGetAllValences:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessGetAllValences:
      valences = (action as actions.SuccessGetAllValences).payload;
      return { ...state, valences };

    case actions.ValencesActionTypes.RequestGetValence:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessGetValence:
      valence = (action as actions.SuccessGetValence).payload;
      return { ...state, valence };

    case actions.ValencesActionTypes.RequestPostValence:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessPostValence:
      valence = (action as actions.SuccessPostValence).payload;
      return { ...state, valence };

    case actions.ValencesActionTypes.RequestPutValence:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessPutValence:
      valence = (action as actions.SuccessPutValence).payload;
      return { ...state, valence };

    case actions.ValencesActionTypes.RequestDeleteValence:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessDeleteValence:
      valence = (action as actions.SuccessDeleteValence).payload;
      return { ...state, valence };

    // case actions.ValencesActionTypes.RequestBulkDeleteValences:
    //   return { ...state, error: null };

    // case actions.ValencesActionTypes.SuccessBulkDeleteValences:
    //   valence = (action as actions.SuccessBulkDeleteValences).payload;
    //   return { ...state, valence };

    case actions.ValencesActionTypes.SetSelectedValences:
      selectedIds = (action as actions.SetSelectedValences).payload;
      return { ...state, selectedIds };

    case actions.ValencesActionTypes.RequestGetEntirelyValences:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessGetEntirelyValences:
      valencesEntirely = (action as actions.SuccessGetEntirelyValences).payload;
      return { ...state, valencesEntirely };

    case actions.ValencesActionTypes.RequestGetNewValence:
      return { ...state, error: null };

    case actions.ValencesActionTypes.SuccessGetNewValence:
      valence = (action as actions.SuccessGetNewValence).payload;
      return { ...state, valence };

    default:
      return state;
  }
}
