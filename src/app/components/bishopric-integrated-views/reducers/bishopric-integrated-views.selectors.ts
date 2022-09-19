import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './bishopric-integrated-views.reducer';

export const getBishopricIntegratedViews = createFeatureSelector(
  'bishopric-integrated-views'
);

export const getError = createSelector(
  getBishopricIntegratedViews,
  (state: State) => state.error
);

export const getBishopricIntegratedViewsList = createSelector(
  getBishopricIntegratedViews,
  (state: State) => {
    return state.bishopricIntegratedViews;
  }
);

export const getBishopricIntegratedViewsListEntirely = createSelector(
  getBishopricIntegratedViews,
  (state: State) => {
    return state.bishopricIntegratedViewsEntirely;
  }
);

export const getBishopricIntegratedView = createSelector(
  getBishopricIntegratedViews,
  (state: State) => {
    return state.bishopric;
  }
);

export const getSelectedBishopricIntegratedViews = createSelector(
  getBishopricIntegratedViews,
  (state: State) => {
    return state.selectedIds;
  }
);
