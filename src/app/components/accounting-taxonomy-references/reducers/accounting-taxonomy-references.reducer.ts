import { Action } from '@ngrx/store';
import * as actions from './accounting-taxonomy-references.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingTaxonomyReference,
  AccountingTaxonomyReferenceResponse,
} from '../accounting-taxonomy-reference.model';

export interface State {
  accountingTaxonomyReferences: AccountingTaxonomyReferenceResponse;
  accountingTaxonomyReferencesEntirely: AccountingTaxonomyReferenceResponse;
  accountingTaxonomyReference: AccountingTaxonomyReference;
  selectedIds: AccountingTaxonomyReference[];
  error: RequestError;
}

export const initialState: State = {
  accountingTaxonomyReferences: null,
  accountingTaxonomyReferencesEntirely: null,
  accountingTaxonomyReference: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingTaxonomyReferences: any;
  let accountingTaxonomyReferencesEntirely: any;
  let accountingTaxonomyReference: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccountingTaxonomyReferencesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessGetAll:
      accountingTaxonomyReferences = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingTaxonomyReferences };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessGet:
      accountingTaxonomyReference = (action as actions.SuccessGet).payload;
      return { ...state, accountingTaxonomyReference };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessPost:
      accountingTaxonomyReference = (action as actions.SuccessPost).payload;
      return { ...state, accountingTaxonomyReference };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessPut:
      accountingTaxonomyReference = (action as actions.SuccessPut).payload;
      return { ...state, accountingTaxonomyReference };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessDelete:
      accountingTaxonomyReference = (action as actions.SuccessDelete).payload;
      return { ...state, accountingTaxonomyReference };

    // case actions.AccountingTaxonomyReferencesActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingTaxonomyReferencesActionTypes.SuccessBulkDelete:
    //   accountingTaxonomyReference = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingTaxonomyReference };

    case actions.AccountingTaxonomyReferencesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessGetEntirely:
      accountingTaxonomyReferencesEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingTaxonomyReferencesEntirely };

    case actions.AccountingTaxonomyReferencesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingTaxonomyReferencesActionTypes.SuccessGetNew:
      accountingTaxonomyReference = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingTaxonomyReference };

    default:
      return state;
  }
}
