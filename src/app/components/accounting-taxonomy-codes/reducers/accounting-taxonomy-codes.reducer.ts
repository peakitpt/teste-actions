import { Action } from '@ngrx/store';
import * as actions from './accounting-taxonomy-codes.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTaxonomyCode,
  AccountingTaxonomyCodeResponse,
} from '../accounting-taxonomy-code.model';

export interface State {
  accountingTaxonomyCodes: AccountingTaxonomyCodeResponse;
  accountingTaxonomyCodesEntirely: AccountingTaxonomyCodeResponse;
  accountingTaxonomyCode: AccountingTaxonomyCode;
  selectedIds: AccountingTaxonomyCode[];
  error: RequestError;
}

export const initialState: State = {
  accountingTaxonomyCodes: null,
  accountingTaxonomyCodesEntirely: null,
  accountingTaxonomyCode: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTaxonomyCodes: any;
  let accountingTaxonomyCodesEntirely: any;
  let accountingTaxonomyCode: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccountingTaxonomyCodesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTaxonomyCodesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessGetAll:
      accountingTaxonomyCodes = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTaxonomyCodes };

    case actions.AccountingTaxonomyCodesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessGet:
      accountingTaxonomyCode = (action as actions.SuccessGet).payload;
      return { ...state, accountingTaxonomyCode };

    case actions.AccountingTaxonomyCodesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessPost:
      accountingTaxonomyCode = (action as actions.SuccessPost).payload;
      return { ...state, accountingTaxonomyCode };

    case actions.AccountingTaxonomyCodesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessPut:
      accountingTaxonomyCode = (action as actions.SuccessPut).payload;
      return { ...state, accountingTaxonomyCode };

    case actions.AccountingTaxonomyCodesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessDelete:
      accountingTaxonomyCode = (action as actions.SuccessDelete).payload;
      return { ...state, accountingTaxonomyCode };

    // case actions.AccountingTaxonomyCodesActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingTaxonomyCodesActionTypes.SuccessBulkDelete:
    //   accountingTaxonomyCode = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingTaxonomyCode };

    case actions.AccountingTaxonomyCodesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingTaxonomyCodesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessGetEntirely:
      accountingTaxonomyCodesEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingTaxonomyCodesEntirely };

    case actions.AccountingTaxonomyCodesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessGetNew:
      accountingTaxonomyCode = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingTaxonomyCode };

    default:
      return state;
  }
}
