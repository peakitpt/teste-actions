import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './base.reducer';

export const getSideNavs = createFeatureSelector('base');

export const getError = createSelector(
  getSideNavs,
  (state: State) => state.error
);

export const getSideNav = createSelector(getSideNavs, (state: State) => {
  return state.sideNav;
});

export const getMenu = createSelector(getSideNavs, (state: State) => {
  return state.menu;
});

export const getSubscriptions = createSelector(getSideNavs, (state: State) => {
  return state.subscriptions;
});

export const getAllSubscriptions = createSelector(
  getSideNavs,
  (state: State) => {
    return state.allSubscriptions;
  }
);

export const getNewsletters = createSelector(getSideNavs, (state: State) => {
  return state.newsletters;
});

export const changeSubscriptions = createSelector(
  getSideNavs,
  (state: State) => {
    return state.currentSubscription;
  }
);

export const getSearch = createSelector(getSideNavs, (state: State) => {
  return state.search;
});

export const getUserInfo = createSelector(getSideNavs, (state: State) => {
  return state.user;
});
