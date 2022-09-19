import { Action } from '@ngrx/store';
import * as actions from './records-importers.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { RecordsImporter } from '../records-importer.model';

export interface State {
  recordsImporter: RecordsImporter;
  selectedIds: RecordsImporter[];
  error: RequestError;
  file: any;
}

export const initialState: State = {
  recordsImporter: null,
  selectedIds: null,
  error: null,
  file: null,
};

export function reducer(state = initialState, action: Action): State {
  let recordsImporter: any;
  let selectedIds: any;
  let file: any;

  switch (action.type) {
    case actions.RecordsImportersActionTypes.RequestFailRecordsImporters:
      const error = (action as actions.RequestFailRecordsImporters).payload;
      return { ...state, error };

    case actions.RecordsImportersActionTypes.RequestGetRecordsImporter:
      return { ...state, error: null };

    case actions.RecordsImportersActionTypes.SuccessGetRecordsImporter:
      recordsImporter = (action as actions.SuccessGetRecordsImporter).payload;
      return { ...state, recordsImporter };

    case actions.RecordsImportersActionTypes.RequestPostRecordsImporter:
      return { ...state, error: null };

    case actions.RecordsImportersActionTypes.SuccessPostRecordsImporter:
      recordsImporter = (action as actions.SuccessPostRecordsImporter).payload;
      return { ...state, recordsImporter };

    case actions.RecordsImportersActionTypes.RequestPutRecordsImporter:
      return { ...state, error: null };

    case actions.RecordsImportersActionTypes.SuccessPutRecordsImporter:
      recordsImporter = (action as actions.SuccessPutRecordsImporter).payload;
      return { ...state, recordsImporter };

    case actions.RecordsImportersActionTypes.RequestDeleteRecordsImporter:
      return { ...state, error: null };

    case actions.RecordsImportersActionTypes.SuccessDeleteRecordsImporter:
      recordsImporter = (action as actions.SuccessDeleteRecordsImporter)
        .payload;
      return { ...state, recordsImporter };

    case actions.RecordsImportersActionTypes.SetSelectedRecordsImporters:
      selectedIds = (action as actions.SetSelectedRecordsImporters).payload;
      return { ...state, selectedIds };

    case actions.RecordsImportersActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.RecordsImportersActionTypes.SuccessGetNew:
      recordsImporter = (action as actions.SuccessGetNew).payload;
      return { ...state, recordsImporter };

    case actions.RecordsImportersActionTypes.RequestPostUploadFile:
      return { ...state, error: null };

    case actions.RecordsImportersActionTypes.SuccessPostUploadFile:
      file = (action as actions.SuccessPostUploadFile).payload;
      return { ...state, file };

    default:
      return state;
  }
}
