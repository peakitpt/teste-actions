import { Action } from '@ngrx/store';
import * as actions from './patrons.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Patron, PatronResponse } from '../patrons.model';

export interface State {
  patrons: PatronResponse;
  patronsEntirely: PatronResponse;
  patron: Patron;
  selectedIds: Patron[];
  error: RequestError;
}

export const initialState: State = {
  patrons: null,
  patronsEntirely: null,
  patron: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let patrons: any;
  let patronsEntirely: any;
  let patron: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.PatronsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PatronsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessGetAll:
      patrons = (action as actions.SuccessGetAll).payload;
      return { ...state, patrons };

    case actions.PatronsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessGet:
      patron = (action as actions.SuccessGet).payload;
      return { ...state, patron };

    case actions.PatronsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessPost:
      patron = (action as actions.SuccessPost).payload;
      return { ...state, patron };

    case actions.PatronsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessPut:
      patron = (action as actions.SuccessPut).payload;
      return { ...state, patron };

    case actions.PatronsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessDelete:
      patron = (action as actions.SuccessDelete).payload;
      return { ...state, patron };

    case actions.PatronsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessBulkDelete:
      patron = (action as actions.SuccessBulkDelete).payload;
      return { ...state, patron };

    case actions.PatronsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.PatronsActionTypes.RequestGetEntirelyPatrons:
      return { ...state, error: null };

    case actions.PatronsActionTypes.SuccessGetEntirelyPatrons:
      patronsEntirely = (action as actions.SuccessGetEntirelyPatrons).payload;
      return { ...state, patronsEntirely };

    default:
      return state;
  }
}
