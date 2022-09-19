import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './websiteconfigurations.reducer';
import { Websiteconfiguration } from '../websiteconfiguration.model';

export const getWebsiteconfigurations = createFeatureSelector(
  'websiteconfigurations'
);

export const getError = createSelector(
  getWebsiteconfigurations,
  (state: State) => state.error
);

export const getWebsiteconfiguration = createSelector(
  getWebsiteconfigurations,
  (state: State) => {
    return state.websiteconfiguration as Websiteconfiguration;
  }
);

export const getSelectedWebsiteconfigurations = createSelector(
  getWebsiteconfigurations,
  (state: State) => {
    return state.selectedIds as Websiteconfiguration[];
  }
);
