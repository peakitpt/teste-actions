import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accruals-processments.reducer';
import {
  AccrualsProcessmentResponse,
  AccrualsProcessment,
} from '../accruals-processment.model';

export const getAccrualsProcessments = createFeatureSelector(
  'accruals-processments'
);

export const getError = createSelector(
  getAccrualsProcessments,
  (state: State) => state.error
);

export const getAccrualsProcessmentsList = createSelector(
  getAccrualsProcessments,
  (state: State) => {
    return state.accrualsProcessments as AccrualsProcessmentResponse;
  }
);

export const getAccrualsProcessmentsListEntirely = createSelector(
  getAccrualsProcessments,
  (state: State) => {
    return state.accrualsProcessmentsEntirely as AccrualsProcessmentResponse;
  }
);

export const getAccrualsProcessment = createSelector(
  getAccrualsProcessments,
  (state: State) => {
    return state.accrual as AccrualsProcessment;
  }
);

export const getSelectedAccrualsProcessments = createSelector(
  getAccrualsProcessments,
  (state: State) => {
    return state.selectedIds as AccrualsProcessment[];
  }
);
