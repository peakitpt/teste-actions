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

import { Worshipplace } from '../worshipplace.model';
import * as actions from '../reducers/worshipplaces.actions';
import { State } from '../reducers/worshipplaces.reducer';
import { getWorshipplace } from '../reducers/worshipplaces.selectors';

import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';

import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BaseDetailsPermissionsComponent } from 'src/app/shared/components/base-details-permissions-component';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-worshipplaces-details',
  templateUrl: './worshipplaces-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class WorshipplacesDetailsComponent
  extends BaseDetailsPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subs: Subscription[] = [];
  modulePath = 'worshipplaces';
  returnUrl = '/worshipplaces';
  viewName = 'Worshipplace';
  model$: Observable<Worshipplace>;
  model: any;
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

  id: number;
  isLoading = true;
  isSaving = false;

  headerOptionsMenu: any[] = [];
  detailsTabs: any[] = [];
  personsModalMenu: any[] = [];

  selectedModalPerson$: Observable<SelectedModalRow>;
  reportsGroupsSelected$: Observable<any>;
  permissionsAttributesColumns: any[];
  isSuperUser = false;

  // Selectors & actions
  actionRequestFail = actions.WorshipplacesActionTypes.RequestFail;
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

          this.model$ = this.store.select(getWorshipplace);
          this.store.dispatch(new actions.RequestGet(+params.id));

          this.subs.push(
            this.model$.subscribe((obj: Worshipplace) => {
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

    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform('worshipplaces:tabs.bishopric'),
        templateContent: this.bishopricTemplate,
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
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    this.forSuperUserOnly();
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

  canEditWorshipplace(worshipplaceData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      worshipplaceData &&
      [
        worshipplaceData.entity_id,
        worshipplaceData.diocese_id,
        worshipplaceData.archpriestship_id,
        worshipplaceData.chapelry_id,
        worshipplaceData.paroquia_id,
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
    if (this.canEditWorshipplace(data)) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
  }
}
