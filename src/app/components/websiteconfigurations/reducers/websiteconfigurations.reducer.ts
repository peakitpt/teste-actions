import { Action } from '@ngrx/store';
import * as actions from './websiteconfigurations.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Websiteconfiguration } from '../websiteconfiguration.model';

export interface State {
  websiteconfiguration: Websiteconfiguration;
  selectedIds: Websiteconfiguration[];
  error: RequestError;
  headerImage: any;
}

export const initialState: State = {
  websiteconfiguration: null,
  selectedIds: null,
  error: null,
  headerImage: null,
};

export function reducer(state = initialState, action: Action): State {
  let websiteconfiguration: any;
  let selectedIds: any;
  let headerImage: any;

  switch (action.type) {
    case actions.WebsiteconfigurationsActionTypes
      .RequestFailWebsiteconfigurations:
      const error = (action as actions.RequestFailWebsiteconfigurations)
        .payload;
      return { ...state, error };

    case actions.WebsiteconfigurationsActionTypes
      .RequestGetWebsiteconfiguration:
      return { ...state, error: null };

    case actions.WebsiteconfigurationsActionTypes
      .SuccessGetWebsiteconfiguration:
      websiteconfiguration = (action as actions.SuccessGetWebsiteconfiguration)
        .payload;
      return { ...state, websiteconfiguration };

    case actions.WebsiteconfigurationsActionTypes
      .RequestPostWebsiteconfiguration:
      return { ...state, error: null };

    case actions.WebsiteconfigurationsActionTypes
      .SuccessPostWebsiteconfiguration:
      websiteconfiguration = (action as actions.SuccessPostWebsiteconfiguration)
        .payload;
      return { ...state, websiteconfiguration };

    case actions.WebsiteconfigurationsActionTypes
      .RequestPutWebsiteconfiguration:
      return { ...state, error: null };

    case actions.WebsiteconfigurationsActionTypes
      .SuccessPutWebsiteconfiguration:
      websiteconfiguration = (action as actions.SuccessPutWebsiteconfiguration)
        .payload;
      return { ...state, websiteconfiguration };

    case actions.WebsiteconfigurationsActionTypes
      .RequestDeleteWebsiteconfiguration:
      return { ...state, error: null };

    case actions.WebsiteconfigurationsActionTypes
      .SuccessDeleteWebsiteconfiguration:
      websiteconfiguration = (
        action as actions.SuccessDeleteWebsiteconfiguration
      ).payload;
      return { ...state, websiteconfiguration };

    case actions.WebsiteconfigurationsActionTypes
      .SetSelectedWebsiteconfigurations:
      selectedIds = (action as actions.SetSelectedWebsiteconfigurations)
        .payload;
      return { ...state, selectedIds };

    case actions.WebsiteconfigurationsActionTypes.SuccessPostHeaderImage:
      return { ...state, error: null };

    case actions.WebsiteconfigurationsActionTypes.RequestPostHeaderImage:
      headerImage = (action as actions.SuccessPostHeaderImage).payload;
      return { ...state, headerImage };

    default:
      return state;
  }
}
