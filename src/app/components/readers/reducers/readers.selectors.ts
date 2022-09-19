import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './readers.reducer';

export const getReaders = createFeatureSelector('readers');

export const getError = createSelector(
  getReaders,
  (state: State) => state.error
);

export const getReadersList = createSelector(getReaders, (state: State) => {
  return state.readers;
});

export const getReadersListEntirely = createSelector(
  getReaders,
  (state: State) => {
    return state.readersEntirely;
  }
);

export const getReader = createSelector(getReaders, (state: State) => {
  return state.reader;
});

export const getSelectedReaders = createSelector(getReaders, (state: State) => {
  return state.selectedIds;
});
