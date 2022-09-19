import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { TextMessagesService } from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

import { State as SubscriptionSettingsState } from '../../subscription-settings/reducers/subscription-settings.reducer';
import { State } from '../reducers/text-messages.reducer';
import {
  getTextMessagesList,
  getSelectedTextMessages,
  getTextMessagesListEntirely,
} from '../reducers/text-messages.selectors';
import * as actions from '../reducers/text-messages.actions';
import { TextMessageResponse, TextMessage } from '../text-message.model';
import { SubscriptionSetting } from '../../subscription-settings/subscription-setting.model';
import { getFromSubscriptionSetting } from '../../subscription-settings/reducers/subscription-settings.selectors';
import { RequestGetFromSubscriptionSetting } from '../../subscription-settings/reducers/subscription-settings.actions';

@Component({
  selector: 'kyr-text-messages-list',
  templateUrl: './text-messages-list.component.html',
})
export class TextMessagesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'newsletter';
  modulePath = 'text-messages';
  modelList$: Observable<TextMessageResponse>;
  selectedRows$: Observable<TextMessage[]>;
  viewName = 'TextMessage';

  subscriptionSetting$: Observable<SubscriptionSetting>;

  selectorGetList = getTextMessagesList;
  selectorGetSelected = getSelectedTextMessages;
  selectorGetListEntirely = getTextMessagesListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('sendingDateTemplate') sendingDateTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('sentAtTemplate') sentAtTemplate: TemplateRef<any>;

  /* This specific's component fields */
  selectedTextMessage: TextMessage;
  openSendTextMessageModal = false;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<State>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    private subSettingStore: Store<SubscriptionSettingsState>,
    public moduleService: TextMessagesService
  ) {
    super(
      titleService,
      router,
      route,
      i18nextPipe,
      sharedModule,
      actionSubject,
      store,
      menuHelperService,
      http,
      fb,
      moduleService
    );
  }

  ngOnInit() {
    super.ngOnInit();

    // this.toolbarDataModel = [
    //   {
    //     icon: 'delete',
    //     click: () => {
    //       this.deleteMulti();
    //     },
    //   },
    // ];

    this.subscriptionSetting$ = this.subSettingStore.select(
      getFromSubscriptionSetting
    );
    this.subSettingStore.dispatch(new RequestGetFromSubscriptionSetting());
  }

  buildHeaderOptionsMenu() {
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

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.TextMessagesActionTypes.SuccessPost,
          actions.TextMessagesActionTypes.SuccessPut,
          actions.TextMessagesActionTypes.SuccessDelete,
          actions.TextMessagesActionTypes.SuccessBulkDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        minWidth: '100px',
      },
      {
        id: 'sending_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.sending_date`
        ),
        template: this.sendingDateTemplate,
      },
      {
        id: 'sending_hour',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.sending_hour`
        ),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
      {
        id: 'sent_at',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.sent_at`),
        template: this.sentAtTemplate,
      },
      {
        id: 'buttons',
        title: '',
        sortable: false,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
        width: '50px',
      },
    ];

    this.smallScreenTableColumns = [
      this.tableColumns[0],
      this.tableColumns[1],
      this.tableColumns[2],
    ];
  }

  menuClick(event: string, data?: TextMessage) {
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

  getSubscriptionSettingsMessage(ss: SubscriptionSetting) {
    if (!ss.sms_gateway || !ss.sms_msisdn || !ss.sms_password) {
      return {
        type: 'warning',
        text: this.i18nextPipe.transform(
          `${this.modulePath}:message.no_sms_configs`,
          { url: environment.railsAppUrl + '/subscription_settings' }
        ),
      };
    }
  }
}
