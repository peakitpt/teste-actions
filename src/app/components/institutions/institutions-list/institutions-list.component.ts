import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { InstitutionsService } from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getInstitutionsList,
  getInstitutionsListEntirely,
  getSelectedInstitutions,
} from '../reducers/institutions.selectors';
import * as actions from '../reducers/institutions.actions';
import { InstitutionResponse, Institution } from '../institution.model';

@Component({
  selector: 'kyr-institutions-list',
  templateUrl: './institutions-list.component.html',
})
export class InstitutionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'institutions';
  modelList$: Observable<InstitutionResponse>;
  selectedRows$: Observable<Institution[]>;
  viewName = 'Institution';

  selectorGetList = getInstitutionsList;
  selectorGetListEntirely = getInstitutionsListEntirely;
  selectorGetSelected = getSelectedInstitutions;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  @ViewChild('baptismDateTemplate') baptismDateTemplate: TemplateRef<any>;
  @ViewChild('entityDisabledTemplate') entityDisabledTemplate: TemplateRef<any>;

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.InstitutionsActionTypes.SuccessPost,
          actions.InstitutionsActionTypes.SuccessPut,
          actions.InstitutionsActionTypes.SuccessDelete,
          actions.InstitutionsActionTypes.SuccessBulkDelete,
          actions.InstitutionsActionTypes.SuccessSendToCuria
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

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
    public moduleService?: InstitutionsService
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
        id: 'entity_id',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.entity_id`),
      },
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.name`
        ),
      },
      {
        id: 'chapelry_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.chapelry_description`
        ),
      },
      {
        id: 'institution_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.institution_type_description`
        ),
      },
      {
        id: 'entity__disabled',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.disabled`
        ),
        template: this.entityDisabledTemplate,
      },
      {
        id: 'buttons',
        title: '',
        sortable: false,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
        width: '50px',
      },
    ];

    this.smallScreenTableColumns = [
      this.tableColumns[2],
      this.tableColumns[5],
      this.tableColumns[6],
    ];
  }

  // columnOrdinationEvent(event: { active: string; direction: string }) {
  //   this.page = 1;
  //   this.sort = event.active == 'entity__name' ? 'entity.name' : event.active;
  //   this.order = event.direction;
  //   this.refreshTable();
  // }

  columnOrdinationEvent(event: { active: string; direction: string }) {
    switch (event.active) {
      case 'entity__name':
        event.active = 'entity.name';
        break;
      case 'entity__disabled':
        event.active = 'entity.disabled';
        break;
    }
    super.columnOrdinationEvent(event);
  }

  openInstitutionTypesPage() {
    window.open('institution-types');
  }
}
