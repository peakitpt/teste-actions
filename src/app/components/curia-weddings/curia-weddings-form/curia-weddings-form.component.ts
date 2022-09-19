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
import { combineLatest, Observable, Subscription } from 'rxjs';
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
  CuriaWedding,
  CuriaWeddingsAttachment,
} from 'src/app/components/curia-weddings/curia-wedding.model';
import { State } from 'src/app/components/curia-weddings/reducers/curia-weddings.reducer';
import * as actions from 'src/app/components/curia-weddings/reducers/curia-weddings.actions';
import { getCuriaWedding } from '../reducers/curia-weddings.selectors';
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
  CuriaWeddingsService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-curia-weddings-form',
  templateUrl: './curia-weddings-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaWeddingsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaWedding>;
  modulePath = 'curia-weddings';
  preFillWithNew = true;

  // Selectors & actions
  selectorGetModel = getCuriaWedding;
  actionRequestFail = actions.CuriaWeddingsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.CuriaWeddingsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.CuriaWeddingsActionTypes.SuccessPost;
  actionRequestSendToCuria = actions.RequestSendToCuria;
  actionSuccessSendToCuria =
    actions.CuriaWeddingsActionTypes.SuccessSendToCuria;
  actionRequestGetNew = actions.RequestGetNew;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.CuriaWeddingsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.CuriaWeddingsActionTypes.SuccessSaveAndGenerateDocument;
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

  @ViewChild('weddingTabTemplate')
  weddingTabTemplate: TemplateRef<any>;
  @ViewChild('groomsTabTemplate') groomsTabTemplate: TemplateRef<any>;
  @ViewChild('seatDuplicateTabTemplate')
  seatDuplicateTabTemplate: TemplateRef<any>;
  @ViewChild('mod1TabTemplate') mod1TabTemplate: TemplateRef<any>;
  @ViewChild('mod2TabTemplate') mod2TabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate')
  attachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

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
    private service: CuriaWeddingsService
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
      canonical_process_absences: [false],
      canonical_process_absences_text: [null, [Validators.maxLength(20)]],
      canonical_process_comments: [],
      canonical_process_data_mod_1: [],
      canonical_process_end_date: [],
      canonical_process_oratory: [],
      canonical_process_start_date: [],
      children_common: [false],
      civil_registration_address: [null, Validators.maxLength(200)],
      civil_registration_certificates: [],
      civil_registration_convention: [],
      civil_registration_convention_text: [],
      civil_registration_date: [],
      civil_registration_name: [null, Validators.maxLength(200)],
      civil_registration_number: [null, Validators.maxLength(200)],
      conservatory_endorsement_date: [],
      created_at: [],
      created_by_user_id: [],
      curia_status: [],
      curia_status_date: [],
      date: [],
      deleted: [false],
      deleted_by_user_id: [],
      document_entity_description: [],
      document_entity_id: [],
      document_id: [],
      document_date: [],
      document_observations: [],
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
      id: [],
      mass: [false],
      mod2_chapelry_description: [],
      mod2_chapelry_id: [],
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
      process_id: [],
      property_regime: [],
      recipient_id: [],
      recipient_name: [],
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
      serie_number: [],
      sheet: [],
      tax: [],
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
      curia_weddings_attachments: this.fb.array([]),
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    this.constructFooterMenu();

    this.setInnerTable(
      obj.curia_weddings_attachments,
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
              this.i18nextPipe.transform(
                `${this.modulePath}:message.operation_not_available`
              ),
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
              this.i18nextPipe.transform(
                `${this.modulePath}:message.operation_not_available`
              ),
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
          case 'mod7_baptism_witness1':
          case 'mod7_baptism_witness2':
          case 'groom_married_with_who':
          case 'bride_married_with_who':
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
          case 'cpm_reception_entity':
            if (this.form.get(`${inputName}_id`).value) {
              this.openDetails(
                'persons',
                this.form.get(`${inputName}_id`).value
              );
            }
            break;
          default:
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.operation_not_available`
              ),
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
          case 'mod7_baptism_witness1':
          case 'mod7_baptism_witness2':
          case 'groom_married_with_who':
          case 'bride_married_with_who':
            this.openQuickInsertionModal(
              'quick-insert-persons-modal',
              inputName
            );
            break;
          default:
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.operation_not_available`
              ),
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
            `${this.modulePath}:model.curia_weddings_attachments.attachment`
          ),
          sortable: false,
          template: this.attachmentTemplate,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.curia_weddings_attachments.description`
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
      'curia_weddings_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.curia_weddings_attachments
      .filter((obj: CuriaWeddingsAttachment) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: CuriaWeddingsAttachment) => {
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

  fillSeatDuplicateWillBeSigned(values: CuriaWedding) {
    values.seat_duplicate_will_be_signed = null;
    this.subs.push(
      this.service.getWillBeSignedPhrase(values).subscribe((r) => {
        this.form.get('seat_duplicate_will_be_signed').setValue(r.result);
      })
    );
  }

  // THIS FORM SPECIFIC FUNCTIONS [END]
}
