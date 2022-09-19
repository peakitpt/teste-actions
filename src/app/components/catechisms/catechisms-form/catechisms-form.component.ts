import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  BaseFormComponent,
  ControlValue,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { environment } from 'src/environments/environment';
import { CatechismsService } from '@peakitpt/ui-kyrios-api';

import { State } from '../reducers/catechisms.reducer';
import {
  Catechism,
  CatechismCatechist,
  CatechismStudent,
  CatechismTransfer,
} from '../catechism.model';
import { getCatechism } from '../reducers/catechisms.selectors';
import * as actions from 'src/app/components/catechisms/reducers/catechisms.actions';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { getPersonByEntityId } from '../../persons/reducers/persons.selectors';
import { EntityPerson } from '../../persons/person.model';
import {
  RequestGetByEntityId,
  ClearGetByEntityId,
} from 'src/app/components/persons/reducers/persons.actions';

@Component({
  selector: 'kyr-catechisms-form',
  templateUrl: './catechisms-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechismsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Catechism>;
  modulePath = 'catechisms';

  selectorGetModel = getCatechism;
  actionRequestFail = actions.CatechismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.CatechismsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.CatechismsActionTypes.SuccessPost;

  @ViewChild('catechismTabTemplate')
  catechismTabTemplate: TemplateRef<any>;
  @ViewChild('transfersTabTemplate') transfersTabTemplate: TemplateRef<any>;
  @ViewChild('deleteCatechistsTemplate')
  deleteCatechistsTemplate: TemplateRef<any>;
  @ViewChild('entityCatechistTemplate')
  entityCatechistTemplate: TemplateRef<any>;
  @ViewChild('deleteStudentsTemplate') deleteStudentsTemplate: TemplateRef<any>;
  @ViewChild('entityStudentTemplate') entityStudentTemplate: TemplateRef<any>;
  @ViewChild('entityStudentSponsorTemplate')
  entityStudentSponsorTemplate: TemplateRef<any>;
  @ViewChild('entityStudentObservationsTemplate')
  entityStudentObservationsTemplate: TemplateRef<any>;
  @ViewChild('entityStudentInscriptionTemplate')
  entityStudentInscriptionTemplate: TemplateRef<any>;
  @ViewChild('deleteTransfersTemplate')
  deleteTransfersTemplate: TemplateRef<any>;
  @ViewChild('transferTransitedTemplate')
  transferTransitedTemplate: TemplateRef<any>;
  @ViewChild('transferNextClassYearTemplate')
  transferNextClassYearTemplate: TemplateRef<any>;
  @ViewChild('transferEntityTemplate')
  transferEntityTemplate: TemplateRef<any>;
  @ViewChild('transferChapelryTemplate')
  transferChapelryTemplate: TemplateRef<any>;
  @ViewChild('transferDateTemplate')
  transferDateTemplate: TemplateRef<any>;

  /* This specific's component fields */
  baseCatechism: Catechism;
  personsMenuOptions: ModalMenuOption[] = [];
  chapelriesMenuOptions: ModalMenuOption[] = [];

  catechistsColumns: any[] = [];
  catechistsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  catechistsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  studentsColumns: any[] = [];
  studentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  studentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  transfersColumns: any[] = [];
  transfersFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  transfersDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  openStudentExistsOnAnotherCatechismConfirmation: boolean = false;
  openMissingSponsorsConfirmation: boolean = false;
  passYear: boolean = false;
  finalize: boolean = false;
  saveWithMissingSponsors: boolean = false;
  saveWhenStudentExistsOnAnotherCatechism: boolean = false;
  studentNamesOnAnotherCatechism: Array<string> = [];

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
    private catechismsService: CatechismsService
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
      is_for_adults: [false],
      finalized: [{ value: false, disabled: true }],
      passing_year_created: [false],
      name: [null, Validators.required],
      class_year: [this.getCurrentClassYear(), Validators.required],
      year: [null, Validators.required],
      week_day: [],
      start_time: [],
      end_time: [],
      catechisms_catechists_attributes: this.fb.array([]),
      catechisms_students_attributes: this.fb.array([]),
      catechisms_transfers_attributes: this.fb.array([]),
      catechisms_sessions_attributes: this.fb.array([]),
      catechisms_individual_documents_attributes: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.subs.push(
      this.route.queryParams.subscribe((params) => {
        this.passYear = params.passYear === 'true';
        this.finalize = params.finalize === 'true';
      })
    );
    super.ngOnInit();
    this.setPersonsModal();
    this.setChapelriesModal();

    this.buildCatechistsTableColumns();
    this.buildStudentsTableColumns();
  }

  setFormValues(obj: any) {
    if (!this.baseCatechism) {
      this.baseCatechism = obj;
    }

    // Block editing if finalized
    if (obj.id && obj.finalized && !this.duplicateMode) {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.cant_edit_finalized_catechism`
        )
      );
      this.modal.close();
    } else {
      super.setFormValues(obj);

      this.setInnerTable(
        obj.catechisms_catechists_attributes,
        this.catechistsFormArray,
        this.catechistsDS,
        ['catechism_id']
      );

      // duplicate/copy only the vaild students, updating their inscription date
      let studentsAttributesCopy: CatechismStudent[] = [];
      if (this.duplicateMode) {
        obj.catechisms_students_attributes
          .filter(
            (student: CatechismStudent) =>
              !student.deleted && !student.transferred
          )
          .forEach((student: CatechismStudent) => {
            const newStudent: CatechismStudent = { ...student };
            newStudent.inscription_date = this.sharedModule.parseDateToString(
              new Date(),
              'yyyy-MM-dd'
            );
            studentsAttributesCopy.push(newStudent);
          });
      }

      this.setInnerTable(
        this.duplicateMode
          ? studentsAttributesCopy
          : obj.catechisms_students_attributes,
        this.studentsFormArray,
        this.studentsDS,
        ['catechism_id']
      );

      if (obj.id) {
        if (this.duplicateMode) {
          if (this.passYear && obj.year < 10) {
            let classYear = this.form.get('class_year').value.split('/')[1];
            classYear += `/${+classYear + 1}`;

            this.form.get('name').patchValue(null);
            this.form.get('year').patchValue(+this.form.get('year').value + 1);
            this.form.get('class_year').patchValue(classYear);
          }
        } else {
          this.buildTransfersTableColumns();

          this.setInnerTable(
            obj.catechisms_transfers_attributes,
            this.transfersFormArray,
            this.transfersDS,
            ['catechism_id']
          );

          this.formTabs = this.formTabs.concat([
            {
              textLabel: this.i18nextPipe.transform(
                `${this.modulePath}:tabs.transfers`
              ),
              templateContent: this.transfersTabTemplate,
            },
          ]);
        }
      }
    }
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.catechism`
        ),
        templateContent: this.catechismTabTemplate,
      },
    ];

    this.clearModalInputs();
  }

  onSaveSuccess(result: any) {
    if (this.passYear) {
      let updatedBaseCatechism: Catechism = {
        ...this.baseCatechism,
        passing_year_created: true,
      };
      this.baseCatechism = updatedBaseCatechism;
      this.updateBaseCatechism();
    }
    super.onSaveSuccess(result);
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_person_modal':
      case 'clear_chapelry_modal':
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);
            let formArray: FormArray;

            if (inputName.includes('catechisms_catechists')) {
              formArray = this.catechistsFormArray;
            } else if (inputName.includes('catechisms_students')) {
              formArray = this.studentsFormArray;
            } else if (inputName.includes('catechisms_transfers')) {
              formArray = this.transfersFormArray;
            }

            formArray
              .get([tableIndex, `${this.getInputNameField(inputName)}_id`])
              .setValue(null);
            formArray
              .get([
                tableIndex,
                `${this.getInputNameField(inputName)}_description`,
              ])
              .setValue(null);
          }
        }
        break;
      case 'view_selected_person':
      case 'view_selected_chapelry':
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            let formArray: FormArray;
            let modulePath = 'persons';

            if (inputName.includes('catechisms_catechists')) {
              formArray = this.catechistsFormArray;
            } else if (inputName.includes('catechisms_students')) {
              formArray = this.studentsFormArray;
            } else if (inputName.includes('catechisms_transfers')) {
              formArray = this.transfersFormArray;
              if (inputName.includes('chapelry')) {
                modulePath = 'chapelries';
              }
            }

            const id: number = formArray.get([
              this.getInputNameIndex(inputName),
              `${this.getInputNameField(inputName)}_id`,
            ]).value;

            if (id) {
              if (modulePath === 'persons') {
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
              } else {
                this.openDetails(modulePath, id);
              }
            }
          }
        }
        break;
      case 'quick_insertion_person':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onFormValid() {
    if (this.validateCatechists()) {
      if (this.validateStudents()) {
        if (this.validateTransfers()) {
          this.studentExistsOnAnotherCatechism$().subscribe(
            (names: Array<string>) => {
              if (names) {
                this.studentNamesOnAnotherCatechism = names;
                if (
                  names.length > 0 &&
                  !this.saveWhenStudentExistsOnAnotherCatechism
                ) {
                  this.openStudentExistsOnAnotherCatechismConfirmation = true;
                } else {
                  if (
                    !this.saveWithMissingSponsors &&
                    this.missingEducationSponsors()
                  ) {
                    this.openMissingSponsorsConfirmation = true;
                  } else {
                    super.onFormValid();
                  }
                }
              }
            }
          );
        } else {
          this.savingError(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.error_blank_transfers`
            )
          );
        }
      } else {
        this.savingError(
          this.i18nextPipe.transform(
            `${this.modulePath}:message.error_blank_students`
          )
        );
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blank_catechists`
        )
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private buildCatechistsTableColumns() {
    setTimeout(() => {
      this.catechistsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteCatechistsTemplate,
        },
        {
          id: 'entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_catechists.entity_description`
          ),
          required: true,
          sortable: false,
          template: this.entityCatechistTemplate,
        },
      ];
    });
  }

  private buildStudentsTableColumns() {
    setTimeout(() => {
      this.studentsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteStudentsTemplate,
        },
        {
          id: 'entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_students.entity_description`
          ),
          required: true,
          sortable: false,
          template: this.entityStudentTemplate,
        },
        {
          id: 'education_sponsor_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_students.education_sponsor_description`
          ),
          sortable: false,
          template: this.entityStudentSponsorTemplate,
        },
        {
          id: 'observations',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_students.observations`
          ),
          sortable: false,
          template: this.entityStudentObservationsTemplate,
        },
        {
          id: 'inscription_date',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_students.inscription_date`
          ),
          sortable: false,
          template: this.entityStudentInscriptionTemplate,
        },
      ];
    });
  }

  private buildTransfersTableColumns() {
    setTimeout(() => {
      this.transfersColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTransfersTemplate,
        },
        {
          id: 'transited',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_transfers.transited`
          ),
          sortable: false,
          template: this.transferTransitedTemplate,
        },
        {
          id: 'next_class_year_inscription',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_transfers.next_class_year_inscription`
          ),
          sortable: false,
          template: this.transferNextClassYearTemplate,
        },
        {
          id: 'entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_transfers.entity_description`
          ),
          required: true,
          sortable: false,
          template: this.transferEntityTemplate,
        },
        {
          id: 'chapelry_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_transfers.chapelry_description`
          ),
          required: true,
          sortable: false,
          template: this.transferChapelryTemplate,
        },
        {
          id: 'transfer_date',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechisms_transfers.transfer_date`
          ),
          sortable: false,
          template: this.transferDateTemplate,
        },
      ];
    });
  }

  private setPersonsModal() {
    this.personsMenuOptions = this.defaultModalMenu('person');

    // When a row is selected
    this.subs.push(
      this.personsStore
        .select(getPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (
              row.inputName.includes('catechisms_catechists') ||
              row.inputName.includes('catechisms_students') ||
              row.inputName.includes('catechisms_transfers')
            ) {
              let formArray: FormArray;
              let ds: TableDataSource<any>;
              let controlValues: ControlValue[] = [
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
              ];

              if (row.inputName.includes('catechisms_catechists')) {
                formArray = this.catechistsFormArray;
                ds = this.catechistsDS;
              } else if (row.inputName.includes('catechisms_students')) {
                formArray = this.studentsFormArray;
                ds = this.studentsDS;

                if (
                  !this.form.get('is_for_adults').value &&
                  this.getInputNameField(row.inputName) === 'entity'
                ) {
                  const sponsor: { id: number; name: string } = {
                    id: null,
                    name: null,
                  };
                  if (row.model.entity_mother?.id) {
                    sponsor.id = row.model.entity_mother.id;
                    sponsor.name = row.model.entity_mother.name;
                  } else if (row.model.entity_father?.id) {
                    sponsor.id = row.model.entity_father.id;
                    sponsor.name = row.model.entity_father.name;
                  }

                  controlValues = controlValues.concat([
                    {
                      control: 'education_sponsor_id',
                      value: sponsor.id,
                    },
                    {
                      control: 'education_sponsor_description',
                      value: sponsor.name,
                    },
                  ]);
                }
              } else if (row.inputName.includes('catechisms_transfers')) {
                formArray = this.transfersFormArray;
                ds = this.transfersDS;
              }

              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                formArray,
                ds,
                controlValues
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
            if (row.inputName.includes('catechisms_transfers')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.transfersFormArray,
                this.transfersDS,
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

  private validateCatechists(): boolean {
    let catechistsValid = true;

    this.form.setControl(
      'catechisms_catechists_attributes',
      this.fb.array(this.catechistsFormArray.value)
    );

    this.form.value.catechisms_catechists_attributes
      .filter((obj: CatechismCatechist) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: CatechismCatechist) => {
        const lineCopy = { ...obj };

        if (!lineCopy.entity_id || !lineCopy.entity_description) {
          catechistsValid = false;
        }
      });

    return catechistsValid;
  }

  private validateStudents(): boolean {
    let studentsValid = true;

    this.form.setControl(
      'catechisms_students_attributes',
      this.fb.array(this.studentsFormArray.value)
    );

    this.form.value.catechisms_students_attributes
      .filter((obj: CatechismStudent) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: CatechismStudent) => {
        const lineCopy = { ...obj };

        if (!lineCopy.entity_id || !lineCopy.entity_description) {
          studentsValid = false;
        }
      });

    return studentsValid;
  }

  private validateTransfers(): boolean {
    let transfersValid = true;

    this.form.setControl(
      'catechisms_transfers_attributes',
      this.fb.array(this.transfersFormArray.value)
    );

    this.form.value.catechisms_transfers_attributes
      .filter((obj: CatechismTransfer) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: CatechismTransfer) => {
        const lineCopy = { ...obj };

        if (
          !lineCopy.entity_id ||
          !lineCopy.entity_description ||
          !lineCopy.chapelry_description ||
          !lineCopy.chapelry_id
        ) {
          transfersValid = false;
        }
      });

    return transfersValid;
  }

  private getCurrentClassYear(): string {
    const today = new Date();

    if (today.getUTCMonth() + 1 > 8) {
      return `${today.getUTCFullYear()}/${today.getUTCFullYear() + 1}`;
    } else {
      return `${today.getUTCFullYear() - 1}/${today.getUTCFullYear()}`;
    }
  }

  private updateBaseCatechism() {
    const baseCatechismForm = this.fb.group({
      id: [this.baseCatechism.id],
      finalized: [this.baseCatechism.finalized],
      passing_year_created: [this.baseCatechism.passing_year_created],
    });

    if (this.finalize && !this.baseCatechism.finalized) {
      baseCatechismForm.get('finalized').patchValue(true);
    }

    this.store.dispatch(
      new actions.RequestPassGrade(baseCatechismForm.getRawValue())
    );
  }

  openTransferReport(data: CatechismTransfer) {
    window.open(
      `${environment.railsAppUrl}/catechisms/${data.catechism_id}/${data.report_url}`,
      '_blank'
    );
  }

  studentExistsOnAnotherCatechism$(): Observable<any> {
    return this.catechismsService.getStudentsOnAnotherCatechism({
      entity_ekklesia_location_id: +localStorage.getItem('subscriptionId'),
      class_year: this.form.get('class_year').value,
      catechism_id: +this.form.get('id').value,
      entity_ids: this.form
        .get('catechisms_students_attributes')
        .value.filter((s: CatechismStudent) => !('_destroy' in s))
        .map((s: CatechismStudent) => s.entity_id),
    });
  }

  missingEducationSponsors(): boolean {
    if (!this.form.get('is_for_adults').value) {
      return this.form
        .get('catechisms_students_attributes')
        .value.some(
          (s: CatechismStudent) =>
            !('_destroy' in s) && s.education_sponsor_id == null
        );
    }
    return false;
  }

  closeConfirmationModal(event: {
    action: string;
    passYear: boolean;
    finalize: boolean;
    saveWhenStudentExistsOnAnotherCatechism: boolean;
    saveWithMissingSponsors: boolean;
  }) {
    this.saveWithMissingSponsors = event.saveWithMissingSponsors;
    this.saveWhenStudentExistsOnAnotherCatechism =
      event.saveWhenStudentExistsOnAnotherCatechism;

    this.openMissingSponsorsConfirmation = false;
    this.openStudentExistsOnAnotherCatechismConfirmation = false;

    this.isSaving = false;

    if (
      this.saveWithMissingSponsors ||
      this.saveWhenStudentExistsOnAnotherCatechism
    ) {
      this.onSubmit();
    }
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
