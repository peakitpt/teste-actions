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
  getBishopricIntegratedViewsList,
  getBishopricIntegratedViewsListEntirely,
  getSelectedBishopricIntegratedViews,
} from '../reducers/bishopric-integrated-views.selectors';
import * as actions from '../reducers/bishopric-integrated-views.actions';
import {
  BishopricIntegratedView,
  BishopricIntegratedViewResponse,
} from '../bishopric-integrated-view.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { BishopricIntegratedViewsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-bishopric-integrated-views-list',
  templateUrl: './bishopric-integrated-views-list.component.html',
})
export class BishopricIntegratedViewsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'bishopric-integrated-views';
  viewName = 'BishopricIntegratedView';
  sideNavMainButton = false;

  modelList$: Observable<BishopricIntegratedViewResponse>;

  selectedRows$: Observable<BishopricIntegratedView[]>;
  selectorGetList = getBishopricIntegratedViewsList;
  selectorGetSelected = getSelectedBishopricIntegratedViews;
  selectorGetListEntirely = getBishopricIntegratedViewsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely =
    actions.RequestGetEntirelyBishopricIntegratedViews;

  @ViewChild('table') table: TableComponent;

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
    public moduleService: BishopricIntegratedViewsService
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
    this.searchFormStructure = [];
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entity_description'
        ),
      },
    ];
    this.smallScreenTableColumns = [this.tableColumns[0]];
  }
}
