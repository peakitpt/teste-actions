import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
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
import { SubscriptionUsersService } from '@peakitpt/ui-kyrios-api';

import {
  getSelectedSubscriptionUsers,
  getSubscriptionUsersListEntirely,
} from './../reducers/subscription-users.selectors';
import { getSubscriptionUsersList } from '../reducers/subscription-users.selectors';
import * as actions from '../reducers/subscription-users.actions';
import {
  SubscriptionUserResponse,
  SubscriptionUser,
} from '../subscription-user.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-subscription-users-list',
  templateUrl: './subscription-users-list.component.html',
})
export class SubscriptionUsersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'subscription_admin';
  modulePath = 'subscription-users';
  modelList$: Observable<SubscriptionUserResponse>;
  selectedRows$: Observable<SubscriptionUser[]>;
  viewName = 'SubscriptionUser';

  selectorGetList = getSubscriptionUsersList;
  selectorGetSelected = getSelectedSubscriptionUsers;
  selectorGetListEntirely = getSubscriptionUsersListEntirely;
  actionSetSelected = actions.SetSelectedSubscriptionUsers;
  actionRequestGetAll = actions.RequestGetAllSubscriptionUsers;
  actionRequestGetListEntirely = actions.RequestGetEntirelySubscriptionUsers;

  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('currentSignInTemplate') currentSignInTemplate: TemplateRef<any>;

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
    public moduleService?: SubscriptionUsersService
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
      .pipe(
        ofType(
          actions.SubscriptionUsersActionTypes.SuccessPostSubscriptionUser,
          actions.SubscriptionUsersActionTypes.SuccessPutSubscriptionUser,
          actions.SubscriptionUsersActionTypes.SuccessDeleteSubscriptionUser
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
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'email',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.email`),
      },
      {
        id: 'current_sign_in_at',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.current_sign_in_at`
        ),
        template: this.currentSignInTemplate,
      },
      {
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
      },
      {
        id: 'disabled',
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

    this.smallScreenTableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:name`),
      },
      {
        id: 'email',
        title: this.i18nextPipe.transform(`${this.modulePath}:email`),
      },
      {
        id: 'disabled',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
    ];
  }
}
