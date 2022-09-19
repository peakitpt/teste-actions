import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SnackBarService } from '@peakitpt/ui-material';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { Store, ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { Death } from 'src/app/components/deaths/death.model';
import { State } from 'src/app/components/deaths/reducers/deaths.reducer';
import { getDeath } from 'src/app/components/deaths/reducers/deaths.selectors';
import * as actions from 'src/app/components/deaths/reducers/deaths.actions';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { getPersonByEntityId } from '../../persons/reducers/persons.selectors';
import {
  RequestGetByEntityId,
  ClearGetByEntityId,
} from 'src/app/components/persons/reducers/persons.actions';
import { EntityPerson } from '../../persons/person.model';
import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';

@Component({
  selector: 'kyr-deaths-form',
  templateUrl: './deaths-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DeathsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Death>;
  modulePath = 'deaths';

  // Selectors & actions
  selectorGetModel = getDeath;
  actionRequestFail = actions.DeathsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.DeathsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.DeathsActionTypes.SuccessPost;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.DeathsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.DeathsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('reportsTabTemplate') reportsTabTemplate: TemplateRef<any>;

  /* This specific's component fields */
  todayDate: Date = new Date();

  chapelriesMenuOptions: ModalMenuOption[] = [];
  personsMenuOptions: ModalMenuOption[] = [];
  emolumentsMenuOptions: ModalMenuOption[] = [];
  entitiesMenuOptions: ModalMenuOption[] = [];

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
    private chapelriesStore: Store<ChapelriesState>,
    private emolumentsStore: Store<EmolumentsState>,
    private parishionersStore: Store<ParishionersState>
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
      block_remove: [false],
      bury_chapelry_description: [],
      bury_chapelry_id: [],
      civil_status_on_death: [],
      created_at: [],
      created_by_user_id: [],
      death_chapelry_description: [],
      death_chapelry_id: [],
      death_date: [new Date(), Validators.required],
      death_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      death_year: [],
      declaration_relative_kinship: [],
      declaration_relative_presence: [],
      deleted: [false],
      deleted_by_user_id: [],
      document_entity_description: [],
      document_entity_id: [],
      document_id: [],
      emolument_description: [],
      emolument_id: [],
      entity_bury_cemitery: [],
      entity_bury_date: [],
      entity_death_bury_process_id: [],
      entity_death_county: [],
      entity_death_locality: [],
      entity_death_place: [],
      entity_description: [null, Validators.required],
      entity_ekklesia_location_id: [],
      entity_id: [null, Validators.required],
      id: [],
      import_origin: [],
      observations: [],
      paroquia_sw_id: [],
      sacraments: [],
      seat_number: [],
      serie_number: [],
      sheet: [],
      tax: [],
      touched_in_current_importation: [false],
      updated_at: [],
      updated_by_user_id: [],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setPersonsModal();
    this.setChapelriesModal();
    this.setEmolumentsModal();
    this.setParishionersModal();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    if (this.duplicateMode) {
      this.affectField('entity_id', null);
      this.affectField('entity_description', null);
    }
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.main`),
        templateContent: this.mainTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.reports`
        ),
        templateContent: this.reportsTabTemplate,
      },
    ];

    this.clearModalInputs();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_person_modal':
      case 'clear_chapelry_modal':
      case 'clear_emolument_modal':
      case 'clear_parishioner_modal':
        if (inputName) {
          this.affectField(`${inputName}_id`, null);
          this.affectField(`${inputName}_description`, null);
        }
        if (event === 'clear_emolument_modal') {
          this.affectField('tax', null);
        }
        break;
      case 'view_selected_person':
      case 'view_selected_chapelry':
      case 'view_selected_emolument':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;

          if (id) {
            if (event.includes('chapelry')) {
              this.openDetails('chapelries', id);
            } else if (event.includes('person')) {
              this.store.dispatch(new RequestGetByEntityId(id));
              let getEntity$: Subscription = this.store
                .select(getPersonByEntityId)
                .subscribe((person: EntityPerson) => {
                  if (person) {
                    getEntity$.unsubscribe();
                    this.store.dispatch(new ClearGetByEntityId());
                    this.openDetails('persons', person.id);
                  }
                });
            } else if (event.includes('emolument')) {
              this.openDetails('emoluments', id);
            }
          }
        }
        break;
      case 'quick_insertion_person':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'quick_insertion_chapelry':
        this.openQuickInsertionModal(
          'quick-insert-chapelries-modal',
          inputName
        );
        break;
      case 'quick_insertion_emolument':
        this.openQuickInsertionModal(
          'quick-insert-emoluments-modal',
          inputName
        );
        break;
      case 'save_generate_document':
        this.openGenerateDocModal = true;
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  clearModalInputs() {
    [
      'entity_description',
      'entity_id',
      'death_chapelry_description',
      'death_chapelry_id',
      'bury_chapelry_description',
      'bury_chapelry_id',
      'emolument_description',
      'emolument_id',
      'document_entity_description',
      'document_entity_id',
    ].forEach((field: string) => this.affectField(field, null));
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
    this.entitiesMenuOptions = [this.defaultModalMenu('parishioner')[0]];

    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
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
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
