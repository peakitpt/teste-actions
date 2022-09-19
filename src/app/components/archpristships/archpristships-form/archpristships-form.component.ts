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

import { Archpristship } from '../archpristship.model';
import * as actions from '../reducers/archpristships.actions';
import * as modalActions from '../../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.actions';
import { State } from '../reducers/archpristships.reducer';
import { getArchpristship } from '../reducers/archpristships.selectors';

import * as BishopricsState from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import * as BishopricsSelectors from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.selectors';

import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { BaseFormPermissionsComponent } from 'src/app/shared/components/base-form-permissions-component';
import {
  ArchpristshipsService,
  SubscriptionsService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-archpristships-form',
  templateUrl: './archpristships-form.component.html',
})
export class ArchpristshipsFormComponent
  extends BaseFormPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Archpristship>;
  modulePath = 'archpristships';

  reportsGroupsSelected$: Observable<any>;
  groupModalMenu: Array<{ name: string; value: string; icon: string }> = [];
  isSuperUser = false;

  selectorGetModel = getArchpristship;
  actionRequestFail = actions.ArchpristshipsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.ArchpristshipsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.ArchpristshipsActionTypes.SuccessPost;

  @ViewChild('archpristshipTemplate') archpristshipTemplate: TemplateRef<any>;
  permissionsAttributesColumns: any[];
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
    public bishopricsStore: Store<BishopricsState.State>,
    public archpristshipService: ArchpristshipsService,
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
        tax_designation: [],
        taxpayer: [],
        address: [],
        door_number: [],
        postal_code: [],
        place: [],
        country_id: [],
        country_description: [],
        county: [],
        parish: [],
        district: [],
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
          archpriestship: [],
          baptism: [],
          bishopric: [],
          calendar: [],
          catechism: [],
          catechisms_individual_document: [],
          catechisms_session: [],
          catechumen: [],
          catholic_directory_institution: [],
          catholic_directory_priest: [],
          chapelry: [],
          chrism: [],
          chrisms_entity: [],
          content: [],
          country: [],
          current_account: [],
          current_accounts_line: [],
          current_accounts_receipt: [],
          dashboard: [],
          death: [],
          document: [],
          documents_type: [],
          emenu: [],
          emolument: [],
          emoluments_type: [],
          event: [],
          family: [],
          formation: [],
          formations_type: [],
          gestdocument: [],
          group: [],
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
          numeration: [],
          numeration_view: [],
          parishioner: [],
          parishioner_process: [],
          pastoral_agent: [],
          pastoral_agents_type: [],
          patron: [],
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
          websiteconfiguration: [],
          wedding: [],
          worshipplace: [],
        }),
        entity_relation_attributes: this.fb.group({
          id: [],
          diocese_description: [null, Validators.required],
          diocese_id: [null, Validators.required],
        }),
      });
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.fillPermissionsDataSource([]);

    this.subs.push(
      this.bishopricsStore
        .select(BishopricsSelectors.getBishopricsSelected)
        .subscribe((v) => {
          if (v) {
            this.form
              .get('entity_relation_attributes.diocese_description')
              .setValue(v.model.complete_relation);
            this.form
              .get('entity_relation_attributes.diocese_id')
              .setValue(v.model.entity_id ?? v.model.id);
            this.form.get('country_id').setValue(v.model.country_id);
            this.form
              .get('country_description')
              .setValue(v.model.country_description);
          }
        })
    );

    this.subs.push(
      this.form
        .get('subscription_modules_permission_attributes')
        .valueChanges.subscribe((v: any) => this.fillPermissionsDataSource(v))
    );

    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.save_new'),
        value: 'save_new',
        icon: 'add_circle',
      },
    ];

    super.addToHeaderOptionsMenu();

    this.groupModalMenu = this.defaultModalMenu('bishopric');

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
          this.modulePath + ':tabs.bishopric'
        ),
        templateContent: this.archpristshipTemplate,
      },
    ];

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

  menuClick(event: any, inputName?: string) {
    console.log(event, inputName);
    switch (event) {
      case 'clear_bishopric_modal':
        this.form
          .get('entity_relation_attributes.diocese_description')
          .setValue(null);
        this.form.get('entity_relation_attributes.diocese_id').setValue(null);
        this.form.get('country_id').setValue(null);
        this.form.get('country_description').setValue(null);
        break;
      case 'view_selected_bishopric':
        if (this.form.get('entity_relation_attributes.diocese_id').value) {
          this.openDetails(
            'bishoprics',
            this.form.get('entity_relation_attributes.diocese_id').value
          );
        }
        break;
      case 'populate_defaults':
        this.openPopulateDefaultsModal();
        break;
      case 'quick_insertion_bishopric':
        this.openQuickInsertionModal(
          'quick-insert-bishoprics-modal',
          inputName
        );
        break;
      default:
        super.menuClick(event);
        break;
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.getPermissionsDataSourceOnSubmit();
    if (this.sharedModule.isDuplicateMode(this.route)) {
      // Remove all id's
      this.form.get('entity_relation_attributes.id').setValue(null);
    }
    super.onSubmit();
  }

  openPopulateDefaultsModal() {
    this.populateDefaultsModal.open();
  }

  populateDefaults() {
    if (this.id) {
      this.subs.push(
        this.archpristshipService
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
            if (!this.canEditArchpristship(obj.entity_relation_attributes)) {
              this.modal.close();
            }
          }
        })
    );
  }

  canEditArchpristship(chapelryData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      chapelryData &&
      [chapelryData.entity_id, chapelryData.diocese_id].includes(
        this.currentSubscription
      )
    );
  }
}
