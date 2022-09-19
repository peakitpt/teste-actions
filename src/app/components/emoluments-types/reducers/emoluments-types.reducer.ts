import { Action } from '@ngrx/store';
import * as actions from './emoluments-types.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EmolumentType, EmolumentTypeResponse } from '../emoluments-type.model';

export interface State {
  emolumentsTypes: EmolumentTypeResponse;
  emolumentsTypesEntirely: EmolumentTypeResponse;
  numeration: EmolumentType;
  selectedIds: EmolumentType[];
  error: RequestError;
}

export const initialState: State = {
  emolumentsTypes: null,
  emolumentsTypesEntirely: null,
  numeration: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let emolumentsTypes: any;
  let emolumentsTypesEntirely: any;
  let numeration: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.EmolumentsTypesActionTypes.RequestFailEmolumentsTypes:
      const error = (action as actions.RequestFailEmolumentsTypes).payload;
      return { ...state, error };

    case actions.EmolumentsTypesActionTypes.RequestGetAllEmolumentsTypes:
      return { ...state, error: null };

    case actions.EmolumentsTypesActionTypes.SuccessGetAllEmolumentsTypes:
      emolumentsTypes = (action as actions.SuccessGetAllEmolumentsTypes)
        .payload;
      return { ...state, emolumentsTypes };

    case actions.EmolumentsTypesActionTypes.RequestGetEmolumentType:
      return { ...state, error: null };

    case actions.EmolumentsTypesActionTypes.SuccessGetEmolumentType:
      numeration = (action as actions.SuccessGetEmolumentType).payload;
      return { ...state, numeration };

    case actions.EmolumentsTypesActionTypes.RequestPostEmolumentType:
      return { ...state, error: null };

    case actions.EmolumentsTypesActionTypes.SuccessPostEmolumentType:
      numeration = (action as actions.SuccessPostEmolumentType).payload;
      return { ...state, numeration };

    case actions.EmolumentsTypesActionTypes.RequestPutEmolumentType:
      return { ...state, error: null };

    case actions.EmolumentsTypesActionTypes.SuccessPutEmolumentType:
      numeration = (action as actions.SuccessPutEmolumentType).payload;
      return { ...state, numeration };

    case actions.EmolumentsTypesActionTypes.RequestDeleteEmolumentType:
      return { ...state, error: null };

    case actions.EmolumentsTypesActionTypes.SuccessDeleteEmolumentType:
      numeration = (action as actions.SuccessDeleteEmolumentType).payload;
      return { ...state, numeration };

    // case actions.EmolumentsTypesActionTypes.RequestBulkDeleteEmolumentsTypes:
    //   return { ...state, error: null };

    // case actions.EmolumentsTypesActionTypes.SuccessBulkDeleteEmolumentsTypes:
    //   numeration = (action as actions.SuccessBulkDeleteEmolumentsTypes).payload;
    //   return { ...state, numeration };

    case actions.EmolumentsTypesActionTypes.SetSelectedEmolumentsTypes:
      selectedIds = (action as actions.SetSelectedEmolumentsTypes).payload;
      return { ...state, selectedIds };

    case actions.EmolumentsTypesActionTypes.RequestGetEntirelyEmolumentsTypes:
      return { ...state, error: null };

    case actions.EmolumentsTypesActionTypes.SuccessGetEntirelyEmolumentsTypes:
      emolumentsTypesEntirely = (action as actions.SuccessGetEntirelyEmolumentsTypes)
        .payload;
      return { ...state, emolumentsTypesEntirely };

    default:
      return state;
  }
}
