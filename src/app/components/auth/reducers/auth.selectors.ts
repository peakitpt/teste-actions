import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const getAuth = createFeatureSelector('auth');

export const getError = createSelector(
  getAuth,
  (authState: AuthState) => authState.error
);

export const getLogin = createSelector(getAuth, (authState: AuthState) => {
  return authState.login;
});

export const getLogout = createSelector(getAuth, (authState: AuthState) => {
  return authState.login;
});
