import { SelectedModalRow } from './../../../shared/shared.model';
import { Action } from '@ngrx/store';
import * as actions from './catholic-directory-priests.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CatholicDirectoryPriest,
  CatholicDirectoryPriestResponse,
} from '../catholic-directory-priest.model';

export interface State {
  catholicDirectoryPriests: CatholicDirectoryPriestResponse;
  catholicDirectoryPriestsEntirely: CatholicDirectoryPriestResponse;
  catholicDirectoryPriest: CatholicDirectoryPriest;
  selectedIds: CatholicDirectoryPriest[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  catholicDirectoryPriests: null,
  catholicDirectoryPriestsEntirely: null,
  catholicDirectoryPriest: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let catholicDirectoryPriests: any;
  let catholicDirectoryPriestsEntirely: any;
  let catholicDirectoryPriest: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CatholicDirectoryPriestsActionTypes
      .RequestFailCatholicDirectoryPriests:
      const error = (action as actions.RequestFailCatholicDirectoryPriests)
        .payload;
      return { ...state, error };

    case actions.CatholicDirectoryPriestsActionTypes
      .RequestGetAllCatholicDirectoryPriests:
      return { ...state, error: null };

    case actions.CatholicDirectoryPriestsActionTypes
      .SuccessGetAllCatholicDirectoryPriests:
      catholicDirectoryPriests = (action as actions.SuccessGetAllCatholicDirectoryPriests)
        .payload;
      return { ...state, catholicDirectoryPriests };

    case actions.CatholicDirectoryPriestsActionTypes
      .RequestGetCatholicDirectoryPriest:
      return { ...state, error: null };

    case actions.CatholicDirectoryPriestsActionTypes
      .SuccessGetCatholicDirectoryPriest:
      catholicDirectoryPriest = (action as actions.SuccessGetCatholicDirectoryPriest)
        .payload;
      return { ...state, catholicDirectoryPriest };

    case actions.CatholicDirectoryPriestsActionTypes
      .RequestPostCatholicDirectoryPriest:
      return { ...state, error: null };

    case actions.CatholicDirectoryPriestsActionTypes
      .SuccessPostCatholicDirectoryPriest:
      catholicDirectoryPriest = (action as actions.SuccessPostCatholicDirectoryPriest)
        .payload;
      return { ...state, catholicDirectoryPriest };

    case actions.CatholicDirectoryPriestsActionTypes
      .RequestPutCatholicDirectoryPriest:
      return { ...state, error: null };

    case actions.CatholicDirectoryPriestsActionTypes
      .SuccessPutCatholicDirectoryPriest:
      catholicDirectoryPriest = (action as actions.SuccessPutCatholicDirectoryPriest)
        .payload;
      return { ...state, catholicDirectoryPriest };

    case actions.CatholicDirectoryPriestsActionTypes
      .RequestDeleteCatholicDirectoryPriest:
      return { ...state, error: null };

    case actions.CatholicDirectoryPriestsActionTypes
      .SuccessDeleteCatholicDirectoryPriest:
      catholicDirectoryPriest = (action as actions.SuccessDeleteCatholicDirectoryPriest)
        .payload;
      return { ...state, catholicDirectoryPriest };

    // case actions.CatholicDirectoryPriestsActionTypes.RequestBulkDeleteCatholicDirectoryPriests:
    //   return { ...state, error: null };

    // case actions.CatholicDirectoryPriestsActionTypes.SuccessBulkDeleteCatholicDirectoryPriests:
    //   catholicDirectoryPriest = (action as actions.SuccessBulkDeleteCatholicDirectoryPriests).payload;
    //   return { ...state, catholicDirectoryPriest };

    case actions.CatholicDirectoryPriestsActionTypes
      .SetSelectedCatholicDirectoryPriests:
      selectedIds = (action as actions.SetSelectedCatholicDirectoryPriests)
        .payload;
      return { ...state, selectedIds };

    case actions.CatholicDirectoryPriestsActionTypes
      .SetModalSelectCatholicDirectoryPriest:
      modalRowSelect = (action as actions.SetModalSelectCatholicDirectoryPriest)
        .payload;
      return { ...state, modalRowSelect };

    case actions.CatholicDirectoryPriestsActionTypes
      .RequestGetEntirelyCatholicDirectoryPriests:
      return { ...state, error: null };

    case actions.CatholicDirectoryPriestsActionTypes
      .SuccessGetEntirelyCatholicDirectoryPriests:
      catholicDirectoryPriestsEntirely = (action as actions.SuccessGetEntirelyCatholicDirectoryPriests)
        .payload;
      return { ...state, catholicDirectoryPriestsEntirely };

    default:
      return state;
  }
}
