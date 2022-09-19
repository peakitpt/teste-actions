import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SubscriptionSetting } from '../subscription-setting.model';

export enum SubscriptionSettingsActionTypes {
  RequestFailSubscriptionSettings = '[SubscriptionSettings] Request Fail',
  RequestGetFromSubscriptionSetting = '[SubscriptionSettings] Request Get From SubscriptionSetting',
  SuccessGetFromSubscriptionSetting = '[SubscriptionSettings] Success Get From SubscriptionSetting',
  RequestGetSubscriptionSetting = '[SubscriptionSettings] Request Get',
  SuccessGetSubscriptionSetting = '[SubscriptionSettings] Success Get',
  RequestPostSubscriptionSetting = '[SubscriptionSettings] Request Post',
  SuccessPostSubscriptionSetting = '[SubscriptionSettings] Success Post',
}

@RequestStatus('error')
export class RequestFailSubscriptionSettings implements Action {
  readonly type =
    SubscriptionSettingsActionTypes.RequestFailSubscriptionSettings;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetFromSubscriptionSetting implements Action {
  readonly type =
    SubscriptionSettingsActionTypes.RequestGetFromSubscriptionSetting;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetFromSubscriptionSetting implements Action {
  readonly type =
    SubscriptionSettingsActionTypes.SuccessGetFromSubscriptionSetting;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestGetSubscriptionSetting implements Action {
  readonly type = SubscriptionSettingsActionTypes.RequestGetSubscriptionSetting;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetSubscriptionSetting implements Action {
  readonly type = SubscriptionSettingsActionTypes.SuccessGetSubscriptionSetting;
  constructor(public payload: SubscriptionSetting) {}
}

@RequestStatus('pending')
export class RequestPostSubscriptionSetting implements Action {
  readonly type =
    SubscriptionSettingsActionTypes.RequestPostSubscriptionSetting;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostSubscriptionSetting implements Action {
  readonly type =
    SubscriptionSettingsActionTypes.SuccessPostSubscriptionSetting;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFailSubscriptionSettings
  | RequestGetFromSubscriptionSetting
  | SuccessGetFromSubscriptionSetting
  | RequestGetSubscriptionSetting
  | SuccessGetSubscriptionSetting
  | RequestPostSubscriptionSetting
  | SuccessPostSubscriptionSetting;
