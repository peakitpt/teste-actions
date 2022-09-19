import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
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
import { FormationsService } from '@peakitpt/ui-kyrios-api';

import {
  getFormationsList,
  getFormationsListEntirely,
} from '../reducers/formations.selectors';
import { getSelectedFormations } from './../reducers/formations.selectors';
import * as actions from '../reducers/formations.actions';
import { FormationResponse, Formation } from '../formation.model';

@Component({
  selector: 'kyr-formations-list',
  templateUrl: './formations-list.component.html',
})
export class FormationsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'formations';
  viewName = 'Formation';
  modelList$: Observable<FormationResponse>;
  selectedRows$: Observable<Formation[]>;

  selectorGetList = getFormationsList;
  selectorGetSelected = getSelectedFormations;
  selectorGetListEntirely = getFormationsListEntirely;
  actionSetSelected = actions.SetSelectedFormations;
  actionRequestGetAll = actions.RequestGetAllFormations;
  actionRequestGetListEntirely = actions.RequestGetEntirelyFormations;

  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

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
    public moduleService?: FormationsService
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

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'formations_type_description',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.type`),
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
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'formations_type_description',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.type`),
      },
    ];
  }
}
