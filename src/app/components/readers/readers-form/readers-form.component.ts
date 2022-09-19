import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngrx/store';

import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { State } from '../reducers/readers.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/readers.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getReader } from '../reducers/readers.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import {
  ReaderFormation,
  ReaderLine,
  EntityReader,
} from '../../mecs/mecs.model';
import { SharedModule } from 'src/app/shared/shared.module';
import * as moment from 'moment';
import * as FormationsModalStore from '../../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import * as FormationsModalSelectors from '../../../shared/components/modals/formations-modal/reducers/formations-modal.selectors';
import * as ChapelriesModalStore from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import * as ChapelriesModalSelectors from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import * as WorshipplacesModalStore from '../../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import * as WorshipplacesModalSelectors from '../../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { ReadersService } from '@peakitpt/ui-kyrios-api';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-readers-form',
  templateUrl: './readers-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ReadersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<EntityReader>;
  modulePath = 'readers';

  ageControl: FormControl = new FormControl();
  institutionTimeControl: FormControl = new FormControl();
  formTabs: any[] = [];
  groupModalMenu: Array<{ name: string; value: string; icon: string }> = [];

  genderOptions = this.sharedModule.getGenders();
  qualificationsOptions = this.sharedModule.getQualifications();
  documentTypesOptions = this.sharedModule.getDocumentTypes();
  civilStatusesOptions = this.sharedModule.getCivilStatuses();

  maxDate = new Date();

  // Readers Lines
  readerLinesColumns: any[] = [];
  readerLinesFormArray: FormArray = new FormArray([]);
  readerLinesDS: TableDataSource<any> = new TableDataSource([]);
  newReaderLine: ReaderLine = {
    renewal_date: null,
  };
  // Readers Formations
  readerFormationsColumns: any[] = [];
  readerFormationsFormArray: FormArray = new FormArray([]);
  readerFormationsDS: TableDataSource<any> = new TableDataSource([]);
  newReaderFormation: ReaderFormation = {
    formation_id: null,
    formation_description: null,
    formation_date: null,
  };

  selectorGetModel = getReader;
  actionRequestFail = actions.ReadersActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.ReadersActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.ReadersActionTypes.SuccessPost;

  @ViewChild('deleteReaderLineTableTemplate')
  deleteReaderLineTableTemplate: TemplateRef<any>;
  @ViewChild('deleteReaderFormationTableTemplate')
  deleteReaderFormationTableTemplate: TemplateRef<any>;
  @ViewChild('readerRenewalTemplate') readerRenewalTemplate: TemplateRef<any>;
  @ViewChild('readerFormationDescriptionTableTemplate')
  readerFormationDescriptionTableTemplate: TemplateRef<any>;
  @ViewChild('readerFormationDateTemplate')
  readerFormationDateTemplate: TemplateRef<any>;
  @ViewChild('personalDataTemplate') personalDataTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('readerTemplate') readerTemplate: TemplateRef<any>;
  @ViewChild('formationsTemplate') formationsTemplate: TemplateRef<any>;

  constructor(
    public store: Store<State>,
    public readersService: ReadersService,
    public formationsStore: Store<FormationsModalStore.State>,
    public chapelriesStore: Store<ChapelriesModalStore.State>,
    public worshipplacesStore: Store<WorshipplacesModalStore.State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
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
      entity_id: [],
      is_reader: true,
      reader_number: [],
      magnetic_number: [],
      institution_center_worshipplace_description: [],
      institution_center_worshipplace_id: [],
      is_coordinator: false,
      congregation: [],
      formation_courses: [],
      institution_date: [],
      ecclesial_formation_biblical_courses: ' ',
      ecclesial_formation_theological_pastorails_courses: ' ',
      ecclesial_formation_other: false,
      ecclesial_formation_other_description: ' ',
      ecclesial_activities_singer: false,
      ecclesial_activities_caretaker: false,
      ecclesial_activities_association_of_faithful_direction_member: false,
      ecclesial_activities_economic_council_member: false,
      ecclesial_activities_other: false,
      ecclesial_activities_other_description: ' ',
      entity: this.fb.group({
        id: [],
        entity_type_id: 5,
        name: [null, Validators.required],
        entity_birth_chapelry_description: [],
        entity_birth_chapelry_id: [],
        residence_chapelry_description: [],
        residence_chapelry_id: [],
        civil_status_id: [],
        address: [],
        door_number: [],
        postal_code: [],
        place: [],
        county: [],
        latitude: [],
        longitude: [],
        mobilephone: [],
        phone: [],
        fax: [],
        email: [null, Validators.pattern(this.sharedModule.PATTERN_EMAIL)],
        url: [],
        is_public_profile: false,
        entity_mec: this.fb.group({
          id: [],
          entity_id: [],
          mec: [],
        }),
        entity_reader: this.fb.group({
          id: [],
          entity_id: [],
          is_reader: [],
        }),
        entity_catechist: this.fb.group({
          id: [],
          entity_id: [],
          catechist: [],
        }),
        entity_person: this.fb.group({
          id: [],
          entity_id: [],
          sex: [null, Validators.required],
          serie_number: [],
          birth_date: [],
          qualifications: [],
          qualifications_id: [],
          professional_profession_description: [],
          comments: [],
          ident_document_type: [],
          ident_document_number: [],
          ident_document_emission_date: [],
          ident_document_validity_date: [],
          ident_document_emitted_by: [],
          is_parishioner: [],
        }),
        entity_acolyte: this.fb.group({}),
        entity_elder_patient: this.fb.group({}),
        entity_pastoral_agent: this.fb.group({}),
      }),
      entities_readers_lines: this.fb.array([]),
      entities_readers_formations: this.fb.array([]),
    });

    this.readerLinesFormArray = this.form.controls
      .entities_readers_lines as FormArray;
    this.readerFormationsFormArray = this.form.controls
      .entities_readers_formations as FormArray;
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFormationsModal();
    this.setChapelriesModal();
    this.setWorshipplacesModal();
    this.setDurationControlsUpdate();
  }

  addToHeaderOptionsMenu() {
    this.headerOptionsMenu.push(
      {
        name: this.i18nextPipe.transform(
          this.modulePath + ':action.generate_card'
        ),
        value: 'generate_card',
        icon: 'credit_card',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      }
    );
  }

  setFormValues(obj: EntityReader) {
    super.setFormValues(obj);
    this.setExtraMenus(
      obj.entities_readers_lines,
      obj.entities_readers_formations
    );
  }

  onAfterViewInit() {
    this.setFormTabs();
    this.setReaderLinesColumns();
    this.setReaderFormationsColumns();

    this.groupModalMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: 'clear_modal',
        icon: 'clear',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: 'view_selected',
        icon: 'preview',
      },
    ];
  }

  menuClick(event: any, inputName?: string) {
    switch (event) {
      case 'generate_card':
        if (this.id) {
          this.readersService.generateCard(
            this.id,
            +localStorage.getItem('subscriptionId'),
            localStorage.getItem('token')
          );
        }
        break;
      case 'clear_modal_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          this.readerFormationsFormArray.controls[index]
            .get('formation_description')
            .setValue(null);
          this.readerFormationsFormArray.controls[index]
            .get('formation_id')
            .setValue(null);
        }
        break;
      case 'view_selected_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (this.readerFormationsFormArray.value[index].formation_id) {
            this.openDetails(
              'formations',
              this.readerFormationsFormArray.value[index].formation_id
            );
          }
        }
        break;
      case 'clear_modal_worshipplace_institution_center':
        this.form
          .get('institution_center_worshipplace_description')
          .setValue(null);
        this.form.get('institution_center_worshipplace_id').setValue(null);
        break;
      case 'view_selected_worshipplace_institution_center':
        if (this.form.get('institution_center_worshipplace_id').value) {
          this.openDetails(
            'worshipplaces',
            this.form.get('institution_center_worshipplace_id').value
          );
        }
        break;
      case 'clear_modal_chapelries_birth_chapelry':
        this.form
          .get('entity.entity_birth_chapelry_description')
          .setValue(null);
        this.form.get('entity.entity_birth_chapelry_id').setValue(null);
        break;
      case 'view_selected_chapelries_birth_chapelry':
        if (this.form.get('entity.entity_birth_chapelry_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('entity.entity_birth_chapelry_id').value
          );
        }
        break;
      case 'clear_modal_chapelries_residence_chapelry':
        this.form.get('entity.residence_chapelry_description').setValue(null);
        this.form.get('entity.residence_chapelry_id').setValue(null);
        break;
      case 'view_selected_chapelries_residence_chapelry':
        if (this.form.get('entity.residence_chapelry_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('entity.residence_chapelry_id').value
          );
        }
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onFormValid() {
    // Format Dates
    this.readerLinesFormArray.value.forEach((readerLine: ReaderLine) => {
      readerLine.renewal_date = readerLine.renewal_date
        ? moment(readerLine.renewal_date).format('YYYY-MM-DD')
        : null;
    });
    this.readerFormationsFormArray.value.forEach(
      (readerFormation: ReaderFormation) => {
        readerFormation.formation_date = readerFormation.formation_date
          ? moment(readerFormation.formation_date).format('YYYY-MM-DD')
          : null;
      }
    );

    this.form
      .get('entity.entity_person.birth_date')
      .setValue(
        this.form.get('entity.entity_person.birth_date').value
          ? moment(
              this.form.get('entity.entity_person.birth_date').value
            ).format('YYYY-MM-DD')
          : null
      );
    this.form
      .get('entity.entity_person.ident_document_emission_date')
      .setValue(
        this.form.get('entity.entity_person.ident_document_emission_date').value
          ? moment(
              this.form.get('entity.entity_person.ident_document_emission_date')
                .value
            ).format('YYYY-MM-DD')
          : null
      );
    this.form
      .get('entity.entity_person.ident_document_validity_date')
      .setValue(
        this.form.get('entity.entity_person.ident_document_validity_date').value
          ? moment(
              this.form.get('entity.entity_person.ident_document_validity_date')
                .value
            ).format('YYYY-MM-DD')
          : null
      );
    this.form
      .get('institution_date')
      .setValue(
        this.form.get('institution_date').value
          ? moment(this.form.get('institution_date').value).format('YYYY-MM-DD')
          : null
      );

    if (this.validateReadersLines()) {
      if (this.validateReadersFormations()) {
        if (this.sharedModule.isDuplicateMode(this.route)) {
          // Remove all id's
          this.form.get('id').setValue(null);
          this.form.get('entity_id').setValue(null);
          this.form.get('entity.id').setValue(null);
          this.form.get('entity.entity_person.id').setValue(null);
          this.form.get('entity.entity_person.entity_id').setValue(null);
          this.form.get('entity.entity_mec.id').setValue(null);
          this.form.get('entity.entity_mec.entity_id').setValue(null);
          this.form.get('entity.entity_reader.id').setValue(null);
          this.form.get('entity.entity_reader.entity_id').setValue(null);
          this.form.get('entity.entity_catechist.id').setValue(null);
          this.form.get('entity.entity_catechist.entity_id').setValue(null);
          this.form.value.entities_readers_lines.forEach((ml: ReaderLine) => {
            ml.id = null;
            ml.entity_reader_id = null;
          });
          this.form.value.entities_readers_formations.forEach(
            (mf: ReaderFormation) => {
              mf.id = null;
              mf.entity_reader_id = null;
            }
          );
        }
        super.onFormValid();
      } else {
        this.savingError(
          this.i18nextPipe.transform(
            `${this.modulePath}:message.error_blank_readers_formations`
          )
        );
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blank_readers_lines`
        )
      );
    }
  }

  /* Module Functions */
  setFormationsModal() {
    this.subs.push(
      this.formationsStore
        .select(FormationsModalSelectors.getFormationSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row && row.inputName) {
            let index = row.inputName.split('#')[1];
            if (index !== undefined) {
              this.readerFormationsFormArray.controls[index]
                .get('formation_description')
                .setValue(
                  `[${row.model.formations_type_description}] ${row.model.description}`
                );
              this.readerFormationsFormArray.controls[index]
                .get('formation_id')
                .setValue(row.model.id);
              index = undefined;
            }
          }
        })
    );
  }
  setChapelriesModal() {
    this.subs.push(
      this.chapelriesStore
        .select(ChapelriesModalSelectors.getChapelriesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row && row.inputName) {
            switch (row.inputName) {
              case 'birth':
                this.form
                  .get('entity.entity_birth_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form
                  .get('entity.entity_birth_chapelry_id')
                  .setValue(row.model.id);
                break;
              case 'address':
                this.form
                  .get('entity.residence_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form
                  .get('entity.residence_chapelry_id')
                  .setValue(row.model.id);
                break;
            }
          }
        })
    );
  }
  setWorshipplacesModal() {
    this.subs.push(
      this.worshipplacesStore
        .select(WorshipplacesModalSelectors.getWorshipplacesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row && row.inputName) {
            this.form
              .get('institution_center_worshipplace_description')
              .setValue(row.model.complete_relation);
            this.form
              .get('institution_center_worshipplace_id')
              .setValue(row.model.id);
          }
        })
    );
  }

  setDurationControlsUpdate() {
    this.subs.push(
      this.form.get('institution_date').valueChanges.subscribe((time) => {
        if (time) {
          this.institutionTimeControl.setValue(
            this.sharedModule.calculateAge(time)
          );
        }
      })
    );
    this.subs.push(
      this.form
        .get('entity.entity_person.birth_date')
        .valueChanges.subscribe((time) => {
          if (time) {
            this.ageControl.setValue(this.sharedModule.calculateAge(time));
          }
        })
    );
  }

  setFormTabs() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.personal-data'
        ),
        templateContent: this.personalDataTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.categories'
        ),
        templateContent: this.categoriesTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.reader'),
        templateContent: this.readerTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.formations'
        ),
        templateContent: this.formationsTemplate,
      },
    ];
  }

  setReaderLinesColumns() {
    this.readerLinesColumns = [
      {
        id: '#',
        filter: false,
        template: this.deleteReaderLineTableTemplate,
        sortable: false,
      },
      {
        id: 'renewal_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_readers_lines.renewal_date'
        ),
        filter: false,
        template: this.readerRenewalTemplate,
        sortable: false,
      },
    ];
  }

  setReaderFormationsColumns() {
    this.readerFormationsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deleteReaderFormationTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entities_readers_formations.formation_description'
        ),
        filter: false,
        template: this.readerFormationDescriptionTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_readers_formations.formation_date'
        ),
        filter: false,
        template: this.readerFormationDateTemplate,
        sortable: false,
      },
    ];
  }

  setExtraMenus(
    readersLines: ReaderLine[],
    readersFormations: ReaderFormation[]
  ) {
    this.readerLinesFormArray.clear();
    this.readerLinesDS.data = this.readerLinesFormArray.value;
    if (readersLines?.length) {
      readersLines.forEach((fe: ReaderLine) => {
        this.addTableLine(fe, this.readerLinesFormArray, this.readerLinesDS);
      });
    }
    this.readerFormationsFormArray.clear();
    this.readerFormationsDS.data = this.readerFormationsFormArray.value;
    if (readersFormations?.length) {
      readersFormations.forEach((fe: ReaderFormation) => {
        this.addTableLine(
          fe,
          this.readerFormationsFormArray,
          this.readerFormationsDS
        );
      });
    }
  }

  private validateReadersLines(): boolean {
    let isValid = true;
    this.form.setControl(
      'entities_readers_lines',
      this.fb.array(this.readerLinesFormArray.value)
    );
    this.form.value.entities_readers_lines.forEach((ml: ReaderLine) => {
      if (!ml.renewal_date || ml.renewal_date == null) {
        isValid = false;
      }
    });
    return isValid;
  }
  private validateReadersFormations(): boolean {
    let isValid = true;
    this.form.setControl(
      'entities_readers_formations',
      this.fb.array(this.readerFormationsFormArray.value)
    );
    this.form.value.entities_readers_formations.forEach(
      (mf: ReaderFormation) => {
        if (
          !mf.formation_id ||
          !mf.formation_description ||
          !mf.formation_date ||
          !mf.formation_id == null ||
          !mf.formation_description == null ||
          !mf.formation_date == null
        ) {
          isValid = false;
        }
      }
    );
    return isValid;
  }
}
