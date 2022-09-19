import { Action } from '@ngrx/store';
import * as actions from './numerations-views.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  NumerationsView,
  NumerationsViewResponse,
} from '../numerations-view.model';

export interface State {
  numerationsViews: NumerationsViewResponse;
  numerationsViewsEntirely: NumerationsViewResponse;
  numeration: NumerationsView;
  selectedIds: NumerationsView[];
  error: RequestError;
}

export const initialState: State = {
  numerationsViews: null,
  numerationsViewsEntirely: null,
  numeration: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let numerationsViews: any;
  let numerationsViewsEntirely: any;
  let numeration: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.NumerationsViewsActionTypes.RequestFailNumerationsViews:
      const error = (action as actions.RequestFailNumerationsViews).payload;
      return { ...state, error };

    case actions.NumerationsViewsActionTypes.RequestGetAllNumerationsViews:
      return { ...state, error: null };

    case actions.NumerationsViewsActionTypes.SuccessGetAllNumerationsViews:
      numerationsViews = (action as actions.SuccessGetAllNumerationsViews)
        .payload;
      return { ...state, numerationsViews };

    case actions.NumerationsViewsActionTypes.RequestGetNumerationsView:
      return { ...state, error: null };

    case actions.NumerationsViewsActionTypes.SuccessGetNumerationsView:
      numeration = (action as actions.SuccessGetNumerationsView).payload;
      return { ...state, numeration };

    case actions.NumerationsViewsActionTypes.RequestPostNumerationsView:
      return { ...state, error: null };

    case actions.NumerationsViewsActionTypes.SuccessPostNumerationsView:
      numeration = (action as actions.SuccessPostNumerationsView).payload;
      return { ...state, numeration };

    case actions.NumerationsViewsActionTypes.RequestPutNumerationsView:
      return { ...state, error: null };

    case actions.NumerationsViewsActionTypes.SuccessPutNumerationsView:
      numeration = (action as actions.SuccessPutNumerationsView).payload;
      return { ...state, numeration };

    case actions.NumerationsViewsActionTypes.RequestDeleteNumerationsView:
      return { ...state, error: null };

    case actions.NumerationsViewsActionTypes.SuccessDeleteNumerationsView:
      numeration = (action as actions.SuccessDeleteNumerationsView).payload;
      return { ...state, numeration };

    // case actions.NumerationsViewsActionTypes.RequestBulkDeleteNumerationsViews:
    //   return { ...state, error: null };

    // case actions.NumerationsViewsActionTypes.SuccessBulkDeleteNumerationsViews:
    //   numeration = (action as actions.SuccessBulkDeleteNumerationsViews).payload;
    //   return { ...state, numeration };

    case actions.NumerationsViewsActionTypes.SetSelectedNumerationsViews:
      selectedIds = (action as actions.SetSelectedNumerationsViews).payload;
      return { ...state, selectedIds };

    case actions.NumerationsViewsActionTypes.RequestGetEntirelyNumerationsViews:
      return { ...state, error: null };

    case actions.NumerationsViewsActionTypes.SuccessGetEntirelyNumerationsViews:
      numerationsViewsEntirely = (action as actions.SuccessGetEntirelyNumerationsViews)
        .payload;
      return { ...state, numerationsViewsEntirely };

    default:
      return state;
  }
}
