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
import { Observable, Subscription } from 'rxjs';
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
  CuriaBaptism,
  CuriaBaptismsAttachment,
} from 'src/app/components/curia-baptisms/curia-baptism.model';
import { State } from 'src/app/components/curia-baptisms/reducers/curia-baptisms.reducer';
import * as actions from 'src/app/components/curia-baptisms/reducers/curia-baptisms.actions';
import { getCuriaBaptism } from '../reducers/curia-baptisms.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { SubscriptionSetting } from 'src/app/components/subscription-settings/subscription-setting.model';
import { State as SubscriptionSettingsState } from 'src/app/components/subscription-settings/reducers/subscription-settings.reducer';
import { getFromSubscriptionSetting } from 'src/app/components/subscription-settings/reducers/subscription-settings.selectors';
import { RequestGetFromSubscriptionSetting } from 'src/app/components/subscription-settings/reducers/subscription-settings.actions';

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
  CuriaBaptismsService,
  FileManagerService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-curia-baptisms-form',
  templateUrl: './curia-baptisms-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaBaptismsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaBaptism>;
  modulePath = 'curia-baptisms';
  preFillWithNew = true;

  // Selectors & actions
  selectorGetModel = getCuriaBaptism;
  actionRequestFail = actions.CuriaBaptismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.CuriaBaptismsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.CuriaBaptismsActionTypes.SuccessPost;
  actionRequestSendToCuria = actions.RequestSendToCuria;
  actionSuccessSendToCuria =
    actions.CuriaBaptismsActionTypes.SuccessSendToCuria;
  actionRequestGetNew = actions.RequestGetNew;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.CuriaBaptismsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.CuriaBaptismsActionTypes.SuccessSaveAndGenerateDocument;
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

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('parentsGrandParentsTabTemplate')
  parentsGrandParentsTabTemplate: TemplateRef<any>;
  @ViewChild('godparentsTabTemplate') godparentsTabTemplate: TemplateRef<any>;
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
    private subSettingStore: Store<SubscriptionSettingsState>,
    private personsStore: Store<PersonsState>,
    private emolumentsStore: Store<EmolumentsState>,
    private parishionersStore: Store<ParishionersState>,
    private worshipplacesStore: Store<WorshipplacesState>,
    private priestsAndPersonsStore: Store<PriestsAndPersonsState>,
    private priestsStore: Store<PriestsState>,
    private chapelriesStore: Store<ChapelriesState>,
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
    super.ngOnInit();
    this.fillFromSubscriptionSetting();
    this.setPersonsModal();
    this.setEmolumentsModal();
    this.setParishionersModal();
    this.setWorshipplacesModal();
    this.setPriestsAndPersonsModal();
    this.setPriestsModal();
    this.setChapelriesModal();
  }

  initKeysToIgnoreOnDuplicate() {
    super.initKeysToIgnoreOnDuplicate(['age_at_subscription']);
  }

  initializeForm() {
    this.form = this.fb.group({
      age_at_subscription: [],
      baptism_date: [],
      baptism_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      block_remove: [false],
      blocked: [false],
      comments: [],
      created_at: [],
      created_by_user_id: [],
      curia_baptisms_attachments: this.fb.array([]),
      curia_status: [],
      curia_status_date: [],
      date: [new Date()],
      deleted: [],
      deleted_by_user_id: [],
      document_date: [],
      document_entity_description: [],
      document_entity_id: [],
      document_observations: [],
      emolument: [],
      emolument_description: [],
      emolument_id: [],
      entity: this.fb.group({
        id: [],
        entity_person: this.fb.group({
          id: [],
          entity_father_id: [],
          entity_father_description: [],
          entity_mother_id: [],
          entity_mother_description: [],
          birth_date: [],
          entity_father: this.fb.group({
            id: [],
            complete_relation: [],
            entity_person: this.fb.group({
              entity_father: this.fb.group({
                id: [],
                complete_relation: [],
              }),
              entity_mother: this.fb.group({
                id: [],
                complete_relation: [],
              }),
            }),
          }),
          entity_mother: this.fb.group({
            id: [],
            complete_relation: [],
            entity_person: this.fb.group({
              entity_father: this.fb.group({
                id: [],
                complete_relation: [],
              }),
              entity_mother: this.fb.group({
                id: [],
                complete_relation: [],
              }),
            }),
          }),
        }),
      }),
      entity_baptized_authorization_description: [],
      entity_baptized_authorization_entity_priest_id: [],
      entity_baptized_authorization_id: [],
      entity_baptized_by_description: [],
      entity_baptized_by_id: [],
      entity_baptized_location: [],
      entity_baptized_location_county: [],
      entity_baptized_location_description: [],
      entity_baptized_location_id: [],
      entity_description: [null, Validators.required],
      entity_ekklesia_location_id: [],
      entity_godfather_description: [],
      entity_godfather_id: [],
      entity_godfather_is_not_confirmed: [],
      entity_godfather_representative_description: [],
      entity_godfather_representative_id: [],
      entity_godmother_description: [],
      entity_godmother_id: [],
      entity_godmother_is_not_confirmed: [],
      entity_godmother_representative_description: [],
      entity_godmother_representative_id: [],
      entity_id: [null, Validators.required],
      father_residence_chapelry_description: [],
      father_residence_chapelry_id: [],
      id: [],
      in_danger_of_life: [false],
      mother_residence_chapelry_description: [],
      mother_residence_chapelry_id: [],
      parents_and_godparents_preparation_chapelry_description: [],
      parents_and_godparents_preparation_chapelry_id: [],
      process_id: [],
      receipt: [],
      receipt_id: [],
      seat_number: [],
      serie_number: [],
      sheet: [],
      tax: [],
      time_of_birth: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      updated_at: [],
      updated_by_user_id: [],
      wich_will: [],
      // Virtual fields
      father_id: [],
      father_description: [],
      mother_id: [],
      mother_description: [],
      paternal_grandfather_id: [],
      paternal_grandfather_description: [],
      paternal_grandmother_id: [],
      paternal_grandmother_description: [],
      maternal_grandfather_id: [],
      maternal_grandfather_description: [],
      maternal_grandmother_id: [],
      maternal_grandmother_description: [],
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    this.patchVirtualFields(obj);
    this.constructFooterMenu();

    this.setInnerTable(
      obj.curia_baptisms_attachments,
      this.attachmentsFormArray,
      this.attachmentsDS
    );
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.main_tab`
        ),
        templateContent: this.mainTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.parents_grandparents`
        ),
        templateContent: this.parentsGrandParentsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.godparents`
        ),
        templateContent: this.godparentsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments`
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
      'entity_priest_id',
      'father_residence_chapelry_id',
      'father_residence_chapelry_description',
      'mother_residence_chapelry_id',
      'mother_residence_chapelry_description',
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
      case 'view_selected_emolument':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('emoluments', id);
          }
        }
        break;
      case 'view_selected_worshipplace':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('worshipplaces', id);
          }
        }
        break;
      case 'view_selected_chapelry':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('chapelries', id);
          }
        }
        break;
      case 'view_selected_person':
      case 'view_selected_priests_and_person':
      case 'view_selected_parishioner':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
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
        break;
      case 'quick_insertion_person':
      case 'quick_insertion_priests_and_person':
      case 'quick_insertion_parishioner':
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
  private fillFromSubscriptionSetting() {
    let subscriptionSetting$: Observable<SubscriptionSetting> =
      this.subSettingStore.select(getFromSubscriptionSetting);
    this.subSettingStore.dispatch(new RequestGetFromSubscriptionSetting());

    this.subs.push(
      subscriptionSetting$.subscribe((ss: SubscriptionSetting) => {
        if (ss != null && ss.priest) {
          this.affectFieldIfBlank('entity_baptized_by_id', ss.priest_id);
          this.affectFieldIfBlank(
            'entity_baptized_by_description',
            `${
              ss.priest.entity_priest.clergy_type.abbreviated_name ||
              ss.priest.entity_priest.clergy_type.name
            } ${ss.priest_description}`
          );

          this.affectFieldIfBlank(
            'entity_baptized_authorization_id',
            ss.priest_id
          );
          this.affectFieldIfBlank(
            'entity_baptized_authorization_description',
            `${
              ss.priest.entity_priest.clergy_type.abbreviated_name ||
              ss.priest.entity_priest.clergy_type.name
            } ${ss.priest_description}`
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
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.description_short
            );
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
              case 'entity_baptized_authorization':
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  row.model.name
                );
                this.affectField(
                  'entity_baptized_authorization_entity_priest_id',
                  row.model.id
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
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.complete_relation
            );
          }
        })
    );
  }

  private patchVirtualFields(obj: any) {
    this.form
      .get('father_id')
      .patchValue(obj.entity?.entity_person?.entity_father_id);
    this.form
      .get('father_description')
      .patchValue(obj.entity?.entity_person?.entity_father?.complete_relation);

    this.form
      .get('mother_id')
      .patchValue(obj.entity?.entity_person?.entity_mother_id);
    this.form
      .get('mother_description')
      .patchValue(obj.entity?.entity_person?.entity_mother?.complete_relation);

    if (obj.entity?.entity_person.entity_father) {
      if (
        obj.entity?.entity_person.entity_father?.entity_person.entity_father
      ) {
        this.form
          .get('paternal_grandfather_id')
          .patchValue(
            obj.entity?.entity_person.entity_father?.entity_person.entity_father
              .id
          );
        this.form
          .get('paternal_grandfather_description')
          .patchValue(
            obj.entity?.entity_person.entity_father?.entity_person.entity_father
              .complete_relation
          );
      }
      if (
        obj.entity?.entity_person.entity_father?.entity_person.entity_mother
      ) {
        this.form
          .get('paternal_grandmother_id')
          .patchValue(
            obj.entity?.entity_person.entity_father?.entity_person.entity_mother
              .id
          );
        this.form
          .get('paternal_grandmother_description')
          .patchValue(
            obj.entity?.entity_person.entity_father?.entity_person.entity_mother
              .complete_relation
          );
      }
    }

    if (obj.entity?.entity_person.entity_mother) {
      if (obj.entity?.entity_person.entity_mother.entity_person.entity_father) {
        this.form
          .get('maternal_grandfather_id')
          .patchValue(
            obj.entity?.entity_person.entity_mother.entity_person.entity_father
              .id
          );
        this.form
          .get('maternal_grandfather_description')
          .patchValue(
            obj.entity?.entity_person.entity_mother.entity_person.entity_father
              .complete_relation
          );
      }
      if (obj.entity?.entity_person.entity_mother.entity_person.entity_mother) {
        this.form
          .get('maternal_grandmother_id')
          .patchValue(
            obj.entity?.entity_person.entity_mother.entity_person.entity_mother
              .id
          );
        this.form
          .get('maternal_grandmother_description')
          .patchValue(
            obj.entity?.entity_person.entity_mother.entity_person.entity_mother
              .complete_relation
          );
      }
    }
  }

  private constructFooterMenu() {
    this.footerOptionsMenu = [];

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
            `${this.modulePath}:model.baptisms_attachments.attachment`
          ),
          sortable: false,
          template: this.attachmentTemplate,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.baptisms_attachments.description`
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
    this.detectEntitiesClear();
  }

  // Se isto estiver muito confuso, a culpa é do Luís :)
  private detectEntitiesClear() {
    const parents = ['father', 'mother'];
    ['entity'].concat(parents).forEach((entity: string) => {
      this.subs.push(
        this.form.controls[`${entity}_id`].valueChanges.subscribe(
          (data: number) => {
            if (!data) {
              if (entity === 'entity') {
                parents.forEach((parent: string) => {
                  this.affectField(`${parent}_id`, null);
                  this.affectField(`${parent}_description`, null);
                });
              } else {
                this.affectField(`${entity}_id`, null, null, false);
                this.affectField(`${entity}_description`, null);
                this.affectField(`${entity}_residence_chapelry_id`, null);
                this.affectField(
                  `${entity}_residence_chapelry_description`,
                  null
                );

                if (entity === 'father') {
                  this.affectField('paternal_grandfather_id', null);
                  this.affectField('paternal_grandfather_description', null);
                  this.affectField('paternal_grandmother_id', null);
                  this.affectField('paternal_grandmother_description', null);
                } else if (entity === 'mother') {
                  this.affectField('maternal_grandfather_id', null);
                  this.affectField('maternal_grandfather_description', null);
                  this.affectField('maternal_grandmother_id', null);
                  this.affectField('maternal_grandmother_description', null);
                }
              }
            }
          }
        )
      );
    });
  }

  private validateAttachments(): boolean {
    let attachmentsValid = true;

    this.form.setControl(
      'curia_baptisms_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.curia_baptisms_attachments
      .filter((obj: CuriaBaptismsAttachment) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: CuriaBaptismsAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
