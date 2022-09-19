import { Action } from '@ngrx/store';
import * as actions from './numerations.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Numeration, NumerationResponse } from '../numeration.model';

export interface State {
  numerations: NumerationResponse;
  numerationsEntirely: NumerationResponse;
  numeration: Numeration;
  selectedIds: Numeration[];
  error: RequestError;
}

export const initialState: State = {
  numerations: null,
  numerationsEntirely: null,
  numeration: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let numerations: any;
  let numerationsEntirely: any;
  let numeration: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.NumerationsActionTypes.RequestFailNumerations:
      const error = (action as actions.RequestFailNumerations).payload;
      return { ...state, error };

    case actions.NumerationsActionTypes.RequestGetAllNumerations:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessGetAllNumerations:
      numerations = (action as actions.SuccessGetAllNumerations).payload;
      return { ...state, numerations };

    case actions.NumerationsActionTypes.RequestGetNumeration:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessGetNumeration:
      numeration = (action as actions.SuccessGetNumeration).payload;
      return { ...state, numeration };

    case actions.NumerationsActionTypes.RequestPostNumeration:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessPostNumeration:
      numeration = (action as actions.SuccessPostNumeration).payload;
      return { ...state, numeration };

    case actions.NumerationsActionTypes.RequestPutNumeration:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessPutNumeration:
      numeration = (action as actions.SuccessPutNumeration).payload;
      return { ...state, numeration };

    case actions.NumerationsActionTypes.RequestDeleteNumeration:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessDeleteNumeration:
      numeration = (action as actions.SuccessDeleteNumeration).payload;
      return { ...state, numeration };

    // case actions.NumerationsActionTypes.RequestBulkDeleteNumerations:
    //   return { ...state, error: null };

    // case actions.NumerationsActionTypes.SuccessBulkDeleteNumerations:
    //   numeration = (action as actions.SuccessBulkDeleteNumerations).payload;
    //   return { ...state, numeration };

    case actions.NumerationsActionTypes.SetSelectedNumerations:
      selectedIds = (action as actions.SetSelectedNumerations).payload;
      return { ...state, selectedIds };

    case actions.NumerationsActionTypes.RequestGetEntirelyNumerations:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessGetEntirelyNumerations:
      numerationsEntirely = (action as actions.SuccessGetEntirelyNumerations)
        .payload;
      return { ...state, numerationsEntirely };

    case actions.NumerationsActionTypes.RequestGetNewNumeration:
      return { ...state, error: null };

    case actions.NumerationsActionTypes.SuccessGetNewNumeration:
      numeration = (action as actions.SuccessGetNewNumeration).payload;
      return { ...state, numeration };

    default:
      return state;
  }
}
