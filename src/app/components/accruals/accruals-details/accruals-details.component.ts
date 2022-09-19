import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accruals.actions';
import { getAccrual } from '../reducers/accruals.selectors';
import { Observable } from 'rxjs';
import { Accrual, AccrualsTypesEmolument } from '../accrual.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { result } from 'lodash';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { AccrualsTypesService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-accruals-details',
  templateUrl: './accruals-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccrualsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Accrual>;
  returnUrl = '/accruals';
  modulePath = 'accruals';
  viewName = 'Accrual';

  selectorGetModel = getAccrual;
  actionRequestFail = actions.AccrualsActionTypes.RequestFailAccruals;
  actionRequestGetOne = actions.RequestGetAccrual;

  accrualsTypes: any = {};
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
    public snackBarService: SnackBarService,
    private accrualsTypesService: AccrualsTypesService
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
    this.getAccrualsTypes();
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

  private getAccrualsTypes() {
    const payload = {
      limit: 'none',
    };

    this.subs.push(
      this.accrualsTypesService.getAll(payload).subscribe((r) => {
        r.results.forEach((accrualType: Accrual) => {
          this.accrualsTypes[accrualType.document_to_generate_serie_id] =
            accrualType.document_to_generate_serie_description;
        });
      })
    );
  }

  calculateGrandTotal(list: AccrualsTypesEmolument[]): number {
    let result: number = 0;

    list.forEach((emolument: AccrualsTypesEmolument) => {
      result += +emolument.total;
    });
    return result;
  }
}
