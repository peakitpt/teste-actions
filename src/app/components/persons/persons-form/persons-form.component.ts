import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, pairwise, startWith } from 'rxjs/operators';
import {
  DialogComponent,
  SnackBarService,
  Tab,
  TableDataSource,
} from '@peakitpt/ui-material';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { Store, ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import {
  EntitiesMecsLine,
  EntityPerson,
  EntityPersonAppointment,
} from 'src/app/components/persons/person.model';
import { State } from 'src/app/components/persons/reducers/persons.reducer';
import {
  getPerson,
  getPersonByEntityId,
  getTaxpayerNameValidation,
} from 'src/app/components/persons/reducers/persons.selectors';
import * as actions from 'src/app/components/persons/reducers/persons.actions';
import * as modalActions from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.actions';

import { State as CountriesState } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import { getCountriesSelected } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.selectors';
import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { State as WorshipplacesState } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { getWorshipplacesSelected } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { State as PriestsState } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.reducer';
import { getPriestsSelected } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.selectors';
import { State as CuriaFunctionsState } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import { State as PlacesState } from 'src/app/shared/components/modals/places-modal/reducers/places-modal.reducer';
import { getPlacesSelected } from 'src/app/shared/components/modals/places-modal/reducers/places-modal.selectors';
import { TaxpayerNameValidation } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-persons-form',
  templateUrl: './persons-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PersonsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<EntityPerson>;
  modulePath = 'persons';

  selectorGetModel = getPerson;
  actionRequestFail = actions.PersonsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.PersonsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.PersonsActionTypes.SuccessPost;

  @ViewChild('personalDataTabTemplate')
  personalDataTabTemplate: TemplateRef<any>;
  @ViewChild('categoriesTabTemplate') categoriesTabTemplate: TemplateRef<any>;
  @ViewChild('curiaTabTemplate') curiaTabTemplate: TemplateRef<any>;
  @ViewChild('deleteAppointmentsTemplate')
  deleteAppointmentsTemplate: TemplateRef<any>;
  @ViewChild('appointmentStartDateTemplate')
  appointmentStartDateTemplate: TemplateRef<any>;
  @ViewChild('appointmentEndDateTemplate')
  appointmentEndDateTemplate: TemplateRef<any>;
  @ViewChild('appointmentCuriaFunctionTemplate')
  appointmentCuriaFunctionTemplate: TemplateRef<any>;
  @ViewChild('appointmentPlaceTemplate')
  appointmentPlaceTemplate: TemplateRef<any>;
  @ViewChild('appointmentRepresentingTemplate')
  appointmentRepresentingTemplate: TemplateRef<any>;
  @ViewChild('appointmentDescriptionTemplate')
  appointmentDescriptionTemplate: TemplateRef<any>;
  @ViewChild('christianLifeTabTemplate')
  christianLifeTabTemplate: TemplateRef<any>;
  @ViewChild('professionalLifeTabTemplate')
  professionalLifeTabTemplate: TemplateRef<any>;
  @ViewChild('catechistTabTemplate') catechistTabTemplate: TemplateRef<any>;
  @ViewChild('mecTabTemplate') mecTabTemplate: TemplateRef<any>;
  @ViewChild('deleteMecRenewalsTemplate')
  deleteMecRenewalsTemplate: TemplateRef<any>;
  @ViewChild('mecRenewalDateTemplate')
  mecRenewalDateTemplate: TemplateRef<any>;
  @ViewChild('elderSickTabTemplate') elderSickTabTemplate: TemplateRef<any>;
  @ViewChild('groupsTabTemplate') groupsTabTemplate: TemplateRef<any>;
  @ViewChild('reportsTabTemplate') reportsTabTemplate: TemplateRef<any>;
  @ViewChild('duplicateConfirmationModal')
  duplicateConfirmationModal: DialogComponent;

  /* This specific's component fields */
  private isActive = true;
  private isDiocese = false;
  todayDate: Date = new Date();
  ageControl: FormControl = new FormControl();
  currentImage = {
    name: null,
    path: null,
  };
  duplicateConfirmationModalMessage = '';
  duplicateConfirmationSub$: Subscription;

  appointmentsColumns: any[] = [];
  appointmentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  appointmentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  mecRenewalsColumns: any[] = [];
  mecRenewalsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  mecRenewalsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  countriesMenuOptions: ModalMenuOption[] = [];
  chapelriesMenuOptions: ModalMenuOption[] = [];
  worshipplacesMenuOptions: ModalMenuOption[] = [];
  personsMenuOptions: ModalMenuOption[] = [];
  curiaFunctionsMenuOptions: ModalMenuOption[] = [];
  placesMenuOptions: ModalMenuOption[] = [];
  priestsMenuOptions: ModalMenuOption[] = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private countriesStore: Store<CountriesState>,
    private chapelriesStore: Store<ChapelriesState>,
    private worshipplacesStore: Store<WorshipplacesState>,
    private personsStore: Store<PersonsState>,
    private priestsStore: Store<PriestsState>,
    private curiaFunctionsStore: Store<CuriaFunctionsState>,
    private placesStore: Store<PlacesState>
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
      serie_number: [],
      title: [],
      sex: [null, Validators.required],
      birth_date: [],
      qualifications: [null],
      qualifications_id: [null],
      birth_place_county: [],
      birth_place_parish: [],
      previous_address: [],
      ident_document_type: [],
      ident_document_number: [],
      ident_document_emission_date: [],
      ident_document_emitted_by: [],
      ident_document_validity_date: [],
      is_adopted: [false],
      entity_father_description: [],
      entity_father_id: [],
      entity_mother_description: [],
      entity_mother_id: [],
      maritial_status: [null],
      entity_spouse_description: [],
      entity_spouse_id: [],
      wedding_date: [],
      entity_wedding_location_description: [],
      entity_wedding_location_id: [],
      comments: [],
      is_parishioner: [false],
      entity_birth_place_description: [],
      entity_birth_place_id: [],
      deceased: [false],
      is_catechized: [false],
      professional_profession_description: [],
      professional_post: [],
      professional_company: [],
      professional_address: [],
      professional_door_number: [],
      professional_postal_code: [],
      professional_locality: [],
      professional_parish: [],
      professional_county: [],
      professional_district: [],
      professional_country_description: [],
      professional_country_id: [],
      professional_mobilephone: [],
      professional_phone: [],
      professional_fax: [],
      professional_email: [
        null,
        Validators.pattern(this.sharedModule.PATTERN_EMAIL),
      ],
      professional_url: [],
      outside_chapelry_description: [],
      outside_chapelry_id: [],
      suitability_request: [],
      baptized_chrismed_description: [],
      christian_often_eucharist: [null],
      christian_baptized: [false],
      christian_baptized_date: [],
      christian_baptized_number: [],
      christian_baptized_sheet: [],
      christian_baptized_worshipplace_description: [],
      christian_baptized_worshipplace_id: [],
      christian_baptized_county: [],
      christian_baptized_district: [],
      christian_first_confession: [false],
      christian_first_confession_date: [],
      christian_first_confession_worshipplace_description: [],
      christian_first_confession_worshipplace_id: [],
      christian_first_communion: [false],
      christian_first_communion_date: [],
      christian_first_communion_worshipplace_description: [],
      christian_first_communion_worshipplace_id: [],
      christian_first_communion_number: [],
      christian_first_communion_sheet: [],
      christian_first_communion_county: [],
      christian_first_communion_district: [],
      christian_chrism: [false],
      christian_chrism_date: [],
      christian_chrism_worshipplace_description: [],
      christian_chrism_worshipplace_id: [],
      christian_chrism_number: [],
      christian_chrism_sheet: [],
      christian_chrism_county: [],
      christian_chrism_district: [],
      christian_attended_catechism: [false],
      catechism_last_year: [null],
      christian_attended_catechism_worshipplace_description: [],
      christian_attended_catechism_worshipplace_id: [],
      christian_attended_catechism_county: [],
      christian_attended_catechism_district: [],
      lives_with: [null],
      lives_with_text: [],
      catechized_has_brothers_info: [],
      catechized_has_catechized_brothers: [],
      attended_catechism_party_1: [false],
      catechism_party_1_name: [],
      catechism_party_1_date: [],
      attended_catechism_party_2: [false],
      catechism_party_2_name: [],
      catechism_party_2_date: [],
      attended_catechism_party_3: [false],
      catechism_party_3_name: [],
      catechism_party_3_date: [],
      attended_catechism_party_4: [false],
      catechism_party_4_name: [],
      catechism_party_4_date: [],
      attended_catechism_party_5: [false],
      catechism_party_5_name: [],
      catechism_party_5_date: [],
      christian_solemn_communion: [],
      catechism_party_6_name: [],
      christian_solemn_communion_date: [],
      christian_solemn_communion_worshipplace_description: [],
      christian_solemn_communion_worshipplace_id: [],
      christian_solemn_communion_county: [],
      christian_solemn_communion_district: [],
      attended_catechism_party_7: [false],
      catechism_party_7_name: [],
      catechism_party_7_date: [],
      attended_catechism_party_8: [false],
      catechism_party_8_name: [],
      catechism_party_8_date: [],
      attended_catechism_party_9: [false],
      catechism_party_9_name: [],
      catechism_party_9_date: [],
      attended_catechism_party_10: [false],
      catechism_party_10_name: [],
      catechism_party_10_date: [],
      attended_catechism_year_1: [false],
      catechism_inscription_date_1: [],
      catechism_attendance_1: [null, Validators.min(0)],
      catechism_failures_1: [null, Validators.min(0)],
      catechism_1_obs: [],
      attended_catechism_year_2: [false],
      catechism_inscription_date_2: [],
      catechism_attendance_2: [null, Validators.min(0)],
      catechism_failures_2: [null, Validators.min(0)],
      catechism_2_obs: [],
      attended_catechism_year_3: [false],
      catechism_inscription_date_3: [],
      catechism_attendance_3: [null, Validators.min(0)],
      catechism_failures_3: [null, Validators.min(0)],
      catechism_3_obs: [],
      attended_catechism_year_4: [false],
      catechism_inscription_date_4: [],
      catechism_attendance_4: [null, Validators.min(0)],
      catechism_failures_4: [null, Validators.min(0)],
      catechism_4_obs: [],
      attended_catechism_year_5: [false],
      catechism_inscription_date_5: [],
      catechism_attendance_5: [null, Validators.min(0)],
      catechism_failures_5: [null, Validators.min(0)],
      catechism_5_obs: [],
      attended_catechism_year_6: [false],
      catechism_inscription_date_6: [],
      catechism_attendance_6: [null, Validators.min(0)],
      catechism_failures_6: [null, Validators.min(0)],
      catechism_6_obs: [],
      attended_catechism_year_7: [false],
      catechism_inscription_date_7: [],
      catechism_attendance_7: [null, Validators.min(0)],
      catechism_failures_7: [null, Validators.min(0)],
      catechism_7_obs: [],
      attended_catechism_year_8: [false],
      catechism_inscription_date_8: [],
      catechism_attendance_8: [null, Validators.min(0)],
      catechism_failures_8: [null, Validators.min(0)],
      catechism_8_obs: [],
      attended_catechism_year_9: [false],
      catechism_inscription_date_9: [],
      catechism_attendance_9: [null, Validators.min(0)],
      catechism_failures_9: [null, Validators.min(0)],
      catechism_9_obs: [],
      attended_catechism_year_10: [false],
      catechism_inscription_date_10: [],
      catechism_attendance_10: [null, Validators.min(0)],
      catechism_failures_10: [null, Validators.min(0)],
      catechism_10_obs: [],
      entity_person_appointments: this.fb.array([]),
      entity: this.fb.group({
        id: [],
        disabled: [true],
        name: [null, Validators.required],
        photo_filename: [],
        photo_url: [],
        civil_status: [null],
        civil_status_id: [null],
        entity_birth_chapelry_description: [],
        entity_birth_chapelry_free_text: [],
        entity_birth_chapelry_id: [],
        residence_chapelry_description: [],
        residence_chapelry_id: [],
        address: [],
        door_number: [],
        postal_code: [],
        place: [],
        county: [],
        district: [],
        country_description: [],
        country_id: [],
        mobilephone: [],
        phone: [],
        fax: [],
        email: [null, Validators.pattern(this.sharedModule.PATTERN_EMAIL)],
        url: [],
        taxpayer: [],
        is_public_profile: [false],
        newsletter_subscriptor: [false, { disabled: !this.isActive }],
        can_sign_documents: [false],
        entity_acolyte: this.fb.group({
          is_acolyte: [false],
        }),
        entity_catechist: this.fb.group({
          catechist: [false],
          initiation_course_date: [],
          initiation_course_avaliation: [],
          general_course_date: [],
          general_course_avaliation: [],
          complementary_course_date: [],
          complementary_course_avaliation: [],
        }),
        entity_elder_patient: this.fb.group({
          elder: [false],
          sick: [false],
          sunday_communion: [],
          sunday_communion_minister_id: [],
          sunday_communion_minister_description: [],
          anointing_ofthe_sick_date: [],
          anointing_ofthe_sick_locale: [],
        }),
        entity_mec: this.fb.group({
          mec: [false],
          mec_number: [],
          magnetic_number: [],
          institution_date: [],
          institution_center_worshipplace_description: [],
          institution_center_worshipplace_id: [],
          entities_mecs_lines: this.fb.array([]),
        }),
        entity_pastoral_agent: this.fb.group({
          active: [false],
        }),
        entity_reader: this.fb.group({
          is_reader: [false],
        }),
      }),
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.isDiocese = this.sharedModule.isDiocese();
    this.setCountriesModal();
    this.setChapelriesModal();
    this.setWorshipplacesModal();
    this.setPersonsModal();
    this.setPriestsModal();
    if (this.isDiocese) {
      this.setCuriaFunctionsModal();
      this.setPlacesModal();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.duplicateConfirmationSub$) {
      this.duplicateConfirmationSub$.unsubscribe();
    }
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    if (this.duplicateMode) {
      this.affectField('entity.id', null);
      this.affectField('entity.entity_mec.mec_number', null);
      this.affectField('entity.entity_mec.magnetic_number', null);
    }

    this.setInnerTable(
      obj.entity_person_appointments,
      this.appointmentsFormArray,
      this.appointmentsDS,
      ['entity_person_id']
    );

    if (obj.entity?.entity_mec) {
      this.setInnerTable(
        obj.entity.entity_mec.entities_mecs_lines,
        this.mecRenewalsFormArray,
        this.mecRenewalsDS,
        ['entity_mec_id']
      );
    }
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.personal_data`
        ),
        templateContent: this.personalDataTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.categories`
        ),
        templateContent: this.categoriesTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.christian_life`
        ),
        templateContent: this.christianLifeTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.professional_life`
        ),
        templateContent: this.professionalLifeTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.reports`
        ),
        templateContent: this.reportsTabTemplate,
      },
    ];

    if (this.isDiocese) {
      this.formTabs.splice(2, 0, {
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.curia`),
        templateContent: this.curiaTabTemplate,
      });
    }

    this.clearModalInputs();
    this.buildSubTablesColumns();
    this.detectFormChanges();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_country_modal':
      case 'clear_chapelry_modal':
      case 'clear_worshipplace_modal':
      case 'clear_person_modal':
      case 'clear_curia_function_modal':
      case 'clear_place_modal':
      case 'clear_priest_modal':
        if (inputName) {
          if (inputName.includes('entity_person_appointments')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);

            this.appointmentsFormArray
              .get([tableIndex, `${this.getInputNameField(inputName)}_id`])
              .setValue(null);
            this.appointmentsFormArray
              .get([
                tableIndex,
                `${this.getInputNameField(inputName)}_description`,
              ])
              .setValue(null);
          } else {
            // Form's modal
            this.affectField(`${inputName}_id`, null);
            this.affectField(`${inputName}_description`, null);
          }
        }
        break;
      case 'view_selected_country':
      case 'view_selected_chapelry':
      case 'view_selected_worshipplace':
      case 'view_selected_person':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;

          if (id) {
            if (event.includes('country')) {
              this.openDetails('countries', id);
            } else if (event.includes('chapelry')) {
              this.openDetails('chapelries', id);
            } else if (event.includes('worshipplace')) {
              this.openDetails('worshipplaces', id);
            } else if (event.includes('person')) {
              if (
                ['entity_spouse', 'entity_father', 'entity_mother'].includes(
                  inputName
                )
              ) {
                this.store.dispatch(new actions.RequestGetByEntityId(id));
                let getEntity$: Subscription = this.store
                  .select(getPersonByEntityId)
                  .subscribe((person: EntityPerson) => {
                    if (person) {
                      getEntity$.unsubscribe();
                      this.store.dispatch(new actions.ClearGetByEntityId());
                      this.openDetails('persons', person.id);
                    }
                  });
              }
            }
          }
        }
        break;
      case 'view_selected_curia_function':
        // Table's modal
        const curiaFunctionId = this.appointmentsFormArray.get([
          this.getInputNameIndex(inputName),
          `${this.getInputNameField(inputName)}_id`,
        ]).value;

        if (curiaFunctionId) {
          this.openDetails('curia_functions', curiaFunctionId, true);
        }
        break;
      case 'quick_insertion_person':
        this.blockChainClosing = true; // Needs to block closing since it's the same modal
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'quick_insertion_country':
        this.openQuickInsertionModal('quick-insert-countries-modal', inputName);
        break;
      case 'quick_insertion_chapelry':
        this.openQuickInsertionModal(
          'quick-insert-chapelries-modal',
          inputName
        );
        break;
      case 'quick_insertion_worshipplace':
        this.openQuickInsertionModal(
          'quick-insert-worshipplaces-modal',
          inputName
        );
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onFormValid() {
    const mecRenewalsValidation: {
      valid: boolean;
      error?: string;
    } = this.validateMecRenewals();

    const appointmentsValidation: {
      valid: boolean;
      error?: string;
    } = this.validateAppointments();

    if (mecRenewalsValidation.valid) {
      if (appointmentsValidation.valid) {
        this.store.dispatch(
          new actions.RequestCheckExistance({
            id: this.form.value.entity.id,
            name: this.form.value.entity.name,
            taxpayer: this.form.value.entity.taxpayer,
          })
        );

        this.duplicateConfirmationSub$ = this.store
          .select(getTaxpayerNameValidation)
          .subscribe((response: TaxpayerNameValidation) => {
            if (response) {
              this.store.dispatch(new actions.ClearCheckExistance());
              this.duplicateConfirmationModalMessage =
                this.taxpayerNameValidationMessage(response);

              if (this.duplicateConfirmationModalMessage) {
                this.duplicateConfirmationModal.open();
              } else {
                super.onFormValid();
              }
            }
          });
      } else {
        this.savingError(
          this.i18nextPipe.transform(appointmentsValidation.error)
        );
      }
    } else {
      this.savingError(this.i18nextPipe.transform(mecRenewalsValidation.error));
    }
  }

  private taxpayerNameValidationMessage(
    response: TaxpayerNameValidation
  ): string {
    let message = '';
    if (response.name_exists) {
      message +=
        '<p>— ' +
        this.i18nextPipe.transform(
          `${this.modulePath}:message.duplicated_name`,
          { value: this.form.value.entity.name }
        ) +
        '</p>';
    }
    if (response.vat_exists) {
      message +=
        '<p>— ' +
        this.i18nextPipe.transform(
          `${this.modulePath}:message.duplicated_vat`,
          { value: this.form.value.entity.taxpayer }
        ) +
        '</p>';
    }
    if (message.length > 0) {
      message +=
        '<br/><strong>' +
        this.i18nextPipe.transform(
          `${this.modulePath}:message.are_you_sure_you_want_to_save`
        ) +
        '</strong>';
    }
    return message ? message : null;
  }

  clearModalInputs() {
    [
      'entity_father_description',
      'entity_father_id',
      'entity_mother_description',
      'entity_mother_id',
      'entity_birth_place_description',
      'entity_birth_place_id',
      'entity_spouse_description',
      'entity_spouse_id',
      'entity_wedding_location_description',
      'entity_wedding_location_id',
      'entity.entity_birth_chapelry_description',
      'entity.entity_birth_chapelry_id',
      'entity.residence_chapelry_description',
      'entity.residence_chapelry_id',
      'entity.country_description',
      'entity.country_id',
      'christian_solemn_communion_worshipplace_description',
      'christian_solemn_communion_worshipplace_id',
      'christian_baptized_worshipplace_description',
      'christian_baptized_worshipplace_id',
      'christian_first_confession_worshipplace_description',
      'christian_first_confession_worshipplace_id',
      'christian_first_communion_worshipplace_description',
      'christian_first_communion_worshipplace_id',
      'christian_chrism_worshipplace_description',
      'christian_chrism_worshipplace_id',
      'professional_country_description',
      'professional_country_id',
      'outside_chapelry_description',
      'outside_chapelry_id',
      'christian_attended_catechism_worshipplace_description',
      'christian_attended_catechism_worshipplace_id',
      'entity.entity_mec.institution_center_worshipplace_description',
      'entity.entity_mec.institution_center_worshipplace_id',
      'entity.entity_elder_patient.sunday_communion_minister_description',
      'entity.entity_elder_patient.sunday_communion_minister_id',
    ].forEach((field: string) => this.affectField(field, null));
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setCountriesModal() {
    this.countriesMenuOptions = this.defaultModalMenu('country');

    this.subs.push(
      this.countriesStore
        .select(getCountriesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }

  private setChapelriesModal() {
    this.chapelriesMenuOptions = this.defaultModalMenu('chapelry');

    this.subs.push(
      this.chapelriesStore
        .select(getChapelriesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              case 'entity.entity_birth_chapelry':
                this.affectField(
                  'entity.entity_birth_chapelry_free_text',
                  null
                );
                this.affectFieldIfBlank('birth_place_parish', row.model.parish);
                this.affectFieldIfBlank('birth_place_county', row.model.county);
                break;
              case 'entity.residence_chapelry':
                this.affectFieldIfBlank('entity.place', row.model.place);
                this.affectFieldIfBlank('entity.county', row.model.county);
                this.affectFieldIfBlank('entity.district', row.model.district);
                this.affectFieldIfBlank(
                  'entity.country_id',
                  row.model.country_id
                );
                this.affectFieldIfBlank(
                  'entity.country_description',
                  row.model.country_description
                );
                break;
              default:
                break;
            }

            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.complete_relation
            );
          }
        })
    );
  }

  private setWorshipplacesModal() {
    this.worshipplacesMenuOptions = this.defaultModalMenu('worshipplace');

    this.subs.push(
      this.worshipplacesStore
        .select(getWorshipplacesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              case 'christian_baptized_worshipplace':
                this.affectFieldIfBlank(
                  'christian_baptized_county',
                  row.model.county
                );
                this.affectFieldIfBlank(
                  'christian_baptized_district',
                  row.model.district
                );
                break;
              case 'christian_first_communion_worshipplace':
                this.affectFieldIfBlank(
                  'christian_first_communion_county',
                  row.model.county
                );
                this.affectFieldIfBlank(
                  'christian_first_communion_district',
                  row.model.district
                );
                break;
              case 'christian_chrism_worshipplace':
                this.affectFieldIfBlank(
                  'christian_chrism_county',
                  row.model.county
                );
                this.affectFieldIfBlank(
                  'christian_chrism_district',
                  row.model.district
                );
                break;
              case 'christian_attended_catechism_worshipplace':
                this.affectFieldIfBlank(
                  'christian_attended_catechism_county',
                  row.model.county
                );
                this.affectFieldIfBlank(
                  'christian_attended_catechism_district',
                  row.model.district
                );
                break;
              case 'christian_solemn_communion_worshipplace':
                this.affectFieldIfBlank(
                  'christian_solemn_communion_county',
                  row.model.county
                );
                this.affectFieldIfBlank(
                  'christian_solemn_communion_district',
                  row.model.district
                );
                break;
              default:
                break;
            }

            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.complete_relation
            );
          }
        })
    );
  }

  private setPersonsModal() {
    this.personsMenuOptions = this.defaultModalMenu('person');

    this.subs.push(
      this.personsStore
        .select(getPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.entity.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.entity.name
            );
          }
        })
    );
  }

  private setPriestsModal() {
    this.priestsMenuOptions = [this.defaultModalMenu('priest')[0]];

    this.subs.push(
      this.priestsStore
        .select(getPriestsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.entity.id);
            this.affectField(
              `${row.inputName}_description`,
              `${
                row.model.clergy_type.abbreviated_name ||
                row.model.clergy_type.name
              } ${row.model.entity.name}`
            );
          }
        })
    );
  }

  private setCuriaFunctionsModal() {
    this.curiaFunctionsMenuOptions = this.defaultModalMenu('curia_function');

    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('entity_person_appointments')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.appointmentsFormArray,
                this.appointmentsDS,
                [
                  {
                    control: 'curia_function_id',
                    value: row.model.id,
                  },
                  {
                    control: 'curia_function_description',
                    value: row.model.name,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private setPlacesModal() {
    this.placesMenuOptions = [this.defaultModalMenu('place')[0]];

    this.subs.push(
      this.placesStore
        .select(getPlacesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('entity_person_appointments')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.appointmentsFormArray,
                this.appointmentsDS,
                [
                  {
                    control: `${this.getInputNameField(row.inputName)}_id`,
                    value: row.model.id,
                  },
                  {
                    control: `${this.getInputNameField(
                      row.inputName
                    )}_description`,
                    value: row.model.complete_relation,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private detectFormChanges() {
    this.subs.push(
      this.form.valueChanges
        .pipe(
          debounceTime(500),
          startWith(this.form.getRawValue() as EntityPerson),
          pairwise()
        )
        .subscribe(([prev, current]: [EntityPerson, EntityPerson]) => {
          if (prev !== current) {
            this.detectPhotoChanges(prev, current);
            this.detectBirthDateChanges(prev, current);
            this.detectQualificationsChanges(prev, current);
            this.detectEntityCivilStatusChanges(prev, current);
            this.detectMaritialStatusChanges(prev, current);
            this.detectDisabledChanges(prev, current);
            this.detectCatechistChanges(prev, current);
            this.detectMecChanges(current);
            this.detectElderSickChanges(current);
            this.detectPastoralAgentChanges(prev, current);
            this.detectNewsletterSubscriptorChanges(current);
            this.detectDeceasedChanges(prev, current);
          }
        })
    );
  }

  private detectPhotoChanges(prev: EntityPerson, current: EntityPerson) {
    if (prev.entity.photo_filename !== current.entity.photo_filename) {
      if (!current.entity.photo_filename) {
        this.currentImage.name = this.currentImage.path = null;
        this.affectField('entity.photo_url', null);
      }
    }
  }

  private detectBirthDateChanges(prev: EntityPerson, current: EntityPerson) {
    if (
      prev.birth_date !== current.birth_date ||
      (current.birth_date && !this.ageControl.value)
    ) {
      this.ageControl.setValue(
        this.sharedModule.calculateAge(current.birth_date),
        { emitEvent: false }
      );
    }
  }

  private detectQualificationsChanges(
    prev: EntityPerson,
    current: EntityPerson
  ) {
    if (prev.qualifications_id !== current.qualifications_id) {
      let newValue = null;
      if (current.qualifications_id) {
        newValue = this.sharedModule
          .getQualifications()
          .find(
            (cs: { label: string; value: number }) =>
              cs.value === current.qualifications_id
          ).label;
      }
      this.affectField('qualifications', newValue);
    }
  }

  private detectEntityCivilStatusChanges(
    prev: EntityPerson,
    current: EntityPerson
  ) {
    if (prev.entity.civil_status_id !== current.entity.civil_status_id) {
      let newValue = null;
      if (current.entity.civil_status_id) {
        newValue = this.sharedModule
          .getCivilStatuses()
          .find(
            (cs: { label: string; value: number }) =>
              cs.value === current.entity.civil_status_id
          ).label;
      }
      this.affectField('entity.civil_status', newValue);

      this.changeDeceasedStatus(
        current.entity.civil_status_id,
        current.deceased
      );
      this.changeMaritialStatus(
        current.entity.civil_status_id,
        current.maritial_status
      );
    }
  }

  private changeDeceasedStatus(civilStatusId: number, deceased: boolean) {
    const snackMessage = this.i18nextPipe.transform(
      `${this.modulePath}:message.field_deceased_affected`
    );

    if (civilStatusId === 11 && !deceased) {
      this.affectField('deceased', true, snackMessage);
    } else if (civilStatusId !== 11 && deceased) {
      this.affectField('deceased', false, snackMessage);
    }
  }

  private changeMaritialStatus(
    civilStatusId: number,
    currentMaritialStatus: string | null
  ) {
    const setMaritialStatus = (newValue: string) => {
      if (currentMaritialStatus !== newValue) {
        this.affectField(
          'maritial_status',
          newValue,
          this.i18nextPipe.transform(
            `${this.modulePath}:message.field_maritial_status_affected`
          )
        );
      }
    };

    switch (civilStatusId) {
      case 1:
        setMaritialStatus('Católico');
        break;
      case 2:
      case 6:
        setMaritialStatus('Civil');
        break;
      case 3:
      case 4:
      case 5:
      case 7:
      case 8:
      case 12:
        setMaritialStatus('Não casado(a)');
        break;
      case 9:
        setMaritialStatus('União de Facto');
        break;
      default:
        break;
    }
  }

  private detectMaritialStatusChanges(
    prev: EntityPerson,
    current: EntityPerson
  ) {
    if (prev.maritial_status !== current.maritial_status) {
      this.affectCivilStatusBasedOnMaritialStatus(current);
    }
  }

  private affectCivilStatusBasedOnMaritialStatus(
    current: EntityPerson,
    skipDeceasedValidation = false
  ) {
    switch (current.maritial_status) {
      case 'Católico':
        this.setCivilStatus(current, 1, skipDeceasedValidation);
        break;
      case 'Civil':
        this.setCivilStatus(current, 2, skipDeceasedValidation);
        break;
      case 'União de Facto':
        this.setCivilStatus(current, 9, skipDeceasedValidation);
        break;
      case 'Não casado(a)':
        this.setCivilStatus(current, 12, skipDeceasedValidation);
        break;
      default:
        break;
    }
  }

  private setCivilStatus(
    current: EntityPerson,
    newValue: number,
    skipDeceasedValidation = false
  ) {
    if (
      skipDeceasedValidation ||
      ![10, 11].includes(current.entity.civil_status_id)
    ) {
      if (current.entity.civil_status_id !== newValue) {
        if (
          newValue !== 12 ||
          (newValue === 12 &&
            ![3, 4, 5, 7, 8, 12].includes(current.entity.civil_status_id))
        ) {
          const snackMessage = this.i18nextPipe.transform(
            `${this.modulePath}:message.field_civil_status_affected`
          );

          let label = this.sharedModule
            .getCivilStatuses()
            .find((cs) => cs.value === newValue).label;
          if (label.includes('--')) {
            label = null;
          }

          this.affectField('entity.civil_status_id', newValue);
          this.affectField('entity.civil_status', label, snackMessage);
        }
      }
    }
  }

  private detectDisabledChanges(prev: EntityPerson, current: EntityPerson) {
    this.isActive = current.entity.disabled;
    const nsControl = this.form.get(
      'entity.newsletter_subscriptor'
    ) as FormControl;
    if (current.entity.disabled) {
      nsControl.enable({ emitEvent: false });
    } else {
      nsControl.disable({ emitEvent: false });
    }

    if (prev.entity.disabled !== current.entity.disabled) {
      if (!current.entity.disabled) {
        current.entity.newsletter_subscriptor = false;
        this.affectField(
          'entity.newsletter_subscriptor',
          false,
          this.i18nextPipe.transform(
            `${this.modulePath}:message.field_newsletter_subscriptor_affected`
          )
        );
      }
    }
  }

  private detectCatechistChanges(prev: EntityPerson, current: EntityPerson) {
    if (
      prev.entity.entity_catechist.catechist !==
      current.entity.entity_catechist.catechist
    ) {
      this.affectField(
        'entity.entity_pastoral_agent.active',
        current.entity.entity_catechist.catechist,
        this.i18nextPipe.transform(
          `${this.modulePath}:message.field_pastoral_agent_affected`
        )
      );
    }

    this.addOrRemoveTabs(
      current.entity.entity_catechist.catechist,
      'catechist',
      this.catechistTabTemplate
    );
  }

  private detectMecChanges(current: EntityPerson) {
    this.addOrRemoveTabs(
      current.entity.entity_mec.mec,
      'mec',
      this.mecTabTemplate
    );
  }

  private detectElderSickChanges(current: EntityPerson) {
    this.addOrRemoveTabs(
      current.entity.entity_elder_patient.elder ||
        current.entity.entity_elder_patient.sick,
      'elder_sick',
      this.elderSickTabTemplate
    );
  }

  private detectPastoralAgentChanges(
    prev: EntityPerson,
    current: EntityPerson
  ) {
    if (
      prev.entity.entity_pastoral_agent.active !==
      current.entity.entity_pastoral_agent.active
    ) {
      this.affectField(
        'entity.entity_catechist.catechist',
        current.entity.entity_pastoral_agent.active,
        this.i18nextPipe.transform(
          `${this.modulePath}:message.field_catechist_affected`
        )
      );
    }
  }

  private detectNewsletterSubscriptorChanges(current: EntityPerson) {
    if (current.id) {
      this.addOrRemoveTabs(
        current.entity.newsletter_subscriptor === true,
        'groups',
        this.groupsTabTemplate
      );
    }
  }

  private detectDeceasedChanges(prev: EntityPerson, current: EntityPerson) {
    if (prev.deceased !== current.deceased) {
      if (current.deceased) {
        this.setCivilStatus(current, 11);
      } else {
        this.affectCivilStatusBasedOnMaritialStatus(current, true);
      }
    }
  }

  private addOrRemoveTabs(
    conditionToAdd: boolean,
    tabName: string,
    tabTemplate: TemplateRef<any>
  ) {
    const tab: Tab = {
      textLabel: this.i18nextPipe.transform(
        `${this.modulePath}:tabs.${tabName}`
      ),
      templateContent: tabTemplate,
    };

    if (conditionToAdd) {
      const tabExist = this.formTabs.find(
        (t: Tab) => t.textLabel === tab.textLabel
      );
      if (!tabExist) {
        this.formTabs.splice(this.formTabs.length - 1, 0, tab);
      }
    } else {
      const index: number = this.formTabs.findIndex(
        (t: Tab) => t.textLabel === tab.textLabel
      );
      if (index >= 0) {
        this.formTabs.splice(index, 1);
      }
    }
  }

  private buildSubTablesColumns() {
    setTimeout(() => {
      if (this.isDiocese) {
        this.appointmentsColumns = [
          {
            id: 'delete-btn',
            sortable: false,
            template: this.deleteAppointmentsTemplate,
          },
          {
            id: 'start_date',
            title: this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_person_appointments.start_date`
            ),
            required: true,
            sortable: false,
            template: this.appointmentStartDateTemplate,
          },
          {
            id: 'end_date',
            title: this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_person_appointments.end_date`
            ),
            required: false,
            sortable: false,
            template: this.appointmentEndDateTemplate,
          },
          {
            id: 'curia_function_description',
            title: this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_person_appointments.curia_function_description`
            ),
            required: true,
            sortable: false,
            template: this.appointmentCuriaFunctionTemplate,
          },
          {
            id: 'appointment_place_description',
            title: this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_person_appointments.appointment_place_description`
            ),
            required: true,
            sortable: false,
            template: this.appointmentPlaceTemplate,
          },
          {
            id: 'representing_description',
            title: this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_person_appointments.representing_description`
            ),
            required: false,
            sortable: false,
            template: this.appointmentRepresentingTemplate,
          },
          {
            id: 'description',
            title: this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_person_appointments.description`
            ),
            required: false,
            sortable: false,
            template: this.appointmentDescriptionTemplate,
          },
        ];
      }

      this.mecRenewalsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteMecRenewalsTemplate,
        },
        {
          id: 'renewal_date',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.entity_mec.entities_mecs_lines.renewal_date`
          ),
          required: true,
          sortable: false,
          template: this.mecRenewalDateTemplate,
        },
      ];
    });
  }

  private validateMecRenewals(): { valid: boolean; error?: string } {
    let mecRenewalsValid = true;
    let error: string;

    (
      (this.form.controls.entity as FormGroup).controls.entity_mec as FormGroup
    ).setControl(
      'entities_mecs_lines',
      this.fb.array(this.mecRenewalsFormArray.value)
    );

    this.form
      .getRawValue()
      .entity.entity_mec.entities_mecs_lines.filter(
        (obj: EntitiesMecsLine) => !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: EntitiesMecsLine) => {
        const lineCopy = { ...obj };

        if (!lineCopy.renewal_date) {
          mecRenewalsValid = false;
          error = `${this.modulePath}:message.error_blank_mec_renewals`;
        }
      });

    return { valid: mecRenewalsValid, error };
  }

  private validateAppointments(): { valid: boolean; error?: string } {
    let appointmentsValid = true;
    let error: string;

    this.form.setControl(
      'entity_person_appointments',
      this.fb.array(this.appointmentsFormArray.value)
    );

    this.form
      .getRawValue()
      .entity_person_appointments.filter(
        (obj: EntityPersonAppointment) => !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: EntityPersonAppointment) => {
        const lineCopy = { ...obj };

        if (
          !lineCopy.start_date ||
          !lineCopy.curia_function_id ||
          !lineCopy.appointment_place_id
        ) {
          appointmentsValid = false;
          error = `${this.modulePath}:message.error_blank_appointments`;
        }

        if (lineCopy.start_date && lineCopy.end_date) {
          const start = new Date(lineCopy.start_date);
          const end = new Date(lineCopy.end_date);

          if (start >= end) {
            appointmentsValid = false;
            error = `${this.modulePath}:message.error_appointments_dates`;
          }
        }
      });

    return { valid: appointmentsValid, error };
  }

  onDuplicateConfirmationModalClose() {
    if (this.duplicateConfirmationSub$) {
      this.duplicateConfirmationSub$.unsubscribe();
    }
  }

  duplicateConfirmationModalClose(positiveAnswer = false) {
    this.duplicateConfirmationModal.close();
    positiveAnswer ? super.onFormValid() : (this.isSaving = false);
    this.store.dispatch(new actions.ClearCheckExistance());
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
