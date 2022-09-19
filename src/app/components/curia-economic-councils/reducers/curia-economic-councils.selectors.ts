import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-economic-councils.reducer';
import {
  CuriaEconomicCouncilResponse,
  CuriaEconomicCouncil,
} from '../curia-economic-council.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getCuriaEconomicCouncils = createFeatureSelector(
  'curia-economic-councils'
);

export const getError = createSelector(
  getCuriaEconomicCouncils,
  (state: State) => state.error
);

export const getCuriaEconomicCouncilsList = createSelector(
  getCuriaEconomicCouncils,
  (state: State) => {
    return state.curiaEconomicCouncils as CuriaEconomicCouncilResponse;
  }
);

export const getCuriaEconomicCouncilsListEntirely = createSelector(
  getCuriaEconomicCouncils,
  (state: State) => {
    return state.curiaEconomicCouncilsEntirely as CuriaEconomicCouncilResponse;
  }
);

export const getCuriaEconomicCouncil = createSelector(
  getCuriaEconomicCouncils,
  (state: State) => {
    return state.curiaMinistryAndOrder as CuriaEconomicCouncil;
  }
);

export const getSelectedCuriaEconomicCouncils = createSelector(
  getCuriaEconomicCouncils,
  (state: State) => {
    return state.selectedIds as CuriaEconomicCouncil[];
  }
);

export const getModalRowCuriaEconomicCouncil = createSelector(
  getCuriaEconomicCouncils,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
