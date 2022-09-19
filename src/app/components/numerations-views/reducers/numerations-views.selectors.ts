import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './numerations-views.reducer';
import {
  NumerationsViewResponse,
  NumerationsView,
} from '../numerations-view.model';

export const getNumerationsViews = createFeatureSelector('numerations-views');

export const getError = createSelector(
  getNumerationsViews,
  (state: State) => state.error
);

export const getNumerationsViewsList = createSelector(
  getNumerationsViews,
  (state: State) => {
    return state.numerationsViews as NumerationsViewResponse;
  }
);

export const getNumerationsViewsListEntirely = createSelector(
  getNumerationsViews,
  (state: State) => {
    return state.numerationsViewsEntirely as NumerationsViewResponse;
  }
);

export const getNumerationsView = createSelector(
  getNumerationsViews,
  (state: State) => {
    return state.numeration as NumerationsView;
  }
);

export const getSelectedNumerationsViews = createSelector(
  getNumerationsViews,
  (state: State) => {
    return state.selectedIds as NumerationsView[];
  }
);
