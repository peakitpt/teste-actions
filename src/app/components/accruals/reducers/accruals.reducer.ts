import { Action } from '@ngrx/store';
import * as actions from './accruals.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Accrual, AccrualResponse } from '../accrual.model';

export interface State {
  accrualsAccruals: AccrualResponse;
  accrualsAccrualsEntirely: AccrualResponse;
  accrual: Accrual;
  selectedIds: Accrual[];
  error: RequestError;
}

export const initialState: State = {
  accrualsAccruals: null,
  accrualsAccrualsEntirely: null,
  accrual: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accrualsAccruals: any;
  let accrualsAccrualsEntirely: any;
  let accrual: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccrualsActionTypes.RequestFailAccruals:
      const error = (action as actions.RequestFailAccruals).payload;
      return { ...state, error };

    case actions.AccrualsActionTypes.RequestGetAllAccruals:
      return { ...state, error: null };

    case actions.AccrualsActionTypes.SuccessGetAllAccruals:
      accrualsAccruals = (action as actions.SuccessGetAllAccruals).payload;
      return { ...state, accrualsAccruals };

    case actions.AccrualsActionTypes.RequestGetAccrual:
      return { ...state, error: null };

    case actions.AccrualsActionTypes.SuccessGetAccrual:
      accrual = (action as actions.SuccessGetAccrual).payload;
      return { ...state, accrual };

    case actions.AccrualsActionTypes.RequestPostAccrual:
      return { ...state, error: null };

    case actions.AccrualsActionTypes.SuccessPostAccrual:
      accrual = (action as actions.SuccessPostAccrual).payload;
      return { ...state, accrual };

    case actions.AccrualsActionTypes.RequestPutAccrual:
      return { ...state, error: null };

    case actions.AccrualsActionTypes.SuccessPutAccrual:
      accrual = (action as actions.SuccessPutAccrual).payload;
      return { ...state, accrual };

    case actions.AccrualsActionTypes.RequestDeleteAccrual:
      return { ...state, error: null };

    case actions.AccrualsActionTypes.SuccessDeleteAccrual:
      accrual = (action as actions.SuccessDeleteAccrual).payload;
      return { ...state, accrual };

    // case actions.AccrualsActionTypes.RequestBulkDeleteAccruals:
    //   return { ...state, error: null };

    // case actions.AccrualsActionTypes.SuccessBulkDeleteAccruals:
    //   accrual = (action as actions.SuccessBulkDeleteAccruals).payload;
    //   return { ...state, accrual };

    case actions.AccrualsActionTypes.SetSelectedAccruals:
      selectedIds = (action as actions.SetSelectedAccruals).payload;
      return { ...state, selectedIds };

    case actions.AccrualsActionTypes.RequestGetEntirelyAccruals:
      return { ...state, error: null };

    case actions.AccrualsActionTypes.SuccessGetEntirelyAccruals:
      accrualsAccrualsEntirely = (action as actions.SuccessGetEntirelyAccruals)
        .payload;
      return { ...state, accrualsAccrualsEntirely };

    case actions.AccrualsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccrualsActionTypes.SuccessGetNew:
      accrual = (action as actions.SuccessGetNew).payload;
      return { ...state, accrual };

    default:
      return state;
  }
}
