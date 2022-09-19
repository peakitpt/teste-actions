import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Institution } from '../institution.model';
import * as actions from '../reducers/institutions.actions';
import { getInstitution } from '../reducers/institutions.selectors';
import { BaseDetailsPermissionsComponent } from 'src/app/shared/components/base-details-permissions-component';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { SnackBarService } from '@peakitpt/ui-material';
import { ActionsSubject, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import { State } from '../reducers/institutions.reducer';
import { getInstitutions } from 'src/app/shared/components/modals/institutions-modal/reducers/institutions-modal.selectors';

@Component({
  selector: 'kyr-institutions-details',
  templateUrl: './institutions-details.component.html',
  styleUrls: ['./institutions-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstitutionsDetailsComponent
  extends BaseDetailsPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Institution>;
  model: Institution;
  returnUrl = '/institutions';
  modulePath = 'institutions';
  viewName = 'Institution';

  modulePerms = [
    'accounting_balance_sheet',
    'accounting_chart_account',
    'accounting_cost_center',
    'accounting_exercise',
    'accounting_journal',
    'accounting_taxonomy_code',
    'accounting_taxonomy_reference',
    'accounting_transaction',
    'accounting_transaction_document_type',
    'accounting_transaction_line',
    'accounting_transaction_type',
    'accruals_accrual',
    'accruals_processment',
    'accruals_type',
    'acolyte',
    'admin_statistic',
    'archpriestship',
    'baptism',
    'bishopric',
    'calendar',
    'catechism',
    'catechisms_individual_document',
    'catechisms_session',
    'catechumen',
    'catholic_directory_institution',
    'catholic_directory_priest',
    'chapelry',
    'chrism',
    'chrisms_entity',
    'content',
    'country',
    'current_account',
    'current_accounts_line',
    'current_accounts_receipt',
    'dashboard',
    'death',
    'document',
    'documents_type',
    'emenu',
    'emolument',
    'emoluments_type',
    'event',
    'family',
    'formation',
    'formations_type',
    'gestdocument',
    'group',
    'institution_type',
    'mass_intention',
    'mass_intentions_type',
    'mec',
    'module_documentation_link',
    'newsletter',
    'newsletter_group_subscription',
    'newsletter_subscription',
    'newsletters_layout',
    'numeration',
    'numeration_view',
    'parishioner',
    'parishioner_process',
    'pastoral_agent',
    'patron',
    'profile_priest',
    'reader',
    'records_importer',
    'relationship_degree',
    'report',
    'reportmanagment',
    'reports_group',
    'reports_grouper',
    'reports_view',
    'section',
    'subscription',
    'subscription_setting',
    'subscription_statistic',
    'subscription_user',
    'text_message',
    'treasury_location',
    'user',
    'websiteconfiguration',
    'wedding',
    'worshipplace',
    'acolytes_formation',
    'acolytes_renewal',
    'mecs_formation',
    'mecs_renewal',
    'pastoral_agents_type',
    'readers_formation',
    'readers_renewal',
  ];

  isLoading = true;

  // Selectors & actions
  selectorGetModel = getInstitution;
  actionRequestFail = actions.InstitutionsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.InstitutionsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.InstitutionsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  //permissionsAttributesDS: any = [];
  permissionsAttributesColumns: any = [];

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('appointmentsTabTemplate')
  appointmentsTabTemplate: TemplateRef<any>;

  @ViewChild('permissionsTabTemplate') permissionsTabTemplate: TemplateRef<any>;

  @ViewChild('permissionsModulesTemplateCheckbox')
  permissionsModulesTemplateCheckbox: TemplateRef<any>;
  @ViewChild('permissionsAttributesCheckboxTemplate')
  permissionsAttributesCheckboxTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesApp')
  permissionsModulesApp: TemplateRef<any>;
  @ViewChild('permissionsModulesModule')
  permissionsModulesModule: TemplateRef<any>;

  constructor(
    public store: Store<State>,
    public baseStore: Store<BaseState.State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public i18nextPipe: I18NextPipe,
    public matDialog: MatDialog,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private subscriptionService: SubscriptionsService
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

  afterGetModel() {
    super.afterGetModel();
    this.addTabs();
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.route.params.subscribe((params) => {
        this.isLoading = true;

        if (params.id) {
          this.model$ = this.store.select(getInstitution);
          this.store.dispatch(new actions.RequestGet(+params.id));
          this.subs.push(
            this.model$.subscribe((obj: Institution) => {
              if (obj) {
                this.model = obj;
                this.fillPermissionsDataSource(
                  this.model.entity.subscription_modules_permission_attributes
                );
              }
            })
          );
        } else this.isLoading = false;
      })
    );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.permissionsAttributesColumns = [
      {
        id: 'id',
        title: '#',
        sortable: false,
        template: this.permissionsModulesTemplateCheckbox,
        headerTemplate: this.permissionsAttributesCheckboxTemplate,
      },
      {
        id: 'module',
        title: this.i18nextPipe.transform(this.modulePath + ':header.module'),
        headerTemplate: this.permissionsModulesModule,
        sortable: false,
      },
      {
        id: 'app',
        title: this.i18nextPipe.transform(this.modulePath + ':header.app'),
        headerTemplate: this.permissionsModulesApp,
        sortable: false,
      },
    ];
  }

  private addTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.main_tab`
        ),
        templateContent: this.mainTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.nominations_tab`
        ),
        templateContent: this.appointmentsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.permissions_tab`
        ),
        templateContent: this.permissionsTabTemplate,
      },
    ];
  }
}
