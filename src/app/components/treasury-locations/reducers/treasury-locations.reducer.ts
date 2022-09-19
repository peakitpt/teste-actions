import { Action } from '@ngrx/store';
import * as actions from './treasury-locations.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  TreasuryLocation,
  TreasuryLocationResponse,
} from '../treasury-location.model';

export interface State {
  treasuryLocations: TreasuryLocationResponse;
  treasuryLocationsEntirely: TreasuryLocationResponse;
  treasuryLocation: TreasuryLocation;
  selectedIds: TreasuryLocation[];
  error: RequestError;
}

export const initialState: State = {
  treasuryLocations: null,
  treasuryLocationsEntirely: null,
  treasuryLocation: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let treasuryLocations: any;
  let treasuryLocationsEntirely: any;
  let treasuryLocation: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.TreasuryLocationsActionTypes.RequestFailTreasuryLocations:
      const error = (action as actions.RequestFailTreasuryLocations).payload;
      return { ...state, error };

    case actions.TreasuryLocationsActionTypes.RequestGetAllTreasuryLocations:
      return { ...state, error: null };

    case actions.TreasuryLocationsActionTypes.SuccessGetAllTreasuryLocations:
      treasuryLocations = (action as actions.SuccessGetAllTreasuryLocations)
        .payload;
      return { ...state, treasuryLocations };

    case actions.TreasuryLocationsActionTypes.RequestGetTreasuryLocation:
      return { ...state, error: null };

    case actions.TreasuryLocationsActionTypes.SuccessGetTreasuryLocation:
      treasuryLocation = (action as actions.SuccessGetTreasuryLocation).payload;
      return { ...state, treasuryLocation };

    case actions.TreasuryLocationsActionTypes.RequestPostTreasuryLocation:
      return { ...state, error: null };

    case actions.TreasuryLocationsActionTypes.SuccessPostTreasuryLocation:
      treasuryLocation = (action as actions.SuccessPostTreasuryLocation)
        .payload;
      return { ...state, treasuryLocation };

    case actions.TreasuryLocationsActionTypes.RequestPutTreasuryLocation:
      return { ...state, error: null };

    case actions.TreasuryLocationsActionTypes.SuccessPutTreasuryLocation:
      treasuryLocation = (action as actions.SuccessPutTreasuryLocation).payload;
      return { ...state, treasuryLocation };

    case actions.TreasuryLocationsActionTypes.RequestDeleteTreasuryLocation:
      return { ...state, error: null };

    case actions.TreasuryLocationsActionTypes.SuccessDeleteTreasuryLocation:
      treasuryLocation = (action as actions.SuccessDeleteTreasuryLocation)
        .payload;
      return { ...state, treasuryLocation };

    // case actions.TreasuryLocationsActionTypes.RequestBulkDeleteTreasuryLocations:
    //   return { ...state, error: null };

    // case actions.TreasuryLocationsActionTypes.SuccessBulkDeleteTreasuryLocations:
    //   treasuryLocation = (action as actions.SuccessBulkDeleteTreasuryLocations).payload;
    //   return { ...state, treasuryLocation };

    case actions.TreasuryLocationsActionTypes.SetSelectedTreasuryLocations:
      selectedIds = (action as actions.SetSelectedTreasuryLocations).payload;
      return { ...state, selectedIds };

    case actions.TreasuryLocationsActionTypes
      .RequestGetEntirelyTreasuryLocations:
      return { ...state, error: null };

    case actions.TreasuryLocationsActionTypes
      .SuccessGetEntirelyTreasuryLocations:
      treasuryLocationsEntirely = (
        action as actions.SuccessGetEntirelyTreasuryLocations
      ).payload;
      return { ...state, treasuryLocationsEntirely };

    default:
      return state;
  }
}
