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

import { Chapelry } from '../chapelry.model';
import * as actions from '../reducers/chapelries.actions';
import { State } from '../reducers/chapelries.reducer';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { getChapelry } from '../reducers/chapelries.selectors';

import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BaseDetailsPermissionsComponent } from 'src/app/shared/components/base-details-permissions-component';
import { environment } from 'src/environments/environment';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-chapelries-details',
  templateUrl: './chapelries-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ChapelriesDetailsComponent
  extends BaseDetailsPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subs: Subscription[] = [];
  model$: Observable<Chapelry>;
  model: any;
  modulePath = 'chapelries';
  viewName = 'Chapelry';
  returnUrl = '/chapelries';
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

  id: number;
  isLoading = true;
  isSaving = false;

  headerOptionsMenu: any[] = [];
  detailsTabs: any[] = [];
  personsModalMenu: any[] = [];

  selectedModalPerson$: Observable<SelectedModalRow>;
  reportsGroupsSelected$: Observable<any>;
  permissionsAttributesColumns: any[];
  massSchedulesColumns: any[];
  nominationsColumns: any[];

  massFrequency = this.sharedModule.getFrequencies().map((i) => i.label);
  weekdays = this.sharedModule.getWeekdays().map((i) => i.label);
  months = this.sharedModule.getMonths().map((i) => i.label);
  isSuperUser = false;
  baseFilePath = environment.railsAppUrl;

  // Selectors & actions
  actionRequestFail = actions.ChapelriesActionTypes.RequestFail;
  // Selectors & actions END

  @ViewChild('modal') modal: DialogComponent;
  @ViewChild('chapelryTemplate') chapelryTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesTemplate')
  permissionsModulesTemplate: TemplateRef<any>;
  @ViewChild('statisticDataTemplate') statisticDataTemplate: TemplateRef<any>;

  @ViewChild('permissionsModulesTemplateCheckbox')
  permissionsModulesTemplateCheckbox: TemplateRef<any>;
  @ViewChild('permissionsAttributesCheckboxTemplate')
  permissionsAttributesCheckboxTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesApp')
  permissionsModulesApp: TemplateRef<any>;
  @ViewChild('permissionsModulesModule')
  permissionsModulesModule: TemplateRef<any>;
  @ViewChild('monthsTableTemplate') monthsTableTemplate: TemplateRef<any>;
  @ViewChild('massesSchedulesTemplate')
  massesSchedulesTemplate: TemplateRef<any>;
  @ViewChild('massStartDateTableTemplate')
  massStartDateTableTemplate: TemplateRef<any>;
  @ViewChild('massEndDateTableTemplate')
  massEndDateTableTemplate: TemplateRef<any>;
  @ViewChild('nominationsStartDateTableTemplate')
  nominationsStartDateTableTemplate: TemplateRef<any>;
  @ViewChild('nominationsEndDateTableTemplate')
  nominationsEndDateTableTemplate: TemplateRef<any>;
  @ViewChild('nominationsTemplate') nominationsTemplate: TemplateRef<any>;
  @ViewChild('weekdaysTableTemplate') weekdaysTableTemplate: TemplateRef<any>;
  @ViewChild('frequencyTableTemplate') frequencyTableTemplate: TemplateRef<any>;
  @ViewChild('confessionsTableTemplate')
  confessionsTableTemplate: TemplateRef<any>;

  currentSubscription = +localStorage.getItem('subscriptionId');
  canEdit = {
    isSuperUser: false,
    isSubscriptionAdmin: false,
  };

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

  ngOnInit() {
    this.setCanEdit();
    const duplicateMode = this.sharedModule.isDuplicateMode(this.route);

    this.subs.push(
      this.route.params.subscribe((params) => {
        this.isLoading = true;

        if (params.id) {
          if (duplicateMode) {
            this.id = null;
          } else {
            this.id = +params.id;
            this.headerOptionsMenu.push({
              name: this.i18nextPipe.transform('translation:action.delete'),
              value: 'delete',
              icon: 'delete',
            });
          }

          this.model$ = this.store.select(getChapelry);
          this.store.dispatch(new actions.RequestGet(+params.id));

          this.subs.push(
            this.model$.subscribe((obj: Chapelry) => {
              if (obj) {
                this.model = obj;
                this.fillPermissionsDataSource(
                  this.model.subscription_modules_permission_attributes
                );
                if (
                  this.model.masses_schedules_attributes &&
                  this.model.masses_schedules_attributes.length
                ) {
                  this.addTabs(
                    this.i18nextPipe.transform(
                      'chapelries:tabs.masses_schedules'
                    ),
                    this.massesSchedulesTemplate
                  );
                }
                if (
                  this.model.entity_priest_appointments_attributes &&
                  this.model.entity_priest_appointments_attributes.length
                ) {
                  this.addTabs(
                    this.i18nextPipe.transform('chapelries:tabs.nominations'),
                    this.nominationsTemplate
                  );
                }
                this.isLoading = false;
              }
            })
          );
        } else {
          this.isLoading = false;
        }
      })
    );

    this.subs.push(
      this.baseStore.select(BaseSelectors.getUserInfo).subscribe((r: any) => {
        if (r) {
          this.isSuperUser = this.sharedModule.checkIfEntityType(
            SharedModule.USER_SUPERUSERS,
            r.payload.user.entity
          );
          this.forSuperUserOnly();
        }
      })
    );
  }

  private addTabs(tabName: string, tabTemplate: TemplateRef<any>) {
    const tab: Tab = {
      textLabel: tabName,
      templateContent: tabTemplate,
    };
    const permissionsExist = this.detailsTabs.find(
      (t: Tab) =>
        t.textLabel ===
        this.i18nextPipe.transform('chapelries:tabs.permissions_modules')
    );

    if (permissionsExist) {
      this.detailsTabs.splice(this.detailsTabs.length - 1, 0, tab);
    } else {
      this.detailsTabs.push(tab);
    }
  }

  forSuperUserOnly() {
    if (this.detailsTabs && this.detailsTabs.length && this.isSuperUser) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          'chapelries:tabs.permissions_modules'
        ),
        templateContent: this.permissionsModulesTemplate,
      });
    }
  }

  ngAfterViewInit() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform('chapelries:tabs.chapelry'),
        templateContent: this.chapelryTemplate,
      },
    ];
    this.forSuperUserOnly();
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
        title: this.i18nextPipe.transform('archpristships:header.module'),
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

    this.personsModalMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: 'clear_modal',
        icon: 'clear',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: 'view_selected_person',
        icon: 'preview',
      },
    ];

    this.massSchedulesColumns = [
      {
        id: 'worshipplace_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.masses_schedules_attributes.worshipplace_description'
        ),
        sortable: false,
      },
      {
        id: 'frequency',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.frequency'
        ),
        template: this.frequencyTableTemplate,
        sortable: false,
      },
      {
        id: 'start_hour',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.start_hour'
        ),
        sortable: false,
      },
      {
        id: 'end_hour',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.end_hour'
        ),
        sortable: false,
      },
      {
        id: 'months',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.months'
        ),
        template: this.monthsTableTemplate,
        sortable: false,
      },
      {
        id: 'weekdays',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.weekdays'
        ),
        template: this.weekdaysTableTemplate,
        sortable: false,
      },
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.start_date'
        ),
        template: this.massStartDateTableTemplate,
        sortable: false,
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.end_date'
        ),
        template: this.massEndDateTableTemplate,
        sortable: false,
      },
      {
        id: 'for_confessions',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.for_confessions'
        ),
        template: this.confessionsTableTemplate,
        sortable: false,
      },
    ];

    this.nominationsColumns = [
      {
        id: 'entity_name',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.entity_name'
        ),
        sortable: false,
      },
      {
        id: 'curia_function_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.curia_function_description'
        ),
        sortable: false,
      },
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.start_date'
        ),
        template: this.nominationsStartDateTableTemplate,
        sortable: false,
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.end_date'
        ),
        template: this.nominationsEndDateTableTemplate,
        sortable: false,
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.description'
        ),
        sortable: false,
      },
    ];

    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    this.modal.open();
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

  setCanEdit() {
    this.subs.push(
      this.baseStore
        .select(BaseSelectors.getUserInfo)
        .subscribe(async (r: any) => {
          if (r) {
            const isSuperUser = this.sharedModule.checkIfEntityType(
              SharedModule.USER_SUPERUSERS,
              r.payload.user.entity
            );
            this.canEdit.isSuperUser = isSuperUser;
            const isSubscriptionAdmin =
              await this.subscriptionService.isSubscriptionAdmin();
            this.canEdit.isSubscriptionAdmin = isSubscriptionAdmin;
          }
        })
    );
  }

  canEditChapelry(chapelryData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      chapelryData &&
      [
        chapelryData.entity_id,
        chapelryData.diocese_id,
        chapelryData.archpriestship_id,
      ].includes(this.currentSubscription)
    );
  }

  updateMenu(data) {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (this.canEditChapelry(data)) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
  }
}
