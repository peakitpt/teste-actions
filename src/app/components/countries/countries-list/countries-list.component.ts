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
import { CountriesService } from '@peakitpt/ui-kyrios-api';

import {
  getCountriesListEntirely,
  getSelectedCountries,
} from './../reducers/countries.selectors';
import { getCountriesList } from '../reducers/countries.selectors';
import * as actions from '../reducers/countries.actions';
import { CountryResponse, Country } from '../country.model';
import { ofType } from '@ngrx/effects';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';

@Component({
  selector: 'kyr-countries-list',
  templateUrl: './countries-list.component.html',
})
export class CountriesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'places';
  modulePath = 'countries';
  viewName = 'Country';
  modelList$: Observable<CountryResponse>;
  selectedRows$: Observable<Country[]>;

  selectorGetList = getCountriesList;
  selectorGetSelected = getSelectedCountries;
  selectorGetListEntirely = getCountriesListEntirely;
  actionSetSelected = actions.SetSelectedCountries;
  actionRequestGetAll = actions.RequestGetAllCountries;
  actionRequestGetListEntirely = actions.RequestGetEntirelyCountries;

  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

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
    public countriesService: CountriesService,
    private baseStore: Store<BaseState.State>
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
      countriesService
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCanEdit();
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CountriesActionTypes.SuccessPostCountry,
          actions.CountriesActionTypes.SuccessPutCountry,
          actions.CountriesActionTypes.SuccessDeleteCountry
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
        title: this.i18nextPipe.transform(`${this.modulePath}:name`),
      },
      {
        id: 'name_official',
        title: this.i18nextPipe.transform(`${this.modulePath}:officialName`),
      },
      {
        id: 'cioc',
        title: this.i18nextPipe.transform(`${this.modulePath}:commonCode`),
      },
      {
        id: 'cca2',
        title: this.i18nextPipe.transform(`${this.modulePath}:officialCode1`),
      },
      {
        id: 'cca3',
        title: this.i18nextPipe.transform(`${this.modulePath}:officialCode2`),
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform(`${this.modulePath}:validated`),
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

    this.smallScreenTableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'cca2',
        title: this.i18nextPipe.transform(`${this.modulePath}:officialCode1`),
      },
    ];
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
          }
        })
    );
  }

  canEditCountry(): boolean {
    // KYR-3884: If the user has access, it can automatically edit countries

    // if (this.canEdit.isSuperUser) {
    //   return true;
    // }
    // return false;
    return true;
  }

  canDeleteCountry(): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return false;
  }

  updateMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (this.canDeleteCountry()) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
  }
}
