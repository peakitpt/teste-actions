import { Action } from '@ngrx/store';

import { RequestStatus } from 'src/app/shared/reducers/RequestStatus.decorator';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { ContentResponse, Content } from '../content.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export enum ContentsActionTypes {
  RequestFailContents = '[Contents] Request Fail',
  RequestGetAllContents = '[Contents] Request Get All',
  SuccessGetAllContents = '[Contents] Success Get All',
  RequestGetContent = '[Contents] Request Get',
  SuccessGetContent = '[Contents] Success Get',
  RequestPostContent = '[Contents] Request Post',
  SuccessPostContent = '[Contents] Success Post',
  RequestPostContentImage = '[Contents] Request Post Image',
  SuccessPostContentImage = '[Contents] Success Post Image',
  RequestPostContentFile = '[Contents] Request Post File',
  SuccessPostContentFile = '[Contents] Success Post File',
  RequestPutContent = '[Contents] Request Put',
  SuccessPutContent = '[Contents] Success Put',
  RequestDeleteContent = '[Contents] Request Delete',
  SuccessDeleteContent = '[Contents] Success Delete',
  // RequestBulkDeleteContents = '[Contents] Request Bulk Delete',
  // SuccessBulkDeleteContents = '[Contents] Success Bulk Delete',
  RequestSendTestContent = '[Contents] Request Send Test',
  SuccessSendTestContent = '[Contents] Success Send Test',
  SetSelectedContents = '[Contents] Set Selected',
  SetModalSelectContent = '[Contents] Set Modal Select Content',
  RequestGetEntirelyContents = '[Contents] Request Get Entirely',
  SuccessGetEntirelyContents = '[Contents] Success Get Entirely'
}

@RequestStatus('error')
export class RequestFailContents implements Action {
  readonly type = ContentsActionTypes.RequestFailContents;
  constructor(public payload: RequestError) {}
}

@RequestStatus('pending')
export class RequestGetAllContents implements Action {
  readonly type = ContentsActionTypes.RequestGetAllContents;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetAllContents implements Action {
  readonly type = ContentsActionTypes.SuccessGetAllContents;
  constructor(public payload: ContentResponse) {}
}

@RequestStatus('pending')
export class RequestGetContent implements Action {
  readonly type = ContentsActionTypes.RequestGetContent;
  constructor(public payload: number) {}
}

@RequestStatus('default')
export class SuccessGetContent implements Action {
  readonly type = ContentsActionTypes.SuccessGetContent;
  constructor(public payload: Content) {}
}

@RequestStatus('pending')
export class RequestPostContent implements Action {
  readonly type = ContentsActionTypes.RequestPostContent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostContent implements Action {
  readonly type = ContentsActionTypes.SuccessPostContent;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPostContentImage implements Action {
  readonly type = ContentsActionTypes.RequestPostContentImage;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostContentImage implements Action {
  readonly type = ContentsActionTypes.SuccessPostContentImage;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPostContentFile implements Action {
  readonly type = ContentsActionTypes.RequestPostContentFile;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPostContentFile implements Action {
  readonly type = ContentsActionTypes.SuccessPostContentFile;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestPutContent implements Action {
  readonly type = ContentsActionTypes.RequestPutContent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessPutContent implements Action {
  readonly type = ContentsActionTypes.SuccessPutContent;
  constructor(public payload: any[]) {}
}

@RequestStatus('pending')
export class RequestDeleteContent implements Action {
  readonly type = ContentsActionTypes.RequestDeleteContent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessDeleteContent implements Action {
  readonly type = ContentsActionTypes.SuccessDeleteContent;
  constructor(public payload: any[]) {}
}

// @RequestStatus('pending')
// export class RequestBulkDeleteContents implements Action {
//   readonly type = ContentsActionTypes.RequestBulkDeleteContents;
//   constructor(public payload?: {}) {}
// }

// @RequestStatus('default')
// export class SuccessBulkDeleteContents implements Action {
//   readonly type = ContentsActionTypes.SuccessBulkDeleteContents;
//   constructor(public payload: any[]) {}
// }

@RequestStatus('pending')
export class RequestSendTestContent implements Action {
  readonly type = ContentsActionTypes.RequestSendTestContent;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessSendTestContent implements Action {
  readonly type = ContentsActionTypes.SuccessSendTestContent;
  constructor(public payload: any[]) {}
}

@RequestStatus('default')
export class SetSelectedContents implements Action {
  readonly type = ContentsActionTypes.SetSelectedContents;
  constructor(public payload?: Content[]) {}
}

@RequestStatus('default')
export class SetModalSelectContent implements Action {
  readonly type = ContentsActionTypes.SetModalSelectContent;
  constructor(public payload?: SelectedModalRow) {}
}

@RequestStatus('pending')
export class RequestGetEntirelyContents implements Action {
  readonly type = ContentsActionTypes.RequestGetEntirelyContents;
  constructor(public payload?: {}) {}
}

@RequestStatus('default')
export class SuccessGetEntirelyContents implements Action {
  readonly type = ContentsActionTypes.SuccessGetEntirelyContents;
  constructor(public payload: ContentResponse) {}
}

export type StatisticsActions =
  | RequestFailContents
  | RequestGetAllContents
  | SuccessGetAllContents
  | RequestGetContent
  | SuccessGetContent
  | RequestPostContent
  | SuccessPostContent
  | RequestPostContentImage
  | SuccessPostContentImage
  | RequestPostContentFile
  | SuccessPostContentFile
  | RequestPutContent
  | SuccessPutContent
  | RequestDeleteContent
  | SuccessDeleteContent
  // | RequestBulkDeleteContents
  // | SuccessBulkDeleteContents
  | RequestSendTestContent
  | SuccessSendTestContent
  | SetSelectedContents
  | SetModalSelectContent
  | RequestGetEntirelyContents
  | SuccessGetEntirelyContents;
