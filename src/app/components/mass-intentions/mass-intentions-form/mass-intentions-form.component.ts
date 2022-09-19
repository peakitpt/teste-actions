import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { SnackBarService } from '@peakitpt/ui-material';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { MassIntention } from 'src/app/components/mass-intentions/mass-intention.model';
import * as actions from 'src/app/components/mass-intentions/reducers/mass-intentions.actions';
import { getMassIntention } from '../reducers/mass-intentions.selectors';
import { State } from 'src/app/components/mass-intentions/reducers/mass-intentions.reducer';

import { State as PriestsAndPersonsState } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.reducer';
import { getPriestsAndPersonsSelected } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.selectors';
import { State as MassIntentionsTypesState } from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.reducer';
import { RequestGetAll } from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.actions';
import { getMassIntentionsTypesList } from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.selectors';
import {
  MassIntentionsTypeResponse,
  MassIntentionsType,
} from 'src/app/components/mass-intentions-types/mass-intentions-type.model';
import { State as WorshipplacesState } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { getWorshipplacesSelected } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';

@Component({
  selector: 'kyr-mass-intentions-form',
  templateUrl: './mass-intentions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MassIntentionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<MassIntention>;
  modulePath = 'mass-intentions';

  // Selectors & actions
  selectorGetModel = getMassIntention;
  actionRequestFail = actions.MassIntentionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.MassIntentionsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.MassIntentionsActionTypes.SuccessPost;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.MassIntentionsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.MassIntentionsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  /* This specific's component fields */
  intentionsTypesOptions: Array<{ label: string; value: number }> = [];

  priestsAndPersonsMenuOptions: ModalMenuOption[] = [];
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
    private massIntentionsTypesStore: Store<MassIntentionsTypesState>,
    private priestsAndPersonsStore: Store<PriestsAndPersonsState>,
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
      block_remove: [false],
      celebrated_by_description: [],
      celebrated_by_id: [],
      comments: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      document_entity_description: [],
      document_entity_id: [],
      document_id: [],
      emolument_description: [],
      emolument_id: [],
      entity_ekklesia_location_id: [],
      id: [],
      intention_date: [],
      intention_description: [null, Validators.required],
      intention_time: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      intention_type_id: [null, Validators.required],
      location_description: [],
      location_id: [],
      masses_delivered_document_id: [],
      paid: [false],
      requested_by_description: [null],
      requested_by_id: [null],
      serie_number: [],
      tax: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setPriestsAndPersonsModal();
    this.setMassIntentionsTypesOptions();
    this.setWorshipplacesModal();
    this.setEmolumentsModal();
    this.setEntitiesModal();
  }

  clearModalInputs() {
    [
      'requested_by_description',
      'requested_by_id',
      'location_description',
      'location_id',
      'celebrated_by_description',
      'celebrated_by_id',
      'emolument_description',
      'emolument_id',
      'document_entity_description',
      'document_entity_id',
    ].forEach((field: string) => this.affectField(field, null));
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_priests_and_person_modal':
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
      case 'view_selected_worshipplace':
      case 'view_selected_emolument':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;

          if (id) {
            if (event.includes('worshipplace')) {
              this.openDetails('worshipplaces', id);
            } else if (event.includes('emolument')) {
              this.openDetails('emoluments', id);
            }
          }
        }
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

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setPriestsAndPersonsModal() {
    this.priestsAndPersonsMenuOptions = [
      this.defaultModalMenu('priests_and_person')[0],
    ];

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

  private setMassIntentionsTypesOptions() {
    const massIntentionsTypes$: Observable<MassIntentionsTypeResponse> =
      this.massIntentionsTypesStore.select(getMassIntentionsTypesList);
    this.massIntentionsTypesStore.dispatch(
      new RequestGetAll({ limit: 'none' })
    );
    this.subs.push(
      massIntentionsTypes$.subscribe((result: MassIntentionsTypeResponse) => {
        if (result) {
          result.results.forEach((t: MassIntentionsType) => {
            return this.intentionsTypesOptions.push({
              label: t.name,
              value: t.id,
            });
          });
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

  private setEntitiesModal() {
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
