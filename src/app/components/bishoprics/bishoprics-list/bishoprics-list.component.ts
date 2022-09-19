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
  getBishopricsList,
  getBishopricsListEntirely,
  getSelectedBishoprics,
} from '../reducers/bishoprics.selectors';
import * as actions from '../reducers/bishoprics.actions';
import { Bishopric, BishopricResponse } from '../bishopric.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { BishopricsService } from '@peakitpt/ui-kyrios-api';

import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-bishoprics-list',
  templateUrl: './bishoprics-list.component.html',
})
export class BishopricsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'places';
  modulePath = 'bishoprics';
  viewName = 'Bishopric';
  modelList$: Observable<BishopricResponse>;

  selectedRows$: Observable<Bishopric[]>;
  selectorGetList = getBishopricsList;
  selectorGetSelected = getSelectedBishoprics;
  selectorGetListEntirely = getBishopricsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyBishoprics;

  @ViewChild('table') table: TableComponent;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;
  @ViewChild('isArchdioceseTemplate') isArchdioceseTemplate: TemplateRef<any>;
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
    public moduleService: BishopricsService
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
    this.setCanEdit();
    this.searchFormStructure = [];
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'country_description',
        title: this.i18nextPipe.transform(
          'bishoprics:model.country_description'
        ),
        isColumnStickyStart: true,
      },
      {
        id: 'district',
        title: this.i18nextPipe.transform('bishoprics:model.district'),
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          'bishoprics:model.entity_description'
        ),
      },
      {
        id: 'is_archdiocese',
        title: this.i18nextPipe.transform('bishoprics:model.is_archdiocese'),
        template: this.isArchdioceseTemplate,
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform('bishoprics:model.validated'),
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

  menuClick(event: any, data?: Bishopric) {
    switch (event) {
      case 'delete': {
        this.store.dispatch(new actions.SetSelected([data]));
        this.navigate(`/bishoprics/${data.entity_id}/details/delete`);
        break;
      }
      case 'duplicate': {
        this.navigate(`/bishoprics/${data.entity_id}/duplicate`);
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

  canEditBishopric(bishopricData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      bishopricData &&
      [bishopricData.entity_id].includes(this.currentSubscription)
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
    if (this.canEditBishopric(data)) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
  }
}
