import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './chrisms.reducer';
import { ChrismResponse, Chrism } from '../chrism.model';
import { ReportResponse } from '../../reports/report.model';

export const getChrisms = createFeatureSelector('chrisms');

export const getError = createSelector(
  getChrisms,
  (state: State) => state.error
);

export const getChrismsList = createSelector(getChrisms, (state: State) => {
  return state.chrisms as ChrismResponse;
});

export const getChrismsListEntirely = createSelector(
  getChrisms,
  (state: State) => {
    return state.chrismsEntirely as ChrismResponse;
  }
);

export const getChrism = createSelector(getChrisms, (state: State) => {
  return state.chrism as Chrism;
});

export const getSelectedChrisms = createSelector(getChrisms, (state: State) => {
  return state.selectedIds as Chrism[];
});

export const getChrismEntitiesFormReports = createSelector(
  getChrisms,
  (state: State) => {
    return state.formReports as ReportResponse;
  }
);

export const getChrismEntitiesFormSubscriptionReports = createSelector(
  getChrisms,
  (state: State) => {
    if (state) {
      return state.formSubscriptionReports as any;
    }
  }
);
