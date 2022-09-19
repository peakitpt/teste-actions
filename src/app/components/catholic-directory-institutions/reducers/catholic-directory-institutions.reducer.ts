import { SelectedModalRow } from './../../../shared/shared.model';
import { Action } from '@ngrx/store';
import * as actions from './catholic-directory-institutions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CatholicDirectoryInstitution,
  CatholicDirectoryInstitutionResponse,
} from '../catholic-directory-institution.model';

export interface State {
  catholicDirectoryInstitutions: CatholicDirectoryInstitutionResponse;
  catholicDirectoryInstitutionsEntirely: CatholicDirectoryInstitutionResponse;
  catholicDirectoryInstitution: CatholicDirectoryInstitution;
  selectedIds: CatholicDirectoryInstitution[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  catholicDirectoryInstitutions: null,
  catholicDirectoryInstitutionsEntirely: null,
  catholicDirectoryInstitution: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let catholicDirectoryInstitutions: any;
  let catholicDirectoryInstitutionsEntirely: any;
  let catholicDirectoryInstitution: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CatholicDirectoryInstitutionsActionTypes
      .RequestFailCatholicDirectoryInstitutions:
      const error = (action as actions.RequestFailCatholicDirectoryInstitutions)
        .payload;
      return { ...state, error };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .RequestGetAllCatholicDirectoryInstitutions:
      return { ...state, error: null };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SuccessGetAllCatholicDirectoryInstitutions:
      catholicDirectoryInstitutions = (action as actions.SuccessGetAllCatholicDirectoryInstitutions)
        .payload;
      return { ...state, catholicDirectoryInstitutions };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .RequestGetCatholicDirectoryInstitution:
      return { ...state, error: null };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SuccessGetCatholicDirectoryInstitution:
      catholicDirectoryInstitution = (action as actions.SuccessGetCatholicDirectoryInstitution)
        .payload;
      return { ...state, catholicDirectoryInstitution };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .RequestPostCatholicDirectoryInstitution:
      return { ...state, error: null };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SuccessPostCatholicDirectoryInstitution:
      catholicDirectoryInstitution = (action as actions.SuccessPostCatholicDirectoryInstitution)
        .payload;
      return { ...state, catholicDirectoryInstitution };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .RequestPutCatholicDirectoryInstitution:
      return { ...state, error: null };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SuccessPutCatholicDirectoryInstitution:
      catholicDirectoryInstitution = (action as actions.SuccessPutCatholicDirectoryInstitution)
        .payload;
      return { ...state, catholicDirectoryInstitution };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .RequestDeleteCatholicDirectoryInstitution:
      return { ...state, error: null };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SuccessDeleteCatholicDirectoryInstitution:
      catholicDirectoryInstitution = (action as actions.SuccessDeleteCatholicDirectoryInstitution)
        .payload;
      return { ...state, catholicDirectoryInstitution };

    // case actions.CatholicDirectoryInstitutionsActionTypes.RequestBulkDeleteCatholicDirectoryInstitutions:
    //   return { ...state, error: null };

    // case actions.CatholicDirectoryInstitutionsActionTypes.SuccessBulkDeleteCatholicDirectoryInstitutions:
    //   catholicDirectoryInstitution = (action as actions.SuccessBulkDeleteCatholicDirectoryInstitutions).payload;
    //   return { ...state, catholicDirectoryInstitution };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SetSelectedCatholicDirectoryInstitutions:
      selectedIds = (action as actions.SetSelectedCatholicDirectoryInstitutions)
        .payload;
      return { ...state, selectedIds };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SetModalSelectCatholicDirectoryInstitution:
      modalRowSelect = (action as actions.SetModalSelectCatholicDirectoryInstitution)
        .payload;
      return { ...state, modalRowSelect };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .RequestGetEntirelyCatholicDirectoryInstitutions:
      return { ...state, error: null };

    case actions.CatholicDirectoryInstitutionsActionTypes
      .SuccessGetEntirelyCatholicDirectoryInstitutions:
      catholicDirectoryInstitutionsEntirely = (action as actions.SuccessGetEntirelyCatholicDirectoryInstitutions)
        .payload;
      return { ...state, catholicDirectoryInstitutionsEntirely };

    default:
      return state;
  }
}
