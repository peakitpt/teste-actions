import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-functions-modal.reducer';
import { CuriaFunctionsResponse } from '../curia-functions-modal.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getFeature = createFeatureSelector('curia-functions-modal');

export const getError = createSelector(
  getFeature,
  (state: State) => state.error
);

export const getCuriaFunctions = createSelector(getFeature, (state: State) => {
  return state.curiaFunctions as CuriaFunctionsResponse;
});

export const getCuriaFunctionsSelected = createSelector(
  getFeature,
  (state: State) => {
    return state.modalRowSelect as SelectedModalRow;
  }
);
