import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './dashboard.reducer';

export const getDashboard = createFeatureSelector('dashboard');

export const getError = createSelector(
  getDashboard,
  (state: State) => state.error
);

export const getEntities = createSelector(getDashboard, (state: State) => {
  return state.entities;
});

export const getBaptisms = createSelector(getDashboard, (state: State) => {
  return state.baptisms;
});

export const getBaptismsCuria = createSelector(getDashboard, (state: State) => {
  return state.baptismsCuria;
});

export const getWeddings = createSelector(getDashboard, (state: State) => {
  return state.weddings;
});

export const getWeddingsCuria = createSelector(getDashboard, (state: State) => {
  return state.weddingsCuria;
});

export const getAccounting = createSelector(getDashboard, (state: State) => {
  return state.accounting;
});

export const getPendingProcesses = createSelector(
  getDashboard,
  (state: State) => {
    return state.pendingProcesses;
  }
);

export const getCuriaPendingProcesses = createSelector(
  getDashboard,
  (state: State) => {
    return state.curiaPendingProcesses;
  }
);

export const getLastProcesses = createSelector(getDashboard, (state: State) => {
  return state.lastProcesses;
});

export const getAlerts = createSelector(getDashboard, (state: State) => {
  return state.alerts;
});

export const getPriestsChangesRequests = createSelector(
  getDashboard,
  (state: State) => {
    return state.priestsRequestChanges;
  }
);
