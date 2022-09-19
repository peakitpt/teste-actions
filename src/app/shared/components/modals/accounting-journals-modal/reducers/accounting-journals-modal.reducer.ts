import { Action } from '@ngrx/store';
import * as actions from './accounting-journals-modal.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { AccountingJournalsResponse } from '../accounting-journals-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingJournals: AccountingJournalsResponse;
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingJournals: {
    results: [],
  } as AccountingJournalsResponse,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingJournals: AccountingJournalsResponse;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingJournalsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingJournalsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessGetAll:
      accountingJournals = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingJournals };

    case actions.AccountingJournalsActionTypes.RequestSetSelected:
      return { ...state, error: null };

    case actions.AccountingJournalsActionTypes.SuccessSetSelected:
      modalRowSelect = (action as actions.SuccessSetSelected).payload;
      return { ...state, modalRowSelect };

    default:
      return state;
  }
}
