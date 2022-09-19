import { Action } from '@ngrx/store';
import * as actions from './accounting-taxonomy-codes-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccountingTaxonomyCodesResponse } from '../accounting-taxonomy-codes-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingTaxonomyCodes: AccountingTaxonomyCodesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingTaxonomyCodes: {
    results: [],
  } as AccountingTaxonomyCodesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTaxonomyCodes: AccountingTaxonomyCodesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingTaxonomyCodesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTaxonomyCodesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessGetAll:
      accountingTaxonomyCodes = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTaxonomyCodes };

    case actions.AccountingTaxonomyCodesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.AccountingTaxonomyCodesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
