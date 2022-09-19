import { Action } from '@ngrx/store';
import * as actions from './families.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Family, FamilyResponse } from '../family.model';

export interface State {
  families: FamilyResponse;
  familiesEntirely: FamilyResponse;
  family: Family;
  selectedIds: Family[];
  error: RequestError;
  entityFamilies: Array<{ id: number; name: string }>;
}

export const initialState: State = {
  families: null,
  familiesEntirely: null,
  family: null,
  selectedIds: null,
  error: null,
  entityFamilies: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;

  switch (action.type) {
    case actions.FamiliesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.FamiliesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, families: successResult };

    case actions.FamiliesActionTypes.ClearGetAll:
      return { ...state, families: { results: [] } as FamilyResponse };

    case actions.FamiliesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, family: successResult };

    case actions.FamiliesActionTypes.ClearGet:
      return { ...state, family: null };

    case actions.FamiliesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, family: successResult };

    case actions.FamiliesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, family: successResult };

    case actions.FamiliesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, family: successResult };

    case actions.FamiliesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, family: successResult };

    case actions.FamiliesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.FamiliesActionTypes.RequestGetEntirelyFamilies:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessGetEntirelyFamilies:
      successResult = (action as actions.SuccessGetEntirelyFamilies).payload;
      return { ...state, familiesEntirely: successResult };

    case actions.FamiliesActionTypes.RequestGetEntityFamilies:
      return { ...state, error: null };

    case actions.FamiliesActionTypes.SuccessGetEntityFamilies:
      successResult = (action as actions.SuccessGetEntityFamilies).payload;
      return { ...state, entityFamilies: successResult };

    default:
      return state;
  }
}
