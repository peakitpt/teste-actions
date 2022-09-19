import { Action } from '@ngrx/store';
import * as actions from './module-documentation-links.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  ModuleDocumentationLink,
  ModuleDocumentationLinkResponse,
} from '../module-documentation-link.model';

export interface State {
  moduleDocumentationLinks: ModuleDocumentationLinkResponse;
  moduleDocumentationLinksEntirely: ModuleDocumentationLinkResponse;
  moduleDocumentationLink: ModuleDocumentationLink;
  selectedIds: ModuleDocumentationLink[];
  error: RequestError;
}

export const initialState: State = {
  moduleDocumentationLinks: null,
  moduleDocumentationLinksEntirely: null,
  moduleDocumentationLink: null,
  selectedIds: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let moduleDocumentationLinks: any;
  let moduleDocumentationLinksEntirely: any;
  let moduleDocumentationLink: any;
  let selectedIds: any;

  switch (action.type) {
    case actions.ModuleDocumentationLinksActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.ModuleDocumentationLinksActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.ModuleDocumentationLinksActionTypes.SuccessGetAll:
      moduleDocumentationLinks = (action as actions.SuccessGetAll).payload;
      return { ...state, moduleDocumentationLinks };

    case actions.ModuleDocumentationLinksActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.ModuleDocumentationLinksActionTypes.SuccessGet:
      moduleDocumentationLink = (action as actions.SuccessGet).payload;
      return { ...state, moduleDocumentationLink };

    case actions.ModuleDocumentationLinksActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.ModuleDocumentationLinksActionTypes.SuccessPost:
      moduleDocumentationLink = (action as actions.SuccessPost).payload;
      return { ...state, moduleDocumentationLink };

    case actions.ModuleDocumentationLinksActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.ModuleDocumentationLinksActionTypes.SuccessPut:
      moduleDocumentationLink = (action as actions.SuccessPut).payload;
      return { ...state, moduleDocumentationLink };

    case actions.ModuleDocumentationLinksActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.ModuleDocumentationLinksActionTypes.SuccessDelete:
      moduleDocumentationLink = (action as actions.SuccessDelete).payload;
      return { ...state, moduleDocumentationLink };

    // case actions.ModuleDocumentationLinksActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.ModuleDocumentationLinksActionTypes.SuccessBulkDelete:
    //   moduleDocumentationLink = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, moduleDocumentationLink };

    case actions.ModuleDocumentationLinksActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.ModuleDocumentationLinksActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.ModuleDocumentationLinksActionTypes.SuccessGetEntirely:
      moduleDocumentationLinksEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, moduleDocumentationLinksEntirely };

    case actions.ModuleDocumentationLinksActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.ModuleDocumentationLinksActionTypes.SuccessGetNew:
      moduleDocumentationLink = (action as actions.SuccessGetNew).payload;
      return { ...state, moduleDocumentationLink };

    default:
      return state;
  }
}
