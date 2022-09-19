import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';

import { Catechumen } from 'src/app/components/catechumens/catechumen.model';
import { State } from 'src/app/components/catechumens/reducers/catechumens.reducer';
import * as actions from 'src/app/components/catechumens/reducers/catechumens.actions';
import { getCatechumen } from '../reducers/catechumens.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { SubscriptionSetting } from 'src/app/components/subscription-settings/subscription-setting.model';
import { State as SubscriptionSettingsState } from 'src/app/components/subscription-settings/reducers/subscription-settings.reducer';
import { getFromSubscriptionSetting } from 'src/app/components/subscription-settings/reducers/subscription-settings.selectors';
import { RequestGetFromSubscriptionSetting } from 'src/app/components/subscription-settings/reducers/subscription-settings.actions';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { getPersonByEntityId } from 'src/app/components/persons/reducers/persons.selectors';
import {
  RequestGetByEntityId,
  ClearGetByEntityId,
} from 'src/app/components/persons/reducers/persons.actions';
import { EntityPerson } from 'src/app/components/persons/person.model';
import { State as PriestsState } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.reducer';
import { getPriestsSelected } from 'src/app/shared/components/modals/priests-modal/reducers/priests-modal.selectors';
import { State as WorshipplacesState } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { getWorshipplacesSelected } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';

@Component({
  selector: 'kyr-catechumens-form',
  templateUrl: './catechumens-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechumensFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Catechumen>;
  modulePath = 'catechumens';

  // Selectors & actions
  selectorGetModel = getCatechumen;
  actionRequestFail = actions.CatechumensActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.CatechumensActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.CatechumensActionTypes.SuccessPost;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.CatechumensActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.CatechumensActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  /* This specific's component fields */
  todayDate: Date = new Date();

  personsMenuOptions: ModalMenuOption[] = [];
  priestsMenuOptions: ModalMenuOption[] = [];
  worshipplacesMenuOptions: ModalMenuOption[] = [];
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
    private subSettingStore: Store<SubscriptionSettingsState>,
    private personsStore: Store<PersonsState>,
    private priestsStore: Store<PriestsState>,
    private worshipplacesStore: Store<WorshipplacesState>,
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
      admission_date: [],
      admission_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      admission_local_description: [],
      admission_local_id: [],
      block_remove: [false],
      comments: [],
      created_at: [],
      created_by_user_id: [],
      date: [new Date()],
      deleted: [false],
      deleted_by_user_id: [],
      document_entity_description: [],
      document_entity_id: [],
      document_id: [],
      emolument_description: [],
      emolument_id: [],
      entity_by_description: [],
      entity_by_id: [],
      entity_catechumen_description: [null, Validators.required],
      entity_catechumen_id: [null, Validators.required],
      entity_ekklesia_location_id: [],
      id: [],
      seat_number: [],
      serie_number: [],
      sheet: [],
      tax: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.fillFromSubscriptionSetting();
    this.setPersonsModal();
    this.setPriestsModal();
    this.setWorshipplacesModal();
    this.setEmolumentsModal();
    this.setParishionersModal();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    if (this.duplicateMode) {
      this.affectField('entity_catechumen_id', null);
      this.affectField('entity_catechumen_description', null);
    }
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_person_modal':
      case 'clear_priest_modal':
      case 'clear_worshipplace_modal':
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
      case 'view_selected_worshipplace':
      case 'view_selected_emolument':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;

          if (id) {
            if (event.includes('worshipplace')) {
              this.openDetails('worshipplaces', id);
            } else if (event.includes('person')) {
              this.personsStore.dispatch(new RequestGetByEntityId(id));
              let getEntity$: Subscription = this.personsStore
                .select(getPersonByEntityId)
                .subscribe((person: EntityPerson) => {
                  if (person) {
                    getEntity$.unsubscribe();
                    this.personsStore.dispatch(new ClearGetByEntityId());
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
      case 'quick_insertion_worshipplace':
        this.openQuickInsertionModal(
          'quick-insert-worshipplaces-modal',
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
      'entity_catechumen_description',
      'entity_catechumen_id',
      'entity_by_description',
      'entity_by_id',
      'admission_local_description',
      'admission_local_id',
      'emolument_description',
      'emolument_id',
      'document_entity_description',
      'document_entity_id',
    ].forEach((field: string) => this.affectField(field, null));
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private fillFromSubscriptionSetting() {
    let subscriptionSetting$: Observable<SubscriptionSetting> =
      this.subSettingStore.select(getFromSubscriptionSetting);
    this.subSettingStore.dispatch(new RequestGetFromSubscriptionSetting());

    this.subs.push(
      subscriptionSetting$.subscribe((ss: SubscriptionSetting) => {
        if (ss != null && ss.priest) {
          if (ss.priest) this.affectFieldIfBlank('entity_by_id', ss.priest_id);
          this.affectFieldIfBlank(
            'entity_by_description',
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
