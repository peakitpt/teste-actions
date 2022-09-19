import { Action } from '@ngrx/store';
import * as actions from './accounting-exercises.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingExercise,
  AccountingExerciseResponse,
} from '../accounting-exercise.model';

export interface State {
  accountingExercises: AccountingExerciseResponse;
  accountingExercisesEntirely: AccountingExerciseResponse;
  accountingExercise: AccountingExercise;
  selectedIds: AccountingExercise[];
  error: RequestError;
}

export const initialState: State = {
  accountingExercises: null,
  accountingExercisesEntirely: null,
  accountingExercise: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingExercises: any;
  let accountingExercisesEntirely: any;
  let accountingExercise: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.AccountingExercisesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingExercisesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingExercisesActionTypes.SuccessGetAll:
      accountingExercises = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingExercises };

    case actions.AccountingExercisesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingExercisesActionTypes.SuccessGet:
      accountingExercise = (action as actions.SuccessGet).payload;
      return { ...state, accountingExercise };

    case actions.AccountingExercisesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingExercisesActionTypes.SuccessPost:
      accountingExercise = (action as actions.SuccessPost).payload;
      return { ...state, accountingExercise };

    case actions.AccountingExercisesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingExercisesActionTypes.SuccessPut:
      accountingExercise = (action as actions.SuccessPut).payload;
      return { ...state, accountingExercise };

    case actions.AccountingExercisesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingExercisesActionTypes.SuccessDelete:
      accountingExercise = (action as actions.SuccessDelete).payload;
      return { ...state, accountingExercise };

    // case actions.AccountingExercisesActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingExercisesActionTypes.SuccessBulkDelete:
    //   accountingExercise = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingExercise };

    case actions.AccountingExercisesActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingExercisesActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingExercisesActionTypes.SuccessGetEntirely:
      accountingExercisesEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingExercisesEntirely };

    case actions.AccountingExercisesActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingExercisesActionTypes.SuccessGetNew:
      accountingExercise = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingExercise };

    default:
      return state;
  }
}
