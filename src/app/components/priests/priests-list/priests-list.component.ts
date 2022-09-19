import {
  getPriestsListEntirely,
  getSelectedPriests,
} from '../reducers/priests.selectors';
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
import { PriestsService } from '@peakitpt/ui-kyrios-api';

import { getPriestsList } from '../reducers/priests.selectors';
import * as actions from '../reducers/priests.actions';
import { PriestResponse, Priest } from '../priest.model';

@Component({
  selector: 'kyr-priests-list',
  templateUrl: './priests-list.component.html',
})
export class PriestsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'priests';
  modelList$: Observable<PriestResponse>;
  selectedRows$: Observable<Priest[]>;
  viewName = 'Priest';

  selectorGetList = getPriestsList;
  selectorGetSelected = getSelectedPriests;
  selectorGetListEntirely = getPriestsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('entity__disabledTemplate')
  entity__disabledTemplate: TemplateRef<any>;
  @ViewChild('entityCompleteRelationTemplate')
  entityCompleteRelationTemplate: TemplateRef<any>;
  @ViewChild('deceasedTemplate') deceasedTemplate: TemplateRef<any>;
  @ViewChild('changesrequestTemplate') changesrequestTemplate: TemplateRef<any>;

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
    public moduleService?: PriestsService
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

  ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(new actions.ClearGetAll());
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.name`
        ),
      },
      {
        id: 'priest_birth_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.priest_birth_date`
        ),
      },
      {
        id: 'ordination_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.ordination_date`
        ),
      },
      {
        id: 'clergy_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.clergy_type_description`
        ),
      },
      {
        id: 'deceased',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.deceased`),
        template: this.deceasedTemplate,
      },
      {
        id: 'entity__disabled',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.disabled`
        ),
        template: this.entity__disabledTemplate,
      },
      {
        id: 'changes_request',
        title: '',
        template: this.changesrequestTemplate,
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
        id: 'entity.name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.name`
        ),
      },
      {
        id: 'clergy_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.clergy_type_description`
        ),
      },
    ];
  }
}
