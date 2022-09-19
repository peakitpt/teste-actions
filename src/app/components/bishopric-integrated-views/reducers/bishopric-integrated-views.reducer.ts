import { Action } from '@ngrx/store';
import * as actions from './bishopric-integrated-views.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  BishopricIntegratedView,
  BishopricIntegratedViewResponse,
} from '../bishopric-integrated-view.model';

export interface State {
  bishopricIntegratedViews: BishopricIntegratedViewResponse;
  bishopricIntegratedViewsEntirely: BishopricIntegratedViewResponse;
  bishopric: BishopricIntegratedView;
  selectedIds: BishopricIntegratedView[];
  error: RequestError;
}

export const initialState: State = {
  bishopricIntegratedViews: null,
  bishopricIntegratedViewsEntirely: null,
  bishopric: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let bishopricIntegratedViews: any;
  let bishopricIntegratedViewsEntirely: any;
  let bishopric: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.BishopricIntegratedViewsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.BishopricIntegratedViewsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.BishopricIntegratedViewsActionTypes.SuccessGetAll:
      bishopricIntegratedViews = (action as actions.SuccessGetAll).payload;
      return { ...state, bishopricIntegratedViews };

    case actions.BishopricIntegratedViewsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.BishopricIntegratedViewsActionTypes.SuccessGet:
      bishopric = (action as actions.SuccessGet).payload;
      return { ...state, bishopric };

    case actions.BishopricIntegratedViewsActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.BishopricIntegratedViewsActionTypes
      .RequestGetEntirelyBishopricIntegratedViews:
      return { ...state, error: null };

    case actions.BishopricIntegratedViewsActionTypes
      .SuccessGetEntirelyBishopricIntegratedViews:
      bishopricIntegratedViewsEntirely = (
        action as actions.SuccessGetEntirelyBishopricIntegratedViews
      ).payload;
      return { ...state, bishopricIntegratedViewsEntirely };

    default:
      return state;
  }
}
