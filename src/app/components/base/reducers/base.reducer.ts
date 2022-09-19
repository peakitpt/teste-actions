import { Action } from '@ngrx/store';
import * as actions from './base.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

export interface State {
  sideNav: any;
  menu: any;
  subscriptions: any;
  currentSubscription: any;
  newsletters: any;
  newsletter: any;
  error: RequestError;
  user: any;
  search: any;
  allSubscriptions: any;
}

export const initialState: State = {
  sideNav: null,
  menu: null,
  subscriptions: null,
  currentSubscription: null,
  error: null,
  newsletters: null,
  newsletter: null,
  user: null,
  search: null,
  allSubscriptions: null
};

export function reducer(state = initialState, action: Action): State {
  let sideNav: any;
  let menu: any;
  let subscriptions: any;
  let currentSubscription: any;
  let newsletters: any;
  let newsletter: any;
  let user: any;
  let search: any;
  let allSubscriptions: any;

  switch (action.type) {
    case actions.SideNavActionTypes.RequestFailSideNav:
      const error = (action as actions.RequestFailSideNav).payload;
      return { ...state, error };

    case actions.SideNavActionTypes.RequestGetSideNav:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessGetSideNav:
      sideNav = action as actions.SuccessGetSideNav;
      return { ...state, sideNav };

    case actions.SideNavActionTypes.RequestPostSideNav:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessPostSideNav:
      sideNav = (action as actions.SuccessPostSideNav).payload;
      return { ...state, sideNav };

    case actions.SideNavActionTypes.RequestGetMenu:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessGetMenu:
      menu = action as actions.SuccessGetMenu;
      return { ...state, menu };

    case actions.SideNavActionTypes.RequestGetSubscriptions:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessGetSubscriptions:
      subscriptions = action as actions.SuccessGetSubscriptions;
      return { ...state, subscriptions };

    case actions.SideNavActionTypes.RequestChangeSubscriptions:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessChangeSubscriptions:
      currentSubscription = action as actions.SuccessChangeSubscriptions;
      return { ...state, currentSubscription };

    case actions.SideNavActionTypes.RequestGetAllNewsletters:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessGetAllNewsletters:
      newsletters = (action as actions.SuccessGetAllNewsletters).payload;
      return { ...state, newsletters };

    case actions.SideNavActionTypes.RequestGetNewsletter:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessGetNewsletter:
      newsletter = (action as actions.SuccessGetNewsletter).payload;
      return { ...state, newsletter };

    case actions.SideNavActionTypes.RequestGetSearch:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessGetSearch:
      search = action as actions.SuccessGetSearch;
      return { ...state, search };

    case actions.SideNavActionTypes.RequestPostSearch:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessPostSearch:
      search = (action as actions.SuccessPostSideNav).payload;
      return { ...state, search };

    case actions.SideNavActionTypes.RequestUserInfo:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessUserInfo:
      user = action as actions.SuccessUserInfo;
      return { ...state, user };

    case actions.SideNavActionTypes.RequestGetAllSubscriptions:
      return { ...state, error: null };

    case actions.SideNavActionTypes.SuccessGetAllSubscriptions:
      allSubscriptions = (action as actions.SuccessGetAllSubscriptions).payload;
      return { ...state, allSubscriptions };

    default:
      return state;
  }
}
