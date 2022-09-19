import {
  getCatholicDirectoryInstitutionsListEntirely,
  getSelectedCatholicDirectoryInstitutions,
} from './../reducers/catholic-directory-institutions.selectors';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CatholicDirectoryInstitutionsService } from '@peakitpt/ui-kyrios-api';

import { getCatholicDirectoryInstitutionsList } from '../reducers/catholic-directory-institutions.selectors';
import * as actions from '../reducers/catholic-directory-institutions.actions';
import {
  CatholicDirectoryInstitutionResponse,
  CatholicDirectoryInstitution,
} from '../catholic-directory-institution.model';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from '../../base/reducers/base.actions';

@Component({
  selector: 'kyr-catholic-directory-institutions-list',
  templateUrl: './catholic-directory-institutions-list.component.html',
})
export class CatholicDirectoryInstitutionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'catholic_directory';
  modulePath = 'catholic-directory-institutions';
  modelList$: Observable<CatholicDirectoryInstitutionResponse>;
  selectedRows$: Observable<CatholicDirectoryInstitution[]>;
  viewName = 'CatholicDirectoryInstitution';

  selectorGetList = getCatholicDirectoryInstitutionsList;
  selectorGetSelected = getSelectedCatholicDirectoryInstitutions;
  selectorGetListEntirely = getCatholicDirectoryInstitutionsListEntirely;
  actionSetSelected = actions.SetSelectedCatholicDirectoryInstitutions;
  actionRequestGetAll = actions.RequestGetAllCatholicDirectoryInstitutions;
  actionRequestGetListEntirely =
    actions.RequestGetEntirelyCatholicDirectoryInstitutions;

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
    public moduleService?: CatholicDirectoryInstitutionsService
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
          false
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'institution_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.institution_type_description`
        ),
      },
      {
        id: 'entity__entity_ekklesia_location__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__entity_ekklesia_location__name`
        ),
      },
      {
        id: 'chapelry_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.chapelry_description`
        ),
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'institution_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.institution_type_description`
        ),
      },
    ];
  }
}
