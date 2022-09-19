import { Action } from '@ngrx/store';
import * as actions from './mass-intentions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { MassIntention, MassIntentionResponse } from '../mass-intention.model';

export interface State {
  massIntentions: MassIntentionResponse;
  massIntentionsEntirely: MassIntentionResponse;
  massIntention: MassIntention;
  selectedIds: MassIntention[];

  error: RequestError;
}

export const initialState: State = {
  massIntentions: null,
  massIntentionsEntirely: null,
  massIntention: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.MassIntentionsActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.MassIntentionsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, massIntentions: successResult };

    case actions.MassIntentionsActionTypes.ClearGetAll:
      return {
        ...state,
        massIntentions: { results: [] } as MassIntentionResponse,
      };

    case actions.MassIntentionsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, massIntention: successResult };

    case actions.MassIntentionsActionTypes.ClearGet:
      return { ...state, massIntention: null };

    case actions.MassIntentionsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, massIntention: successResult };

    case actions.MassIntentionsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, massIntention: successResult };

    case actions.MassIntentionsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, massIntention: successResult };

    case actions.MassIntentionsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, massIntention: successResult };

    case actions.MassIntentionsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.MassIntentionsActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.MassIntentionsActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, massIntention: successResult };

    case actions.MassIntentionsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.MassIntentionsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, massIntentionsEntirely: successResult };

    default:
      return state;
  }
}
