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
import { State } from '../reducers/mecs.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/mecs.actions';
import {
  SnackBarService,
  TableDataSource,
  TabsComponent,
} from '@peakitpt/ui-material';
import { getMEC } from '../reducers/mecs.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { EntityMec, MecLine, MecFormation } from '../mecs.model';
import { SharedModule } from 'src/app/shared/shared.module';
import * as moment from 'moment';
import * as FormationsModalStore from '../../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import * as FormationsModalSelectors from '../../../shared/components/modals/formations-modal/reducers/formations-modal.selectors';
import * as ChapelriesModalStore from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import * as ChapelriesModalSelectors from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import * as WorshipplacesModalStore from '../../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import * as WorshipplacesModalSelectors from '../../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { MecsService } from '@peakitpt/ui-kyrios-api';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-mecs-form',
  templateUrl: './mecs-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MecsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<EntityMec>;
  modulePath = 'mecs';

  ageControl: FormControl = new FormControl();
  institutionTimeControl: FormControl = new FormControl();
  formTabs: any[] = [];
  @ViewChild('tabsComponent') tabsComponent: TabsComponent;
  groupModalMenu: Array<{ name: string; value: string; icon: string }> = [];

  genderOptions = this.sharedModule.getGenders();
  qualificationsOptions = this.sharedModule.getQualifications();
  documentTypesOptions = this.sharedModule.getDocumentTypes();
  civilStatusesOptions = this.sharedModule.getCivilStatuses();

  maxDate = new Date();

  // MECS Lines
  mecLinesColumns: any[] = [];
  mecLinesFormArray: FormArray = new FormArray([]);
  mecLinesDS: TableDataSource<any> = new TableDataSource([]);
  newMecLine: MecLine = {
    renewal_date: null,
  };
  // MECS Formations
  mecFormationsColumns: any[] = [];
  mecFormationsFormArray: FormArray = new FormArray([]);
  mecFormationsDS: TableDataSource<any> = new TableDataSource([]);
  newMecFormation: MecFormation = {
    formation_id: null,
    formation_description: null,
    formation_date: null,
  };

  selectorGetModel = getMEC;
  actionRequestFail = actions.MecsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.MecsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.MecsActionTypes.SuccessPost;

  @ViewChild('deleteMecLineTableTemplate')
  deleteMecLineTableTemplate: TemplateRef<any>;
  @ViewChild('deleteMecFormationTableTemplate')
  deleteMecFormationTableTemplate: TemplateRef<any>;
  @ViewChild('mecRenewalTemplate') mecRenewalTemplate: TemplateRef<any>;
  @ViewChild('mecFormationDescriptionTableTemplate')
  mecFormationDescriptionTableTemplate: TemplateRef<any>;
  @ViewChild('mecFormationDateTemplate')
  mecFormationDateTemplate: TemplateRef<any>;
  @ViewChild('personalDataTemplate') personalDataTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('mecTemplate') mecTemplate: TemplateRef<any>;
  @ViewChild('formationsTemplate') formationsTemplate: TemplateRef<any>;

  constructor(
    public store: Store<State>,
    public mecsService: MecsService,
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
      mec: true,
      mec_number: [],
      magnetic_number: [],
      institution_center_worshipplace_description: [],
      institution_center_worshipplace_id: [],
      is_coordinator: true,
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
      created_at: [],
      ecclesial_activities_acolyte: [false],
      ecclesial_activities_reader: [false],
      updated_at: [],
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
        entity_acolyte: this.fb.group({
          id: [],
          entity_id: [],
          is_acolyte: false,
        }),
        entity_reader: this.fb.group({
          id: [],
          entity_id: [],
          is_reader: false,
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
      }),
      entities_mecs_lines: this.fb.array([]),
      entities_mecs_formations: this.fb.array([]),
    });

    this.mecLinesFormArray = this.form.controls
      .entities_mecs_lines as FormArray;
    this.mecFormationsFormArray = this.form.controls
      .entities_mecs_formations as FormArray;
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

  setFormValues(obj: EntityMec) {
    super.setFormValues(obj);
    this.setExtraMenus(obj.entities_mecs_lines, obj.entities_mecs_formations);
  }

  onAfterViewInit() {
    this.setFormTabs();
    this.setMecLinesColumns();
    this.setMecFormationsColumns();

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
          this.mecsService.generateCard(
            this.id,
            +localStorage.getItem('subscriptionId'),
            localStorage.getItem('token')
          );
        }
        break;
      case 'clear_modal_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          this.mecFormationsFormArray.controls[index]
            .get('formation_description')
            .setValue(null);
          this.mecFormationsFormArray.controls[index]
            .get('formation_id')
            .setValue(null);
        }
        break;
      case 'view_selected_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (this.mecFormationsFormArray.value[index].formation_id) {
            this.openDetails(
              'formations',
              this.mecFormationsFormArray.value[index].formation_id
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

  onSubmit() {
    this.isSaving = true;

    if (this.form.valid) {
      this.onFormValid();
    } else {
      this.changeToInvalidTab(this.form);
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  changeToInvalidTab(form) {
    const errorControls = [];
    Object.keys(form.controls).forEach((key) => {
      if (form.controls[key].status !== 'VALID') {
        errorControls.push(key);
      }
    });
    switch (errorControls[0]) {
      case 'entity':
        this.tabsComponent.changeFocus(0);
        break;
      case 'entities_mecs_lines':
      case 'entities_mecs_formations':
        this.tabsComponent.changeFocus(3);
        break;
      default:
    }
  }

  onFormValid() {
    // Format Dates
    this.mecLinesFormArray.value.forEach((mecLine: MecLine) => {
      mecLine.renewal_date = mecLine.renewal_date
        ? moment(mecLine.renewal_date).format('YYYY-MM-DD')
        : null;
    });
    this.mecFormationsFormArray.value.forEach((mecFormation: MecFormation) => {
      mecFormation.formation_date = mecFormation.formation_date
        ? moment(mecFormation.formation_date).format('YYYY-MM-DD')
        : null;
    });

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

    if (this.validateMecsLines()) {
      if (this.validateMecsFormations()) {
        if (this.sharedModule.isDuplicateMode(this.route)) {
          // Remove all id's
          this.form.value.entities_mecs_lines.forEach((ml: any) => {
            ml.entity_id = null;
          });
          this.form.value.entities_mecs_formations.forEach((mf: any) => {
            mf.entity_id = null;
          });
          this.form.get('id').setValue(null);
          this.form.get('entity_id').setValue(null);
          this.form.get('entity.id').setValue(null);
          this.form.get('entity.entity_person.id').setValue(null);
          this.form.get('entity.entity_person.entity_id').setValue(null);
          this.form.get('entity.entity_acolyte.id').setValue(null);
          this.form.get('entity.entity_acolyte.entity_id').setValue(null);
          this.form.get('entity.entity_reader.id').setValue(null);
          this.form.get('entity.entity_reader.entity_id').setValue(null);
          this.form.get('entity.entity_catechist.id').setValue(null);
          this.form.get('entity.entity_catechist.entity_id').setValue(null);
          this.form.value.entities_mecs_lines.forEach((ml: any) => {
            ml.id = null;
            ml.entity_mec_id = null;
          });
          this.form.value.entities_mecs_formations.forEach((mf: any) => {
            mf.id = null;
            mf.entity_mec_id = null;
          });
        }
        super.onFormValid();
      } else {
        this.savingError(
          this.i18nextPipe.transform(
            `${this.modulePath}:message.error_blank_mecs_formations`
          )
        );
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blank_mecs_lines`
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
              this.mecFormationsFormArray.controls[index]
                .get('formation_description')
                .setValue(
                  `[${row.model.formations_type_description}] ${row.model.description}`
                );
              this.mecFormationsFormArray.controls[index]
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
      this.form
        .get('institution_date')
        .valueChanges.subscribe((date: string) => {
          if (date) {
            this.institutionTimeControl.setValue(
              this.sharedModule.calculateAge(date)
            );
          }
        })
    );
    this.subs.push(
      this.form
        .get('entity.entity_person.birth_date')
        .valueChanges.subscribe((date: string) => {
          if (date) {
            this.ageControl.setValue(this.sharedModule.calculateAge(date));
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
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.mec'),
        templateContent: this.mecTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.formations'
        ),
        templateContent: this.formationsTemplate,
      },
    ];
  }

  setMecLinesColumns() {
    this.mecLinesColumns = [
      {
        id: '#',
        filter: false,
        template: this.deleteMecLineTableTemplate,
        sortable: false,
      },
      {
        id: 'renewal_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_mecs_lines.renewal_date'
        ),
        filter: false,
        template: this.mecRenewalTemplate,
        sortable: false,
      },
    ];
  }

  setMecFormationsColumns() {
    this.mecFormationsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deleteMecFormationTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entities_mecs_formations.formation_description'
        ),
        filter: false,
        template: this.mecFormationDescriptionTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_mecs_formations.formation_date'
        ),
        filter: false,
        template: this.mecFormationDateTemplate,
        sortable: false,
      },
    ];
  }

  setExtraMenus(mecsLines: MecLine[], mecsFormations: MecFormation[]) {
    this.mecLinesFormArray.clear();
    this.mecLinesDS.data = this.mecLinesFormArray.value;
    if (mecsLines?.length) {
      mecsLines.forEach((fe: MecLine) => {
        this.addTableLine(fe, this.mecLinesFormArray, this.mecLinesDS);
      });
    }
    this.mecFormationsFormArray.clear();
    this.mecFormationsDS.data = this.mecFormationsFormArray.value;
    if (mecsFormations?.length) {
      mecsFormations.forEach((fe: MecFormation) => {
        this.addTableLine(
          fe,
          this.mecFormationsFormArray,
          this.mecFormationsDS
        );
      });
    }
  }

  private validateMecsLines(): boolean {
    let isValid = true;
    this.form.setControl(
      'entities_mecs_lines',
      this.fb.array(this.mecLinesFormArray.value)
    );
    this.form.value.entities_mecs_lines.forEach((ml: any) => {
      if (this.form.value.id && !ml.id) {
        ml.id = null;
        ml.entity_mec_id = this.form.value.id;
      }
      if (!ml.renewal_date || ml.renewal_date == null) {
        isValid = false;
      }
    });
    return isValid;
  }

  private validateMecsFormations(): boolean {
    let isValid = true;
    this.form.setControl(
      'entities_mecs_formations',
      this.fb.array(this.mecFormationsFormArray.value)
    );
    this.form.value.entities_mecs_formations.forEach((mf: any) => {
      if (this.form.value.id && !mf.id) {
        mf.id = null;
        mf.entity_mec_id = this.form.value.id;
      }
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
    });
    return isValid;
  }
}
