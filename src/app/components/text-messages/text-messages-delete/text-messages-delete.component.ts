import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { TextMessage } from '../text-message.model';
import {
  getSelectedTextMessages,
  getTextMessage,
} from '../reducers/text-messages.selectors';
import * as actions from '../reducers/text-messages.actions';

@Component({
  selector: 'kyr-text-messages-delete',
  templateUrl: './text-messages-delete.component.html',
})
export class TextMessagesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<TextMessage[]>;
  modelList: TextMessage[] = [];
  modulePath = 'text-messages';
  returnUrl = ['/text-messages'];

  selectorGetModel = getTextMessage;
  selectorGetSelected = getSelectedTextMessages;
  actionRequestFail = actions.TextMessagesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.TextMessagesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
