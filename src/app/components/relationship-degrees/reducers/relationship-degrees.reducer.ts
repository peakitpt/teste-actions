import { Action } from '@ngrx/store';
import * as actions from './relationship-degrees.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  RelationshipDegree,
  RelationshipDegreeResponse,
} from '../relationship-degree.model';

export interface State {
  relationshipDegrees: RelationshipDegreeResponse;
  relationshipDegree: RelationshipDegree;
  selectedIds: RelationshipDegree[];
  error: RequestError;
}

export const initialState: State = {
  relationshipDegrees: null,
  relationshipDegree: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;

  switch (action.type) {
    case actions.RelationshipDegreesActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.RelationshipDegreesActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.RelationshipDegreesActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, relationshipDegrees: successResult };

    case actions.RelationshipDegreesActionTypes.ClearGetAll:
      return {
        ...state,
        relationshipDegrees: { results: [] } as RelationshipDegreeResponse,
      };

    case actions.RelationshipDegreesActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.RelationshipDegreesActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, relationshipDegree: successResult };

    case actions.RelationshipDegreesActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.RelationshipDegreesActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, relationshipDegree: successResult };

    case actions.RelationshipDegreesActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.RelationshipDegreesActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, relationshipDegree: successResult };

    case actions.RelationshipDegreesActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.RelationshipDegreesActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, relationshipDegree: successResult };

    case actions.RelationshipDegreesActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.RelationshipDegreesActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, relationshipDegree: successResult };

    case actions.RelationshipDegreesActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    default:
      return state;
  }
}
