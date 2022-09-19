import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './users.reducer';
import { UserResponse, User } from '../user.model';

export const getUsers = createFeatureSelector('users');

export const getError = createSelector(getUsers, (state: State) => state.error);

export const getUsersList = createSelector(getUsers, (state: State) => {
  return state.users as UserResponse;
});

export const getUsersListEntirely = createSelector(getUsers, (state: State) => {
  return state.usersEntirely as UserResponse;
});

export const getUser = createSelector(getUsers, (state: State) => {
  return state.user as User;
});

export const getSelectedUsers = createSelector(getUsers, (state: State) => {
  return state.selectedIds as User[];
});
