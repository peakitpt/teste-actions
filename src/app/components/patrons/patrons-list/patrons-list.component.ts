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
  getPatronsList,
  getPatronsListEntirely,
  getSelectedPatrons,
} from '../reducers/patrons.selectors';
import * as actions from '../reducers/patrons.actions';
import { Patron, PatronResponse } from '../patrons.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { PatronsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-patrons-list',
  templateUrl: './patrons-list.component.html',
})
export class PatronsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'patrons';
  modelList$: Observable<PatronResponse>;
  selectedRows$: Observable<Patron[]>;
  selectorGetList = getPatronsList;
  selectorGetSelected = getSelectedPatrons;
  selectorGetListEntirely = getPatronsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyPatrons;
  @ViewChild('table') table: TableComponent;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;
  @ViewChild('buttonsTemplate') buttonsTemplate: TemplateRef<any>;

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
    public moduleService?: PatronsService
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
        id: 'name',
        title: this.i18nextPipe.transform(this.modulePath + ':model.name'),
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
    this.smallScreenTableColumns = [this.tableColumns[0], this.tableColumns[1]];
  }

  menuClick(event: any, data?: Patron) {
    switch (event) {
      case 'delete': {
        this.store.dispatch(new actions.SetSelected([data]));
        this.navigate(`/patrons/${data.id}/delete`);
        break;
      }
      case 'duplicate': {
        this.navigate(`/patrons/${data.id}/duplicate`);
        break;
      }
      default: {
        break;
      }
    }

    this.setLimit(event);
  }
}
