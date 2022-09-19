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
  getChapelriesList,
  getChapelriesListEntirely,
  getSelectedChapelries,
} from '../reducers/chapelries.selectors';
import * as actions from '../reducers/chapelries.actions';
import { Chapelry, ChapelryResponse } from '../chapelry.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ChapelriesService } from '@peakitpt/ui-kyrios-api';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';

@Component({
  selector: 'kyr-chapelries-list',
  templateUrl: './chapelries-list.component.html',
})
export class ChapelriesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'places';
  modulePath = 'chapelries';
  viewName = 'Chapelry';
  modelList$: Observable<ChapelryResponse>;
  selectedRows$: Observable<Chapelry[]>;
  selectorGetList = getChapelriesList;
  selectorGetSelected = getSelectedChapelries;
  selectorGetListEntirely = getChapelriesListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyChapelries;
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
    public moduleService: ChapelriesService
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
        id: 'archpriestship_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_relation_attributes.archpriestship_description'
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
    this.smallScreenTableColumns = [this.tableColumns[3], this.tableColumns[2]];
  }

  menuClick(event: any, data?: Chapelry) {
    switch (event) {
      case 'delete': {
        this.store.dispatch(new actions.SetSelected([data]));
        this.navigate(`/chapelries/${data.entity_id}/details/delete`);
        break;
      }
      case 'duplicate': {
        this.navigate(`/chapelries/${data.entity_id}/duplicate`);
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

  canEditChapelry(chapelryData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      chapelryData &&
      [
        chapelryData.entity_id,
        chapelryData.diocese_id,
        chapelryData.archpriestship_id,
      ].includes(this.currentSubscription)
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
    if (this.canEditChapelry(data)) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
  }
}
