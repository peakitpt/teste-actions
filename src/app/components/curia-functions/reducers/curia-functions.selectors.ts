import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-functions.reducer';
import { CuriaFunctionResponse, CuriaFunction } from '../curia-function.model';

export const getCuriaFunctions = createFeatureSelector('curia-functions');

export const getError = createSelector(
  getCuriaFunctions,
  (state: State) => state.error
);

export const getCuriaFunctionsList = createSelector(
  getCuriaFunctions,
  (state: State) => {
    return state.curiaFunctions as CuriaFunctionResponse;
  }
);

export const getCuriaFunctionsListEntirely = createSelector(
  getCuriaFunctions,
  (state: State) => {
    return state.curiaFunctionsEntirely as CuriaFunctionResponse;
  }
);

export const getCuriaFunction = createSelector(
  getCuriaFunctions,
  (state: State) => {
    return state.curiaFunction as CuriaFunction;
  }
);

export const getSelectedCuriaFunctions = createSelector(
  getCuriaFunctions,
  (state: State) => {
    return state.selectedIds as CuriaFunction[];
  }
);
