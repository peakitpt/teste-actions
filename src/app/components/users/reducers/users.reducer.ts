import { Action } from '@ngrx/store';
import * as actions from './users.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { User, UserResponse } from '../user.model';

export interface State {
  users: UserResponse;
  usersEntirely: UserResponse;
  user: User;
  selectedIds: User[];
  error: RequestError;
}

export const initialState: State = {
  users: null,
  usersEntirely: null,
  user: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let users: any;
  let usersEntirely: any;
  let user: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.UsersActionTypes.RequestFailUsers:
      const error = (action as actions.RequestFailUsers).payload;
      return { ...state, error };

    case actions.UsersActionTypes.RequestGetAllUsers:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessGetAllUsers:
      users = (action as actions.SuccessGetAllUsers).payload;
      return { ...state, users };

    case actions.UsersActionTypes.RequestGetUser:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessGetUser:
      user = (action as actions.SuccessGetUser).payload;
      return { ...state, user };

    case actions.UsersActionTypes.RequestPostUser:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessPostUser:
      user = (action as actions.SuccessPostUser).payload;
      return { ...state, user };

    case actions.UsersActionTypes.RequestPutUser:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessPutUser:
      user = (action as actions.SuccessPutUser).payload;
      return { ...state, user };

    case actions.UsersActionTypes.RequestDeleteUser:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessDeleteUser:
      user = (action as actions.SuccessDeleteUser).payload;
      return { ...state, user };

    // case actions.UsersActionTypes.RequestBulkDeleteUsers:
    //   return { ...state, error: null };

    // case actions.UsersActionTypes.SuccessBulkDeleteUsers:
    //   user = (action as actions.SuccessBulkDeleteUsers).payload;
    //   return { ...state, user };

    case actions.UsersActionTypes.SetSelectedUsers:
      selectedIds = (action as actions.SetSelectedUsers).payload;
      return { ...state, selectedIds };

    case actions.UsersActionTypes.RequestGetEntirelyUsers:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessGetEntirelyUsers:
      usersEntirely = (action as actions.SuccessGetEntirelyUsers).payload;
      return { ...state, usersEntirely };

    case actions.UsersActionTypes.RequestChangeUserPassword:
      return { ...state, error: null };

    case actions.UsersActionTypes.SuccessChangeUserPassword:
      return { ...state };

    default:
      return state;
  }
}
