import { Action } from '@ngrx/store';
import * as actions from './accounting-journals.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingJournal,
  AccountingJournalResponse,
} from '../accounting-journal.model';

export interface State {
  accountingJournals: AccountingJournalResponse;
  accountingJournal: AccountingJournal;
  selectedIds: AccountingJournal[];
  error: RequestError;
}

export const initialState: State = {
  accountingJournals: null,
  accountingJournal: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;

  switch (action.type) {
    case actions.AccountingJournalsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingJournalsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingJournals: successResult };

    case actions.AccountingJournalsActionTypes.ClearGetAll:
      return {
        ...state,
        accountingJournals: { results: [] } as AccountingJournalResponse,
      };

    case actions.AccountingJournalsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, accountingJournal: successResult };

    case actions.AccountingJournalsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, accountingJournal: successResult };

    case actions.AccountingJournalsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, accountingJournal: successResult };

    case actions.AccountingJournalsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, accountingJournal: successResult };

    case actions.AccountingJournalsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, accountingJournal: successResult };

    case actions.AccountingJournalsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.AccountingJournalsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessGetNew:
      successResult = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingJournal: successResult };

    default:
      return state;
  }
}
