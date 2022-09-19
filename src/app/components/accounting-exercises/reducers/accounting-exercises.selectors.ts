import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './accounting-exercises.reducer';
import {
  AccountingExerciseResponse,
  AccountingExercise,
} from '../accounting-exercise.model';

export const getAccountingExercises = createFeatureSelector(
  'accounting-exercises'
);

export const getError = createSelector(
  getAccountingExercises,
  (state: State) => state.error
);

export const getAccountingExercisesList = createSelector(
  getAccountingExercises,
  (state: State) => {
    return state.accountingExercises as AccountingExerciseResponse;
  }
);

export const getAccountingExercisesListEntirely = createSelector(
  getAccountingExercises,
  (state: State) => {
    return state.accountingExercisesEntirely as AccountingExerciseResponse;
  }
);

export const getAccountingExercise = createSelector(
  getAccountingExercises,
  (state: State) => {
    return state.accountingExercise as AccountingExercise;
  }
);

export const getSelectedAccountingExercises = createSelector(
  getAccountingExercises,
  (state: State) => {
    return state.selectedIds as AccountingExercise[];
  }
);
