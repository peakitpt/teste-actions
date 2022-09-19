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
import {
  CuriaMinistriesAndOrdersService,
  NumerationsService,
} from '@peakitpt/ui-kyrios-api';

import {
  getCuriaMinistriesAndOrdersList,
  getCuriaMinistriesAndOrdersListEntirely,
} from '../reducers/curia-ministries-and-orders.selectors';
import { getSelectedCuriaMinistriesAndOrders } from './../reducers/curia-ministries-and-orders.selectors';
import * as actions from '../reducers/curia-ministries-and-orders.actions';
import {
  CuriaMinistryAndOrderResponse,
  CuriaMinistryAndOrder,
} from '../curia-ministry-and-order.model';
import { ofType } from '@ngrx/effects';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-curia-ministries-and-orders-list',
  templateUrl: './curia-ministries-and-orders-list.component.html',
})
export class CuriaMinistriesAndOrdersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'sacraments';
  modulePath = 'curia-ministries-and-orders';
  modelList$: Observable<CuriaMinistryAndOrderResponse>;
  selectedRows$: Observable<CuriaMinistryAndOrder[]>;
  viewName = 'CuriaMinistryAndOrder';

  selectorGetList = getCuriaMinistriesAndOrdersList;
  selectorGetSelected = getSelectedCuriaMinistriesAndOrders;
  selectorGetListEntirely = getCuriaMinistriesAndOrdersListEntirely;
  actionSetSelected = actions.SetSelectedCuriaMinistriesAndOrders;
  actionRequestGetAll = actions.RequestGetAllCuriaMinistriesAndOrders;
  actionRequestGetListEntirely =
    actions.RequestGetEntirelyCuriaMinistriesAndOrders;

  @ViewChild('typeDescriptionTemplate')
  typeDescriptionTemplate: TemplateRef<any>;

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
    public moduleService?: CuriaMinistriesAndOrdersService
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

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.type_description`
        ),
        template: this.typeDescriptionTemplate,
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
      },
      {
        id: 'function_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.function_description`
        ),
      },
      {
        id: 'place_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.place_description`
        ),
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
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CuriaMinistriesAndOrdersActionTypes
            .SuccessPostCuriaMinistryAndOrder,
          actions.CuriaMinistriesAndOrdersActionTypes
            .SuccessPutCuriaMinistryAndOrder,
          actions.CuriaMinistriesAndOrdersActionTypes
            .SuccessDeleteCuriaMinistryAndOrder
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  getSubscriptionReports() {
    super.getSubscriptionReports('CuriaMinistriesAndOrder');
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
