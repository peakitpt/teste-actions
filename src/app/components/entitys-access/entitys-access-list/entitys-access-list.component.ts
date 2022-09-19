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
import { EntitysAccessService } from '@peakitpt/ui-kyrios-api';

import { getSelectedEntitysAccess } from './../reducers/entitys-access.selectors';
import { getEntitysAccessList } from '../reducers/entitys-access.selectors';
import * as actions from '../reducers/entitys-access.actions';
import { ofType } from '@ngrx/effects';
import { EntityAccess, EntityAccessResponse } from '../entity-access.model';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from '../../base/reducers/base.actions';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-entitys-access-list',
  templateUrl: './entitys-access-list.component.html',
})
export class EntitysAccessListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'dashboard';
  modulePath = 'entitys-access';
  viewName = 'EntitysAccess';
  modelList$: Observable<EntityAccessResponse>;
  selectedRows$: Observable<EntityAccess[]>;

  selectorGetList = getEntitysAccessList;
  selectorGetSelected = getSelectedEntitysAccess;
  actionSetSelected = actions.SetSelectedEntitysAccess;
  actionRequestGetAll = actions.RequestGetAllEntitysAccess;

  @ViewChild('predefineTemplate')
  predefineTemplate: TemplateRef<any>;
  @ViewChild('nameTemplate')
  nameTemplate: TemplateRef<any>;
  @ViewChild('completeRelationTemplate')
  completeRelationTemplate: TemplateRef<any>;

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
    public snackBarService: SnackBarService,
    public moduleService?: EntitysAccessService
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

  setSideNav() {
    this.subs.push(
      this.menuHelperService
        .createSideMenuInterface(
          this.appName,
          this.modulePath,
          this.searchFunction,
          this.searchFormStructure,
          this.searchFormTemplate,
          'subscriptions/new'
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.EntitysAccessActionTypes.SuccessDeleteEntityAccess))
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'entity2__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2__name`
        ),
        template: this.nameTemplate,
        stopRowClickPropagation: true,
      },
      {
        id: 'entity2__complete_relation',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2__complete_relation`
        ),
        template: this.completeRelationTemplate,
        stopRowClickPropagation: true,
      },
      {
        id: 'id',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.pre_define`
        ),
        template: this.predefineTemplate,
        stopRowClickPropagation: true,
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
        id: 'entity2__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2__name`
        ),
      },
      {
        id: 'id',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.pre_define`
        ),
        stopRowClickPropagation: true,
      },
    ];
  }

  changeSubscription(sub: EntityAccess) {
    this.router.navigate(['subscription_change', sub.entity2_id]);
  }

  predefineSubscription(sub: EntityAccess) {
    this.subs.push(
      this.moduleService.predefine(sub.entity2_id).subscribe(
        (r) => {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.predefined_subscription_changed_success`
            ),
            this.sharedModule.SUCCESS_COLOR
          );
          this.refreshTable();
        },
        (err) => {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.predefined_subscription_changed_error`
            ),
            this.sharedModule.ERROR_COLOR
          );
        }
      )
    );
  }
}
