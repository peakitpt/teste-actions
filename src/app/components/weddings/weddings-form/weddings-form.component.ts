import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { combineLatest, Observable, Subscription, timer } from 'rxjs';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';

import {
  Wedding,
  WeddingsAttachment,
} from 'src/app/components/weddings/wedding.model';
import { State } from 'src/app/components/weddings/reducers/weddings.reducer';
import * as actions from 'src/app/components/weddings/reducers/weddings.actions';
import { getWedding } from '../reducers/weddings.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import {
  RequestGetByEntityId,
  ClearGetByEntityId,
} from 'src/app/components/persons/reducers/persons.actions';
import { getPersonByEntityId } from 'src/app/components/persons/reducers/persons.selectors';

import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import { State as WorshipplacesState } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { getWorshipplacesSelected } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { State as PriestsAndPersonsState } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.reducer';
import { getPriestsAndPersonsSelected } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.selectors';
import { State as PriestsState } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.reducer';
import { getPriestsSelected } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.selectors';
import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  EntitiesService,
  FileManagerService,
  WeddingsService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-weddings-form',
  templateUrl: './weddings-form.component.html',
  styleUrls: ['./weddings-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeddingsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Wedding>;
  modulePath = 'weddings';
  preFillWithNew = true;

  // Selectors & actions
  selectorGetModel = getWedding;
  actionRequestFail = actions.WeddingsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.WeddingsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.WeddingsActionTypes.SuccessPost;
  actionRequestSendToCuria = actions.RequestSendToCuria;
  actionSuccessSendToCuria = actions.WeddingsActionTypes.SuccessSendToCuria;
  actionRequestGetNew = actions.RequestGetNew;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.WeddingsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.WeddingsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  /* This specific's component fields */
  personsMenuOptions: ModalMenuOption[] = [];
  emolumentsMenuOptions: ModalMenuOption[] = [];
  parishionersMenuOptions: ModalMenuOption[] = [];
  worshipplacesMenuOptions: ModalMenuOption[] = [];
  priestsAndPersonsMenuOptions: ModalMenuOption[] = [];
  priestsMenuOptions: ModalMenuOption[] = [];
  chapelriesMenuOptions: ModalMenuOption[] = [];
  footerOptionsMenu: Array<{ name: string; value: string; icon: string }> = [];

  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  attachmentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  @ViewChild('weddingTabTemplate') weddingTabTemplate: TemplateRef<any>;
  @ViewChild('groomsTabTemplate') groomsTabTemplate: TemplateRef<any>;
  @ViewChild('seatDuplicateTabTemplate')
  seatDuplicateTabTemplate: TemplateRef<any>;
  @ViewChild('mod1TabTemplate') mod1TabTemplate: TemplateRef<any>;
  @ViewChild('mod2TabTemplate') mod2TabTemplate: TemplateRef<any>;
  @ViewChild('reportsTabTemplate') reportsTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate')
  attachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

  sendToCuriaAfterSave = false;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private personsStore: Store<PersonsState>,
    private emolumentsStore: Store<EmolumentsState>,
    private parishionersStore: Store<ParishionersState>,
    private worshipplacesStore: Store<WorshipplacesState>,
    private priestsAndPersonsStore: Store<PriestsAndPersonsState>,
    private priestsStore: Store<PriestsState>,
    private chapelriesStore: Store<ChapelriesState>,
    public fileManagerService: FileManagerService,
    private entitiesService: EntitiesService,
    private service: WeddingsService
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
    super.ngOnInit();
    this.setPersonsModal();
    this.setEmolumentsModal();
    this.setParishionersModal();
    this.setWorshipplacesModal();
    this.setPriestsAndPersonsModal();
    this.setPriestsModal();
    this.setChapelriesModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      blocked: [false],
      bride_christian_education_children: [],
      bride_dialog_date: [],
      bride_dialog_vicar_description: [],
      bride_dialog_vicar_id: [],
      bride_dialog_worshipplace_description: [],
      bride_dialog_worshipplace_id: [],
      bride_difficulty_to_marry: [],
      bride_faithful_to_husband: [],
      bride_family_tree_1: [],
      bride_family_tree_2: [],
      bride_family_tree_3: [],
      bride_groom_same_ideas_about_marriage: [],
      bride_groom_talk_about_marriage: [],
      bride_has_hid_information: [],
      bride_here_lived_after_fourteen: [null, [Validators.maxLength(200)]],
      bride_impediment_to_marry: [],
      bride_impediment_to_marry_which: [null, [Validators.maxLength(175)]],
      bride_intimicy_and_love: [],
      bride_is_previous_union_over: [null, [Validators.maxLength(50)]],
      bride_knowledge_raise_children: [],
      bride_married_by_church: [],
      bride_married_civilly: [],
      bride_married_had_children: [],
      bride_married_with_who_description: [],
      bride_married_with_who_id: [],
      bride_marry_by_free_will: [],
      bride_minor_parents_agree: [],
      bride_minor_parents_agree_why: [null, [Validators.maxLength(145)]],
      bride_reason_beside_love: [],
      bride_religious_status: [],
      bride_will_accept_children: [],
      bride_will_consent_marriage: [],
      bride_will_not_divorce: [],
      bride_will_raise_children: [],
      bride_wish_to_correct_information: [],
      bride_wish_to_correct_information_text: [
        null,
        [Validators.maxLength(250)],
      ],
      canonical_process_absences: [false],
      canonical_process_absences_text: [null, [Validators.maxLength(20)]],
      canonical_process_comments: [],
      canonical_process_data_mod_1: [],
      canonical_process_end_date: [],
      canonical_process_oratory: [],
      canonical_process_start_date: [],
      certificate_field: [],
      children_common: [false],
      civil_registration_address: [null, Validators.maxLength(200)],
      civil_registration_certificates: [],
      civil_registration_convention: [],
      civil_registration_convention_text: [],
      civil_registration_date: [],
      civil_registration_documents: [null, Validators.maxLength(200)],
      civil_registration_name: [null, Validators.maxLength(200)],
      civil_registration_number: [null, Validators.maxLength(200)],
      conservatory_endorsement_date: [],
      cpm_chapelry_colaboration_bride: [false],
      cpm_chapelry_colaboration_groom: [false],
      cpm_chapelry_registration_description: [],
      cpm_chapelry_registration_id: [],
      cpm_knowledge_of: [null, Validators.maxLength(100)],
      cpm_number: [null, Validators.maxLength(20)],
      cpm_reception_date: [],
      cpm_reception_entity_description: [],
      cpm_reception_entity_id: [],
      cpm_reception_worshipplace_description: [],
      cpm_reception_worshipplace_id: [],
      cpm_time_dating: [null, Validators.maxLength(20)],
      cpm_worshipplace_description: [],
      cpm_worshipplace_id: [],
      created_at: [],
      created_by_user_id: [],
      curia_status: [],
      curia_status_date: [],
      date: [],
      declaration_field: [],
      deleted: [false],
      deleted_by_user_id: [],
      document_entity_description: [],
      document_entity_id: [],
      document_id: [],
      economical_situation: [null, Validators.maxLength(100)],
      emolument_description: [],
      emolument_id: [],
      entity_bride_description: [],
      entity_bride_id: [],
      entity_bride_nick: [],
      entity_ekklesia_location_id: [],
      entity_groom_description: [],
      entity_groom_id: [],
      entity_groom_nick: [],
      entity_location_county: [],
      entity_location_description: [],
      entity_location_id: [],
      exemption_impediment: [null, Validators.maxLength(100)],
      exemption_impediments_because: [null, Validators.maxLength(100)],
      exemptions_due_to: [null, Validators.maxLength(100)],
      exemptions_impediments: [null, Validators.maxLength(100)],
      fees: [null, Validators.maxLength(50)],
      groom_bride_birth_certificate_request: [true],
      groom_bride_same_ideas_about_marriage: [],
      groom_bride_talk_about_marriage: [],
      groom_christian_education_children: [],
      groom_dialog_date: [],
      groom_dialog_vicar_description: [],
      groom_dialog_vicar_id: [],
      groom_dialog_worshipplace_description: [],
      groom_dialog_worshipplace_id: [],
      groom_difficulty_to_marry: [],
      groom_faithful_to_wife: [],
      groom_family_tree_1: [],
      groom_family_tree_2: [],
      groom_family_tree_3: [],
      groom_has_hid_information: [],
      groom_here_lived_after_fourteen: [null, Validators.maxLength(200)],
      groom_impediment_to_marry: [],
      groom_impediment_to_marry_which: [null, Validators.maxLength(175)],
      groom_intimicy_and_love: [],
      groom_is_previous_union_over: [null, Validators.maxLength(50)],
      groom_knowledge_raise_children: [],
      groom_married_by_church: [],
      groom_married_civilly: [],
      groom_married_had_children: [],
      groom_married_with_who_description: [],
      groom_married_with_who_id: [],
      groom_marry_by_free_will: [],
      groom_minor_parents_agree: [],
      groom_minor_parents_agree_why: [null, Validators.maxLength(145)],
      groom_reason_beside_love: [],
      groom_religious_status: [],
      groom_will_accept_children: [],
      groom_will_consent_marriage: [],
      groom_will_not_divorce: [],
      groom_will_raise_children: [],
      groom_wish_to_correct_information: [],
      groom_wish_to_correct_information_text: [null, Validators.maxLength(250)],
      grooms_degree_of_kinship: [],
      grooms_degree_of_kinship_lineage: [],
      grooms_kinship_type: [],
      has_warnings: [false],
      id: [],
      import_origin: [],
      mass: [false],
      mod2_chapelry_description: [],
      mod2_chapelry_id: [],
      mod2_entity_reference: [true],
      mod3_entity_reference: [true],
      mod4_common_relative: [null, Validators.maxLength(100)],
      mod5_entity_reference: [true],
      mod6_declared_that: [null, Validators.maxLength(255)],
      mod6_for_that_know: [null, Validators.maxLength(255)],
      mod6_groom_bride: [true],
      mod6_justify_absence: [],
      mod7_baptism_witness1_description: [],
      mod7_baptism_witness1_id: [],
      mod7_baptism_witness2_description: [],
      mod7_baptism_witness2_id: [],
      mod7_father_civil_status: [],
      mod7_groom_bride: [true],
      mod7_justfifiers_knows_because: [null, Validators.maxLength(255)],
      mod7_mother_civil_status: [],
      mod7_parents_residence: [null, Validators.maxLength(200)],
      mod7_witnesses_watched_baptizm_as: [null, Validators.maxLength(50)],
      mod7_witnesses_watched_baptizm_that: [null, Validators.maxLength(255)],
      mod8_bride_assento_number: [],
      mod8_bride_assento_year: [
        null,
        [
          Validators.min(1900),
          Validators.max(Number(new Date().getFullYear()) - 16),
        ],
      ],
      mod8_civil_registry_notes: [],
      mod8_groom_assento_number: [],
      mod8_groom_assento_year: [
        null,
        [
          Validators.min(1900),
          Validators.max(Number(new Date().getFullYear()) - 16),
        ],
      ],
      mod9_groom_or_bride: [true],
      no_proclamations_exemption: [false],
      not_children_common: [false],
      opt_mod1_extra_option1: [],
      opt_mod1_extra_option2: [],
      opt_mod1_opt1: [false],
      opt_mod1_opt1_text: [],
      opt_mod1_opt2: [false],
      opt_mod1_opt2_text: [],
      opt_mod1_opt3: [false],
      opt_mod1_opt3_text: [],
      opt_mod1_opt4: [false],
      opt_mod1_opt4_text: [],
      opt_mod1_opt5: [false],
      opt_mod1_opt5_text: [],
      opt_mod1_opt6: [false],
      opt_mod1_opt6_date: [],
      opt_mod1_opt6_number: [],
      opt_mod1_opt6_text: [],
      opt_mod2_groom_bride: [true],
      opt_mod2_opt1: [false],
      opt_mod2_opt2: [false],
      opt_mod2_opt3: [false],
      opt_mod2_opt3_text: [],
      opt_mod2_opt4: [false],
      opt_mod2_opt4_input: [],
      opt_mod2_opt5: [false],
      opt_mod2_opt5_text: [null, Validators.maxLength(100)],
      opt_mod2_opt6: [false],
      opt_mod2_opt6_text: [],
      opt_mod2_opt6_text2: [],
      opt_mod2_opt7: [false],
      opt_mod2_opt7_text: [],
      opt_mod2_opt7_text2: [],
      opt_mod2_opt8: [false],
      opt_mod2_opt8_text: [],
      opt_mod2_opt8_text2: [],
      paroquia_sw_id: [],
      process_id: [],
      property_regime: [],
      recipient_address: [null, Validators.maxLength(100)],
      recipient_id: [],
      recipient_name: [],
      recipient_postal_code: [null, Validators.maxLength(100)],
      seat_duplicate_attestation_number: [],
      seat_duplicate_baptism_endorsement_date: [],
      seat_duplicate_comments_edge_seat: [],
      seat_duplicate_officiating_description: [],
      seat_duplicate_officiating_id: [],
      seat_duplicate_present: [],
      seat_duplicate_special_mentions: [null, Validators.maxLength(200)],
      seat_duplicate_will_be_signed: [],
      seat_duplicate_witnesses_identification_bride1_description: [],
      seat_duplicate_witnesses_identification_bride1_id: [],
      seat_duplicate_witnesses_identification_bride2_description: [],
      seat_duplicate_witnesses_identification_bride2_id: [],
      seat_duplicate_witnesses_identification_groom1_description: [],
      seat_duplicate_witnesses_identification_groom1_id: [],
      seat_duplicate_witnesses_identification_groom2_description: [],
      seat_duplicate_witnesses_identification_groom2_id: [],
      seat_number: [],
      sender_address: [null, Validators.maxLength(100)],
      sender_name: [],
      sender_postal_code: [null, Validators.maxLength(100)],
      serie_number: [],
      sheet: [],
      status_libero_reference: [],
      subject_field: [],
      tax: [],
      touched_in_current_importation: [false],
      updated_at: [],
      updated_by_user_id: [],
      wedding_date: [],
      wedding_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      wedding_parson_description: [],
      wedding_project_priest_verification: [],
      weddings_attachments: this.fb.array([]),
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    this.constructFooterMenu();

    this.setInnerTable(
      obj.weddings_attachments,
      this.attachmentsFormArray,
      this.attachmentsDS
    );
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.wedding_tab`
        ),
        templateContent: this.weddingTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.grooms_tab`
        ),
        templateContent: this.groomsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.seatDuplicate_tab`
        ),
        templateContent: this.seatDuplicateTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.mod1_tab`
        ),
        templateContent: this.mod1TabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.mod2_tab`
        ),
        templateContent: this.mod2TabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.reports_tab`
        ),
        templateContent: this.reportsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments_tab`
        ),
        templateContent: this.attachmentsTabTemplate,
      },
    ];

    this.clearModalInputs();
    this.buildSubTablesColumns();
    this.subscribeForSendToCuria();

    setTimeout(() => {
      this.detectFormChanges(), 3000;
    });
  }

  onSaveSuccess(result: any) {
    this.isLoading = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.save_success`),
      this.sharedModule.SUCCESS_COLOR
    );

    if (this.isQuickInsertion) {
      // Code used for Quick Insertions
      this.store.dispatch(
        new this.actionRequestSetSelected({
          inputName: this.route.snapshot.queryParamMap.get('inputNameQI'),
          model: result.payload,
        } as SelectedModalRow)
      );
      this.modal.close();
    } else {
      // Not quick inserting
      if (this.saveAndNew) {
        this.saveAndNew = false;
        this.isLoading = false;
        this.modal.close();
        this.router.navigate([this.modulePath]).then(() => {
          timer(500).subscribe(() => {
            this.router.navigate([this.modulePath, 'new']);
          });
        });
      } else if (this.blockChainClosing) {
        this.isLoading = false;
        this.blockChainClosing = false;
      } else if (result.payload.id) {
        if (this.sendToCuriaAfterSave) {
          this.sendToCuriaAfterSave = false;
          this.store.dispatch(
            new this.actionRequestSendToCuria(this.form.getRawValue())
          );
        }
        this.modal.close();
        this.router.navigate([this.modulePath, result.payload.id, 'details']);
      } else {
        this.modal.close();
      }
    }
  }

  clearModalInputs() {
    [
      'entity_groom_id',
      'entity_groom_description',
      'entity_bride_id',
      'entity_bride_description',
      'mod2_chapelry_id',
      'mod2_chapelry_description',
      'mod7_baptism_witness1_id',
      'mod7_baptism_witness1_description',
      'mod7_baptism_witness2_id',
      'mod7_baptism_witness2_description',
      'recipient_id',
      'recipient_description',
      'groom_married_with_who_id',
      'groom_married_with_who_description',
      'groom_dialog_worshipplace_id',
      'groom_dialog_worshipplace_description',
      'groom_dialog_vicar_id',
      'groom_dialog_vicar_description',
      'bride_married_with_who_id',
      'bride_married_with_who_description',
      'bride_dialog_worshipplace_id',
      'bride_dialog_worshipplace_description',
      'bride_dialog_vicar_id',
      'bride_dialog_vicar_description',
      'cpm_chapelry_registration_id',
      'cpm_chapelry_registration_description',
      'cpm_worshipplace_id',
      'cpm_worshipplace_description',
      'cpm_reception_worshipplace_id',
      'cpm_reception_worshipplace_description',
      'cpm_reception_entity_id',
      'cpm_reception_entity_description',
      'seat_duplicate_id',
      'seat_duplicate_description',
      'seat_duplicate_witnesses_identification_groom1_id',
      'seat_duplicate_witnesses_identification_groom1_description',
      'seat_duplicate_witnesses_identification_groom2_id',
      'seat_duplicate_witnesses_identification_groom2_description',
      'seat_duplicate_witnesses_identification_bride1_id',
      'seat_duplicate_witnesses_identification_bride1_description',
      'seat_duplicate_witnesses_identification_bride2_id',
      'seat_duplicate_witnesses_identification_bride2_description',
      'emolument_id',
      'emolument_description',
      'document_entity_id',
      'document_entity_description',
      'entity_location_id',
      'entity_location_description',
      'entity_baptized_by_id',
      'entity_baptized_by_description',
      'entity_baptized_authorization_id',
      'entity_baptized_authorization_description',
    ].forEach((field: string) => this.affectField(field, null));
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_person_modal':
      case 'clear_emolument_modal':
      case 'clear_parishioner_modal':
      case 'clear_worshipplace_modal':
      case 'clear_priest_modal':
      case 'clear_priests_and_person_modal':
      case 'clear_chapelry_modal':
        if (inputName) {
          this.affectField(`${inputName}_id`, null);
          this.affectField(`${inputName}_description`, null);

          if (inputName === 'emolument') {
            this.affectField('tax', null);
          }
        }
        break;
      case 'view_selected_person':
      case 'view_selected_emolument':
      case 'view_selected_worshipplace':
      case 'view_selected_chapelry':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;

          if (id) {
            if (event.includes('emolument')) {
              this.openDetails('emoluments', id);
            } else if (event.includes('worshipplace')) {
              this.openDetails('worshipplaces', id);
            } else if (event.includes('chapelry')) {
              this.openDetails('chapelries', id);
            } else if (event.includes('person')) {
              this.personsStore.dispatch(new RequestGetByEntityId(id));
              let getEntity$: Subscription = this.personsStore
                .select(getPersonByEntityId)
                .subscribe((person: any) => {
                  if (person) {
                    getEntity$.unsubscribe();
                    this.personsStore.dispatch(new ClearGetByEntityId());
                    this.openDetails('persons', person.id);
                  }
                });
            }
          }
        }
        break;

      case 'view_selected_priests_and_person':
        switch (inputName) {
          case 'seat_duplicate_officiating':
            const id = this.form.get(`${inputName}_id`).value;
            this.personsStore.dispatch(new RequestGetByEntityId(id));
            let getEntity$: Subscription = this.personsStore
              .select(getPersonByEntityId)
              .subscribe((person: any) => {
                if (person) {
                  getEntity$.unsubscribe();
                  this.personsStore.dispatch(new ClearGetByEntityId());
                  this.openDetails('persons', person.id);
                }
              });
            break;
          default:
            this.snackBarService.openSnackBar(
              `${this.modulePath}:message.operation_not_available`,
              this.sharedModule.WARN_COLOR
            );
            break;
        }
        break;
      case 'quick_insertion_priests_and_person':
        switch (inputName) {
          case 'seat_duplicate_officiating':
            this.openQuickInsertionModal(
              'quick-insert-persons-modal',
              inputName
            );
            break;
          default:
            this.snackBarService.openSnackBar(
              `${this.modulePath}:message.operation_not_available`,
              this.sharedModule.WARN_COLOR
            );
            break;
        }
        break;

      case 'view_selected_parishioner':
        switch (inputName) {
          case 'seat_duplicate_witnesses_identification_groom1':
          case 'seat_duplicate_witnesses_identification_groom2':
          case 'seat_duplicate_witnesses_identification_bride1':
          case 'seat_duplicate_witnesses_identification_bride2':
            const id = this.form.get(`${inputName}_id`).value;
            this.personsStore.dispatch(new RequestGetByEntityId(id));
            let getEntity$: Subscription = this.personsStore
              .select(getPersonByEntityId)
              .subscribe((person: any) => {
                if (person) {
                  getEntity$.unsubscribe();
                  this.personsStore.dispatch(new ClearGetByEntityId());
                  this.openDetails('persons', person.id);
                }
              });
            break;
          default:
            this.snackBarService.openSnackBar(
              `${this.modulePath}:message.operation_not_available`,
              this.sharedModule.WARN_COLOR
            );
            break;
        }
        break;
      case 'quick_insertion_parishioner':
        switch (inputName) {
          case 'seat_duplicate_witnesses_identification_groom1':
          case 'seat_duplicate_witnesses_identification_groom2':
          case 'seat_duplicate_witnesses_identification_bride1':
          case 'seat_duplicate_witnesses_identification_bride2':
            this.openQuickInsertionModal(
              'quick-insert-persons-modal',
              inputName
            );
            break;
          default:
            this.snackBarService.openSnackBar(
              `${this.modulePath}:message.operation_not_available`,
              this.sharedModule.WARN_COLOR
            );
            break;
        }
        break;

      case 'quick_insertion_person':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'quick_insertion_emolument':
        this.openQuickInsertionModal(
          'quick-insert-emoluments-modal',
          inputName
        );
        break;
      case 'quick_insertion_worshipplace':
        this.openQuickInsertionModal(
          'quick-insert-worshipplaces-modal',
          inputName
        );
        break;
      case 'quick_insertion_chapelry':
        this.openQuickInsertionModal(
          'quick-insert-chapelries-modal',
          inputName
        );
        break;
      case 'save_generate_document':
        this.openGenerateDocModal = true;
        break;
      case 'send_to_curia':
        this.isSaving = true;
        this.sendToCuriaAfterSave = true;
        this.onSubmit();
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.uploadAttachments(this.attachmentsFormArray, this.attachmentsDS);
  }

  onFormValid() {
    if (this.validateAttachments()) {
      super.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_invalid_attachments`
        )
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
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

            if (['entity', 'father', 'mother'].includes(row.inputName)) {
              this.modalSelectionAffectParentsRelatedFields(row);
            }
          }
        })
    );
  }

  // Se isto estiver muito confuso, a culpa é do Cristiano :)
  private modalSelectionAffectParentsRelatedFields(row: SelectedModalRow) {
    if (row.inputName === 'entity') {
      ['father', 'mother'].forEach((parent: string) => {
        if (row.model[`entity_${parent}`]) {
          this.affectField(`${parent}_id`, row.model[`entity_${parent}`].id);
          this.affectField(
            `${parent}_description`,
            row.model[`entity_${parent}`].name
          );

          this.affectField(
            `${parent}_residence_chapelry_id`,
            row.model[`entity_${parent}`].residence_chapelry_id
          );
          this.affectField(
            `${parent}_residence_chapelry_description`,
            row.model[`entity_${parent}`].residence_chapelry_description
          );

          if (parent === 'father') {
            if (row.model.entity_father.entity_person.entity_father) {
              this.affectField(
                'paternal_grandfather_id',
                row.model.entity_father.entity_person.entity_father.id
              );
              this.affectField(
                'paternal_grandfather_description',
                row.model.entity_father.entity_person.entity_father.name
              );
            }
            if (row.model.entity_father.entity_person.entity_mother) {
              this.affectField(
                'paternal_grandmother_id',
                row.model.entity_father.entity_person.entity_mother.id
              );
              this.affectField(
                'paternal_grandmother_description',
                row.model.entity_father.entity_person.entity_mother.name
              );
            }
          } else if (parent === 'mother') {
            if (row.model.entity_mother.entity_person.entity_father) {
              this.affectField(
                'maternal_grandfather_id',
                row.model.entity_mother.entity_person.entity_father.id
              );
              this.affectField(
                'maternal_grandfather_description',
                row.model.entity_mother.entity_person.entity_father.name
              );
            } else {
              this.affectField('maternal_grandfather_id', null);
              this.affectField('maternal_grandfather_description', null);
            }

            if (row.model.entity_mother.entity_person.entity_mother) {
              this.affectField(
                'maternal_grandmother_id',
                row.model.entity_mother.entity_person.entity_mother.id
              );
              this.affectField(
                'maternal_grandmother_description',
                row.model.entity_mother.entity_person.entity_mother.name
              );
            } else {
              this.affectField('maternal_grandmother_id', null);
              this.affectField('maternal_grandmother_description', null);
            }
          }
        } else {
          this.affectField(`${parent}_id`, null);
          this.affectField(`${parent}_description`, null);
          this.affectField(`${parent}_residence_chapelry_id`, null);
          this.affectField(`${parent}_residence_chapelry_description`, null);

          if (parent === 'father') {
            this.affectField('paternal_grandfather_id', null);
            this.affectField('paternal_grandfather_description', null);
            this.affectField('paternal_grandmother_id', null);
            this.affectField('paternal_grandmother_description', null);
          } else if (parent === 'mother') {
            this.affectField('maternal_grandfather_id', null);
            this.affectField('maternal_grandfather_description', null);
            this.affectField('maternal_grandmother_id', null);
            this.affectField('maternal_grandmother_description', null);
          }
        }
      });
    } else if (['father', 'mother'].includes(row.inputName)) {
      this.affectField(
        `${row.inputName}_residence_chapelry_id`,
        row.model.entity.residence_chapelry_id
      );
      this.affectField(
        `${row.inputName}_residence_chapelry_description`,
        row.model.entity.residence_chapelry_description
      );

      if (row.inputName === 'father') {
        if (row.model.entity_father) {
          this.affectField(
            'paternal_grandfather_id',
            row.model.entity_father.id
          );
          this.affectField(
            'paternal_grandfather_description',
            row.model.entity_father.name
          );
        }
        if (row.model.entity_mother) {
          this.affectField(
            'paternal_grandmother_id',
            row.model.entity_mother.id
          );
          this.affectField(
            'paternal_grandmother_description',
            row.model.entity_mother.name
          );
        }
      } else if (row.inputName === 'mother') {
        if (row.model.entity_father) {
          this.affectField(
            'maternal_grandfather_id',
            row.model.entity_father.id
          );
          this.affectField(
            'maternal_grandfather_description',
            row.model.entity_father.name
          );
        }
        if (row.model.entity_mother) {
          this.affectField(
            'maternal_grandmother_id',
            row.model.entity_mother.id
          );
          this.affectField(
            'maternal_grandmother_description',
            row.model.entity_mother.name
          );
        }
      }
    }
  }

  private setEmolumentsModal() {
    this.emolumentsMenuOptions = this.defaultModalMenu('emolument');

    this.subs.push(
      this.emolumentsStore
        .select(getEmolumentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              case 'emolument':
                this.affectField(`tax`, row.model.value);
              default:
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  row.model.description_short
                );
                break;
            }
            this.affectField('tax', +row.model.value);
          }
        })
    );
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioner');

    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              case 'entity_groom':
              case 'entity_bride':
              case 'groom_married_with_who':
              case 'bride_married_with_who':
              case 'groom_dialog_vicar':
              case 'bride_dialog_vicar':
              case 'cpm_reception_entity':
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  row.model.name
                );
                break;
              default:
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  row.model.complete_relation
                );
                break;
            }
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
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.complete_relation
            );

            if (row.inputName === 'entity_baptized_location') {
              this.affectFieldIfBlank(
                'entity_baptized_location_county',
                row.model.county
              );
            }
          }
        })
    );
  }

  private setPriestsAndPersonsModal() {
    this.priestsAndPersonsMenuOptions =
      this.defaultModalMenu('priests_and_person');

    this.subs.push(
      this.priestsAndPersonsStore
        .select(getPriestsAndPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
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

            if (row.inputName === 'entity_baptized_authorization') {
              this.affectField(
                'entity_baptized_authorization_entity_priest_id',
                row.model.id
              );
            }
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
              case 'recipient':
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_name`,
                  row.model.complete_relation
                );
                this.fillRecipientsSubInputs(row.model.id);
                break;
              default:
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  row.model.complete_relation
                );
                break;
            }
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

  private buildSubTablesColumns() {
    setTimeout(() => {
      this.attachmentsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteAttachmentTemplate,
          width: '30px',
        },
        {
          id: 'attachment',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.weddings_attachments.attachment`
          ),
          sortable: false,
          template: this.attachmentTemplate,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.weddings_attachments.description`
          ),
          sortable: false,
          template: this.attachmentDescriptionTemplate,
        },
      ];
    });
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

  private detectFormChanges() {
    this.detectSeatDuplicateChanges();
  }

  private detectSeatDuplicateChanges() {
    // this.subs.push(
    //   this.form.controls[
    //     'seat_duplicate_officiating_description',
    //     'wedding_parson_description',
    //     'seat_duplicate_witnesses_identification_groom1_description',
    //     'seat_duplicate_witnesses_identification_groom2_description',
    //     'seat_duplicate_witnesses_identification_bride1_description',
    //     'seat_duplicate_witnesses_identification_bride2_description'
    //   ].valueChanges.subscribe(() => {
    //     this.fillSeatDuplicateWillBeSigned(this.form.value)
    //   })
    // );

    this.subs.push(
      combineLatest([
        this.form.get('seat_duplicate_officiating_description').valueChanges,
        this.form.get('wedding_parson_description').valueChanges,
        this.form.get(
          'seat_duplicate_witnesses_identification_groom1_description'
        ).valueChanges,
        this.form.get(
          'seat_duplicate_witnesses_identification_groom2_description'
        ).valueChanges,
        this.form.get(
          'seat_duplicate_witnesses_identification_bride1_description'
        ).valueChanges,
        this.form.get(
          'seat_duplicate_witnesses_identification_bride2_description'
        ).valueChanges,
      ]).subscribe(() => {
        setTimeout(() => {
          this.fillSeatDuplicateWillBeSigned(this.form.value), 1000;
        });
      })
    );
  }

  private validateAttachments(): boolean {
    let attachmentsValid = true;

    this.form.setControl(
      'weddings_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.weddings_attachments
      .filter((obj: WeddingsAttachment) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: WeddingsAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }

  fillRecipientsSubInputs(id) {
    this.subs.push(
      this.entitiesService.getOne(id).subscribe((r) => {
        this.affectField('recipient_address', r.address);
        this.affectField(
          'recipient_postal_code',
          `${r.postal_code} ${r.place}`
        );
      })
    );
  }

  fillSeatDuplicateWillBeSigned(values: Wedding) {
    values.seat_duplicate_will_be_signed = null;
    this.subs.push(
      this.service.getWillBeSignedPhrase(values).subscribe((r) => {
        this.form.get('seat_duplicate_will_be_signed').setValue(r.result);
      })
    );
  }

  // THIS FORM SPECIFIC FUNCTIONS [END]
}
