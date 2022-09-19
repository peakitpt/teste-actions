import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TableComponent } from '@peakitpt/ui-material';

import {
  getArchpristshipsList,
  getArchpristshipsListEntirely,
  getSelectedArchpristships,
} from '../reducers/archpristships.selectors';
import * as actions from '../reducers/archpristships.actions';
import { Archpristship, ArchpristshipResponse } from '../archpristship.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ArchpristshipsService } from '@peakitpt/ui-kyrios-api';

import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-archpristships-list',
  templateUrl: './archpristships-list.component.html',
})
export class ArchpristshipsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'places';
  modulePath = 'archpristships';
  viewName = 'Archpristship';
  modelList$: Observable<ArchpristshipResponse>;
  selectedRows$: Observable<Archpristship[]>;
  selectorGetList = getArchpristshipsList;
  selectorGetSelected = getSelectedArchpristships;
  selectorGetListEntirely = getArchpristshipsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyArchpristships;
  @ViewChild('table') table: TableComponent;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;
  @ViewChild('buttonsTemplate') buttonsTemplate: TemplateRef<any>;

  currentSubscription = +localStorage.getItem('subscriptionId');
  canEdit = {
    isSuperUser: false,
    isSubscriptionAdmin: false,
  };

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
    private baseStore: Store<BaseState.State>,
    private subscriptionService: SubscriptionsService,
    public moduleService: ArchpristshipsService
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
    this.searchFormStructure = [];
    this.setCanEdit();
    super.ngOnInit();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'country_description',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.country_description'
        ),
        isColumnStickyStart: true,
      },
      {
        id: 'diocese_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_relation_attributes.diocese_description'
        ),
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entity_description'
        ),
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform(this.modulePath + ':model.validated'),
        template: this.validatedTemplate,
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
    this.smallScreenTableColumns = [this.tableColumns[2], this.tableColumns[1]];
  }

  menuClick(event: any, data?: Archpristship) {
    switch (event) {
      case 'delete': {
        this.store.dispatch(new actions.SetSelected([data]));
        this.navigate(`/archpristships/${data.entity_id}/details/delete`);
        break;
      }
      case 'duplicate': {
        this.navigate(`/archpristships/${data.entity_id}/duplicate`);
        break;
      }
      default: {
        break;
      }
    }

    this.setLimit(event);
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
  }

  setCanEdit() {
    this.subs.push(
      this.baseStore
        .select(BaseSelectors.getUserInfo)
        .subscribe(async (r: any) => {
          if (r) {
            const isSuperUser = this.sharedModule.checkIfEntityType(
              SharedModule.USER_SUPERUSERS,
              r.payload.user.entity
            );
            this.canEdit.isSuperUser = isSuperUser;
            const isSubscriptionAdmin =
              await this.subscriptionService.isSubscriptionAdmin();
            this.canEdit.isSubscriptionAdmin = isSubscriptionAdmin;
          }
        })
    );
  }

  canEditArchpristship(archpristshipData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      archpristshipData &&
      [archpristshipData.entity_id, archpristshipData.diocese_id].includes(
        this.currentSubscription
      )
    );
  }

  updateMenu(data) {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (this.canEditArchpristship(data)) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
  }
}
