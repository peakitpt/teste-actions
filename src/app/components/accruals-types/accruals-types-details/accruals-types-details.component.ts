import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accruals-types.actions';
import { getAccrualType } from '../reducers/accruals-types.selectors';
import { Observable } from 'rxjs';
import { AccrualsType, AccrualTypesEmolument } from '../accruals-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-accruals-types-details',
  templateUrl: './accruals-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccrualsTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccrualsType>;
  returnUrl = '/accruals-types';
  modulePath = 'accruals-types';
  viewName = 'AccrualType';

  selectorGetModel = getAccrualType;
  actionRequestFail = actions.AccrualTypesActionTypes.RequestFailAccrualTypes;
  actionRequestGetOne = actions.RequestGetAccrualType;

  periodicityTypeTranslator: any;
  detailsTabs: any[] = [];
  @ViewChild('generalTabsTemplate') generalTabsTemplate: TemplateRef<any>;
  @ViewChild('emolumentsTabsTemplate') emolumentsTabsTemplate: TemplateRef<any>;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.setPeriodicityTypes();
    this.detailsTabs.push(
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.general'
        ),
        templateContent: this.generalTabsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.emoluments'
        ),
        templateContent: this.emolumentsTabsTemplate,
      }
    );
  }

  setPeriodicityTypes() {
    this.periodicityTypeTranslator = {
      1: this.i18nextPipe.transform(`${this.modulePath}:options.yearly`),
      2: this.i18nextPipe.transform(`${this.modulePath}:options.quarterly`),
      3: this.i18nextPipe.transform(`${this.modulePath}:options.semiannual`),
      4: this.i18nextPipe.transform(`${this.modulePath}:options.monthly`),
      5: this.i18nextPipe.transform(`${this.modulePath}:options.weekly`),
      6: this.i18nextPipe.transform(`${this.modulePath}:options.other`),
    };
  }

  calculateGrandTotal(list: AccrualTypesEmolument[]): number {
    let result: number = 0;

    list.forEach((emolument: AccrualTypesEmolument) => {
      result += +emolument.total;
    });
    return result;
  }
}
