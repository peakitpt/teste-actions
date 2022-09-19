import { Action } from '@ngrx/store';
import * as actions from './user-newsletters.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  UserNewsletter,
  UserNewsletterResponse
} from '../user-newsletter.model';

export interface State {
  userNewsletters: UserNewsletterResponse;
  userNewslettersEntirely: UserNewsletterResponse;
  userNewsletter: UserNewsletter;
  selectedIds: UserNewsletter[];
  error: RequestError;
}

export const initialState: State = {
  userNewsletters: null,
  userNewslettersEntirely: null,
  userNewsletter: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let userNewsletters: any;
  let userNewslettersEntirely: any;
  let userNewsletter: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.UserNewslettersActionTypes.RequestFailUserNewsletters:
      const error = (action as actions.RequestFailUserNewsletters).payload;
      return { ...state, error };

    case actions.UserNewslettersActionTypes.RequestGetAllUserNewsletters:
      return { ...state, error: null };

    case actions.UserNewslettersActionTypes.SuccessGetAllUserNewsletters:
      userNewsletters = (action as actions.SuccessGetAllUserNewsletters)
        .payload;
      return { ...state, userNewsletters };

    case actions.UserNewslettersActionTypes.RequestGetUserNewsletter:
      return { ...state, error: null };

    case actions.UserNewslettersActionTypes.SuccessGetUserNewsletter:
      userNewsletter = (action as actions.SuccessGetUserNewsletter).payload;
      return { ...state, userNewsletter };

    case actions.UserNewslettersActionTypes.RequestPostUserNewsletter:
      return { ...state, error: null };

    case actions.UserNewslettersActionTypes.SuccessPostUserNewsletter:
      userNewsletter = (action as actions.SuccessPostUserNewsletter).payload;
      return { ...state, userNewsletter };

    case actions.UserNewslettersActionTypes.RequestPutUserNewsletter:
      return { ...state, error: null };

    case actions.UserNewslettersActionTypes.SuccessPutUserNewsletter:
      userNewsletter = (action as actions.SuccessPutUserNewsletter).payload;
      return { ...state, userNewsletter };

    case actions.UserNewslettersActionTypes.RequestDeleteUserNewsletter:
      return { ...state, error: null };

    case actions.UserNewslettersActionTypes.SuccessDeleteUserNewsletter:
      userNewsletter = (action as actions.SuccessDeleteUserNewsletter).payload;
      return { ...state, userNewsletter };

    // case actions.UserNewslettersActionTypes.RequestBulkDeleteUserNewsletters:
    //   return { ...state, error: null };

    // case actions.UserNewslettersActionTypes.SuccessBulkDeleteUserNewsletters:
    //   userNewsletter = (action as actions.SuccessBulkDeleteUserNewsletters).payload;
    //   return { ...state, userNewsletter };

    case actions.UserNewslettersActionTypes.SetSelectedUserNewsletters:
      selectedIds = (action as actions.SetSelectedUserNewsletters).payload;
      return { ...state, selectedIds };

    case actions.UserNewslettersActionTypes.RequestGetEntirelyUserNewsletters:
      return { ...state, error: null };

    case actions.UserNewslettersActionTypes.SuccessGetEntirelyUserNewsletters:
      userNewslettersEntirely = (action as actions.SuccessGetEntirelyUserNewsletters)
        .payload;
      return { ...state, userNewslettersEntirely };

    default:
      return state;
  }
}
