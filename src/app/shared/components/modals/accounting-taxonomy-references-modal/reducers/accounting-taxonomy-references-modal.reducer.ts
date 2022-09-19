import { Action } from '@ngrx/store';
import * as actions from './accounting-taxonomy-references-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccountingTaxonomyReferencesResponse } from '../accounting-taxonomy-references-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingTaxonomyReferences: AccountingTaxonomyReferencesResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingTaxonomyReferences: {
    results: [],
  } as AccountingTaxonomyReferencesResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTaxonomyReferences: AccountingTaxonomyReferencesResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingTaxonomyReferencesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessGetAll:
      accountingTaxonomyReferences = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTaxonomyReferences };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
