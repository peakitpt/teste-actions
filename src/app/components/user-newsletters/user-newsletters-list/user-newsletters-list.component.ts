import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { RequestToggleUserNewsletter } from '../reducers/user-newsletters.actions';
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
import { NewsletterReadStatusesService } from '@peakitpt/ui-kyrios-api';
import {
  getUserNewslettersListEntirely,
  getSelectedUserNewsletters,
} from './../reducers/user-newsletters.selectors';
import { getUserNewslettersList } from '../reducers/user-newsletters.selectors';
import * as actions from '../reducers/user-newsletters.actions';
import {
  UserNewsletterResponse,
  UserNewsletter,
} from '../user-newsletter.model';
import { ofType } from '@ngrx/effects';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-user-newsletters-list',
  templateUrl: './user-newsletters-list.component.html',
})
export class UserNewslettersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'dashboard';
  modulePath = 'user-newsletters';
  viewName = 'UserNewsletter';
  modelList$: Observable<UserNewsletterResponse>;
  selectedRows$: Observable<UserNewsletter[]>;

  selectorGetList = getUserNewslettersList;
  selectorGetSelected = getSelectedUserNewsletters;
  selectorGetListEntirely = getUserNewslettersListEntirely;
  actionSetSelected = actions.SetSelectedUserNewsletters;
  actionRequestGetAll = actions.RequestGetAllUserNewsletters;
  actionRequestGetListEntirely = actions.RequestGetEntirelyUserNewsletters;

  @ViewChild('readTemplate') readTemplate: TemplateRef<any>;

  constructor(
    titleService: Title,
    router: Router,
    route: ActivatedRoute,
    i18nextPipe: I18NextPipe,
    sharedModule: SharedModule,
    actionSubject: ActionsSubject,
    store: Store<any>,
    menuHelperService: MenuHelperService,
    http: HttpClient,
    fb: FormBuilder,
    moduleService: NewsletterReadStatusesService,
    private snackBarService: SnackBarService
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
          actions.UserNewslettersActionTypes.SuccessGetUserNewsletter,
          actions.UserNewslettersActionTypes.SuccessPostUserNewsletter,
          actions.UserNewslettersActionTypes.SuccessPutUserNewsletter,
          actions.UserNewslettersActionTypes.SuccessDeleteUserNewsletter,
          actions.UserNewslettersActionTypes.SuccessToggleUserNewsletter
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
        id: 'from',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.from`),
      },
      {
        id: 'subject',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.subject`),
      },
      {
        id: 'sent_at',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.sent_at`),
      },
      {
        id: 'read',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.read`),
        template: this.readTemplate,
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
        id: 'from',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.from`),
      },
      {
        id: 'read',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.read`),
        template: this.readTemplate,
      },
    ];
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform(
          `${this.modulePath}:action.toggle_status`
        ),
        value: 'toggle_status',
        icon: 'visibility',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];
  }

  menuClick(event: string, data?: any) {
    switch (event) {
      case 'delete':
        this.store.dispatch(new this.actionSetSelected([data]));
        this.router.navigate([this.modulePath, data.id, 'delete']);
        break;
      case 'toggle_status':
        this.toggleStatus(data.id);
        break;
      default:
        break;
    }

    this.setLimit(event);
  }

  setSideNav() {
    this.subs.push(
      this.menuHelperService
        .createSideMenuInterface(
          this.appName,
          null,
          this.searchFunction,
          null,
          this.modulePath,
          false
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  toggleStatus(id: number) {
    this.store.dispatch(new RequestToggleUserNewsletter(id));
    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.status_toggled`),
      this.sharedModule.SUCCESS_COLOR
    );
  }
}
