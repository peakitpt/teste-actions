import { Action } from '@ngrx/store';
import * as actions from './emoluments.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Emolument, EmolumentResponse } from '../emolument.model';

export interface State {
  emoluments: EmolumentResponse;
  emolumentsEntirely: EmolumentResponse;
  numeration: Emolument;
  selectedIds: Emolument[];
  error: RequestError;
}

export const initialState: State = {
  emoluments: null,
  emolumentsEntirely: null,
  numeration: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let emoluments: any;
  let emolumentsEntirely: any;
  let numeration: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.EmolumentsActionTypes.RequestFailEmoluments:
      const error = (action as actions.RequestFailEmoluments).payload;
      return { ...state, error };

    case actions.EmolumentsActionTypes.RequestGetAllEmoluments:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessGetAllEmoluments:
      emoluments = (action as actions.SuccessGetAllEmoluments).payload;
      return { ...state, emoluments };

    case actions.EmolumentsActionTypes.RequestGetEmolument:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessGetEmolument:
      numeration = (action as actions.SuccessGetEmolument).payload;
      return { ...state, numeration };

    case actions.EmolumentsActionTypes.RequestPostEmolument:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessPostEmolument:
      numeration = (action as actions.SuccessPostEmolument).payload;
      return { ...state, numeration };

    case actions.EmolumentsActionTypes.RequestPutEmolument:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessPutEmolument:
      numeration = (action as actions.SuccessPutEmolument).payload;
      return { ...state, numeration };

    case actions.EmolumentsActionTypes.RequestDeleteEmolument:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessDeleteEmolument:
      numeration = (action as actions.SuccessDeleteEmolument).payload;
      return { ...state, numeration };

    // case actions.EmolumentsActionTypes.RequestBulkDeleteEmoluments:
    //   return { ...state, error: null };

    // case actions.EmolumentsActionTypes.SuccessBulkDeleteEmoluments:
    //   numeration = (action as actions.SuccessBulkDeleteEmoluments).payload;
    //   return { ...state, numeration };

    case actions.EmolumentsActionTypes.SetSelectedEmoluments:
      selectedIds = (action as actions.SetSelectedEmoluments).payload;
      return { ...state, selectedIds };

    case actions.EmolumentsActionTypes.RequestGetEntirelyEmoluments:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessGetEntirelyEmoluments:
      emolumentsEntirely = (action as actions.SuccessGetEntirelyEmoluments)
        .payload;
      return { ...state, emolumentsEntirely };

    case actions.EmolumentsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.EmolumentsActionTypes.SuccessGetNew:
      numeration = (action as actions.SuccessGetNew).payload;
      return { ...state, numeration };

    default:
      return state;
  }
}
