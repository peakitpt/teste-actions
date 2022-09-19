import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NumerationsService, PersonsService } from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getPersonsList,
  getPersonsListEntirely,
  getSelectedPersons,
} from '../reducers/persons.selectors';
import * as actions from '../reducers/persons.actions';
import { EntityPersonResponse, EntityPerson } from '../person.model';
import { environment } from 'src/environments/environment';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-persons-list',
  templateUrl: './persons-list.component.html',
})
export class PersonsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'persons';
  modelList$: Observable<EntityPersonResponse>;
  selectedRows$: Observable<EntityPerson[]>;
  viewName = 'Parishioner';

  selectorGetList = getPersonsList;
  selectorGetListEntirely = getPersonsListEntirely;
  selectorGetSelected = getSelectedPersons;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('birthDateTemplate') birthDateTemplate: TemplateRef<any>;
  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;
  @ViewChild('isParishionerTemplate') isParishionerTemplate: TemplateRef<any>;
  @ViewChild('isElderTemplate') isElderTemplate: TemplateRef<any>;
  @ViewChild('isCatechized') isCatechized: TemplateRef<any>;
  @ViewChild('isSickTemplate') isSickTemplate: TemplateRef<any>;

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
    public numerationsService: NumerationsService,
    public snackBarService: SnackBarService,
    public personsService?: PersonsService
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
      personsService
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.checkIfHasNumerations();
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.PersonsActionTypes.SuccessPost,
          actions.PersonsActionTypes.SuccessPut,
          actions.PersonsActionTypes.SuccessDelete,
          actions.PersonsActionTypes.SuccessBulkDelete
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
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.name`
        ),
        isColumnStickyStart: true,
        template: this.nameTemplate,
        minWidth: '200px',
      },
      {
        id: 'birth_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.birth_date`
        ),
        template: this.birthDateTemplate,
      },
      {
        id: 'disabled',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.disabled`
        ),
        template: this.disabledTemplate,
      },
      {
        id: 'is_parishioner',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.is_parishioner`
        ),
        template: this.isParishionerTemplate,
      },
      {
        id: 'elder',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.entity_elder_patient.elder`
        ),
        template: this.isElderTemplate,
      },
      {
        id: 'is_catechized',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.is_catechized`
        ),
        template: this.isCatechized,
      },
      {
        id: 'sick',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.entity_elder_patient.sick`
        ),
        template: this.isSickTemplate,
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
      this.tableColumns[1],
      this.tableColumns[2],
      this.tableColumns[3],
      this.tableColumns[4],
    ];
  }

  openRailsReport(file: any) {
    const reportFilters = {
      filters: this.filters,
      sort: this.sort,
      order: this.order,
    };

    let url = `${environment.railsAppUrl}/parishioners/report/printpdf?format=pdf&file=${file.filePath}`;
    url += `&filters=${btoa(JSON.stringify(reportFilters))}`;
    window.open(url);
  }

  checkIfHasNumerations(viewName: string = this.viewName) {
    this.subs.push(
      this.numerationsService.checkIfHasNumerations(viewName).subscribe((r) => {
        if (!r.has_numeration) {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(`numerations:message.needs_numeration`),
            this.sharedModule.ERROR_COLOR
          );
        }
      })
    );
  }
}
