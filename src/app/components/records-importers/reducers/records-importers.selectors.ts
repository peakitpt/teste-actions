import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './records-importers.reducer';
import { RecordsImporter } from '../records-importer.model';

export const getRecordsImporters = createFeatureSelector('records-importers');

export const getError = createSelector(
  getRecordsImporters,
  (state: State) => state.error
);

export const getRecordsImporter = createSelector(
  getRecordsImporters,
  (state: State) => {
    return state.recordsImporter as RecordsImporter;
  }
);

export const getSelectedRecordsImporters = createSelector(
  getRecordsImporters,
  (state: State) => {
    return state.selectedIds as RecordsImporter[];
  }
);
