import { Action } from '@ngrx/store';
import * as actions from './accruals-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccrualsType, AccrualsTypeResponse } from '../accruals-type.model';

export interface State {
  accrualTypes: AccrualsTypeResponse;
  accrualTypesEntirely: AccrualsTypeResponse;
  accrualType: AccrualsType;
  selectedIds: AccrualsType[];
  error: RequestError;
}

export const initialState: State = {
  accrualTypes: null,
  accrualTypesEntirely: null,
  accrualType: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accrualTypes: any;
  let accrualTypesEntirely: any;
  let accrualType: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccrualTypesActionTypes.RequestFailAccrualTypes:
      const error = (action as actions.RequestFailAccrualTypes).payload;
      return { ...state, error };

    case actions.AccrualTypesActionTypes.RequestGetAllAccrualTypes:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessGetAllAccrualTypes:
      accrualTypes = (action as actions.SuccessGetAllAccrualTypes).payload;
      return { ...state, accrualTypes };

    case actions.AccrualTypesActionTypes.RequestGetAccrualType:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessGetAccrualType:
      accrualType = (action as actions.SuccessGetAccrualType).payload;
      return { ...state, accrualType };

    case actions.AccrualTypesActionTypes.RequestPostAccrualType:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessPostAccrualType:
      accrualType = (action as actions.SuccessPostAccrualType).payload;
      return { ...state, accrualType };

    case actions.AccrualTypesActionTypes.RequestPutAccrualType:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessPutAccrualType:
      accrualType = (action as actions.SuccessPutAccrualType).payload;
      return { ...state, accrualType };

    case actions.AccrualTypesActionTypes.RequestDeleteAccrualType:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessDeleteAccrualType:
      accrualType = (action as actions.SuccessDeleteAccrualType).payload;
      return { ...state, accrualType };

    // case actions.AccrualTypesActionTypes.RequestBulkDeleteAccrualTypes:
    //   return { ...state, error: null };

    // case actions.AccrualTypesActionTypes.SuccessBulkDeleteAccrualTypes:
    //   accrualType = (action as actions.SuccessBulkDeleteAccrualTypes).payload;
    //   return { ...state, accrualType };

    case actions.AccrualTypesActionTypes.SetSelectedAccrualTypes:
      selectedIds = (action as actions.SetSelectedAccrualTypes).payload;
      return { ...state, selectedIds };

    case actions.AccrualTypesActionTypes.RequestGetEntirelyAccrualTypes:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessGetEntirelyAccrualTypes:
      accrualTypesEntirely = (action as actions.SuccessGetEntirelyAccrualTypes)
        .payload;
      return { ...state, accrualTypesEntirely };

    case actions.AccrualTypesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccrualTypesActionTypes.SuccessGetNew:
      accrualType = (action as actions.SuccessGetNew).payload;
      return { ...state, accrualType };

    default:
      return state;
  }
}
