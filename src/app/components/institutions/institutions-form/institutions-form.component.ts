import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { FileManagerService } from '@peakitpt/ui-kyrios-api';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable, Subscription } from 'rxjs';
import { Institution } from 'src/app/components/institutions/institution.model';
import * as actions from 'src/app/components/institutions/reducers/institutions.actions';
import { State } from 'src/app/components/institutions/reducers/institutions.reducer';
import {
  ControlValue,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { BaseFormPermissionsComponent } from 'src/app/shared/components/base-form-permissions-component';
import { State as ArchpristshipState } from 'src/app/shared/components/modals/archpristships-modal/reducers/archpristships-modal.reducer';
import { getArchpristshipsSelected } from 'src/app/shared/components/modals/archpristships-modal/reducers/archpristships-modal.selectors';
import { State as ChapelryState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { State as CountryState } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import { getCountriesSelected } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.selectors';
import { State as InstitutionState } from 'src/app/shared/components/modals/institutions-modal/reducers/institutions-modal.reducer';
import { getInstitutionsSelected } from 'src/app/shared/components/modals/institutions-modal/reducers/institutions-modal.selectors';
import { State as InstitutionTypesState } from 'src/app/shared/components/modals/institutions-types-modal/reducers/institutions-types-modal.reducer';
import { getInstitutionsTypesSelected } from 'src/app/shared/components/modals/institutions-types-modal/reducers/institutions-types-modal.selectors';
import { State as ValenceState } from 'src/app/shared/components/modals/valences-modal/reducers/valences-modal.reducer';
import { getValencesSelected } from 'src/app/shared/components/modals/valences-modal/reducers/valences-modal.selectors';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { getInstitution } from '../reducers/institutions.selectors';

@Component({
  selector: 'kyr-institutions-form',
  templateUrl: './institutions-form.component.html',
  styleUrls: ['./institutions-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstitutionsFormComponent
  extends BaseFormPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Institution>;
  modulePath = 'institutions';

  // Selectors & actions
  selectorGetModel = getInstitution;
  actionRequestFail = actions.InstitutionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.InstitutionsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.InstitutionsActionTypes.SuccessPost;
  actionRequestSendToCuria = actions.RequestSendToCuria;
  actionSuccessSendToCuria = actions.InstitutionsActionTypes.SuccessSendToCuria;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.InstitutionsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.InstitutionsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  /* This specific's component fields */
  institutionTypesMenuOptions: ModalMenuOption[] = [];
  archpristshipMenuOptions: ModalMenuOption[] = [];
  chapelryMenuOptions: ModalMenuOption[] = [];
  secularInstituteMenuOptions: ModalMenuOption[] = [];
  congregationMenuOptions: ModalMenuOption[] = [];
  countryMenuOptions: ModalMenuOption[] = [];

  footerOptionsMenu: Array<{ name: string; value: string; icon: string }> = [];

  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  attachmentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  valencesMenuOptions: Array<{ name: string; value: string; icon: string }> =
    [];

  valencesColumns: any[] = [];
  valencesFormArray: FormArray = new FormArray([]);
  valencesDS: TableDataSource<any> = new TableDataSource([]);

  permissionsAttributesColumns: any = [];

  nominationsColumns: any[] = [];
  nominationsDS: TableDataSource<any> = new TableDataSource([]);
  nominationsFormArray: FormArray = new FormArray([]);

  imageChanged: any;
  currentImagePath = {
    cover: null,
    attachment_filename: null,
    thumbnail: null,
  };
  baseFilePath = environment.railsAppUrl;

  permissionsReady = false;

  @ViewChild('deleteValencesTemplate') deleteValencesTemplate: TemplateRef<any>;
  @ViewChild('entityInstituteValencesDescriptionTemplate')
  entityInstituteValencesDescriptionTemplate: TemplateRef<any>;

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('nominationsTabTemplate') nominationsTabTemplate: TemplateRef<any>;
  @ViewChild('permissionsTabTemplate') permissionsTabTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;

  @ViewChild('permissionsModulesTemplate')
  permissionsModulesTemplate: TemplateRef<any>;
  @ViewChild('statisticDataTemplate') statisticDataTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesTemplateCheckbox')
  permissionsModulesTemplateCheckbox: TemplateRef<any>;
  @ViewChild('permissionsAttributesCheckboxTemplate')
  permissionsAttributesCheckboxTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesModule')
  permissionsModulesModule: TemplateRef<any>;
  @ViewChild('permissionsModulesApp')
  permissionsModulesApp: TemplateRef<any>;

  secularInstituteModalParams = {
    institution_type_id: 20,
  };

  secularInstitutionModalTitle: string;
  institutionTypesModalTitle: string;

  congregationModalParams = {
    institution_type_id: 26,
  };

  congregationModalTitle: string;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private institutionTypesStore: Store<InstitutionTypesState>,
    private archpristshipStore: Store<ArchpristshipState>,
    private chapelryStore: Store<ChapelryState>,
    private institutionStore: Store<InstitutionState>,
    private countryStore: Store<CountryState>,
    private valencesStore: Store<ValenceState>,
    public fileManagerService: FileManagerService
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

  ngOnInit() {
    const controlPathPrefix = 'entity.';

    super.ngOnInit();
    this.setInstitutionTypesModal();
    this.setArchpristshipModal();
    this.setChapelryModal();
    this.setCountryModal();
    this.setValencesModal();
    this.setInstitutionsSelectedModals();
    this.buildValencesTableColumns();
    this.fillPermissionsDataSource([], controlPathPrefix);

    this.subs.push(
      this.form
        .get('entity.subscription_modules_permission_attributes')
        .valueChanges.subscribe((v: any) => {
          this.fillPermissionsDataSource(v, controlPathPrefix);
        })
    );

    this.secularInstitutionModalTitle = this.i18nextPipe.transform(
      `${this.modulePath}:modal.modal_title.secular_institution`
    );
    this.congregationModalTitle = this.i18nextPipe.transform(
      `${this.modulePath}:modal.modal_title.congregation`
    );

    this.institutionTypesModalTitle = this.i18nextPipe.transform(
      `${this.modulePath}:modal.modal_title.institutions_types`
    );
  }

  initKeysToIgnoreOnDuplicate() {
    super.initKeysToIgnoreOnDuplicate(['age_at_subscription']);
  }

  initializeForm() {
    this.form = this.fb.group({
      archpriestship_description: [],
      archpriestship_id: [],
      chapelry: this.fb.group({
        address: [],
        attachment: [],
        attachment_filename: [],
        block_remove: [],
        can_sign_documents: [],
        civil_status: [],
        civil_status_id: [],
        complete_relation: [],
        country_description: [],
        country_id: [],
        county: [],
        created_at: [],
        created_by_user_id: [],
        deleted: [],
        deleted_by_user_id: [],
        disabled: [],
        district: [],
        door_number: [],
        email: [],
        emoluments_imported: [],
        entity_birth_chapelry_description: [],
        entity_birth_chapelry_free_text: [],
        entity_birth_chapelry_id: [],
        entity_ekklesia_location_id: [],
        entity_type_id: [],
        fax: [],
        id: [],
        import_origin: [],
        inserted_by_user: [],
        is_archdiocese: [],
        is_demo: [],
        is_public_profile: [],
        latitude: [],
        longitude: [],
        mass_intention_types_imported: [],
        mobilephone: [],
        name: [],
        newsletter_subscriptor: [],
        notes: [],
        parish: [],
        paroquia_sw_id: [],
        patron_description: [],
        patron_id: [],
        payment_types_imported: [],
        phone: [],
        photo_filename: [],
        photo_url: [],
        place: [],
        postal_code: [],
        reports_group_description: [],
        reports_group_id: [],
        residence_chapelry_description: [],
        residence_chapelry_id: [],
        sync_at: [],
        sync_id: [],
        tax_designation: [],
        taxpayer: [],
        touched_in_current_importation: [],
        updated_at: [],
        updated_by_user_id: [],
        url: [],
        validated: [],
      }),
      chapelry_description: [],
      chapelry_id: [],
      christian_life_centers_type_id: [],
      community: [],
      congregation_description: [],
      congregation_id: [],
      created_at: [],
      entity: this.fb.group({
        address: [],
        attachment: [],
        attachment_filename: [],
        block_remove: [false],
        can_sign_documents: [false],
        civil_status: [],
        civil_status_id: [],
        complete_relation: [],
        country_description: [],
        country_id: [],
        county: [],
        created_at: [],
        created_by_user_id: [],
        deleted: [false],
        deleted_by_user_id: [],
        disabled: [true],
        district: [],
        door_number: [],
        email: [],
        emoluments_imported: [false],
        entity_birth_chapelry_description: [],
        entity_birth_chapelry_free_text: [],
        entity_birth_chapelry_id: [],
        entity_ekklesia_location_id: [+localStorage.getItem('subscriptionId')],
        entity_institution_appointments_attributes: [],
        entity_type_id: 13, //id of institutions
        fax: [],
        id: [],
        import_origin: [],
        inserted_by_user: [false],
        is_archdiocese: [false],
        is_demo: [false],
        is_public_profile: [true],
        latitude: [],
        longitude: [],
        mass_intention_types_imported: [false],
        mobilephone: [],
        name: [],
        newsletter_subscriptor: [false],
        notes: [],
        parish: [],
        paroquia_sw_id: [],
        patron_description: [],
        patron_id: [],
        payment_types_imported: [false],
        phone: [],
        photo_filename: [],
        photo_url: [],
        place: [],
        postal_code: [],
        reports_group_description: [],
        reports_group_id: [],
        residence_chapelry_description: [],
        residence_chapelry_id: [],
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
          baptism: [],
          bishopric: [],
          bishopric_integrated_view: [],
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
          death: [],
          document: [],
          documents_type: [],
          emenu: [],
          emolument: [],
          emoluments_type: [],
          entity_id: [],
          event: [],
          family: [],
          formation: [],
          formations_type: [],
          gestdocument: [],
          group: [],
          id: [],
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
          wedding: [],
          worshipplace: [],
        }),
        sync_at: [],
        sync_id: [],
        tax_designation: [],
        taxpayer: [],
        touched_in_current_importation: [false],
        updated_at: [],
        updated_by_user_id: [],
        url: [],
        validated: [true],
      }),
      entity_id: [],
      entity_institution_valences: this.fb.array([]),
      historical_note: [],
      holidays: [],
      id: [],
      institution_gender: ['u'],
      institution_type: this.fb.group({
        archpriestship: [],
        block_remove: [],
        chapelry: [],
        christian_life_centers_type: [],
        community: [],
        congregation: [],
        created_at: [],
        created_by_user_id: [],
        deleted: [],
        deleted_by_user_id: [],
        historical_note: [],
        holidays: [],
        id: [],
        inserted_by_user: [],
        institution_gender: [],
        locale: [],
        mandate: [],
        name: [],
        observations: [],
        periodicity_id: [],
        photo: [],
        property: [],
        scholarity: [],
        secular_institute: [],
        social_media: [],
        timetable: [],
        updated_at: [],
        updated_by_user_id: [],
        valences: [],
        validated: [],
        website_type_id: [],
      }),
      institution_type_description: [],
      institution_type_id: [],
      locale: [],
      mandate: [],
      observations: [],
      periodicity_description: [],
      periodicity_id: [],
      property: [],
      scholarity: [],
      secular_institute_description: [],
      secular_institute_id: [],
      social_media_data_sheet: [],
      social_media_institution_description: [],
      social_media_type_description: [],
      social_media_type_id: [],
      timetable: [],
      updated_at: [],
      website_type_id: [],
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    // this.patchVirtualFields(obj);
    this.constructFooterMenu();
    this.setInnerTable(
      obj.entity_institution_valences,
      this.valencesFormArray,
      this.valencesDS
    );
    this.setNominationsDS(obj.appointments_list);
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.main_tab`
        ),
        templateContent: this.mainTabTemplate,
      },
    ];

    if (this.id) {
      this.formTabs.splice(1, 0, {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.nominations_tab`
        ),
        templateContent: this.nominationsTabTemplate,
      });
    }

    this.formTabs.push({
      textLabel: this.i18nextPipe.transform(
        `${this.modulePath}:tabs.permissions_tab`
      ),
      templateContent: this.permissionsTabTemplate,
    });

    this.clearModalInputs();
    this.subscribeForSendToCuria();
    this.buildNominationsTableColumns();

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
    this.subs.push(this.successChangeImage());
    setTimeout(() => {
      this.detectFormChanges(), 3000;
    });
  }

  clearModalInputs() {
    [
      'entity_id',
      'entity_description',
      'document_entity_id',
      'document_entity_description',
      'emolument_id',
      'emolument_description',
      'tax',
      'entity_baptized_location_id',
      'entity_baptized_location_description',
      'entity_baptized_by_id',
      'entity_baptized_by_description',
      'entity_baptized_authorization_id',
      'entity_baptized_authorization_description',
      'entity_godfather_id',
      'entity_godfather_description',
      'entity_godfather_representative_id',
      'entity_godfather_representative_description',
      'entity_godmother_id',
      'entity_godmother_description',
      'entity_godmother_representative_id',
      'entity_godmother_representative_description',
      'entity_parishioner_of_id',
      'entity_parishioner_of_description',
      'entity_priest_id',
      'entity_priest_description',
      'father_residence_chapelry_id',
      'father_residence_chapelry_description',
      'godfathers_preparation_priest_id',
      'godfathers_preparation_priest_description',
      'mother_residence_chapelry_id',
      'mother_residence_chapelry_description',
      'parents_preparation_priest_id',
      'parents_preparation_priest_description',
    ].forEach((field: string) => this.affectField(field, null));
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_archpristship_modal':
      case 'clear_chapelry_modal':
      case 'clear_institution-types_modal':
        if (inputName) {
          this.affectField(`${inputName}_id`, null);
          this.affectField(`${inputName}_description`, null);
        }
        break;
      case 'clear_country_modal':
        if (inputName) {
          this.form.get(['entity', `${inputName}_id`]).setValue(null);
          this.form.get(['entity', `${inputName}_description`]).setValue(null);
        }
        break;
      case 'view_selected_person':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;

          if (id) {
            if (event.includes('institution-types')) {
              this.openDetails('institution-types', id);
            }
          }
        }
        break;
      case 'quick_insertion_person':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'save_generate_document':
        this.openGenerateDocModal = true;
        break;
      case 'send_to_curia':
        this.isSaving = true;
        this.store.dispatch(
          new this.actionRequestSendToCuria(this.form.getRawValue())
        );
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.getPermissionsDataSourceOnSubmit('entity.');
    if (this.form.valid) {
      if (this.form.get('entity.photo_url').value && this.imageChanged) {
        // this will triger successChangeImage() which will first upload the image, and then
        // will go to onFormValid()
        this.dispatchImage();
      } else {
        this.onFormValid();
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  onFormValid() {
    if (this.validateValences()) {
      super.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_invalid_attachments`
        )
      );
    }
  }
  private validateValences() {
    let valencesValid = true;

    this.form.setControl(
      'entity_institution_valences',
      this.fb.array(this.valencesFormArray.value)
    );

    return valencesValid;
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]

  //fill selectors modal
  private setInstitutionTypesModal() {
    this.institutionTypesMenuOptions =
      this.defaultModalMenu('institution-types');

    this.subs.push(
      this.institutionTypesStore
        .select(getInstitutionsTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);

            this.affectField(`${row.inputName}`, row.model);
          }
        })
    );
  }

  private setArchpristshipModal() {
    this.archpristshipMenuOptions = this.defaultModalMenu('archpristship');

    this.subs.push(
      this.archpristshipStore
        .select(getArchpristshipsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }

  private setChapelryModal() {
    this.chapelryMenuOptions = this.defaultModalMenu('chapelry');

    this.subs.push(
      this.chapelryStore
        .select(getChapelriesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }

  private setCountryModal() {
    this.countryMenuOptions = this.defaultModalMenu('country');

    this.subs.push(
      this.countryStore
        .select(getCountriesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`entity.${row.inputName}_id`, row.model.id);
            this.affectField(
              `entity.${row.inputName}_description`,
              row.model.name
            );
          }
        })
    );
  }

  private constructFooterMenu() {
    if (this.model?.id && !this.model?.document_id) {
      this.footerOptionsMenu.push({
        name: this.i18nextPipe.transform(
          'translation:action.save_generate_document'
        ),
        value: 'save_generate_document',
        icon: 'save',
      });
    }

    if (this.sharedModule.visibleSendToCuria(this.model)) {
      this.footerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.send_to_curia'),
        value: 'send_to_curia',
        icon: 'send',
      });
    }
  }

  private subscribeForSendToCuria() {
    // Subscribe for sendToCuria action
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionSuccessSendToCuria))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.isLoading = false;
            this.snackBarService.openSnackBar(
              result.payload.error.error.message,
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                'translation:message.send_to_curia_success'
              ),
              this.sharedModule.SUCCESS_COLOR
            );
          }
        })
    );
  }

  private detectFormChanges() {}

  buildValencesTableColumns() {
    setTimeout(() => {
      this.valencesColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteValencesTemplate,
        },
        {
          id: 'valence_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_institution_valences`
          ),
          required: false,
          sortable: false,
          template: this.entityInstituteValencesDescriptionTemplate,
        },
      ];
    });
  }

  private setValencesModal() {
    this.valencesMenuOptions = this.defaultModalMenu('valences');

    // When a row is selected
    this.subs.push(
      this.valencesStore
        .select(getValencesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            let controlValues: ControlValue[] = [
              {
                control: `valence_id`,
                value: row.model.id,
              },
              {
                control: `valence_description`,
                value: row.model.name,
              },
            ];

            this.updateTableValues(
              this.getInputNameIndex(row.inputName),
              this.valencesFormArray,
              this.valencesDS,
              controlValues
            );
          }
        })
    );
  }

  //nominations table columns
  private buildNominationsTableColumns() {
    setTimeout(() => {
      this.nominationsColumns = [
        {
          id: 'curia_function_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_institution_appointments.curia_function_description`
          ),
          display: true,
          filter: false,
        },
        {
          id: 'nominee_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_institution_appointments.nominee_description`
          ),
          display: true,
          filter: false,
        },
        {
          id: 'start_date',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_institution_appointments.start_date`
          ),
          display: true,
          filter: false,
        },
        {
          id: 'end_date',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_institution_appointments.end_date`
          ),
          display: true,
          filter: false,
        },
        {
          id: 'representing_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_institution_appointments.representing_description`
          ),
          display: true,
          filter: false,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_institution_appointments.description`
          ),
          display: true,
          filter: false,
          isColumnStickyEnd: true,
        },
      ];
    });
  }

  successChangeImage(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.InstitutionsActionTypes.SuccessPostInstitutionImage))
      .subscribe((r: any) => {
        if (r.payload.name === this.currentImagePath?.attachment_filename) {
          this.currentImagePath.cover = r.payload.filePath;
          this.form.get('attachment_filename').setValue(r.payload.name);
          this.form.get('attachment').setValue(r.payload.file);

          this.onFormValid();
        }
      });
  }

  dispatchImage() {
    const fd = new FormData();
    fd.append(
      'file',
      this.imageChanged.target.files[0],
      this.imageChanged.target.files[0].name
    );
    this.store.dispatch(new actions.RequestPostInstitutionImage(fd));
  }

  setNominationsDS(entityAppointmentsAttributes) {
    this.nominationsFormArray.clear();
    this.nominationsDS.data = this.nominationsFormArray.value;

    if (entityAppointmentsAttributes?.length) {
      entityAppointmentsAttributes.forEach((item) => {
        this.addTableLine(item, this.nominationsFormArray, this.nominationsDS);
      });
    }
  }

  private setInstitutionsSelectedModals() {
    this.congregationMenuOptions = this.defaultModalMenu('congregation');
    this.secularInstituteMenuOptions =
      this.defaultModalMenu('secularInstitute');

    this.subs.push(
      this.institutionStore
        .select(getInstitutionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.entity_id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.entity__name
            );
          }
        })
    );
  }
}
