import { Action } from '@ngrx/store';
import * as actions from './catechumens.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Catechumen, CatechumenResponse } from '../catechumen.model';

export interface State {
  catechumens: CatechumenResponse;
  catechumensEntirely: CatechumenResponse;
  catechumen: Catechumen;
  selectedIds: Catechumen[];

  error: RequestError;
}

export const initialState: State = {
  catechumens: null,
  catechumensEntirely: null,
  catechumen: null,
  selectedIds: null,

  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;
  let error: any;

  switch (action.type) {
    case actions.CatechumensActionTypes.RequestFail:
      error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.CatechumensActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, catechumens: successResult };

    case actions.CatechumensActionTypes.ClearGetAll:
      return {
        ...state,
        catechumens: { results: [] } as CatechumenResponse,
      };

    case actions.CatechumensActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, catechumen: successResult };

    case actions.CatechumensActionTypes.ClearGet:
      return { ...state, catechumen: null };

    case actions.CatechumensActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, catechumen: successResult };

    case actions.CatechumensActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, catechumen: successResult };

    case actions.CatechumensActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, catechumen: successResult };

    case actions.CatechumensActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, catechumen: successResult };

    case actions.CatechumensActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.CatechumensActionTypes.RequestFailSaveAndGenerateDocument:
      error = (action as actions.RequestFailSaveAndGenerateDocument).payload;
      return { ...state, error };

    case actions.CatechumensActionTypes.RequestSaveAndGenerateDocument:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessSaveAndGenerateDocument:
      successResult = (action as actions.SuccessSaveAndGenerateDocument)
        .payload;
      return { ...state, catechumen: successResult };

    case actions.CatechumensActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.CatechumensActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, catechumensEntirely: successResult };

    default:
      return state;
  }
}
