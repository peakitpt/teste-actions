import { Action } from '@ngrx/store';
import * as actions from './auth.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

export interface AuthState {
  login: any;
  error: RequestError;
}

export const initialState: AuthState = {
  login: null,
  error: null,
};

export function reducer(state = initialState, action: Action): AuthState {
  let login: any;

  switch (action.type) {
    case actions.AuthActionTypes.RequestFailLogIn:
      const error = (action as actions.RequestFailLogIn).payload;
      return { ...state, error };

    case actions.AuthActionTypes.RequestPostLogIn:
      return { ...state, error: null };

    case actions.AuthActionTypes.SuccessPostLogIn:
      login = action as actions.SuccessPostLogIn;
      return { ...state, login };

    case actions.AuthActionTypes.RequestLogOut:
      return { ...state, error: null };

    case actions.AuthActionTypes.SuccessLogOut:
      login = action as actions.SuccessLogOut;
      return { ...state, login };

    default:
      return state;
  }
}
