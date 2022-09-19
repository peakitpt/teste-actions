import { Action } from '@ngrx/store';
import * as actions from './newsletters-layouts.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NewslettersLayout,
  NewslettersLayoutResponse,
} from '../newsletters-layout.model';

export interface State {
  newslettersLayouts: NewslettersLayoutResponse;
  newslettersLayoutsEntirely: NewslettersLayoutResponse;
  newslettersLayout: NewslettersLayout;
  selectedIds: NewslettersLayout[];
  error: RequestError;
}

export const initialState: State = {
  newslettersLayouts: null,
  newslettersLayoutsEntirely: null,
  newslettersLayout: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let error: any;
  let successResult: any;

  switch (action.type) {
    case actions.NewslettersLayoutsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.NewslettersLayoutsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, newslettersLayouts: successResult };

    case actions.NewslettersLayoutsActionTypes.ClearGetAll:
      return {
        ...state,
        newslettersLayouts: { results: [] } as NewslettersLayoutResponse,
      };

    case actions.NewslettersLayoutsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, newslettersLayout: successResult };

    case actions.NewslettersLayoutsActionTypes.ClearGet:
      return { ...state, newslettersLayout: null };

    case actions.NewslettersLayoutsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, newslettersLayout: successResult };

    case actions.NewslettersLayoutsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, newslettersLayout: successResult };

    case actions.NewslettersLayoutsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, newslettersLayout: successResult };

    case actions.NewslettersLayoutsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, newslettersLayout: successResult };

    case actions.NewslettersLayoutsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.NewslettersLayoutsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.NewslettersLayoutsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, newslettersLayoutsEntirely: successResult };

    default:
      return state;
  }
}
