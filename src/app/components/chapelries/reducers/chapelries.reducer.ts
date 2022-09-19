import { Action } from '@ngrx/store';
import * as actions from './chapelries.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Chapelry, ChapelryResponse } from '../chapelry.model';

export interface State {
  chapelries: ChapelryResponse;
  chapelriesEntirely: ChapelryResponse;
  bishopric: Chapelry;
  selectedIds: Chapelry[];
  error: RequestError;
  chapelryImage: any;
}

export const initialState: State = {
  chapelries: null,
  chapelriesEntirely: null,
  bishopric: null,
  selectedIds: null,
  error: null,
  chapelryImage: null,
};

export function reducer(state = initialState, action: Action): State {
  let chapelries: any;
  let chapelriesEntirely: any;
  let bishopric: any;
  let selectedIds: any;
  let chapelryImage: any;

  switch (action.type) {
    case actions.ChapelriesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ChapelriesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessGetAll:
      chapelries = (action as actions.SuccessGetAll).payload;
      return { ...state, chapelries };

    case actions.ChapelriesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessGet:
      bishopric = (action as actions.SuccessGet).payload;
      return { ...state, bishopric };

    case actions.ChapelriesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessPost:
      bishopric = (action as actions.SuccessPost).payload;
      return { ...state, bishopric };

    case actions.ChapelriesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessPut:
      bishopric = (action as actions.SuccessPut).payload;
      return { ...state, bishopric };

    case actions.ChapelriesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessDelete:
      bishopric = (action as actions.SuccessDelete).payload;
      return { ...state, bishopric };

    case actions.ChapelriesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessBulkDelete:
      bishopric = (action as actions.SuccessBulkDelete).payload;
      return { ...state, bishopric };

    case actions.ChapelriesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.ChapelriesActionTypes.RequestGetEntirelyChapelries:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessGetEntirelyChapelries:
      chapelriesEntirely = (action as actions.SuccessGetEntirelyChapelries)
        .payload;
      return { ...state, chapelriesEntirely };

    case actions.ChapelriesActionTypes.RequestPostChapelryImage:
      return { ...state, error: null };

    case actions.ChapelriesActionTypes.SuccessPostChapelryImage:
      chapelryImage = (action as actions.SuccessPostChapelryImage).payload;
      return { ...state, chapelryImage };

    default:
      return state;
  }
}
