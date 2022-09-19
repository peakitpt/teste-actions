import { Action } from '@ngrx/store';
import * as actions from './readers.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityReader } from '../../mecs/mecs.model';
import { ReaderResponse } from '../readers.model';

export interface State {
  readers: ReaderResponse;
  readersEntirely: ReaderResponse;
  reader: EntityReader;
  selectedIds: EntityReader[];
  error: RequestError;
}

export const initialState: State = {
  readers: null,
  readersEntirely: null,
  reader: null,
  selectedIds: null,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  let readers: any;
  let readersEntirely: any;
  let reader: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.ReadersActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ReadersActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ReadersActionTypes.SuccessGetAll:
      readers = (action as actions.SuccessGetAll).payload;
      return { ...state, readers };

    case actions.ReadersActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.ReadersActionTypes.SuccessGet:
      reader = (action as actions.SuccessGet).payload;
      return { ...state, reader };

    case actions.ReadersActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.ReadersActionTypes.SuccessPost:
      reader = (action as actions.SuccessPost).payload;
      return { ...state, reader };

    case actions.ReadersActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.ReadersActionTypes.SuccessPut:
      reader = (action as actions.SuccessPut).payload;
      return { ...state, reader };

    case actions.ReadersActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.ReadersActionTypes.SuccessDelete:
      reader = (action as actions.SuccessDelete).payload;
      return { ...state, reader };

    case actions.ReadersActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.ReadersActionTypes.SuccessBulkDelete:
      reader = (action as actions.SuccessBulkDelete).payload;
      return { ...state, reader };

    case actions.ReadersActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.ReadersActionTypes.RequestGetEntirelyReaders:
      return { ...state, error: null };

    case actions.ReadersActionTypes.SuccessGetEntirelyReaders:
      readersEntirely = (action as actions.SuccessGetEntirelyReaders).payload;
      return { ...state, readersEntirely };

    default:
      return state;
  }
}
