import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as actions from '../reducers/profile-priests.actions';
import { getProfilePriest } from '../reducers/profile-priests.selectors';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import {
  EntityPriestAppointment,
  EntityPriestPriestlyCard,
  EntityPriestRetreat,
  EntityPriestCurriculum,
  EntityPriestHashtag,
  EntityPriestAcademicQualification,
  EntityPriestOngoingFormation,
  EntityPriestPublication,
  ProfilePriest,
} from '../profile-priest.model';
import {
  ChipsField,
  TabField,
  InputField,
  RowField,
  SelectField,
  CheckboxField,
  SectionField,
  DateField,
  TextAreaField,
  ImageField,
  ColumnField,
  TemplateField,
} from 'src/app/shared/components/form/fields';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { State as CountriesState } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.reducer';
import { State } from '../reducers/profile-priests.reducer';
import { getCountriesSelected } from 'src/app/shared/components/modals/countries-modal/reducers/countries-modal.selectors';
import { InputSelectField } from 'src/app/shared/components/form/fields/input-select-field';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { TabGroupField } from 'src/app/shared/components/form/fields/tab-group-field';
import { TableField } from 'src/app/shared/components/form/fields/table-field';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import { State as CuriaFunctionsState } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getClergyTypesSelected } from 'src/app/shared/components/modals/clergy-types-modal/reducers/clergy-types-modal.selectors';
import * as ClergyTypesState from '../../../shared/components/modals/clergy-types-modal/reducers/clergy-types-modal.reducer';
import { environment } from 'src/environments/environment';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { CurrentAccountsLinesService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-profile-priests-form',
  templateUrl: './profile-priests-form.component.html',
})
export class ProfilePriestsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<ProfilePriest>;
  modulePath = 'profile-priests';
  translationPath = 'priests';

  selectorGetModel = getProfilePriest;
  actionRequestFail = actions.ProfilePriestActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.ProfilePriestActionTypes.SuccessPut;

  formFields: any[] = [];

  residenceOptions: any[] = [];
  identificationTypeOptions: any[] = [];

  @ViewChild('inputLeftTemplate') inputLeftTemplate: TemplateRef<any>;
  @ViewChild('countriesRightTemplate') countriesRightTemplate: TemplateRef<any>;

  // TABLE TEMPLATES VARIABLES
  @ViewChild('currentAccountsLinesTemplate')
  currentAccountsLinesTemplate: TemplateRef<any>;
  @ViewChild('currentAccountsLinesOnCuriaTemplate')
  currentAccountsLinesOnCuriaTemplate: TemplateRef<any>;

  dataSourceColumnsCurrentAccountLines: any[] = [];
  dataSourceCurrentAccountLines: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceCurrentAccountLinesOnCuria: TableDataSource<any> =
    new TableDataSource([]); // The data that feeds the table

  documentsStatusOptions: any[] = [];
  currentAccountsLinesForm: FormGroup;
  currentAccountsLinesOnCuriaForm: FormGroup;

  httpCurrentAccountsLinesParams: any;
  httpcurrentAccountsLinesOnCuriaParams: any;

  // TABLE TEMPLATES VARIABLES

  countriesMenuOptions: ModalMenuOption[] = [];

  dataSourcePriestlyCards: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsPriestlyCards: any[] = [];
  dataSourceRetreats: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsRetreats: any[] = [];
  dataSourceOngoingFormations: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsOngoingFormations: any[] = [];
  dataSourcePublications: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsPublications: any[] = [];
  dataSourceCurriculums: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsCurriculums: any[] = [];
  dataSourceAcademicQualifications: TableDataSource<any> = new TableDataSource(
    []
  ); // The data that feeds the table
  dataSourceColumnsAcademicQualifications: any[] = [];
  dataSourceEntityPriestAppointments: TableDataSource<any> =
    new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsEntityPriestAppointments: any[] = [];
  dataSourceHashtags: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsHashtags: any[] = [];
  entity_priest_appointmentsArray: FormArray;
  entity_priest_priestly_cardsArray: FormArray;
  entity_priest_retreatsArray: FormArray;
  entity_priest_ongoing_formationsArray: FormArray;
  entity_priest_publicationsArray: FormArray;
  entity_priest_curriculumsArray: FormArray;
  entity_priest_academic_qualificationsArray: FormArray;
  entity_priest_hashtagsArray: FormArray;

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
    private personsStore: Store<PersonsState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private curiaFunctionsStore: Store<CuriaFunctionsState>,
    private parishionersStore: Store<ParishionersState.State>,
    private clergyTypesStore: Store<ClergyTypesState.State>,
    private currentAccountsLinesService: CurrentAccountsLinesService
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

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessPut))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            let errorMessage = '';

            if (result.payload.error.status === 400) {
              errorMessage = result.payload.error.error.message;
            } else if (result.payload.error.status === 401) {
              if ('message' in result.payload.error) {
                errorMessage = result.payload.error.error.message;
              } else {
                errorMessage = this.i18nextPipe.transform(
                  'translation:message.error_401',
                  { appName: environment.appName }
                );
              }
            } else if (
              result.payload.error.status === 422 &&
              'error' in result.payload.error
            ) {
              for (const key of Object.keys(result.payload.error.error)) {
                errorMessage += `${result.payload.error.error[key]}\n`;
              }
            }

            this.snackBarService.openSnackBar(
              errorMessage,
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.onSaveSuccess(result);
          }
        })
    );
  }

  onFormValid(payload = this.form.getRawValue()) {
    if (payload.id) {
      this.store.dispatch(new this.actionRequestPut(payload));
    } else {
      const entityKeys = Object.keys(payload.entity).filter(
        (item) =>
          payload.entity[item] != undefined || payload.entity[item] != null
      );
      const entityFiltered = {};
      entityKeys.forEach((item) =>
        Object.assign(entityFiltered, { [item]: payload.entity[item] })
      );
      payload.entity = entityFiltered;

      const entityPersionKeys = Object.keys(payload.entity_person).filter(
        (item) =>
          payload.entity_person[item] != undefined ||
          payload.entity_person[item] != null
      );
      const entityPersonFiltered = {};
      entityPersionKeys.forEach((item) =>
        Object.assign(entityPersonFiltered, {
          [item]: payload.entity_person[item],
        })
      );
      payload.entity_person = entityPersonFiltered;
      this.store.dispatch(new this.actionRequestPost(payload));
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.buildDataSources();
    if (!this.id) {
      this.buildFields();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(new actions.ClearGet());
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    if (this.duplicateMode) {
      this.affectField('id', null);
      this.affectField('entity_person.id', null);
      // this.affectField('entity_person.id', null);
    }

    this.setInnerTable(
      obj.entity_priest_appointments,
      this.entity_priest_appointmentsArray,
      this.dataSourceEntityPriestAppointments,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_priestly_cards,
      this.entity_priest_priestly_cardsArray,
      this.dataSourcePriestlyCards,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_retreats,
      this.entity_priest_retreatsArray,
      this.dataSourceRetreats,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_ongoing_formations,
      this.entity_priest_ongoing_formationsArray,
      this.dataSourceOngoingFormations,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_publications,
      this.entity_priest_publicationsArray,
      this.dataSourcePublications,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_curriculums,
      this.entity_priest_curriculumsArray,
      this.dataSourceCurriculums,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_academic_qualifications,
      this.entity_priest_academic_qualificationsArray,
      this.dataSourceAcademicQualifications,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_appointments,
      this.entity_priest_appointmentsArray,
      this.dataSourceEntityPriestAppointments,
      ['entity_priest_id']
    );

    this.setInnerTable(
      obj.entity_priest_hashtags,
      this.entity_priest_hashtagsArray,
      this.dataSourceHashtags,
      ['entity_priest_id']
    );
    this.buildFields();
  }

  initializeForm() {
    this.form = this.fb.group({
      abbreviated_name: [],
      actual_appointments: [],
      appointments: [],
      attachment: [],
      attachment_filename: [],
      birth_chapelry_description: [],
      birth_chapelry_id: [],
      changes_request: [],
      clergy_group_id: [],
      clergy_type_description: [, Validators.required],
      clergy_type_id: [, Validators.required],
      coat_of_arms: [],
      coat_of_arms_filename: [],
      coordinator_delegate: [],
      created_at: [],
      curriculum: [],
      death_date: [],
      deceased: [],
      entity_id: [],
      episcopal_nomination_date: [],
      episcopal_ordination_date: [],
      episcopal_ordination_place: [],
      father_description: [],
      father_id: [],
      id: [],
      ident_document_emission_date: [],
      ident_document_emitted_by: [],
      ident_document_number: [],
      ident_document_type: [],
      ident_document_validity_date: [],
      imported_actual_appointments: [],
      mother_description: [],
      mother_id: [],
      observations: [],
      ongoing_formations: [],
      ordination_date: [],
      ordination_place: [],
      pastoral_service: [],
      priest_academic_qualifications: [],
      priest_birth_date: [],
      priest_birth_place: [],
      priestly_fraternity: [],
      priestly_reference: [],
      private_mobilephone: [],
      publications: [],
      residence: [],
      residence_chapelry_description: [],
      residence_chapelry_id: [],
      resignation_date: [],
      taken_date: [],
      title_for_documents: [],
      updated_at: [],
      entity: this.fb.group({
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
        // created_at: [],
        // created_by_user_id: [],
        // deleted: [],
        // deleted_by_user_id: [],
        disabled: [true],
        district: [],
        door_number: [],
        email: [],
        emoluments_imported: [],
        entity_birth_chapelry_description: [],
        entity_birth_chapelry_free_text: [],
        entity_birth_chapelry_id: [],
        entity_ekklesia_location_id: [],
        // entity_type_id: [],
        fax: [],
        id: [],
        import_origin: [],
        // inserted_by_user: [],
        // is_archdiocese: [],
        // is_demo: [],
        // is_public_profile: [],
        latitude: [],
        longitude: [],
        mass_intention_types_imported: [],
        mobilephone: [],
        name: [, Validators.required],
        newsletter_subscriptor: [],
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
        // updated_at: [],
        // updated_by_user_id: [],
        url: [],
        validated: [],
      }),
      clergy_type: this.fb.group({
        id: [],
        name: [],
        abbreviated_name: [],
        group_name: [],
        block_remove: [],
        created_at: [],
        created_by_user_id: [],
        deleted: [],
        deleted_by_user_id: [],
        group_id: [],
        inserted_by_user: [],
        locale: [],
        updated_at: [],
        updated_by_user_id: [],
        validated: [],
      }),
      birth_chapelry: this.fb.group({
        id: [],
        entity_id: [],
        name: [],
        entity_relation_attributes: [],
      }),
      entity_priest_appointments: this.fb.array([]),
      entity_priest_retreats: this.fb.array([]),
      entity_priest_ongoing_formations: this.fb.array([]),
      entity_priest_publications: this.fb.array([]),
      entity_priest_curriculums: this.fb.array([]),
      entity_priest_academic_qualifications: this.fb.array([]),
      entity_priest_priestly_cards: this.fb.array([]),
      entity_priest_hashtags: this.fb.array([]),
      documents: this.fb.array([]),
      entity_person: this.fb.group({
        attended_catechism_party_1: [],
        attended_catechism_party_2: [],
        attended_catechism_party_3: [],
        attended_catechism_party_4: [],
        attended_catechism_party_5: [],
        attended_catechism_party_7: [],
        attended_catechism_party_8: [],
        attended_catechism_party_9: [],
        attended_catechism_party_10: [],
        attended_catechism_year_1: [],
        attended_catechism_year_2: [],
        attended_catechism_year_3: [],
        attended_catechism_year_4: [],
        attended_catechism_year_5: [],
        attended_catechism_year_6: [],
        attended_catechism_year_7: [],
        attended_catechism_year_8: [],
        attended_catechism_year_9: [],
        attended_catechism_year_10: [],
        baptized_chrismed_description: [],
        birth_date: [],
        birth_place_county: [],
        birth_place_parish: [],
        catechism_1_obs: [],
        catechism_2_obs: [],
        catechism_3_obs: [],
        catechism_4_obs: [],
        catechism_5_obs: [],
        catechism_6_obs: [],
        catechism_7_obs: [],
        catechism_8_obs: [],
        catechism_9_obs: [],
        catechism_10_obs: [],
        catechism_attendance_1: [],
        catechism_attendance_2: [],
        catechism_attendance_3: [],
        catechism_attendance_4: [],
        catechism_attendance_5: [],
        catechism_attendance_6: [],
        catechism_attendance_7: [],
        catechism_attendance_8: [],
        catechism_attendance_9: [],
        catechism_attendance_10: [],
        catechism_failures_1: [],
        catechism_failures_2: [],
        catechism_failures_3: [],
        catechism_failures_4: [],
        catechism_failures_5: [],
        catechism_failures_6: [],
        catechism_failures_7: [],
        catechism_failures_8: [],
        catechism_failures_9: [],
        catechism_failures_10: [],
        catechism_inscription_date_1: [],
        catechism_inscription_date_2: [],
        catechism_inscription_date_3: [],
        catechism_inscription_date_4: [],
        catechism_inscription_date_5: [],
        catechism_inscription_date_6: [],
        catechism_inscription_date_7: [],
        catechism_inscription_date_8: [],
        catechism_inscription_date_9: [],
        catechism_inscription_date_10: [],
        catechism_last_year: [],
        catechism_party_1_date: [],
        catechism_party_1_name: [],
        catechism_party_2_date: [],
        catechism_party_2_name: [],
        catechism_party_3_date: [],
        catechism_party_3_name: [],
        catechism_party_4_date: [],
        catechism_party_4_name: [],
        catechism_party_5_date: [],
        catechism_party_5_name: [],
        catechism_party_6_name: [],
        catechism_party_7_date: [],
        catechism_party_7_name: [],
        catechism_party_8_date: [],
        catechism_party_8_name: [],
        catechism_party_9_date: [],
        catechism_party_9_name: [],
        catechism_party_10_date: [],
        catechism_party_10_name: [],
        catechized_has_brothers_info: [],
        catechized_has_catechized_brothers: [],
        christian_attended_catechism: [],
        christian_attended_catechism_county: [],
        christian_attended_catechism_district: [],
        christian_attended_catechism_worshipplace_description: [],
        christian_attended_catechism_worshipplace_id: [],
        christian_baptized: [],
        christian_baptized_county: [],
        christian_baptized_date: [],
        christian_baptized_district: [],
        christian_baptized_number: [],
        christian_baptized_sheet: [],
        christian_baptized_worshipplace_description: [],
        christian_baptized_worshipplace_id: [],
        christian_chrism: [],
        christian_chrism_county: [],
        christian_chrism_date: [],
        christian_chrism_district: [],
        christian_chrism_number: [],
        christian_chrism_sheet: [],
        christian_chrism_worshipplace_description: [],
        christian_chrism_worshipplace_id: [],
        christian_first_communion: [],
        christian_first_communion_county: [],
        christian_first_communion_date: [],
        christian_first_communion_district: [],
        christian_first_communion_number: [],
        christian_first_communion_sheet: [],
        christian_first_communion_worshipplace_description: [],
        christian_first_communion_worshipplace_id: [],
        christian_first_confession: [],
        christian_first_confession_date: [],
        christian_first_confession_worshipplace_description: [],
        christian_first_confession_worshipplace_id: [],
        christian_often_eucharist: [],
        christian_solemn_communion: [],
        christian_solemn_communion_by_id: [],
        christian_solemn_communion_county: [],
        christian_solemn_communion_date: [],
        christian_solemn_communion_district: [],
        christian_solemn_communion_worshipplace_description: [],
        christian_solemn_communion_worshipplace_id: [],
        comments: [],
        deceased: [],
        entity_birth_place_description: [],
        entity_birth_place_id: [],
        entity_christian_first_communion_by_id: [],
        entity_father_description: [],
        entity_father_id: [],
        entity_id: [],
        entity_mother_description: [],
        entity_mother_id: [],
        entity_spouse_description: [],
        entity_spouse_id: [],
        entity_wedding_location_description: [],
        entity_wedding_location_id: [],
        id: [],
        ident_document_emission_date: [],
        ident_document_emitted_by: [],
        ident_document_number: [],
        ident_document_type: [],
        ident_document_validity_date: [],
        is_adopted: [],
        is_catechized: [],
        is_parishioner: [],
        lives_with: [],
        lives_with_text: [],
        maritial_status: [],
        outside_chapelry_description: [],
        outside_chapelry_id: [],
        previous_address: [],
        professional_address: [],
        professional_company: [],
        professional_country_description: [],
        professional_country_id: [],
        professional_county: [],
        professional_district: [],
        professional_door_number: [],
        professional_email: [],
        professional_fax: [],
        professional_locality: [],
        professional_mobilephone: [],
        professional_parish: [],
        professional_phone: [],
        professional_post: [],
        professional_postal_code: [],
        professional_profession_description: [],
        professional_profession_id: [],
        professional_url: [],
        qualifications: [],
        qualifications_id: [],
        serie_number: [],
        // sex: [],
        suitability_request: [],
        time_of_birth: [],
        title: [],
        wedding_date: [],
      }),
      entity__disabled: [],
      entity__name: [],
    });

    this.residenceOptions = [
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:types.religious`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:types.arquidiocesano`
        ),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:types.arquidiocesano1`
        ),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:types.arquidiocesano2`
        ),
      },
    ];

    this.identificationTypeOptions = [
      {
        value: 1,
        label: this.i18nextPipe.transform(`${this.translationPath}:types.bi`),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(`${this.translationPath}:types.cc`),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:types.passaport`
        ),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:types.tit_resi`
        ),
      },
    ];

    this.initializeCurrentAccountsSearchForms();
  }

  buildDataSources() {
    this.entity_priest_priestly_cardsArray = this.form.get(
      'entity_priest_priestly_cards'
    ) as FormArray;
    this.dataSourcePriestlyCards.data = this.form.get(
      'entity_priest_priestly_cards'
    ).value;
    this.dataSourceColumnsPriestlyCards = [
      {
        id: 'renewal_date',
        title: `${this.translationPath}:model.entity_priest_priestly_cards.renewal_date`,
        sortable: false,
        required: true,
        type: 'date',
      },
    ];
    this.entity_priest_retreatsArray = this.form.get(
      'entity_priest_retreats'
    ) as FormArray;
    this.dataSourceRetreats.data = this.form.get(
      'entity_priest_retreats'
    ).value;
    this.dataSourceColumnsRetreats = [
      {
        id: 'retreat_year',
        title: `${this.translationPath}:model.entity_priest_retreats.retreat_year`,
        sortable: false,
        required: true,
        type: 'date',
      },
      {
        id: 'retreat_place',
        title: `${this.translationPath}:model.entity_priest_retreats.retreat_place`,
        sortable: false,
        required: true,
        type: 'input',
      },
    ];
    this.entity_priest_ongoing_formationsArray = this.form.get(
      'entity_priest_ongoing_formations'
    ) as FormArray;
    this.dataSourceOngoingFormations.data = this.form.get(
      'entity_priest_ongoing_formations'
    ).value;
    this.dataSourceColumnsOngoingFormations = [
      {
        id: 'start_date',
        title: `${this.translationPath}:model.entity_priest_ongoing_formations.start_date`,
        sortable: false,
        required: true,
        type: 'date',
      },
      {
        id: 'end_date',
        title: `${this.translationPath}:model.entity_priest_ongoing_formations.end_date`,
        sortable: false,
        type: 'date',
      },
      {
        id: 'description',
        title: `${this.translationPath}:model.entity_priest_ongoing_formations.description`,
        sortable: false,
        required: true,
        type: 'input',
      },
    ];
    this.entity_priest_publicationsArray = this.form.get(
      'entity_priest_publications'
    ) as FormArray;
    this.dataSourcePublications.data = this.form.get(
      'entity_priest_publications'
    ).value;
    this.dataSourceColumnsPublications = [
      {
        id: 'publication_date',
        title: `${this.translationPath}:model.entity_priest_publications.publication_date`,
        sortable: false,
        required: true,
        type: 'date',
      },
      {
        id: 'description',
        title: `${this.translationPath}:model.entity_priest_publications.description`,
        sortable: false,
        required: true,
        type: 'input',
      },
    ];
    this.entity_priest_curriculumsArray = this.form.get(
      'entity_priest_curriculums'
    ) as FormArray;
    this.dataSourceCurriculums.data = this.form.get(
      'entity_priest_curriculums'
    ).value;
    this.dataSourceColumnsCurriculums = [
      {
        id: 'start_date',
        title: `${this.translationPath}:model.entity_priest_curriculums.start_date`,
        sortable: false,
        required: true,
        type: 'date',
      },
      {
        id: 'end_date',
        title: `${this.translationPath}:model.entity_priest_curriculums.end_date`,
        sortable: false,
        type: 'date',
      },
      {
        id: 'description',
        title: `${this.translationPath}:model.entity_priest_curriculums.description`,
        sortable: false,
        required: true,
        type: 'input',
      },
    ];
    this.entity_priest_academic_qualificationsArray = this.form.get(
      'entity_priest_academic_qualifications'
    ) as FormArray;
    this.dataSourceAcademicQualifications.data = this.form.get(
      'entity_priest_academic_qualifications'
    ).value;
    this.dataSourceColumnsAcademicQualifications = [
      {
        id: 'start_date',
        title: `${this.translationPath}:model.entity_priest_academic_qualifications.start_date`,
        sortable: false,
        required: true,
        type: 'date',
      },
      {
        id: 'end_date',
        title: `${this.translationPath}:model.entity_priest_academic_qualifications.end_date`,
        sortable: false,
        type: 'date',
      },
      {
        id: 'description',
        title: `${this.translationPath}:model.entity_priest_academic_qualifications.description`,
        sortable: false,
        required: true,
        type: 'input',
      },
    ];
    this.entity_priest_appointmentsArray = this.form.get(
      'entity_priest_appointments'
    ) as FormArray;
    this.dataSourceEntityPriestAppointments.data = this.form.get(
      'entity_priest_appointments'
    ).value;
    this.dataSourceColumnsEntityPriestAppointments = [
      {
        id: 'start_date',
        title: `${this.translationPath}:model.entity_priest_appointments.start_date`,
        sortable: false,
        required: true,
        type: 'date',
      },
      {
        id: 'end_date',
        title: `${this.translationPath}:model.entity_priest_appointments.end_date`,
        type: 'date',
        sortable: false,
      },
      {
        id: 'curia_function',
        title: `${this.translationPath}:model.entity_priest_appointments.curia_function_description`,
        type: 'input-select',
        sortable: false,
        isQuickInsertion: false,
        modalName: 'curia-functions-modal',
        inputSelector: getCuriaFunctionsSelected,
        inputStore: this.curiaFunctionsStore,
        storeName: 'curia_function',
        detailsModule: 'curia_functions',
        modalParams: {},
        required: true,
      },
      {
        id: 'appointment_place',
        title: `${this.translationPath}:model.entity_priest_appointments.appointment_place_description`,
        type: 'input-select',
        sortable: false,
        isQuickInsertion: false,
        modalName: 'parishioners-modal',
        inputSelector: getParishionersSelected,
        inputStore: this.parishionersStore,
        leftTemplateContext: { icon: 'place' },
        storeName: 'parishioners',
        detailsModule: 'parishioners',
        modalParams: {
          entity_type: 'Locals',
          serialize: 'parishioners_complete_relation',
          translatable: 'true',
          except_users: 'false',
        },
        required: true,
      },
      {
        id: 'representing',
        title: `${this.translationPath}:model.entity_priest_appointments.representing_description`,
        type: 'input-select',
        sortable: false,
        isQuickInsertion: false,
        modalName: 'parishioners-modal',
        inputSelector: getParishionersSelected,
        inputStore: this.parishionersStore,
        storeName: 'parishioners',
        detailsModule: 'parishioners',
        modalParams: {
          entity_type: 'Locals',
          serialize: 'parishioners_complete_relation',
          translatable: 'true',
          except_users: 'false',
        },
      },
      {
        id: 'description',
        title: `${this.translationPath}:model.entity_priest_appointments.description`,
        type: 'input',
        sortable: false,
      },
    ];
    this.entity_priest_hashtagsArray = this.form.get(
      'entity_priest_hashtags'
    ) as FormArray;
    this.dataSourceHashtags.data = this.form.get(
      'entity_priest_hashtags'
    ).value;
    this.dataSourceColumnsHashtags = [
      {
        id: 'tag',
        title: `${this.translationPath}:model.entity_priest_hashtags.tag`,
        sortable: false,
        type: 'input',
      },
    ];
    this.buildCurrentAccountsDataSources();
  }

  buildFields() {
    this.formFields = [
      new TabGroupField({
        fields: [
          new TabField({
            name: 'personal_data_tab',
            textLabel: `${this.translationPath}:header.personal_data`,
            fields: [
              new SectionField({
                id: 'changes_request_section',
                label: '',
                isVisible: this.form.get('changes_request').value,
                fields: [
                  new RowField({
                    fields: [
                      new TextAreaField({
                        label: `${this.translationPath}:model.changes_request`,
                        form: this.form.get('changes_request'),
                        name: 'changes_request',
                      }),
                    ],
                  }),
                ],
              }),
              new RowField({
                fields: [
                  new ColumnField({
                    fxFlex: 66.66,
                    fields: [
                      new SectionField({
                        id: 'personal_data',
                        label: `${this.translationPath}:header.personal_data`,
                        fields: [
                          new RowField({
                            fields: [
                              new CheckboxField({
                                label: `${this.translationPath}:model.entity.disabled`,
                                form: this.form.get('entity.disabled'),
                                name: 'entity.disabled',
                              }),
                              new CheckboxField({
                                label: `${this.translationPath}:model.entity.can_sign_documents`,
                                form: this.form.get(
                                  'entity.can_sign_documents'
                                ),
                                name: 'entity.can_sign_documents',
                              }),
                              new CheckboxField({
                                label: `${this.translationPath}:model.deceased`,
                                form: this.form.get('deceased'),
                                name: 'deceased',
                              }),
                            ],
                          }),
                          new RowField({
                            fields: [
                              new InputSelectField({
                                label: `${this.translationPath}:model.clergy_type_description`,
                                form: this.form,
                                name: 'clergy_type',
                                i18nextPipe: this.i18nextPipe,
                                snackBarService: this.snackBarService,
                                sharedModule: this.sharedModule,
                                route: this.route,
                                router: this.router,
                                subs: this.subs,
                                isQuickInsertion: false,
                                modalName: 'clergy-types-modal',
                                inputSelector: getClergyTypesSelected,
                                inputStore: this.clergyTypesStore,
                                storeName: 'clergy-type',
                                detailsModule: 'clergy-types',
                                readonly: true,
                                required: true,
                                setAfectedFields: (row: any) => {
                                  this.form
                                    .get('clergy_type_id')
                                    .setValue(row.model.id, {
                                      emitEvent: true,
                                    });
                                  this.form
                                    .get('clergy_type_description')
                                    .setValue(row.model.name, {
                                      emitEvent: true,
                                    });
                                  this.form
                                    .get('clergy_group_id')
                                    .setValue(row.model.group_id, {
                                      emitEvent: true,
                                    });
                                  // affectField(`clergy_type_id`, row.model.id);
                                  // affectField(`clergy_type_description`, row.model.name);
                                  // affectField(`clergy_group_id`, row.model.group_id);
                                },
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.name`,
                                form: this.form.get('entity.name'),
                                name: 'entity.name',
                                required: true,
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.abbreviated_name`,
                                form: this.form.get('abbreviated_name'),
                                name: 'abbreviated_name',
                              }),
                            ],
                          }),
                          new RowField({
                            fields: [
                              new InputField({
                                label: `${this.translationPath}:model.title_for_documents`,
                                form: this.form.get('title_for_documents'),
                                name: 'title_for_documents',
                              }),
                              new DateField({
                                label: `${this.translationPath}:model.priest_birth_date`,
                                form: this.form.get('priest_birth_date'),
                                name: 'priest_birth_date',
                              }),
                              new InputSelectField({
                                label: `${this.translationPath}:model.birth_chapelry_description`,
                                form: this.form,
                                name: 'birth_chapelry',
                                leftTemplateContext: { icon: 'place' },
                                i18nextPipe: this.i18nextPipe,
                                snackBarService: this.snackBarService,
                                sharedModule: this.sharedModule,
                                route: this.route,
                                router: this.router,
                                subs: this.subs,
                                isQuickInsertion: false,
                                modalName: 'chapelries-modal',
                                inputSelector: getChapelriesSelected,
                                inputStore: this.chapelriesStore,
                                storeName: 'chapelry',
                                detailsModule: 'chapelries',
                                readonly: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new SectionField({
                        id: 'address',
                        label: `${this.translationPath}:header.address`,
                        fields: [
                          new RowField({
                            fields: [
                              new SelectField({
                                label: `${this.translationPath}:model.residence`,
                                form: this.form.get('residence'),
                                name: 'residence',
                                options: this.residenceOptions,
                              }),
                              new InputSelectField({
                                label: `${this.translationPath}:model.residence_chapelry_description`,
                                form: this.form,
                                name: 'residence_chapelry',
                                leftTemplateContext: { icon: 'place' },
                                i18nextPipe: this.i18nextPipe,
                                snackBarService: this.snackBarService,
                                sharedModule: this.sharedModule,
                                route: this.route,
                                router: this.router,
                                subs: this.subs,
                                isQuickInsertion: false,
                                modalName: 'chapelries-modal',
                                inputSelector: getChapelriesSelected,
                                inputStore: this.chapelriesStore,
                                storeName: 'chapelry',
                                detailsModule: 'chapelries',
                                readonly: true,
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.address`,
                                form: this.form.get('entity.address'),
                                name: 'entity.address',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.door_number`,
                                form: this.form.get('entity.door_number'),
                                name: 'entity.door_number',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.postal_code`,
                                form: this.form.get('entity.postal_code'),
                                name: 'entity.postal_code',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.place`,
                                form: this.form.get('entity.place'),
                                name: 'entity.place',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.county`,
                                form: this.form.get('entity.county'),
                                name: 'entity.county',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.district`,
                                form: this.form.get('entity.district'),
                                name: 'entity.district',
                              }),
                              new InputSelectField({
                                label: `${this.translationPath}:model.entity.country_description`,
                                form: this.form,
                                name: 'entity.country',
                                leftTemplateContext: { icon: 'place' },
                                i18nextPipe: this.i18nextPipe,
                                snackBarService: this.snackBarService,
                                sharedModule: this.sharedModule,
                                route: this.route,
                                router: this.router,
                                subs: this.subs,
                                isQuickInsertion: false,
                                modalName: 'countries-modal',
                                inputSelector: getCountriesSelected,
                                inputStore: this.countriesStore,
                                storeName: 'country',
                                detailsModule: 'countries',
                                readonly: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new SectionField({
                        id: 'contacts',
                        label: `${this.translationPath}:header.contacts`,
                        fields: [
                          new RowField({
                            fields: [
                              new InputField({
                                label: `${this.translationPath}:model.entity.mobilephone`,
                                form: this.form.get('entity.mobilephone'),
                                name: 'entity.mobilephone',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.private_mobilephone`,
                                form: this.form.get('private_mobilephone'),
                                name: 'private_mobilephone',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.phone`,
                                form: this.form.get('entity.phone'),
                                name: 'entity.phone',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.fax`,
                                form: this.form.get('entity.fax'),
                                name: 'entity.fax',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.email`,
                                form: this.form.get('entity.email'),
                                name: 'entity.email',
                              }),
                              new InputField({
                                label: `${this.translationPath}:model.entity.url`,
                                form: this.form.get('entity.url'),
                                name: 'entity.url',
                              }),
                              new CheckboxField({
                                label: `${this.translationPath}:model.entity.newsletter_subscriptor`,
                                form: this.form.get(
                                  'entity.newsletter_subscriptor'
                                ),
                                name: 'entity.newsletter_subscriptor',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  new ColumnField({
                    fxFlex: 33.33,
                    fields: [
                      new SectionField({
                        id: 'attachment',
                        label: `${this.translationPath}:header.attachment`,
                        fields: [
                          new ImageField({
                            label: `${this.translationPath}:model.entity.photo_url`,
                            form: this.form,
                            name: 'entity.photo_filename',
                            imageValue: this.form.value.entity.photo_url,
                            successPostImageActionCallback: (
                              form: any,
                              result: any
                            ) => {
                              form
                                .get('entity.photo_url')
                                .setValue(result.filePath);
                              form
                                .get('entity.photo_filename')
                                .setValue(result.filename);
                            },
                            onImageChange: (value, form, currentImage) => {
                              if (value === null) {
                                currentImage.name = currentImage.path = null;
                                form.get('entity.photo_url').setValue(null);
                              }
                            },
                          }),
                        ],
                      }),
                      new SectionField({
                        id: 'hashtags',
                        label: `${this.translationPath}:header.hashtags`,
                        fields: [
                          new RowField({
                            fields: [
                              new ChipsField({
                                label: `${this.translationPath}:model.entity_priest_hashtags.tag`,
                                form: this.form,
                                name: 'entity_priest_hashtags',
                                getTagId: (tag: any) => {
                                  return tag.id;
                                },
                                getTagLabel: (tag: any) => {
                                  return tag.tag;
                                },
                                fillFormArray: (id: any, label: any) => {
                                  if (id === undefined) {
                                    id = null;
                                  }
                                  return {
                                    id: id,
                                    tag: label,
                                    entity_priest_id: this.form.get('id').value,
                                  };
                                },
                              }),
                              // new TableField({
                              //   dataSource: this.dataSourceHashtags,
                              //   dataSourceColumns: this.dataSourceColumnsHashtags,
                              //   formArray: this.entity_priest_hashtagsArray,
                              //   fb: this.fb,
                              //   newObject: {
                              //     block_remove: null,
                              //     created_at: null,
                              //     deleted: null,
                              //     entity_priest_id: null,
                              //     id: null,
                              //     tag: null,
                              //     updated_at: null,
                              //   } as EntityPriestHashtag,
                              // })
                            ],
                          }),
                        ],
                      }),
                      new SectionField({
                        id: 'coat_of_arms',
                        label: `${this.translationPath}:header.coat_of_arms`,
                        fields: [
                          new RowField({
                            fields: [
                              new ImageField({
                                label: `${this.translationPath}:model.coat_of_arms_filename`,
                                form: this.form,
                                name: 'coat_of_arms_filename',
                                imageValue: this.form.value.coat_of_arms,
                                successPostImageActionCallback: (
                                  form: any,
                                  result: any
                                ) => {
                                  form
                                    .get('coat_of_arms')
                                    .setValue(result.filePath);
                                  form
                                    .get('coat_of_arms_filename')
                                    .setValue(result.filename);
                                },
                                onImageChange: (value, form, currentImage) => {
                                  if (value === null) {
                                    currentImage.name = currentImage.path =
                                      null;
                                    form.get('coat_of_arms').setValue(null);
                                  }
                                },
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'identification_documents',
                label: `${this.translationPath}:header.identification_documents`,
                fields: [
                  new RowField({
                    fields: [
                      new SelectField({
                        label: `${this.translationPath}:model.entity_person.ident_document_type`,
                        form: this.form.get(
                          'entity_person.ident_document_type'
                        ),
                        name: 'entity_person.ident_document_type',
                        options: this.identificationTypeOptions,
                      }),
                      new InputField({
                        label: `${this.translationPath}:model.entity_person.ident_document_number`,
                        form: this.form.get(
                          'entity_person.ident_document_number'
                        ),
                        name: 'entity_person.ident_document_number',
                      }),
                      new DateField({
                        label: `${this.translationPath}:model.entity_person.ident_document_emission_date`,
                        form: this.form.get(
                          'entity_person.ident_document_emission_date'
                        ),
                        name: 'entity_person.ident_document_emission_date',
                      }),
                      new InputField({
                        label: `${this.translationPath}:model.entity_person.ident_document_emitted_by`,
                        form: this.form.get(
                          'entity_person.ident_document_emitted_by'
                        ),
                        name: 'entity_person.ident_document_emitted_by',
                      }),
                      new DateField({
                        label: `${this.translationPath}:model.entity_person.ident_document_validity_date`,
                        form: this.form.get(
                          'entity_person.ident_document_validity_date'
                        ),
                        name: 'entity_person.ident_document_validity_date',
                      }),
                      new InputField({
                        label: `${this.translationPath}:model.entity.taxpayer`,
                        form: this.form.get('entity.taxpayer'),
                        name: 'entity.taxpayer',
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'filiation',
                label: `${this.translationPath}:header.filiation`,
                fields: [
                  new RowField({
                    fields: [
                      new InputSelectField({
                        label: `${this.translationPath}:model.father_description`,
                        form: this.form,
                        name: 'father',
                        i18nextPipe: this.i18nextPipe,
                        snackBarService: this.snackBarService,
                        sharedModule: this.sharedModule,
                        route: this.route,
                        router: this.router,
                        subs: this.subs,
                        isQuickInsertion: false,
                        modalName: 'persons-modal',
                        inputSelector: getPersonsSelected,
                        inputStore: this.personsStore,
                        storeName: 'person',
                        detailsModule: 'persons',
                        readonly: true,
                        setModalDescription: (row: any) => {
                          return row.model.entity.name;
                        },
                        modalParams: { sex: 'true' },
                      }),
                      new InputSelectField({
                        label: `${this.translationPath}:model.mother_description`,
                        form: this.form,
                        name: 'mother',
                        i18nextPipe: this.i18nextPipe,
                        snackBarService: this.snackBarService,
                        sharedModule: this.sharedModule,
                        route: this.route,
                        router: this.router,
                        subs: this.subs,
                        isQuickInsertion: false,
                        modalName: 'persons-modal',
                        inputSelector: getPersonsSelected,
                        inputStore: this.personsStore,
                        storeName: 'person',
                        detailsModule: 'persons',
                        readonly: true,
                        setModalDescription: (row: any) => {
                          return row.model.entity.name;
                        },
                        modalParams: { sex: 'false' },
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'other_informations',
                label: `${this.translationPath}:header.other_informations`,
                fields: [
                  new RowField({
                    fields: [
                      new TextAreaField({
                        label: `${this.translationPath}:model.observations`,
                        form: this.form.get('observations'),
                        name: 'observations',
                        readonly: true,
                      }),
                    ],
                  }),
                  new RowField({
                    fields: [
                      new TextAreaField({
                        label: `${this.translationPath}:model.changes_request`,
                        form: this.form.get('changes_request'),
                        name: 'changes_request',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TabField({
            name: 'ordination_appointmens',
            textLabel: `${this.translationPath}:tabs.ordination_appointmens`,
            fields: [
              new SectionField({
                id: 'ordination',
                label: `${this.translationPath}:header.ordination`,
                fields: [
                  new RowField({
                    fields: [
                      new DateField({
                        label: `${this.translationPath}:model.ordination_date`,
                        form: this.form.get('ordination_date'),
                        name: 'ordination_date',
                      }),
                      new InputField({
                        label: `${this.translationPath}:model.ordination_place`,
                        form: this.form.get('ordination_place'),
                        name: 'ordination_date',
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'appoitments',
                label: `${this.translationPath}:header.appoitments`,
                fields: [
                  new RowField({
                    fields: [
                      new TextAreaField({
                        label: `${this.translationPath}:model.imported_actual_appointments`,
                        form: this.form.get('imported_actual_appointments'),
                        name: 'imported_actual_appointments',
                      }),
                      new TextAreaField({
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:model.appointments`
                        ),
                        form: this.form.get('appointments'),
                        name: 'appointments',
                      }),
                    ],
                  }),
                  new RowField({
                    fxLayout: 'row',
                    fields: [
                      new TableField({
                        dataSource: this.dataSourceEntityPriestAppointments,
                        dataSourceColumns:
                          this.dataSourceColumnsEntityPriestAppointments,
                        formArray: this.entity_priest_appointmentsArray,
                        fb: this.fb,
                        newObject: {
                          start_date: null,
                          end_date: null,
                          curia_function_description: null,
                          curia_function_id: null,
                          appointment_place_description: null,
                          appointment_place_id: null,
                          representing_description: null,
                          representing_id: null,
                          description: null,
                        } as EntityPriestAppointment,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TabField({
            name: 'current_accounts',
            textLabel: `${this.translationPath}:tabs.current_accounts`,
            fields: [
              new SectionField({
                id: 'current_accounts_lines',
                label: `${this.translationPath}:header.current_accounts_lines`,
                fields: [
                  new RowField({
                    fields: [
                      new TemplateField({
                        label: 'teste',
                        template: this.currentAccountsLinesTemplate,
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'current_accounts_lines_on_curia',
                label: `${this.translationPath}:header.current_accounts_lines_on_curia`,
                fields: [
                  new RowField({
                    fields: [
                      new TemplateField({
                        label: 'teste',
                        template: this.currentAccountsLinesOnCuriaTemplate,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TabField({
            name: 'other_infos',
            textLabel: `${this.translationPath}:tabs.other_infos`,
            fields: [
              new SectionField({
                id: 'priest_card_renewals',
                label: `${this.translationPath}:header.priest_card_renewals`,
                fields: [
                  new RowField({
                    fields: [
                      new TableField({
                        dataSource: this.dataSourcePriestlyCards,
                        dataSourceColumns: this.dataSourceColumnsPriestlyCards,
                        formArray: this.entity_priest_priestly_cardsArray,
                        fb: this.fb,
                        newObject: {
                          created_at: null,
                          entity_priest_id: null,
                          id: null,
                          renewal_date: null,
                          updated_at: null,
                        } as EntityPriestPriestlyCard,
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'retreats',
                label: `${this.translationPath}:header.retreats`,
                fields: [
                  new RowField({
                    fields: [
                      new TableField({
                        dataSource: this.dataSourceRetreats,
                        dataSourceColumns: this.dataSourceColumnsRetreats,
                        formArray: this.entity_priest_retreatsArray,
                        fb: this.fb,
                        newObject: {
                          entity_priest_id: null,
                          retreat_year: null,
                          retreat_place: null,
                        } as EntityPriestRetreat,
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'permanent_formation',
                label: `${this.translationPath}:header.permanent_formation`,
                fields: [
                  new RowField({
                    fields: [
                      new TableField({
                        dataSource: this.dataSourceOngoingFormations,
                        dataSourceColumns:
                          this.dataSourceColumnsOngoingFormations,
                        formArray: this.entity_priest_ongoing_formationsArray,
                        fb: this.fb,
                        newObject: {
                          entity_priest_id: null,
                          start_date: null,
                          end_date: null,
                          description: null,
                        } as EntityPriestOngoingFormation,
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'publications',
                label: `${this.translationPath}:header.publications`,
                fields: [
                  new RowField({
                    fields: [
                      new TableField({
                        dataSource: this.dataSourcePublications,
                        dataSourceColumns: this.dataSourceColumnsPublications,
                        formArray: this.entity_priest_publicationsArray,
                        fb: this.fb,
                        newObject: {
                          entity_priest_id: null,
                          publication_date: null,
                          description: null,
                        } as EntityPriestPublication,
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'curriculum',
                label: `${this.translationPath}:header.curriculum`,
                fields: [
                  new RowField({
                    fields: [
                      new TableField({
                        dataSource: this.dataSourceCurriculums,
                        dataSourceColumns: this.dataSourceColumnsCurriculums,
                        formArray: this.entity_priest_curriculumsArray,
                        fb: this.fb,
                        newObject: {
                          entity_priest_id: null,
                          start_date: null,
                          end_date: null,
                          description: null,
                        } as EntityPriestCurriculum,
                      }),
                    ],
                  }),
                ],
              }),
              new SectionField({
                id: 'academic_qualifications',
                label: `${this.translationPath}:header.academic_qualifications`,
                fields: [
                  new RowField({
                    fields: [
                      new TableField({
                        dataSource: this.dataSourceAcademicQualifications,
                        dataSourceColumns:
                          this.dataSourceColumnsAcademicQualifications,
                        formArray:
                          this.entity_priest_academic_qualificationsArray,
                        fb: this.fb,
                        newObject: {
                          entity_priest_id: null,
                          start_date: null,
                          end_date: null,
                          description: null,
                        } as EntityPriestAcademicQualification,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ];
  }

  // TABLE TEMPLATES METHODS
  buildCurrentAccountsDataSources() {
    this.dataSourceColumnsCurrentAccountLines = [
      {
        id: 'document_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.current_account_lines.date`
        ),
        sortable: false,
      },
      {
        id: 'documents_status_description',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.current_account_lines.documents_status_description`
        ),
        sortable: false,
      },
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.current_account_lines.serie_number`
        ),
        sortable: false,
      },
      {
        id: 'currency',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.current_account_lines.currency`
        ),
        sortable: false,
      },
      {
        id: 'total_amount',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.current_account_lines.total_amount`
        ),
        sortable: false,
      },
      {
        id: 'pending_amount',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.current_account_lines.pending_amount`
        ),
        sortable: false,
      },
    ];

    this.httpCurrentAccountsLinesParams = {
      query: {},
      page: 1,
      total: null,
      params: {
        priest_id: this.id,
      },
    };
    this.httpcurrentAccountsLinesOnCuriaParams = {
      filters: {},
      page: 1,
      total: null,
      params: {
        priest_id: this.id,
        on_curia: true,
      },
    };

    this.onCurrentAccountsLinesSearchClick();
    this.onCurrentAccountsLinesOnCuriaSearchClick();
  }

  initializeCurrentAccountsSearchForms() {
    this.documentsStatusOptions = [
      {
        value: null,
        label: '',
      },
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:current_account_lines.document_options.pending`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:current_account_lines.document_options.partially_paid`
        ),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:current_account_lines.document_options.paid`
        ),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform(
          `${this.translationPath}:current_account_lines.document_options.canceled`
        ),
      },
    ];

    this.currentAccountsLinesForm = this.fb.group({
      documents_status_id: [],
      document_date_start: [],
      document_date_end: [],
      serie_number: [],
      total_amount: [],
    });
    this.currentAccountsLinesOnCuriaForm = this.fb.group({
      documents_status_id: [],
      document_date_start: [],
      document_date_end: [],
      serie_number: [],
      total_amount: [],
    });
  }

  clearCurrentAccountsLinesSearch() {
    this.currentAccountsLinesForm = this.fb.group({
      documents_status_id: [],
      document_date_start: [],
      document_date_end: [],
      serie_number: [],
      total_amount: [],
    });
    this.onCurrentAccountsLinesSearchClick();
  }

  onCurrentAccountsLinesSearchClick() {
    this.httpCurrentAccountsLinesParams.query =
      this.currentAccountsLinesForm.value;
    const sub: Subscription = this.currentAccountsLinesService
      .getAll(this.httpCurrentAccountsLinesParams)
      .subscribe(
        (r) => {
          this.dataSourceCurrentAccountLines = r.results;
          this.httpCurrentAccountsLinesParams.total = r.total;
          sub.unsubscribe();
        },
        (err) => sub.unsubscribe()
      );
  }

  clearCurrentAccountsLinesOnCuriaSearch() {
    this.currentAccountsLinesOnCuriaForm = this.fb.group({
      documents_status_id: [],
      document_date_start: [],
      document_date_end: [],
      serie_number: [],
      total_amount: [],
    });
    this.onCurrentAccountsLinesOnCuriaSearchClick();
  }

  onCurrentAccountsLinesOnCuriaSearchClick() {
    this.httpcurrentAccountsLinesOnCuriaParams.query =
      this.currentAccountsLinesOnCuriaForm.value;
    const sub: Subscription = this.currentAccountsLinesService
      .getAll(this.httpcurrentAccountsLinesOnCuriaParams)
      .subscribe(
        (r) => {
          this.dataSourceCurrentAccountLinesOnCuria = r.results;
          this.httpcurrentAccountsLinesOnCuriaParams.total = r.total;
          sub.unsubscribe();
        },
        (err) => sub.unsubscribe()
      );
  }

  paginationCurrentAccountLinesChangeEvent(event) {
    this.httpCurrentAccountsLinesParams.page = event.pageIndex + 1;
    this.onCurrentAccountsLinesSearchClick();
  }

  paginationCurrentAccountLinesOnCuriaChangeEvent(event) {
    this.httpcurrentAccountsLinesOnCuriaParams.page = event.pageIndex + 1;
    this.onCurrentAccountsLinesOnCuriaSearchClick();
  }
}
