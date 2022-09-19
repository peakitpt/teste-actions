import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { DialogComponent, SnackBarService, Tab } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable, Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { BishopricIntegratedView } from '../bishopric-integrated-view.model';
import * as actions from '../reducers/bishopric-integrated-views.actions';
import { State } from '../reducers/bishopric-integrated-views.reducer';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';

import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { getBishopricIntegratedView } from '../reducers/bishopric-integrated-views.selectors';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-bishopric-integrated-views-details',
  templateUrl: './bishopric-integrated-views-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BishopricIntegratedViewsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subs: Subscription[] = [];
  model$: Observable<BishopricIntegratedView>;
  model: any;
  modulePath = 'bishopric-integrated-views';
  viewName = 'BishopricIntegratedView';
  returnUrl = '/bishopric-integrated-views';

  id: number;
  isLoading = false;
  isSaving = false;

  headerOptionsMenu: any[] = [];
  detailsTabs: any[] = [];
  personsModalMenu: any[] = [];

  selectedModalPerson$: Observable<SelectedModalRow>;
  reportsGroupsSelected$: Observable<any>;
  permissionsAttributesColumns: any[];
  massSchedulesColumns: any[];
  nominationsColumns: any[];

  isSuperUser = false;
  baseFilePath = environment.railsAppUrl;

  accountingChartAccountBalancesData = [];
  accountingChartAccountBalancesDataFiltered = [];
  accountingChartAccountBalancesColumns = [];
  yearForm: FormControl;

  // Selectors & actions
  selectorGetModel = getBishopricIntegratedView;
  actionRequestGetOne = actions.RequestGet;
  actionRequestFail = actions.BishopricIntegratedViewsActionTypes.RequestFail;
  // Selectors & actions END

  @ViewChild('modal') modal: DialogComponent;
  @ViewChild('bishopricIntegratedViewTemplate')
  bishopricIntegratedViewTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesTemplate')
  permissionsModulesTemplate: TemplateRef<any>;
  @ViewChild('statisticDataTemplate') statisticDataTemplate: TemplateRef<any>;
  @ViewChild('creditTemplate') creditTemplate: TemplateRef<any>;
  @ViewChild('debitTemplate') debitTemplate: TemplateRef<any>;
  @ViewChild('balanceTemplate') balanceTemplate: TemplateRef<any>;

  currentSubscription = +localStorage.getItem('subscriptionId');

  constructor(
    public store: Store<State>,
    private baseStore: Store<BaseState.State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public i18nextPipe: I18NextPipe,
    public matDialog: MatDialog,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private subscriptionService: SubscriptionsService,
    private fb: FormBuilder
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

  ngOnInit() {
    this.yearForm = this.fb.control(null);
    super.ngOnInit();
  }

  afterGetModel() {
    super.afterGetModel();
    this.accountingChartAccountBalancesData =
      this.model.accounting_chart_account_balances;
    this.accountingChartAccountBalancesDataFiltered =
      this.accountingChartAccountBalancesData;
    this.accountingChartAccountBalancesColumns = [
      {
        id: 'year',
        title: this.i18nextPipe.transform(this.modulePath + ':model.year'),
        filter: false,
        sortable: false,
      },
      {
        id: 'account_id',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.account_id'
        ),
        filter: false,
        sortable: false,
      },
      {
        id: 'account_description',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.account_description'
        ),
        filter: false,
        sortable: false,
      },
      {
        id: 'grouping_category',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.grouping_category'
        ),
        filter: false,
        sortable: false,
      },
      {
        id: 'period_total_credit',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.period_total_credit'
        ),
        filter: false,
        sortable: false,
        template: this.creditTemplate,
      },
      {
        id: 'period_total_debit',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.period_total_debit'
        ),
        filter: false,
        sortable: false,
        template: this.debitTemplate,
      },
      {
        id: 'period_balance',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.period_balance'
        ),
        filter: false,
        sortable: false,
        template: this.balanceTemplate,
      },
    ];
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    this.modal.close();
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
  }

  onYearSearchClick() {
    this.accountingChartAccountBalancesDataFiltered =
      this.accountingChartAccountBalancesData.filter((i) =>
        i.year.includes(this.yearForm.value)
      );
  }
}
