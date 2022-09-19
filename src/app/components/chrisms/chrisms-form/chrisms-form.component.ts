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
import { Observable } from 'rxjs';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';

import { Chrism, ChrismEntity } from 'src/app/components/chrisms/chrism.model';
import { State } from 'src/app/components/chrisms/reducers/chrisms.reducer';
import * as actions from 'src/app/components/chrisms/reducers/chrisms.actions';
import { getChrism } from '../reducers/chrisms.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { State as PriestsAndPersonsState } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.reducer';
import { getPriestsAndPersonsSelected } from 'src/app/shared/components/modals/priests-and-persons-modal/reducers/priests-and-persons-modal.selectors';
import { State as WorshipplacesState } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { getWorshipplacesSelected } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';

@Component({
  selector: 'kyr-chrisms-form',
  templateUrl: './chrisms-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ChrismsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Chrism>;
  modulePath = 'chrisms';

  // Selectors & actions
  selectorGetModel = getChrism;
  actionRequestFail = actions.ChrismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.ChrismsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.ChrismsActionTypes.SuccessPost;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.ChrismsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.ChrismsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  /* This specific's component fields */
  priestsAndPersonsMenuOptions: ModalMenuOption[] = [];
  worshipplacesMenuOptions: ModalMenuOption[] = [];
  personsMenuOptions: ModalMenuOption[] = [];
  emolumentsMenuOptions: ModalMenuOption[] = [];
  parishionersMenuOptions: ModalMenuOption[] = [];
  generateDocForChrismEntity: ChrismEntity;

  chrismsEntitiesColumns: any[] = [];
  chrismsEntitiesDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  chrismsEntitiesFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  newChrismEntity: ChrismEntity = {
    chrism_id: null,
    document_entity_description: null,
    document_entity_id: null,
    document_id: null,
    emolument_description: null,
    emolument_id: null,
    entity_description: null,
    entity_id: null,
    godfather_godmother_description: null,
    godfather_godmother_id: null,
    id: null,
    tax: null,
    updated_at: null,
  }; // The object wich will be added to a new line

  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('entityTemplate') entityTemplate: TemplateRef<any>;
  @ViewChild('godparentsTemplate') godparentsTemplate: TemplateRef<any>;
  @ViewChild('emolumentTemplate') emolumentTemplate: TemplateRef<any>;
  @ViewChild('taxTemplate') taxTemplate: TemplateRef<any>;
  @ViewChild('documentEntityTemplate') documentEntityTemplate: TemplateRef<any>;
  @ViewChild('generateDocumentTemplate')
  generateDocumentTemplate: TemplateRef<any>;

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
      created_at: [],
      created_by_user_id: [],
      date: [new Date(), Validators.required],
      deleted: [false],
      deleted_by_user_id: [],
      entity_chrism_location_description: [],
      entity_chrism_location_id: [],
      entity_ekklesia_location_id: [],
      entity_rel_mec_description: [],
      entity_rel_mec_id: [],
      id: [],
      seat_number: [],
      serie_number: [],
      updated_at: [],
      updated_by_user_id: [],
      year: [new Date().getFullYear],
      chrisms_entities_attributes: this.fb.array([]),
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setPriestsAndPersonsModal();
    this.setWorshipplacesModal();
    this.setPersonsModal();
    this.setEmolumentsModal();
    this.setParishionersModal();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.setInnerTable(
      obj.chrisms_entities_attributes,
      this.chrismsEntitiesFormArray,
      this.chrismsEntitiesDS,
      ['chrism_id']
    );
  }

  onAfterViewInit() {
    super.onAfterViewInit();
    this.buildChrismsEntitiesTableColumns();
  }

  clearModalInputs() {
    [
      'entity_chrism_location_description',
      'entity_chrism_location_id',
      'entity_rel_mec_description',
      'entity_rel_mec_id',
    ].forEach((field: string) => this.affectField(field, null));
  }

  onFormValid() {
    if (this.validateChrismsEntities()) {
      super.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blank_chrisms_entities`
        )
      );
    }
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_priest_modal':
      case 'clear_worshipplace_modal':
      case 'clear_person_modal':
      case 'clear_emolument_modal':
      case 'clear_parishioner_modal':
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);
            const fieldName = this.getInputNameField(inputName);

            this.chrismsEntitiesFormArray
              .get([tableIndex, `${fieldName}_id`])
              .setValue(null);
            this.chrismsEntitiesFormArray
              .get([tableIndex, `${fieldName}_description`])
              .setValue(null);

            if (fieldName === 'emolument') {
              this.chrismsEntitiesFormArray
                .get([tableIndex, 'tax'])
                .setValue(null);
            }
          }
        }
        break;
      case 'view_selected_worshipplace':
      case 'view_selected_person':
      case 'view_selected_emolument':
        if (inputName) {
          let id: number;
          let path: string;

          if (inputName.includes('#')) {
            // Table's modal
            if (event.includes('person')) {
              path = 'persons';
              id = this.chrismsEntitiesFormArray.get([
                this.getInputNameIndex(inputName),
                'entity',
              ]).value.entity_person.id;
            } else if (event.includes('emolument')) {
              path = 'emoluments';
              id = this.chrismsEntitiesFormArray.get([
                this.getInputNameIndex(inputName),
              ]).value.emolument_id;
            }
          } else {
            if (event.includes('worshipplace')) {
              path = 'worshipplaces';
            }

            id = this.form.get(`${inputName}_id`).value;
          }

          if (path != null && id != null) {
            this.openDetails(path, id);
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
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setPriestsAndPersonsModal() {
    this.priestsAndPersonsMenuOptions = [this.defaultModalMenu('priest')[0]];

    this.subs.push(
      this.priestsAndPersonsStore
        .select(getPriestsAndPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (['entity_rel_mec'].includes(row.inputName)) {
              this.affectField(`${row.inputName}_id`, row.model.id);
              this.affectField(
                `${row.inputName}_description`,
                `${row.model.name}`
              );
            } else if (row.inputName.includes('chrisms_entities')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.chrismsEntitiesFormArray,
                this.chrismsEntitiesDS,
                [
                  {
                    control: `${this.getInputNameField(row.inputName)}_id`,
                    value: row.model.id,
                  },
                  {
                    control: `${this.getInputNameField(
                      row.inputName
                    )}_description`,
                    value: row.model.name,
                  },
                ]
              );
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
            if (row.inputName.includes('chrisms_entities')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.chrismsEntitiesFormArray,
                this.chrismsEntitiesDS,
                [
                  {
                    control: `${this.getInputNameField(row.inputName)}_id`,
                    value: row.model.entity.id,
                  },
                  {
                    control: `${this.getInputNameField(
                      row.inputName
                    )}_description`,
                    value: row.model.entity.name,
                  },
                ]
              );
            }
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
            if (row.inputName.includes('chrisms_entities')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.chrismsEntitiesFormArray,
                this.chrismsEntitiesDS,
                [
                  {
                    control: `${this.getInputNameField(row.inputName)}_id`,
                    value: row.model.id,
                  },
                  {
                    control: `${this.getInputNameField(
                      row.inputName
                    )}_description`,
                    value: row.model.description_short || row.model.description,
                  },
                  {
                    control: 'tax',
                    value: row.model.value,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = [this.defaultModalMenu('parishioner')[0]];

    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('chrisms_entities')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.chrismsEntitiesFormArray,
                this.chrismsEntitiesDS,
                [
                  {
                    control: `${this.getInputNameField(row.inputName)}_id`,
                    value: row.model.id,
                  },
                  {
                    control: `${this.getInputNameField(
                      row.inputName
                    )}_description`,
                    value: row.model.name,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private buildChrismsEntitiesTableColumns() {
    setTimeout(() => {
      this.chrismsEntitiesColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
          width: '50px',
        },
        {
          id: 'entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.chrisms_entities_attributes.entity_description`
          ),
          required: true,
          sortable: false,
          template: this.entityTemplate,
          minWidth: '350px',
        },
        {
          id: 'godfather_godmother_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.chrisms_entities_attributes.godfather_godmother_description`
          ),
          sortable: false,
          template: this.godparentsTemplate,
          minWidth: '350px',
        },
        {
          id: 'emolument_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.chrisms_entities_attributes.emolument_description`
          ),
          sortable: false,
          template: this.emolumentTemplate,
          minWidth: '350px',
        },
        {
          id: 'tax',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.chrisms_entities_attributes.tax`
          ),
          sortable: false,
          template: this.taxTemplate,
          width: '100px',
        },
        {
          id: 'document_entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.chrisms_entities_attributes.document_entity_description`
          ),
          sortable: false,
          template: this.documentEntityTemplate,
          minWidth: '350px',
        },
        {
          id: 'save-and-generate-doc-btn',
          sortable: false,
          template: this.generateDocumentTemplate,
        },
      ];
    });
  }

  private validateChrismsEntities(): boolean {
    let chrismsEntitiesValid = true;

    this.form.setControl(
      'chrisms_entities_attributes',
      this.fb.array(this.chrismsEntitiesFormArray.value)
    );

    this.form.value.chrisms_entities_attributes
      .filter((obj: ChrismEntity) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: ChrismEntity) => {
        if (!obj.hasOwnProperty('_destroy') || obj['_destroy'] === false) {
          if (!obj.entity_id || !obj.entity_description) {
            chrismsEntitiesValid = false;
          }
        }
      });

    return chrismsEntitiesValid;
  }

  generateDocument(index: number) {
    this.generateDocForChrismEntity = this.chrismsEntitiesFormArray.controls[
      index
    ].value as ChrismEntity;

    this.openGenerateDocModal = true;
  }

  onDocGeneratedSuccesfully() {
    this.generateDocForChrismEntity = null;
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
