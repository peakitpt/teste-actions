import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './emenus.reducer';
import { EmenuResponse, Emenu } from '../emenu.model';

export const getEmenus = createFeatureSelector('emenus');

export const getError = createSelector(
  getEmenus,
  (state: State) => state.error
);

export const getEmenusList = createSelector(getEmenus, (state: State) => {
  return state.emenus as EmenuResponse;
});

export const getEmenusListEntirely = createSelector(
  getEmenus,
  (state: State) => {
    return state.emenusEntirely;
  }
);

export const getEmenu = createSelector(getEmenus, (state: State) => {
  return state.emenu as Emenu;
});

export const getSelectedEmenus = createSelector(getEmenus, (state: State) => {
  return state.selectedIds as Emenu[];
});
