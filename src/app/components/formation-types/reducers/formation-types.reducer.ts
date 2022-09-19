import { Action } from '@ngrx/store';
import * as actions from './formation-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { FormationType, FormationTypeResponse } from '../formation-type.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  formationTypes: FormationTypeResponse;
  formationtypesEntirely: FormationTypeResponse;
  formationType: FormationType;
  selectedIds: FormationType[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  formationTypes: null,
  formationtypesEntirely: null,
  formationType: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let formationTypes: any;
  let formationtypesEntirely: any;
  let formationType: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.FormationTypesActionTypes.RequestFailFormationTypes:
      const error = (action as actions.RequestFailFormationTypes).payload;
      return { ...state, error };

    case actions.FormationTypesActionTypes.RequestGetAllFormationTypes:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessGetAllFormationTypes:
      formationTypes = (action as actions.SuccessGetAllFormationTypes).payload;
      return { ...state, formationTypes };

    case actions.FormationTypesActionTypes.RequestGetFormationType:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessGetFormationType:
      formationType = (action as actions.SuccessGetFormationType).payload;
      return { ...state, formationType };

    case actions.FormationTypesActionTypes.RequestPostFormationType:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessPostFormationType:
      formationType = (action as actions.SuccessPostFormationType).payload;
      return { ...state, formationType };

    case actions.FormationTypesActionTypes.RequestPutFormationType:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessPutFormationType:
      formationType = (action as actions.SuccessPutFormationType).payload;
      return { ...state, formationType };

    case actions.FormationTypesActionTypes.RequestDeleteFormationType:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessDeleteFormationType:
      formationType = (action as actions.SuccessDeleteFormationType).payload;
      return { ...state, formationType };

    // case actions.FormationTypesActionTypes.RequestBulkDeleteFormationTypes:
    //   return { ...state, error: null };

    // case actions.FormationTypesActionTypes.SuccessBulkDeleteFormationTypes:
    //   formationType = (action as actions.SuccessBulkDeleteFormationTypes).payload;
    //   return { ...state, formationType };

    case actions.FormationTypesActionTypes.RequestSendTestFormationType:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessSendTestFormationType:
      formationType = (action as actions.SuccessSendTestFormationType).payload;
      return { ...state, formationType };

    case actions.FormationTypesActionTypes.SetSelectedFormationTypes:
      selectedIds = (action as actions.SetSelectedFormationTypes).payload;
      return { ...state, selectedIds };

    case actions.FormationTypesActionTypes.SetModalSelectFormationType:
      modalRowSelect = (action as actions.SetModalSelectFormationType).payload;
      return { ...state, modalRowSelect };

    case actions.FormationTypesActionTypes.RequestGetEntirelyFormationTypes:
      return { ...state, error: null };

    case actions.FormationTypesActionTypes.SuccessGetEntirelyFormationTypes:
      formationtypesEntirely = (action as actions.SuccessGetEntirelyFormationTypes)
        .payload;
      return { ...state, formationtypesEntirely };

    default:
      return state;
  }
}
