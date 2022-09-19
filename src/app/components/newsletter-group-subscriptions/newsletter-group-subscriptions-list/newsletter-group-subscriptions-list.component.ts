import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NewsletterGroupSubscriptionsService } from '@peakitpt/ui-kyrios-api';

import {
  getNewsletterGroupSubscriptionsList,
  getNewsletterGroupSubscriptionsListEntirely,
  getSelectedNewsletterGroupSubscriptions,
} from '../reducers/newsletter-group-subscriptions.selectors';
import * as actions from '../reducers/newsletter-group-subscriptions.actions';
import {
  NewsletterGroupSubscriptionResponse,
  NewsletterGroupSubscription,
} from '../newsletter-group-subscription.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-newsletter-group-subscriptions-list',
  templateUrl: './newsletter-group-subscriptions-list.component.html',
})
export class NewsletterGroupSubscriptionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'newsletter';
  modulePath = 'newsletter-group-subscriptions';
  modelList$: Observable<NewsletterGroupSubscriptionResponse>;
  selectedRows$: Observable<NewsletterGroupSubscription[]>;
  viewName = 'NewsletterGroupSubscription';

  selectorGetList = getNewsletterGroupSubscriptionsList;
  selectorGetListEntirely = getNewsletterGroupSubscriptionsListEntirely;
  selectorGetSelected = getSelectedNewsletterGroupSubscriptions;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  /* This specific's component fields */
  selectedNewsletterGroupSubscription: NewsletterGroupSubscription;
  openToggleNewsletterGroupSubscriptionModal = false;

  /* ViewChilds */
  @ViewChild('subscriptionNameTemplate')
  subscriptionNameTemplate: TemplateRef<any>;
  @ViewChild('groupNameTemplate')
  groupNameTemplate: TemplateRef<any>;
  @ViewChild('subscriptionDateTemplate')
  subscriptionDateTemplate: TemplateRef<any>;
  @ViewChild('unsubscriptionDateTemplate')
  unsubscriptionDateTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate')
  activeTemplate: TemplateRef<any>;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<any>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    public moduleService?: NewsletterGroupSubscriptionsService
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

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.NewsletterGroupSubscriptionsActionTypes.SuccessPost))
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'newsletter_subscription.name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.newsletter_subscription.name`
        ),
        template: this.subscriptionNameTemplate,
      },
      {
        id: 'group.name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.group.name`
        ),
        template: this.groupNameTemplate,
      },
      {
        id: 'subscription_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.subscription_date`
        ),
        templte: this.subscriptionDateTemplate,
      },
      {
        id: 'unsubscription_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.unsubscription_date`
        ),
        templte: this.unsubscriptionDateTemplate,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
      {
        id: 'buttons',
        title: '',
        sortable: false,
        isColumnStickyEnd: true,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
      },
    ];

    this.smallScreenTableColumns = this.tableColumns;
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [];
  }

  toggleActivation(data: NewsletterGroupSubscription) {
    this.selectedNewsletterGroupSubscription = data;
    this.openToggleNewsletterGroupSubscriptionModal = true;
  }
}
