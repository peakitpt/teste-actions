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
import { TreasuryLocationsService } from '@peakitpt/ui-kyrios-api';

import {
  getTreasuryLocationsListEntirely,
  getSelectedTreasuryLocations,
} from './../reducers/treasury-locations.selectors';
import { getTreasuryLocationsList } from '../reducers/treasury-locations.selectors';
import * as actions from '../reducers/treasury-locations.actions';
import {
  TreasuryLocationResponse,
  TreasuryLocation,
} from '../treasury-location.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-treasury-locations-list',
  templateUrl: './treasury-locations-list.component.html',
})
export class TreasuryLocationsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'treasury';
  modulePath = 'treasury-locations';
  viewName = 'TreasuryLocation';
  modelList$: Observable<TreasuryLocationResponse>;
  selectedRows$: Observable<TreasuryLocation[]>;

  selectorGetList = getTreasuryLocationsList;
  selectorGetSelected = getSelectedTreasuryLocations;
  selectorGetListEntirely = getTreasuryLocationsListEntirely;
  actionSetSelected = actions.SetSelectedTreasuryLocations;
  actionRequestGetAll = actions.RequestGetAllTreasuryLocations;
  actionRequestGetListEntirely = actions.RequestGetEntirelyTreasuryLocations;

  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;

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
    public moduleService?: TreasuryLocationsService
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
          actions.TreasuryLocationsActionTypes.SuccessPostTreasuryLocation,
          actions.TreasuryLocationsActionTypes.SuccessPutTreasuryLocation,
          actions.TreasuryLocationsActionTypes.SuccessDeleteTreasuryLocation
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

    this.smallScreenTableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
      },
    ];
  }
}
