import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './users-modal.reducer';
import { UsersResponse } from '../users-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('users-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getUsers = createSelector(getFeature, (state: State) => {
  return state.users as UsersResponse;
});

export const getUsersSelected = createSelector(getFeature, (state: State) => {
  return state.modalRowSelect as SelectedModalRow;
});
