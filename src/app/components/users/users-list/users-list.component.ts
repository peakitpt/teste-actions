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
import { UsersService } from '@peakitpt/ui-kyrios-api';

import {
  getSelectedUsers,
  getUsersListEntirely,
} from './../reducers/users.selectors';
import { getUsersList } from '../reducers/users.selectors';
import * as actions from '../reducers/users.actions';
import { UserResponse, User } from '../user.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'admin';
  modulePath = 'users';
  modelList$: Observable<UserResponse>;
  selectedRows$: Observable<User[]>;
  viewName = 'User';

  selectorGetList = getUsersList;
  selectorGetSelected = getSelectedUsers;
  selectorGetListEntirely = getUsersListEntirely;
  actionSetSelected = actions.SetSelectedUsers;
  actionRequestGetAll = actions.RequestGetAllUsers;
  actionRequestGetListEntirely = actions.RequestGetEntirelyUsers;

  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('currentSignInTemplate') currentSignInTemplate: TemplateRef<any>;
  @ViewChild('expirationDateTemplate') expirationDateTemplate: TemplateRef<any>;

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
    public moduleService?: UsersService
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
          actions.UsersActionTypes.SuccessPostUser,
          actions.UsersActionTypes.SuccessPutUser,
          actions.UsersActionTypes.SuccessDeleteUser
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
        id: 'subscriptions_limit',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.subscriptions_limit`
        ),
      },
      {
        id: 'expiration_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.expiration_date`
        ),
        template: this.expirationDateTemplate,
      },
      {
        id: 'sign_in_count',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.sign_in_count`
        ),
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
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'email',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.email`),
      },
      {
        id: 'disabled',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
      },
    ];
  }

  refreshTable() {
    this.store.dispatch(
      new this.actionRequestGetAll({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
      })
    );
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
      {
        name: this.i18nextPipe.transform(
          this.modulePath + ':action.change_password'
        ),
        value: 'change_password',
        icon: 'lock_open',
      },
    ];
  }

  menuClick(event: string, data?: any) {
    switch (event) {
      case 'change_password':
        this.store.dispatch(new this.actionSetSelected([data]));
        this.router.navigate([this.modulePath, data.id, 'change-password']);
        break;
      default:
        super.menuClick(event, data);
    }
  }
}
