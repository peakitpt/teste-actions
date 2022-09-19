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

import { Worshipplace } from '../worshipplace.model';
import * as actions from '../reducers/worshipplaces.actions';
import * as modalActions from '../../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.actions';
import { State } from '../reducers/worshipplaces.reducer';
import { getWorshipplace } from '../reducers/worshipplaces.selectors';

import * as ChapelriesState from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import * as ChapelriesSelectors from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';

import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import { BaseFormPermissionsComponent } from 'src/app/shared/components/base-form-permissions-component';
import {
  SubscriptionsService,
  WorshipplacesService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-worshipplaces-form',
  templateUrl: './worshipplaces-form.component.html',
})
export class WorshipplacesFormComponent
  extends BaseFormPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Worshipplace>;
  modulePath = 'worshipplaces';

  reportsGroupsSelected$: Observable<any>;
  groupModalMenu: Array<{ name: string; value: string; icon: string }> = [];
  isSuperUser = false;

  selectorGetModel = getWorshipplace;
  actionRequestFail = actions.WorshipplacesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.WorshipplacesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.WorshipplacesActionTypes.SuccessPost;

  @ViewChild('worshipplaceTemplate') worshipplaceTemplate: TemplateRef<any>;
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
    public chapelryStore: Store<ChapelriesState.State>,
    public worshipplacesService: WorshipplacesService,
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
    this.form = this.fb.group({
      id: [],
      name: [null, Validators.required],
      validated: [],
      entity_relation_attributes: this.fb.group({
        id: [],
        paroquia_description: [null, Validators.required],
        paroquia_id: [null, Validators.required],
      }),
      tax_designation: [],
      taxpayer: [],
      address: [],
      door_number: [],
      postal_code: [],
      place: [],
      county: [],
      parish: [],
      district: [],
      latitude: [],
      longitude: [],
      mobilephone: [],
      phone: [],
      fax: [],
      country_id: [],
      country_description: [],
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
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.fillPermissionsDataSource([]);

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
    this.setChapelriesModal();
  }

  private setChapelriesModal() {
    this.groupModalMenu = this.defaultModalMenu('chapelry');

    this.subs.push(
      this.chapelryStore
        .select(ChapelriesSelectors.getChapelriesSelected)
        .subscribe((v) => {
          if (v) {
            this.form
              .get('entity_relation_attributes.paroquia_description')
              .setValue(v.model.complete_relation);
            this.form
              .get('entity_relation_attributes.paroquia_id')
              .setValue(v.model.id);
            this.form.get('country_id').setValue(v.model.country_id);
            this.form
              .get('country_description')
              .setValue(v.model.country_description);
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
        templateContent: this.worshipplaceTemplate,
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

    this.clearModalInputs();
  }

  menuClick(event: any, inputName?: string) {
    switch (event) {
      case 'clear_modal_chapelry':
        this.form
          .get('entity_relation_attributes.paroquia_description')
          .setValue(null);
        this.form.get('entity_relation_attributes.paroquia_id').setValue(null);
        this.form.get('country_id').setValue(null);
        this.form.get('country_description').setValue(null);
        break;
      case 'view_selected_chapelry':
        if (this.form.get('entity_relation_attributes.paroquia_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('entity_relation_attributes.paroquia_id').value
          );
        }
        break;
      case 'quick_insertion_chapelry':
        this.openQuickInsertionModal(
          'quick-insert-chapelries-modal',
          inputName
        );
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
    if (this.sharedModule.isDuplicateMode(this.route)) {
      // Remove all id's
      this.form.get('entity_relation_attributes.id').setValue(null);
    }
    super.onSubmit();
  }

  clearModalInputs() {
    this.form.get(['entity_relation_attributes', 'id']).setValue(null);
    this.form
      .get(['entity_relation_attributes', 'paroquia_description'])
      .setValue(null);
    this.form.get(['entity_relation_attributes', 'paroquia_id']).setValue(null);
    this.form.get('country_id').setValue(null);
    this.form.get('country_description').setValue(null);
  }

  openPopulateDefaultsModal() {
    this.populateDefaultsModal.open();
  }

  populateDefaults() {
    if (this.id) {
      this.subs.push(
        this.worshipplacesService
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

      this.worshipplacesService
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
            if (!this.canEditWorshipplace(obj.entity_relation_attributes)) {
              this.modal.close();
            }
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
}
