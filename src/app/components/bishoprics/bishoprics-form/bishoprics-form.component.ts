import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

import { Bishopric } from '../bishopric.model';
import * as actions from '../reducers/bishoprics.actions';
import * as modalActions from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.actions';
import { State } from '../reducers/bishoprics.reducer';
import { getBishopric } from '../reducers/bishoprics.selectors';

import * as ReportsGroupState from '../../../shared/components/modals/reports-groups-modal/reducers/reports-groups-modal.reducer';
import * as ReportsGroupSelectors from '../../../shared/components/modals/reports-groups-modal/reducers/reports-groups-modal.selectors';

import * as CountriesState from '../../../shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import * as CountriesSelectors from '../../../shared/components/modals/countries-modal/reducers/countries-modal.selectors';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { BaseFormPermissionsComponent } from 'src/app/shared/components/base-form-permissions-component';
import {
  BishopricsService,
  SubscriptionsService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-bishoprics-form',
  templateUrl: './bishoprics-form.component.html',
})
export class BishopricsFormComponent
  extends BaseFormPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Bishopric>;
  modulePath = 'bishoprics';

  reportsGroupsSelected$: Observable<any>;
  permissionsAttributesColumns: any[] = [];
  countryModalMenu: Array<{ name: string; value: string; icon: string }> = [];
  reportModalMenu: Array<{ name: string; value: string; icon: string }> = [];
  isSuperUser = false;

  selectorGetModel = getBishopric;
  actionRequestFail = actions.BishopricsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.BishopricsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.BishopricsActionTypes.SuccessPost;

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

  // Populate Templates
  @ViewChild('populateDefaultsModal') populateDefaultsModal: DialogComponent;

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
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public reportsGroupStore: Store<ReportsGroupState.State>,
    public countriesStore: Store<CountriesState.State>,
    public bishopricsService: BishopricsService,
    private subscriptionService: SubscriptionsService
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject
    );
  }

  initializeForm() {
    if (this.form && this.form.value?.id) {
      // Close and open new
      this.modal.close();
      setTimeout(() => {
        this.router
          .navigate([this.modulePath])
          .then(() => this.router.navigate([this.modulePath, 'new']));
      }, 1);
    } else {
      this.form = this.fb.group({
        id: [],
        name: [null, Validators.required],
        validated: [],
        is_archdiocese: [],
        district: [null, Validators.required],
        country_description: [null, Validators.required],
        country_id: [null, Validators.required],
        reports_group_id: [],
        reports_group_description: [],
        tax_designation: [],
        taxpayer: [],
        address: [],
        door_number: [],
        postal_code: [],
        place: [],
        county: [],
        parish: [],
        latitude: [],
        longitude: [],
        mobilephone: [],
        phone: [],
        fax: [],
        email: [null, Validators.pattern(this.sharedModule.PATTERN_EMAIL)],
        url: [],
        subscription_modules_permission_attributes: this.fb.group({
          accounting_balance_sheet: [],
          accounting_chart_account: [],
          accounting_cost_center: [],
          accounting_exercise: [],
          accounting_journal: [],
          accounting_taxonomy_code: [],
          accounting_taxonomy_reference: [],
          accounting_transaction: [],
          accounting_transaction_document_type: [],
          accounting_transaction_line: [],
          accounting_transaction_type: [],
          accruals_accrual: [],
          accruals_processment: [],
          accruals_type: [],
          acolyte: [],
          acolytes_formation: [],
          acolytes_renewal: [],
          admin_statistic: [],
          appointment_type: [],
          archpriestship: [],
          bishopric: [],
          calendar: [],
          catholic_directory_institution: [],
          catholic_directory_priest: [],
          chapelry: [],
          clergy_type: [],
          content: [],
          country: [],
          curia_administrative_process: [],
          curia_administrative_process_type: [],
          curia_baptism: [],
          curia_economic_council: [],
          curia_function: [],
          curia_ministries_and_order: [],
          curia_provision: [],
          curia_provision_type: [],
          curia_secretariat: [],
          curia_secretariat_type: [],
          curia_wedding: [],
          current_account: [],
          current_accounts_line: [],
          current_accounts_receipt: [],
          dashboard: [],
          document: [],
          documents_type: [],
          emenu: [],
          emolument: [],
          emoluments_type: [],
          event: [],
          formation: [],
          formations_type: [],
          gestdocument: [],
          group: [],
          institution: [],
          institution_type: [],
          mass_intention: [],
          mass_intentions_type: [],
          mec: [],
          mecs_formation: [],
          mecs_renewal: [],
          module_documentation_link: [],
          newsletter: [],
          newsletter_group_subscription: [],
          newsletter_subscription: [],
          newsletters_layout: [],
          nomination: [],
          numeration: [],
          numeration_view: [],
          parishioner: [],
          parishioner_process: [],
          pastoral_agent: [],
          pastoral_agents_type: [],
          patron: [],
          priest: [],
          profile_priest: [],
          reader: [],
          readers_formation: [],
          readers_renewal: [],
          records_importer: [],
          relationship_degree: [],
          report: [],
          reportmanagment: [],
          reports_group: [],
          reports_grouper: [],
          reports_view: [],
          section: [],
          subscription: [],
          subscription_setting: [],
          subscription_statistic: [],
          subscription_user: [],
          text_message: [],
          treasury_location: [],
          user: [],
          valence: [],
          websiteconfiguration: [],
          worshipplace: [],
        }),
      });
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.fillPermissionsDataSource([]);
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

    this.subs.push(
      this.reportsGroupStore
        .select(ReportsGroupSelectors.getReportsGroupsSelected)
        .subscribe((v) => {
          if (v) {
            this.form.get('reports_group_description').setValue(v.model.name);
            this.form.get('reports_group_id').setValue(v.model.id);
          }
        })
    );

    this.subs.push(
      this.countriesStore
        .select(CountriesSelectors.getCountriesSelected)
        .subscribe((v) => {
          if (v) {
            this.form.get('country_description').setValue(v.model.name);
            this.form.get('country_id').setValue(v.model.id);
          }
        })
    );

    this.subs.push(
      this.form
        .get('subscription_modules_permission_attributes')
        .valueChanges.subscribe((v: any) => this.fillPermissionsDataSource(v))
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

    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.save_new'),
        value: 'save_new',
        icon: 'add_circle',
      },
    ];

    super.addToHeaderOptionsMenu();

    this.countryModalMenu = this.defaultModalMenu('country');
    this.reportModalMenu = this.defaultModalMenu('report');
    if (!this.isQuickInsertion) {
      // remove quick insert option
      this.countryModalMenu.pop();
      this.reportModalMenu.pop();
    }
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.setCanEdit(obj);
  }

  forSuperUserOnly() {
    if (this.formTabs && this.formTabs.length && this.isSuperUser) {
      this.formTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.permissions_modules`
        ),
        templateContent: this.permissionsModulesTemplate,
      });
    }

    if (this.id && this.isSuperUser) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.populate'),
        value: 'populate_defaults',
        icon: 'build_circle',
      });
    }
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.bishopric`
        ),
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
  }

  menuClick(event: any) {
    switch (event) {
      case 'clear_modal_country':
        this.form.get('country_description').setValue(null);
        this.form.get('country_id').setValue(null);
        break;
      case 'clear_modal_report':
        this.form.get('reports_group_description').setValue(null);
        this.form.get('reports_group_id').setValue(null);
        break;
      case 'view_selected_country':
        if (this.form.value.country_id) {
          this.openDetails('countries', this.form.value.country_id);
        }
        break;
      case 'view_selected_report':
        if (this.form.value.reports_group_id) {
          this.openDetails('reports', this.form.value.reports_group_id);
        }
        break;
      case 'populate_defaults':
        this.openPopulateDefaultsModal();
        break;
      default:
        super.menuClick(event);
        break;
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.getPermissionsDataSourceOnSubmit();
    super.onSubmit();
  }

  openPopulateDefaultsModal() {
    this.populateDefaultsModal.open();
  }

  populateDefaults() {
    if (this.id) {
      this.subs.push(
        this.bishopricsService
          .populateDefaults(this.id, this.form.value)
          .subscribe((result: any) => {
            this.snackBarService.openSnackBar(
              result.message,
              this.sharedModule.SUCCESS_COLOR,
              5000
            );
            this.store.dispatch(new this.actionRequestGetOne(this.id));
            this.populateDefaultsModal.close();
          })
      );

      this.bishopricsService
        .populateDefaults(this.id, this.form.value)
        .subscribe((result: any) => {});
    }
  }

  setCanEdit(obj: any) {
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
            if (!this.canEditBishopric(obj)) {
              this.modal.close();
            }
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
      [
        bishopricData.id,
        bishopricData.entity_relation_attributes?.entity_id,
      ].includes(this.currentSubscription)
    );
  }
}
