import { SelectedModalRow } from './../../../shared/shared.model';
import { Action } from '@ngrx/store';
import * as actions from './contents.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Content, ContentResponse } from '../content.model';

export interface State {
  contents: ContentResponse;
  contentsEntirely: ContentResponse;
  content: Content;
  selectedIds: Content[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
  contentImage: any;
  contentFile: any;
}

export const initialState: State = {
  contents: null,
  contentsEntirely: null,
  content: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
  contentImage: null,
  contentFile: null
};

export function reducer(state = initialState, action: Action): State {
  let contents: any;
  let contentsEntirely: any;
  let content: any;
  let selectedIds: any;
  let modalRowSelect: any;
  let contentImage: any;
  let contentFile: any;

  switch (action.type) {
    case actions.ContentsActionTypes.RequestFailContents:
      const error = (action as actions.RequestFailContents).payload;
      return { ...state, error };

    case actions.ContentsActionTypes.RequestGetAllContents:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessGetAllContents:
      contents = (action as actions.SuccessGetAllContents).payload;
      return { ...state, contents };

    case actions.ContentsActionTypes.RequestGetContent:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessGetContent:
      content = (action as actions.SuccessGetContent).payload;
      return { ...state, content };

    case actions.ContentsActionTypes.RequestPostContent:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessPostContent:
      content = (action as actions.SuccessPostContent).payload;
      return { ...state, content };

    case actions.ContentsActionTypes.RequestPostContentImage:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessPostContentImage:
      contentImage = (action as actions.SuccessPostContentImage).payload;
      return { ...state, content };

    case actions.ContentsActionTypes.RequestPostContentFile:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessPostContentFile:
      contentFile = (action as actions.SuccessPostContentFile).payload;
      return { ...state, contentFile };

    case actions.ContentsActionTypes.RequestPutContent:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessPutContent:
      content = (action as actions.SuccessPutContent).payload;
      return { ...state, content };

    case actions.ContentsActionTypes.RequestDeleteContent:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessDeleteContent:
      content = (action as actions.SuccessDeleteContent).payload;
      return { ...state, content };

    // case actions.ContentsActionTypes.RequestBulkDeleteContents:
    //   return { ...state, error: null };

    // case actions.ContentsActionTypes.SuccessBulkDeleteContents:
    //   content = (action as actions.SuccessBulkDeleteContents).payload;
    //   return { ...state, content };

    case actions.ContentsActionTypes.RequestSendTestContent:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessSendTestContent:
      content = (action as actions.SuccessSendTestContent).payload;
      return { ...state, content };

    case actions.ContentsActionTypes.SetSelectedContents:
      selectedIds = (action as actions.SetSelectedContents).payload;
      return { ...state, selectedIds };

    case actions.ContentsActionTypes.SetModalSelectContent:
      modalRowSelect = (action as actions.SetModalSelectContent).payload;
      return { ...state, modalRowSelect };

    case actions.ContentsActionTypes.RequestGetEntirelyContents:
      return { ...state, error: null };

    case actions.ContentsActionTypes.SuccessGetEntirelyContents:
      contentsEntirely = (action as actions.SuccessGetEntirelyContents).payload;
      return { ...state, contentsEntirely };

    default:
      return state;
  }
}
