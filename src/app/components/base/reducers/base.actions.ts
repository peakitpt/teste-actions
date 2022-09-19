import { SideMenuInterface } from './../base.component';
import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

export enum SideNavActionTypes {
  RequestFailSideNav = '[SideNav] Request Fail',
  RequestGetSideNav = '[SideNav] Request Get SideNav',
  SuccessGetSideNav = '[SideNav] Success Get SideNav',
  RequestPostSideNav = '[SideNav] Request Post SideNav',
  SuccessPostSideNav = '[SideNav] Success Post SideNav',
  RequestGetMenu = '[Menu] Request Get Menu',
  SuccessGetMenu = '[Menu] Success Get Menu',
  RequestGetSubscriptions = '[Subscriptions] Request Get Subscriptions',
  SuccessGetSubscriptions = '[Subscriptions] Success Get Subscriptions',
  RequestChangeSubscriptions = '[Subscriptions] Request Change Subscriptions',
  SuccessChangeSubscriptions = '[Subscriptions] Success Change Subscriptions',
  RequestGetAllNewsletters = '[Newsletters] Request Get All Newsletters',
  SuccessGetAllNewsletters = '[Newsletters] Success Get All Newsletters',
  RequestGetNewsletter = '[Newsletters] Request Get Newsletter',
  SuccessGetNewsletter = '[Newsletters] Success Get Newsletter',
  RequestGetSearch = '[Search] Request Get Search',
  SuccessGetSearch = '[Search] Success Get Search',
  RequestPostSearch = '[Search] Request Post Search',
  SuccessPostSearch = '[Search] Success Post Search',
  RequestUserInfo = '[Log In] Request User Info',
  SuccessUserInfo = '[Log In] Success User Info',
  RequestGetAllSubscriptions = '[Subscriptions] Request Get All Subscriptions',
  SuccessGetAllSubscriptions = '[Subscriptions] Success Get All Subscriptions',
  RequestPredefineSubscription = '[Subscriptions] Request Predefine Subscriptions',
  SuccessPredefineSubscription = '[Subscriptions] Success Predefine Subscriptions'
}

@RequestStatus('error')
export class RequestFailSideNav implements Action {
  readonly type = SideNavActionTypes.RequestFailSideNav;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetSideNav implements Action {
  readonly type = SideNavActionTypes.RequestGetSideNav;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetSideNav implements Action {
  readonly type = SideNavActionTypes.SuccessGetSideNav;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPostSideNav implements Action {
  readonly type = SideNavActionTypes.RequestPostSideNav;
  constructor(public payload: SideMenuInterface) {}
}

@RequestStatus('default')
export class SuccessPostSideNav implements Action {
  readonly type = SideNavActionTypes.SuccessPostSideNav;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestGetMenu implements Action {
  readonly type = SideNavActionTypes.RequestGetMenu;
  constructor(public payload: any) {}
}

@RequestStatus('default')
export class SuccessGetMenu implements Action {
  readonly type = SideNavActionTypes.SuccessGetMenu;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestGetSubscriptions implements Action {
  readonly type = SideNavActionTypes.RequestGetSubscriptions;
  constructor(public payload: any) {}
}

@RequestStatus('default')
export class SuccessGetSubscriptions implements Action {
  readonly type = SideNavActionTypes.SuccessGetSubscriptions;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestChangeSubscriptions implements Action {
  readonly type = SideNavActionTypes.RequestChangeSubscriptions;
  constructor(public payload: any) {}
}

@RequestStatus('default')
export class SuccessChangeSubscriptions implements Action {
  readonly type = SideNavActionTypes.SuccessChangeSubscriptions;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestGetAllNewsletters implements Action {
  readonly type = SideNavActionTypes.RequestGetAllNewsletters;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllNewsletters implements Action {
  readonly type = SideNavActionTypes.SuccessGetAllNewsletters;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetNewsletter implements Action {
  readonly type = SideNavActionTypes.RequestGetNewsletter;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetNewsletter implements Action {
  readonly type = SideNavActionTypes.SuccessGetNewsletter;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetSearch implements Action {
  readonly type = SideNavActionTypes.RequestGetSearch;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetSearch implements Action {
  readonly type = SideNavActionTypes.SuccessGetSearch;
  constructor() {}
}

@RequestStatus('pending')
export class RequestPostSearch implements Action {
  readonly type = SideNavActionTypes.RequestPostSearch;
  constructor(public payload: any) {}
}

@RequestStatus('default')
export class SuccessPostSearch implements Action {
  readonly type = SideNavActionTypes.SuccessPostSearch;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestUserInfo implements Action {
  readonly type = SideNavActionTypes.RequestUserInfo;
  constructor(public payload: any) {}
}

@RequestStatus('default')
export class SuccessUserInfo implements Action {
  readonly type = SideNavActionTypes.SuccessUserInfo;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestGetAllSubscriptions implements Action {
  readonly type = SideNavActionTypes.RequestGetAllSubscriptions;
  constructor(public payload: any) {}
}

@RequestStatus('default')
export class SuccessGetAllSubscriptions implements Action {
  readonly type = SideNavActionTypes.SuccessGetAllSubscriptions;
  constructor(public payload: any) {}
}

@RequestStatus('pending')
export class RequestPredefineSubscription implements Action {
  readonly type = SideNavActionTypes.RequestPredefineSubscription;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessPredefineSubscription implements Action {
  readonly type = SideNavActionTypes.SuccessPredefineSubscription;
  constructor(public payload: number) {}
}

export type StatisticsActions =
  | RequestFailSideNav
  | RequestGetSideNav
  | SuccessGetSideNav
  | RequestPostSideNav
  | SuccessPostSideNav
  | RequestGetMenu
  | SuccessGetMenu
  | RequestGetSubscriptions
  | SuccessGetSubscriptions
  | RequestChangeSubscriptions
  | SuccessChangeSubscriptions
  | RequestGetAllNewsletters
  | SuccessGetAllNewsletters
  | RequestGetNewsletter
  | SuccessGetNewsletter
  | RequestGetSearch
  | SuccessGetSearch
  | RequestPostSearch
  | SuccessPostSearch
  | RequestUserInfo
  | SuccessUserInfo
  | RequestGetAllSubscriptions
  | SuccessGetAllSubscriptions
  | RequestPredefineSubscription
  | SuccessPredefineSubscription;
