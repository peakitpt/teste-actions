import {
  getSelectedSubscriptions,
  getSubscriptionsListEntirely,
} from './../reducers/subscriptions.selectors';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
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
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

import { getSubscriptionsList } from '../reducers/subscriptions.selectors';
import * as actions from '../reducers/subscriptions.actions';
import {
  SubscriptionResponse,
  Subscription as SubscriptionModel,
} from '../subscription.model';
import { ofType } from '@ngrx/effects';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';

@Component({
  selector: 'kyr-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
})
export class SubscriptionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'admin';
  modulePath = 'subscriptions';
  modelList$: Observable<SubscriptionResponse>;
  selectedRows$: Observable<SubscriptionModel[]>;
  viewName = 'Subscription';

  selectorGetList = getSubscriptionsList;
  selectorGetSelected = getSelectedSubscriptions;
  selectorGetListEntirely = getSubscriptionsListEntirely;
  actionSetSelected = actions.SetSelectedSubscriptions;
  actionRequestGetAll = actions.RequestGetAllSubscriptions;
  actionRequestGetListEntirely = actions.RequestGetEntirelySubscriptions;

  actionsInProgress = false;
  actionRequestBulkDisableUsers = actions.RequestBulkDisableUsersSubscriptions;
  actionRequestBulkEnableUsers = actions.RequestBulkEnableUsersSubscriptions;
  actionRequestBulkDisableSubscriptions =
    actions.RequestBulkDisableSubscriptions;

  @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<any>;
  @ViewChild('userTemplate') userTemplate: TemplateRef<any>;
  @ViewChild('entityType1NameTemplate')
  entityType1NameTemplate: TemplateRef<any>;
  @ViewChild('entityType1ActiveTemplate')
  entityType1ActiveTemplate: TemplateRef<any>;
  @ViewChild('entityType1ExpirationTemplate')
  entityType1ExpirationTemplate: TemplateRef<any>;
  @ViewChild('entityType2CompleteRelationTemplate')
  entityType2CompleteRelationTemplate: TemplateRef<any>;
  @ViewChild('entityType2NameTemplate')
  entityType2NameTemplate: TemplateRef<any>;

  selectedRows = [];

  actionMenuModel = [
    {
      name: this.i18nextPipe.transform(
        `${this.modulePath}:action.disable_users`
      ),
      value: 'disable_users',
      icon: 'person_remove',
    },
    {
      name: this.i18nextPipe.transform(
        `${this.modulePath}:action.enable_users`
      ),
      value: 'enable_users',
      icon: 'person_add',
    },
    {
      name: this.i18nextPipe.transform(
        `${this.modulePath}:action.disable_subscriptions`
      ),
      value: 'disable_subscriptions',
      icon: 'no_sim',
    },
    {
      name: this.i18nextPipe.transform(
        `${this.modulePath}:action.disable_subscriptions_and_users`
      ),
      value: 'disable_subscriptions_and_users',
      icon: 'desktop_access_disabled',
    },
  ];

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
    public moduleService?: SubscriptionsService
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
    this.searchFormTemplate = 'subscriptions';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setSideNav();
      this.ngOnResize();

      // This refreshes the table everytime something is added or deleted
      this.subs.push(this.tableChangesDetector());
      this.subs.push(this.refreshDetector());

      this.toolbarDataModel.push({
        template: this.actionsTemplate,
      });
    });
  }

  setSideNav() {
    this.subs.push(
      this.menuHelperService
        .createSideMenuInterface(
          this.appName,
          this.modulePath,
          this.searchFunction,
          null,
          this.modulePath
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.user.name`
        ),
        template: this.userTemplate,
      },
      {
        id: 'entity1_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.entity_type.name`
        ),
        template: this.entityType1NameTemplate,
      },
      {
        id: 'entity1_active',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.entity_type.active`
        ),
        template: this.entityType1ActiveTemplate,
      },
      {
        id: 'entity1_expiration',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.entity_type.expiration`
        ),
        template: this.entityType1ExpirationTemplate,
      },
      {
        id: 'entity2_subscription',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2.complete_relation`
        ),
        template: this.entityType2CompleteRelationTemplate,
      },
      {
        id: 'entity2_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2.entity_type.name`
        ),
        template: this.entityType2NameTemplate,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.user.name`
        ),
        template: this.userTemplate,
      },
      {
        id: 'entity1_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.entity_type.name`
        ),
        template: this.entityType1NameTemplate,
      },
      {
        id: 'entity1_active',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.entity_type.active`
        ),
        template: this.entityType1ActiveTemplate,
      },
      {
        id: 'entity1_expiration',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1.entity_type.expiration`
        ),
        template: this.entityType1ExpirationTemplate,
      },
      {
        id: 'entity2_subscription',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2.complete_relation`
        ),
        template: this.entityType2CompleteRelationTemplate,
      },
      {
        id: 'entity2_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2.entity_type.name`
        ),
        template: this.entityType2NameTemplate,
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.SubscriptionsActionTypes.SuccessBulkDisableSubscriptions,
          actions.SubscriptionsActionTypes.SuccessBulkDisableUsersSubscriptions,
          actions.SubscriptionsActionTypes.SuccessBulkEnableUsersSubscriptions
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  refreshDetector(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.SubscriptionsActionTypes.SuccessGetAllSubscriptions))
      .subscribe(() => {
        this.actionsInProgress = false;
      });
  }

  checkboxSelectionEvent(event: any) {
    this.store.dispatch(new this.actionSetSelected(event));
    this.selectedRows$ = this.store.select(this.selectorGetSelected);

    this.selectedRows$.subscribe((r) => {
      this.selectedRows = r;
    });
  }

  actionMenuClick(event: any, data?: any) {
    this.actionsInProgress = true;
    switch (event) {
      case 'disable_users': {
        const userslist = this.getSelectedUserIds(this.selectedRows);
        this.store.dispatch(new this.actionRequestBulkDisableUsers(userslist));
        break;
      }
      case 'enable_users': {
        const userslist = this.getSelectedUserIds(this.selectedRows);
        this.store.dispatch(new this.actionRequestBulkEnableUsers(userslist));
        break;
      }
      case 'disable_subscriptions': {
        const subscriptionsList = this.getSelectedSubscription(
          this.selectedRows
        );
        this.store.dispatch(
          new this.actionRequestBulkDisableSubscriptions(subscriptionsList)
        );
        break;
      }
      case 'disable_subscriptions_and_users': {
        const userslist = this.getSelectedUserIds(this.selectedRows);
        const subscriptionsList = this.getSelectedSubscription(
          this.selectedRows
        );
        this.store.dispatch(new this.actionRequestBulkDisableUsers(userslist));
        this.store.dispatch(
          new this.actionRequestBulkDisableSubscriptions(subscriptionsList)
        );
        break;
      }

      default: {
        this.actionsInProgress = false;
        break;
      }
    }
  }

  getSelectedUserIds(data: any[]) {
    const res = [];
    data.forEach((subscription: SubscriptionModel) => {
      if (!res.includes(subscription.entity1.user.id)) {
        res.push(subscription.entity1.user.id);
      }
    });
    return res;
  }

  getSelectedSubscription(data: any[]) {
    const res = [];
    data.forEach((subscription: SubscriptionModel) => {
      const sub = {};
      sub['entity1_id'] = subscription.entity1_id;
      sub['entity2_id'] = subscription.entity2_id;
      sub['user_id'] = subscription.entity1.user.id;
      res.push(sub);
    });
    return res;
  }
}
