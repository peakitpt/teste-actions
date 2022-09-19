import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  DialogComponent,
  SnackBarService,
  TableDataSource,
} from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable, Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { Family, FamiliesEntity } from '../family.model';
import { State } from '../reducers/families.reducer';
import * as actions from '../reducers/families.actions';
import { getFamily } from '../reducers/families.selectors';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';

import { State as RelationshipsState } from 'src/app/components/relationship-degrees/reducers/relationship-degrees.reducer';
import { RequestGetAll } from 'src/app/components/relationship-degrees/reducers/relationship-degrees.actions';
import { getRelationshipDegreesList } from 'src/app/components/relationship-degrees/reducers/relationship-degrees.selectors';
import {
  RelationshipDegreeResponse,
  RelationshipDegree,
} from 'src/app/components/relationship-degrees/relationship-degree.model';

import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';

import { State as FamiliesState } from 'src/app/components/families/reducers/families.reducer';
import { getEntityFamilies } from 'src/app/components/families/reducers/families.selectors';
import { RequestGetEntityFamilies } from 'src/app/components/families/reducers/families.actions';
import { FamiliesV2Service } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-families-form',
  templateUrl: './families-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FamiliesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Family>;
  modulePath = 'families';

  selectorGetModel = getFamily;
  actionRequestFail = actions.FamiliesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.FamiliesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.FamiliesActionTypes.SuccessPost;

  @ViewChild('familyTabTemplate') familyTabTemplate: TemplateRef<any>;
  @ViewChild('documentsTabTemplate') documentsTabTemplate: TemplateRef<any>;
  @ViewChild('statisticDataTabTemplate')
  statisticDataTabTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('entityTemplate') entityTemplate: TemplateRef<any>;
  @ViewChild('relationshipDegreeTemplate')
  relationshipDegreeTemplate: TemplateRef<any>;
  @ViewChild('relationTemplate') relationTemplate: TemplateRef<any>;

  @ViewChild('populateDefaultsModal') populateDefaultsModal: DialogComponent;

  /* This specific's component fields */
  personsMenuOptions: ModalMenuOption[] = [];
  chapelriesMenuOptions: ModalMenuOption[] = [];

  families: Array<{ id: number; name: string }> = [];
  familiesEntitiesColumns: any[] = [];
  familiesEntitiesDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  familiesEntitiesFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  newFamilyEntity: FamiliesEntity = {
    id: null,
    family_id: null,
    entity_id: null,
    entity_description: null,
    relationship_degree_id: null,
    relationship_degree_description: null,
    relation_with: 3,
  }; // The object wich will be added to a new line

  relationshipOptions: Array<{ label: string; value: number }> = [];

  relationWithOptions: Array<{ label: string; value: number }> = [];

  tempSub: Subscription;
  tempSelectedEntity: SelectedModalRow;

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
    private relationshipsStore: Store<RelationshipsState>,
    private chapelriesStore: Store<ChapelriesState>,
    private familiesStore: Store<FamiliesState>,
    private familiesService: FamiliesV2Service
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
      father: [],
      father_id: [null, Validators.required],
      mother: [],
      mother_id: [],
      name: [null, Validators.required],
      disabled: [true],
      opt1_text: [],
      opt1_text2: [],
      opt2_text: [],
      opt2_text2: [],
      opt3_text: [],
      opt4_text: [],
      opt5_text: [],
      created_at: [],
      updated_at: [],
      opt1_text2_description: [],
      father_description: [null, Validators.required],
      mother_description: [],
      comments: [],
      families_entities: this.fb.array([]),
      _destroy: [false],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setPersonsModal();
    this.setChapelriesModal();
    this.setRelationWithOptions();
    this.setRelationshipDegreesOptions();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.setInnerTable(
      obj.families_entities,
      this.familiesEntitiesFormArray,
      this.familiesEntitiesDS,
      ['family_id']
    );
    const familyId = this.duplicateMode ? null : obj.id;

    // Add the documents tab
    if (familyId) {
      this.formTabs.splice(1, 0, {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.documents`
        ),
        templateContent: this.documentsTabTemplate,
      });
    }
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.family`),
        templateContent: this.familyTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.statistic_data`
        ),
        templateContent: this.statisticDataTabTemplate,
      },
    ];
    this.clearModalInputs();
    this.buildFamiliesEntitiesTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_person_modal':
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);

            this.familiesEntitiesFormArray
              .get([tableIndex, 'id'])
              .setValue(null);
            this.familiesEntitiesFormArray
              .get([tableIndex, 'entity_id'])
              .setValue(null);
            this.familiesEntitiesFormArray
              .get([tableIndex, 'entity_description'])
              .setValue(null);
          } else {
            // Form's modal
            this.form.get(`${inputName}_id`).setValue(null);
            this.form.get(`${inputName}_description`).setValue(null);
          }
        }
        break;
      case 'clear_chapelry_modal':
        if (inputName) {
          this.form.get(inputName).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      case 'view_selected_person':
        if (inputName) {
          let id: number;

          if (['father', 'mother'].includes(inputName)) {
            id = this.form.get(`${inputName}`).value.entity_person.id;
          } else {
            if (inputName.includes('#')) {
              // Table's modal
              id = this.familiesEntitiesFormArray.get([
                this.getInputNameIndex(inputName),
                'entity',
              ]).value.entity_person.id;
            } else {
              // Form's modal
              id = this.form.get(`${inputName}_id`).value;
            }
          }

          if (id) {
            this.openDetails('persons', id);
          }
        }
        break;
      case 'view_selected_chapelry':
        if (inputName) {
          const id = this.form.get(inputName).value;
          if (id) {
            this.openDetails('chapelries', id);
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
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onFormValid() {
    if (this.validateFamiliesEntities()) {
      super.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blank_families_entities`
        )
      );
    }
  }

  clearModalInputs() {
    this.form.get('father_description').setValue(null);
    this.form.get('father_id').setValue(null);
    this.form.get('mother_description').setValue(null);
    this.form.get('mother_id').setValue(null);
    this.form.get('opt1_text2_description').setValue(null); // chapelry
    this.form.get('opt1_text2').setValue(null); // chapelry
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setPersonsModal() {
    this.personsMenuOptions = this.defaultModalMenu('person');

    // When a row is selected
    this.subs.push(
      this.personsStore
        .select(getPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.validateEntityHasFamilies(row);
          }
        })
    );
  }

  private addEntityToFamilyEntities(row: SelectedModalRow) {
    if (['father', 'mother'].includes(row.inputName)) {
      this.form
        .get(`${row.inputName}`)
        .setValue({ entity_person: { id: row.model.id } });
      this.form.get(`${row.inputName}_id`).setValue(row.model.entity.id);
      this.form
        .get(`${row.inputName}_description`)
        .setValue(row.model.entity.name);
    } else if (row.inputName.includes('families_entities')) {
      this.updateTableValues(
        this.getInputNameIndex(row.inputName),
        this.familiesEntitiesFormArray,
        this.familiesEntitiesDS,
        [
          {
            control: `${this.getInputNameField(row.inputName)}_id`,
            value: row.model.entity.id,
          },
          {
            control: `${this.getInputNameField(row.inputName)}_description`,
            value: row.model.entity.name,
          },
        ]
      );
    }
  }

  private validateEntityHasFamilies(row: SelectedModalRow) {
    if (row.model.entity.id) {
      this.familiesStore.dispatch(
        new RequestGetEntityFamilies(row.model.entity.id)
      );

      this.tempSub = this.familiesStore
        .select(getEntityFamilies)
        .subscribe((entityFamilies: Array<{ id: number; name: string }>) => {
          if (
            entityFamilies !== null &&
            this.tempSub !== null &&
            !this.tempSub?.closed
          ) {
            this.tempSub?.unsubscribe();
            this.families = entityFamilies;

            if (this.families.length !== 0) {
              this.tempSelectedEntity = row;
              this.populateDefaultsModal.open();
            } else {
              this.addEntityToFamilyEntities(row);
            }
          }
        });
    }
  }

  closeWarningsModal() {
    this.tempSelectedEntity = null;
    this.populateDefaultsModal.close();
  }

  addNewAssociationToFamily() {
    if (this.tempSelectedEntity != null) {
      this.addEntityToFamilyEntities(this.tempSelectedEntity);
    }
    this.closeWarningsModal();
  }

  private setChapelriesModal() {
    this.chapelriesMenuOptions = this.defaultModalMenu('chapelry');

    // When a row is selected
    this.subs.push(
      this.chapelriesStore
        .select(getChapelriesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(row.inputName).setValue(row.model.entity_id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.complete_relation);
          }
        })
    );
  }

  private setRelationWithOptions() {
    this.relationWithOptions = [
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.father_description`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.mother_description`
        ),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:relations_with_both`
        ),
      },
    ];
  }

  private setRelationshipDegreesOptions() {
    // Get Relationship Degrees list
    const relationshipDegrees$: Observable<RelationshipDegreeResponse> =
      this.relationshipsStore.select(getRelationshipDegreesList);
    this.relationshipsStore.dispatch(new RequestGetAll({ limit: 'none' }));
    this.subs.push(
      relationshipDegrees$.subscribe((result: RelationshipDegreeResponse) => {
        if (result) {
          result.results.forEach((r: RelationshipDegree) =>
            this.relationshipOptions.push({ label: r.name, value: r.id })
          );
        }
      })
    );
  }

  private buildFamiliesEntitiesTableColumns() {
    setTimeout(() => {
      this.familiesEntitiesColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
        },
        {
          id: 'entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.families_entities.entity_description`
          ),
          required: true,
          sortable: false,
          template: this.entityTemplate,
        },
        {
          id: 'relationship_degree_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.families_entities.relationship_degree_description`
          ),
          required: true,
          sortable: false,
          template: this.relationshipDegreeTemplate,
        },
        {
          id: 'relation_with',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.families_entities.relation_with`
          ),
          required: true,
          sortable: false,
          template: this.relationTemplate,
        },
      ];
    });
  }

  private validateFamiliesEntities(): boolean {
    let familiesEntitiesValid = true;

    this.form.setControl(
      'families_entities',
      this.fb.array(this.familiesEntitiesFormArray.value)
    );

    this.form.value.families_entities
      .filter((obj: FamiliesEntity) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: FamiliesEntity, i: number) => {
        if (
          !obj.entity_id ||
          !obj.entity_description ||
          !obj.relationship_degree_description ||
          !obj.relation_with
        ) {
          familiesEntitiesValid = false;
        } else if (obj.relationship_degree_description) {
          this.updateTableValues(
            i,
            this.familiesEntitiesFormArray,
            this.familiesEntitiesDS,
            [
              {
                control: 'relationship_degree_id',
                value: this.relationshipOptions.find(
                  (o) => o.label === obj.relationship_degree_description
                ).value,
              },
            ]
          );
        }
      });

    this.form.setControl(
      'families_entities',
      this.fb.array(this.familiesEntitiesFormArray.value)
    );

    return familiesEntitiesValid;
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]

  populateDefaults() {}
}
