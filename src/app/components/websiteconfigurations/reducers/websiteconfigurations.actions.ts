import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Websiteconfiguration } from '../websiteconfiguration.model';

export enum WebsiteconfigurationsActionTypes {
  RequestFailWebsiteconfigurations = '[Websiteconfigurations] Request Fail',
  RequestGetWebsiteconfiguration = '[Websiteconfigurations] Request Get',
  SuccessGetWebsiteconfiguration = '[Websiteconfigurations] Success Get',
  RequestPostWebsiteconfiguration = '[Websiteconfigurations] Request Post',
  SuccessPostWebsiteconfiguration = '[Websiteconfigurations] Success Post',
  RequestPutWebsiteconfiguration = '[Websiteconfigurations] Request Put',
  SuccessPutWebsiteconfiguration = '[Websiteconfigurations] Success Put',
  RequestDeleteWebsiteconfiguration = '[Websiteconfigurations] Request Delete',
  SuccessDeleteWebsiteconfiguration = '[Websiteconfigurations] Success Delete',
  SetSelectedWebsiteconfigurations = '[Websiteconfigurations] Set Selected',
  RequestPostHeaderImage = '[Websiteconfigurations] Request Post Image',
  SuccessPostHeaderImage = '[Websiteconfigurations] Success Post Image',
}

@RequestStatus('error')
export class RequestFailWebsiteconfigurations implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.RequestFailWebsiteconfigurations;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.RequestGetWebsiteconfiguration;
  constructor() {}
}

@RequestStatus('default')
export class SuccessGetWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.SuccessGetWebsiteconfiguration;
  constructor(public payload: Websiteconfiguration) {}
}

@RequestStatus('pending')
export class RequestPostWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.RequestPostWebsiteconfiguration;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.SuccessPostWebsiteconfiguration;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.RequestPutWebsiteconfiguration;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.SuccessPutWebsiteconfiguration;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.RequestDeleteWebsiteconfiguration;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteWebsiteconfiguration implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.SuccessDeleteWebsiteconfiguration;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedWebsiteconfigurations implements Action {
  readonly type =
    WebsiteconfigurationsActionTypes.SetSelectedWebsiteconfigurations;
  constructor(public payload?: Websiteconfiguration[]) {}
}

@RequestStatus('pending')
export class RequestPostHeaderImage implements Action {
  readonly type = WebsiteconfigurationsActionTypes.RequestPostHeaderImage;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostHeaderImage implements Action {
  readonly type = WebsiteconfigurationsActionTypes.SuccessPostHeaderImage;
  constructor(public payload: any[]) {}
}

export type StatisticsActions =
  | RequestFailWebsiteconfigurations
  | RequestGetWebsiteconfiguration
  | SuccessGetWebsiteconfiguration
  | RequestPostWebsiteconfiguration
  | SuccessPostWebsiteconfiguration
  | RequestPutWebsiteconfiguration
  | SuccessPutWebsiteconfiguration
  | RequestDeleteWebsiteconfiguration
  | SuccessDeleteWebsiteconfiguration
  | SetSelectedWebsiteconfigurations
  | RequestPostHeaderImage
  | SuccessPostHeaderImage;
