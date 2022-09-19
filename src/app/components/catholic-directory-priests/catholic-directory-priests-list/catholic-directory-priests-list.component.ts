import {
  getCatholicDirectoryPriestsListEntirely,
  getSelectedCatholicDirectoryPriests,
} from './../reducers/catholic-directory-priests.selectors';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
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
import { CatholicDirectoryPriestsService } from '@peakitpt/ui-kyrios-api';

import { getCatholicDirectoryPriestsList } from '../reducers/catholic-directory-priests.selectors';
import * as actions from '../reducers/catholic-directory-priests.actions';
import {
  CatholicDirectoryPriestResponse,
  CatholicDirectoryPriest,
} from '../catholic-directory-priest.model';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from '../../base/reducers/base.actions';

@Component({
  selector: 'kyr-catholic-directory-priests-list',
  templateUrl: './catholic-directory-priests-list.component.html',
})
export class CatholicDirectoryPriestsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'catholic_directory';
  modulePath = 'catholic-directory-priests';
  modelList$: Observable<CatholicDirectoryPriestResponse>;
  selectedRows$: Observable<CatholicDirectoryPriest[]>;
  viewName = 'CatholicDirectoryPriest';

  selectorGetList = getCatholicDirectoryPriestsList;
  selectorGetSelected = getSelectedCatholicDirectoryPriests;
  selectorGetListEntirely = getCatholicDirectoryPriestsListEntirely;
  actionSetSelected = actions.SetSelectedCatholicDirectoryPriests;
  actionRequestGetAll = actions.RequestGetAllCatholicDirectoryPriests;
  actionRequestGetListEntirely =
    actions.RequestGetEntirelyCatholicDirectoryPriests;

  @ViewChild('priestBirthDateTemplate')
  priestBirthDateTemplate: TemplateRef<any>;
  @ViewChild('ordinationDateTemplate') ordinationDateTemplate: TemplateRef<any>;

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
    public moduleService?: CatholicDirectoryPriestsService
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
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__name`
        ),
      },
      {
        id: 'clergy_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.clergy_type_description`
        ),
      },
      {
        id: 'entity__entity_ekklesia_location__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__entity_ekklesia_location__name`
        ),
      },
      {
        id: 'priest_birth_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.priest_birth_date`
        ),
        template: this.priestBirthDateTemplate,
      },
      {
        id: 'ordination_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.ordination_date`
        ),
        template: this.ordinationDateTemplate,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__name`
        ),
      },
      {
        id: 'clergy_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.clergy_type_description`
        ),
      },
      {
        id: 'entity__entity_ekklesia_location__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__entity_ekklesia_location__name`
        ),
      },
    ];
  }
}
