import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './treasury-locations.reducer';
import {
  TreasuryLocationResponse,
  TreasuryLocation,
} from '../treasury-location.model';

export const getTreasuryLocations = createFeatureSelector('treasury-locations');

export const getError = createSelector(
  getTreasuryLocations,
  (state: State) => state.error
);

export const getTreasuryLocationsList = createSelector(
  getTreasuryLocations,
  (state: State) => {
    return state.treasuryLocations as TreasuryLocationResponse;
  }
);

export const getTreasuryLocationsListEntirely = createSelector(
  getTreasuryLocations,
  (state: State) => {
    return state.treasuryLocationsEntirely as TreasuryLocationResponse;
  }
);

export const getTreasuryLocation = createSelector(
  getTreasuryLocations,
  (state: State) => {
    return state.treasuryLocation as TreasuryLocation;
  }
);

export const getSelectedTreasuryLocations = createSelector(
  getTreasuryLocations,
  (state: State) => {
    return state.selectedIds as TreasuryLocation[];
  }
);
