import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './current-accounts.reducer';
import {
  CurrentAccountResponse,
  CurrentAccount,
  CurrentAccountReceipt,
} from '../current-account.model';

export const getCurrentAccounts = createFeatureSelector('current-accounts');

export const getError = createSelector(
  getCurrentAccounts,
  (state: State) => state.error
);

export const getCurrentAccountsList = createSelector(
  getCurrentAccounts,
  (state: State) => {
    return state.currentAccounts as CurrentAccountResponse;
  }
);

export const getCurrentAccountsListEntirely = createSelector(
  getCurrentAccounts,
  (state: State) => {
    return state.currentAccountsEntirely as CurrentAccountResponse;
  }
);

export const getCurrentAccount = createSelector(
  getCurrentAccounts,
  (state: State) => {
    return state.currentAccount as CurrentAccount;
  }
);

export const getSelectedCurrentAccounts = createSelector(
  getCurrentAccounts,
  (state: State) => {
    return state.selectedIds as CurrentAccount[];
  }
);

export const getCurrentAccountsReceipts = createSelector(
  getCurrentAccounts,
  (state: State) => {
    return state.currentAccountsReceipts as CurrentAccountResponse;
  }
);

export const getCurrentAccountReceipt = createSelector(
  getCurrentAccounts,
  (state: State) => {
    return state.currentAccountReceipt as CurrentAccountReceipt;
  }
);
