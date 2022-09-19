import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { TextMessage } from '../text-message.model';
import * as actions from '../reducers/text-messages.actions';
import { getTextMessage } from '../reducers/text-messages.selectors';

@Component({
  selector: 'kyr-text-messages-details',
  templateUrl: './text-messages-details.component.html',
  styleUrls: ['./text-messages-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextMessagesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<TextMessage>;
  model: TextMessage;
  returnUrl = '/text-messages';
  modulePath = 'text-messages';
  viewName = 'TextMessage';

  selectorGetModel = getTextMessage;
  actionRequestFail = actions.TextMessagesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;

  @ViewChild('messageTabTemplate') messageTabTemplate: TemplateRef<any>;
  @ViewChild('errorsTabTemplate') errorsTabTemplate: TemplateRef<any>;

  /* This specific's component fields */
  private frequencyOptions: Array<{ value: number; label: string }> = [];
  selectedTextMessage: TextMessage;
  openSendTextMessageModal = false;

  ngOnInit() {
    super.ngOnInit();

    this.frequencyOptions = [
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.unique`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(`${this.modulePath}:frequency.daily`),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.weekly`
        ),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.monthly`
        ),
      },
      {
        value: 5,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:frequency.yearly`
        ),
      },
    ];

    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform(`${this.modulePath}:action.send_test`),
        value: 'send_test',
        icon: 'send',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];
  }

  afterGetModel() {
    super.afterGetModel();

    if (this.model.text_messages_errors.length) {
      this.detailsTabs = [
        {
          textLabel: this.i18nextPipe.transform(
            `${this.modulePath}:tabs.text_message`
          ),
          templateContent: this.messageTabTemplate,
        },
        {
          textLabel: this.i18nextPipe.transform(
            `${this.modulePath}:tabs.errors`
          ),
          templateContent: this.errorsTabTemplate,
        },
      ];
    }
  }

  menuClick(event: any, data: TextMessage) {
    switch (event) {
      case 'send_test':
        this.selectedTextMessage = data;
        this.openSendTextMessageModal = true;
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  frequencyLabel(value: number): string {
    const freq = this.frequencyOptions.find((f) => f.value === value);
    return freq ? freq.label : '';
  }
}
