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
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable, Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { Bishopric } from '../bishopric.model';
import { State } from '../reducers/bishoprics.reducer';
import { getBishopric } from '../reducers/bishoprics.selectors';

import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';

import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import * as actions from '../reducers/bishoprics.actions';
import { BaseDetailsPermissionsComponent } from 'src/app/shared/components/base-details-permissions-component';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-bishoprics-details',
  templateUrl: './bishoprics-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BishopricsDetailsComponent
  extends BaseDetailsPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subs: Subscription[] = [];
  id: number;
  model$: Observable<Bishopric>;
  model: any;
  modulePath = 'bishoprics';
  viewName = 'Bishopric';
  returnUrl = '/bishoprics';
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
    'appointment_type',
    'archpriestship',
    'bishopric',
    'calendar',
    'catholic_directory_institution',
    'catholic_directory_priest',
    'chapelry',
    'clergy_type',
    'content',
    'country',
    'curia_administrative_process',
    'curia_administrative_process_type',
    'curia_baptism',
    'curia_economic_council',
    'curia_function',
    'curia_ministries_and_order',
    'curia_provision',
    'curia_provision_type',
    'curia_secretariat',
    'curia_secretariat_type',
    'curia_wedding',
    'current_account',
    'current_accounts_line',
    'current_accounts_receipt',
    'dashboard',
    'document',
    'documents_type',
    'emenu',
    'emolument',
    'emoluments_type',
    'event',
    'formation',
    'formations_type',
    'gestdocument',
    'group',
    'institution',
    'institution_type',
    'mass_intention',
    'mass_intentions_type',
    'mec',
    'module_documentation_link',
    'newsletter',
    'newsletter_group_subscription',
    'newsletter_subscription',
    'newsletters_layout',
    'nomination',
    'numeration',
    'numeration_view',
    'parishioner',
    'parishioner_process',
    'pastoral_agent',
    'patron',
    'priest',
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
    'valence',
    'websiteconfiguration',
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
  isSaving = false;
  headerOptionsMenu = [
    {
      name: this.i18nextPipe.transform('translation:action.duplicate'),
      value: 'duplicate',
      icon: 'file_copy',
    },
  ];

  detailsTabs: any[];

  personsModalMenu = [
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

  selectedModalPerson$: Observable<SelectedModalRow>;
  reportsGroupsSelected$: Observable<any>;
  permissionsAttributesColumns: any[];
  isSuperUser = false;

  // Selectors & actions
  actionRequestFail = actions.BishopricsActionTypes.RequestFail;
  // Selectors & actions END

  @ViewChild('modal') modal: DialogComponent;
  @ViewChild('bishopricTemplate') bishopricTemplate: TemplateRef<any>;
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

  currentSubscription = +localStorage.getItem('subscriptionId');
  canEdit = {
    isSuperUser: false,
    isSubscriptionAdmin: false,
  };

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

          this.model$ = this.store.select(getBishopric);
          this.store.dispatch(new actions.RequestGet(+params.id));

          this.subs.push(
            this.model$.subscribe((obj: Bishopric) => {
              if (obj) {
                this.model = obj;
                this.fillPermissionsDataSource(
                  this.model.subscription_modules_permission_attributes
                );
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

  forSuperUserOnly() {
    if (this.detailsTabs && this.detailsTabs.length && this.isSuperUser) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.permissions_modules`
        ),
        templateContent: this.permissionsModulesTemplate,
      });
    }
  }

  ngAfterViewInit() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform('bishoprics:tabs.bishopric'),
        templateContent: this.bishopricTemplate,
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

  canEditBishopric(bishopricData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      bishopricData &&
      [bishopricData.entity_id].includes(this.currentSubscription)
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
    if (this.canEditBishopric(data)) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
  }
}
