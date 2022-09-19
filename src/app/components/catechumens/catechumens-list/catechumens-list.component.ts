import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {
  CatechumensService,
  NumerationsService,
} from '@peakitpt/ui-kyrios-api';
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
  getCatechumensList,
  getCatechumensListEntirely,
  getSelectedCatechumens,
} from '../reducers/catechumens.selectors';
import * as actions from '../reducers/catechumens.actions';
import { CatechumenResponse, Catechumen } from '../catechumen.model';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-catechumens-list',
  templateUrl: './catechumens-list.component.html',
})
export class CatechumensListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'sacraments';
  modulePath = 'catechumens';
  modelList$: Observable<CatechumenResponse>;
  selectedRows$: Observable<Catechumen[]>;
  viewName = 'Catechumen';

  selectorGetList = getCatechumensList;
  selectorGetListEntirely = getCatechumensListEntirely;
  selectorGetSelected = getSelectedCatechumens;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  @ViewChild('admissionDateTemplate') admissionDateTemplate: TemplateRef<any>;

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
    public moduleService?: CatechumensService
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
    this.checkIfHasNumerations();
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CatechumensActionTypes.SuccessPost,
          actions.CatechumensActionTypes.SuccessPut,
          actions.CatechumensActionTypes.SuccessDelete,
          actions.CatechumensActionTypes.SuccessBulkDelete
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
        id: 'entity_catechumen_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_catechumen_description`
        ),
      },
      {
        id: 'date',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.date`),
        template: this.dateTemplate,
      },
      {
        id: 'admission_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.admission_date`
        ),
        template: this.admissionDateTemplate,
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
    ];
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
