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
  FormGroup,
} from '@angular/forms';
import { State } from '../reducers/pastoral-agents.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/pastoral-agents.actions';
import * as formationsActions from '../../../shared/components/modals/formations-modal/reducers/formations-modal.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import {
  getPastoralAgent,
  getPastoralAgentTypes,
} from '../reducers/pastoral-agents.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import {
  PastoralAgentFormation,
  PastoralAgentDepartment,
  EntityPastoralAgent,
} from '../../mecs/mecs.model';
import { SharedModule } from 'src/app/shared/shared.module';
import * as moment from 'moment';
import * as FormationsModalStore from '../../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import * as FormationsModalSelectors from '../../../shared/components/modals/formations-modal/reducers/formations-modal.selectors';
import * as ChapelriesModalStore from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import * as ChapelriesModalSelectors from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
// tslint:disable-next-line: max-line-length
import * as PastoralAgentsTypesModalStore from '../../../shared/components/modals/pastoral-agents-types-modal/reducers/pastoral-agents-types-modal.reducer';
// tslint:disable-next-line: max-line-length
import * as PastoralAgentsTypesModalSelectors from '../../../shared/components/modals/pastoral-agents-types-modal/reducers/pastoral-agents-types-modal.selectors';
import { PastoralAgentsService } from '@peakitpt/ui-kyrios-api';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import {
  PastoralAgentType,
  PastoralAgentTypesResponse,
} from '../pastoral-agents.model';

@Component({
  selector: 'kyr-pastoral-agents-form',
  templateUrl: './pastoral-agents-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PastoralAgentsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<EntityPastoralAgent>;
  modulePath = 'pastoral-agents';

  ageControl: FormControl = new FormControl();
  formTabs: any[] = [];
  groupModalMenu: Array<{ name: string; value: string; icon: string }> = [];

  genderOptions = this.sharedModule.getGenders();
  qualificationsOptions = this.sharedModule.getQualifications();
  documentTypesOptions = this.sharedModule.getDocumentTypes();
  civilStatusesOptions = this.sharedModule.getCivilStatuses();
  pastoralAgentTypesList: PastoralAgentType[];
  maxDate = new Date();

  // PastoralAgents Lines
  pastoralAgentDepartmentsColumns: any[] = [];
  pastoralAgentDepartmentsFormArray: FormArray = new FormArray([]);
  pastoralAgentDepartmentsDS: TableDataSource<any> = new TableDataSource([]);

  // PastoralAgents Formations
  pastoralAgentDACFormationsColumns: any[] = [];
  pastoralAgentDAPJFormationsColumns: any[] = [];
  pastoralAgentECAFormationsColumns: any[] = [];
  pastoralAgentECFormationsColumns: any[] = [];
  pastoralAgentEMRCFormationsColumns: any[] = [];
  pastoralAgentDACFormationsFormArray: FormArray = new FormArray([]);
  pastoralAgentDAPJFormationsFormArray: FormArray = new FormArray([]);
  pastoralAgentECAFormationsFormArray: FormArray = new FormArray([]);
  pastoralAgentECFormationsFormArray: FormArray = new FormArray([]);
  pastoralAgentEMRCFormationsFormArray: FormArray = new FormArray([]);
  pastoralAgentDACFormationsDS: TableDataSource<any> = new TableDataSource([]);
  pastoralAgentDAPJFormationsDS: TableDataSource<any> = new TableDataSource([]);
  pastoralAgentECAFormationsDS: TableDataSource<any> = new TableDataSource([]);
  pastoralAgentECFormationsDS: TableDataSource<any> = new TableDataSource([]);
  pastoralAgentEMRCFormationsDS: TableDataSource<any> = new TableDataSource([]);

  dacTypeDescription: FormControl = new FormControl();
  dapjTypeDescription: FormControl = new FormControl();
  ecaTypeDescription: FormControl = new FormControl();
  emrcTypeDescription: FormControl = new FormControl();
  ecTypeDescription: FormControl = new FormControl();
  puTypeDescription: FormControl = new FormControl();

  selectorGetModel = getPastoralAgent;
  actionRequestFail = actions.PastoralAgentsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.PastoralAgentsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.PastoralAgentsActionTypes.SuccessPost;

  @ViewChild('personalDataTemplate') personalDataTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  @ViewChild('dacTemplate') dacTemplate: TemplateRef<any>;
  @ViewChild('dapjTemplate') dapjTemplate: TemplateRef<any>;
  @ViewChild('ecaTemplate') ecaTemplate: TemplateRef<any>;
  @ViewChild('emrcTemplate') emrcTemplate: TemplateRef<any>;
  @ViewChild('ecTemplate') ecTemplate: TemplateRef<any>;
  @ViewChild('puTemplate') puTemplate: TemplateRef<any>;
  @ViewChild('ddbpTemplate') ddbpTemplate: TemplateRef<any>;

  @ViewChild('deletePastoralAgentTableTemplate')
  deletePastoralAgentTableTemplate: TemplateRef<any>;
  @ViewChild('pastoralAgentDepartmentTemplate')
  pastoralAgentDepartmentTemplate: TemplateRef<any>;

  @ViewChild('deletePastoralAgentDACFormationTableTemplate')
  deletePastoralAgentDACFormationTableTemplate: TemplateRef<any>;
  @ViewChild('deletePastoralAgentDAPJormationTableTemplate')
  deletePastoralAgentDAPJormationTableTemplate: TemplateRef<any>;
  @ViewChild('deletePastoralAgentECAFormationTableTemplate')
  deletePastoralAgentECAFormationTableTemplate: TemplateRef<any>;
  @ViewChild('deletePastoralAgentECFormationTableTemplate')
  deletePastoralAgentECFormationTableTemplate: TemplateRef<any>;
  @ViewChild('deletePastoralAgentEMRCormationTableTemplate')
  deletePastoralAgentEMRCormationTableTemplate: TemplateRef<any>;
  @ViewChild('pastoralAgentDACFormationTemplate')
  pastoralAgentDACFormationTemplate: TemplateRef<any>;
  @ViewChild('pastoralAgentDAPJFormationTemplate')
  pastoralAgentDAPJFormationTemplate: TemplateRef<any>;
  @ViewChild('pastoralAgentECAFormationTemplate')
  pastoralAgentECAFormationTemplate: TemplateRef<any>;
  @ViewChild('pastoralAgentECFormationTemplate')
  pastoralAgentECFormationTemplate: TemplateRef<any>;
  @ViewChild('pastoralAgentEMRCFormationTemplate')
  pastoralAgentEMRCFormationTemplate: TemplateRef<any>;

  constructor(
    public store: Store<State>,
    public pastoralAgentService: PastoralAgentsService,
    public pastoralAgentsTypesStore: Store<PastoralAgentsTypesModalStore.State>,
    public formationsStore: Store<FormationsModalStore.State>,
    public chapelriesStore: Store<ChapelriesModalStore.State>,
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
      signature: [],
      pastoral_agent_number: [],
      magnetic_number: [],
      pastoral_agents_departments: [],
      active: true,
      approved: false,
      dac_is_card_emitted: false,
      dac_type_id: [],
      dac_chapelry_description: [],
      dac_chapelry_id: [],
      dac_childhood: false,
      dac_adolescence: false,
      dac_youth: false,
      dac_adults: false,
      dac_date: [],
      dac_is_parochial_coordinator: false,
      dac_is_phase_coordinator: false,
      dac_is_year_coordinator: false,
      dapj_is_card_emitted: false,
      dapj_type_id: [],
      dapj_chapelry_description: [],
      dapj_chapelry_id: [],
      dapj_date: [],
      dapj_is_parochial_coordinator: false,
      eca_is_card_emitted: false,
      eca_type_id: [],
      eca_chapelry_description: [],
      eca_chapelry_id: [],
      eca_date: [],
      eca_is_parochial_coordinator: false,
      eca_is_phase_coordinator: false,
      eca_is_year_coordinator: false,
      eca_is_trainer: false,
      emrc_is_card_emitted: false,
      emrc_type_id: [],
      emrc_chapelry_description: [],
      emrc_chapelry_id: [],
      emrc_is_parochial_coordinator: false,
      emrc_work_schools: [],
      ec_is_card_emitted: false,
      ec_type_id: [],
      ec_chapelry_description: [],
      ec_chapelry_id: [],
      ec_is_parochial_coordinator: false,
      ec_work_schools: [],
      pu_type_id: [],
      pu_comments: [],
      ddbp_comments: [],
      entity: this.fb.group({
        name: [],
        civil_status_id: [],
        entity_type_id: 5,
        address: [],
        door_number: [],
        postal_code: [],
        place: [],
        county: [],
        mobilephone: [],
        phone: [],
        fax: [],
        email: [null, Validators.pattern(this.sharedModule.PATTERN_EMAIL)],
        url: [],
        is_public_profile: false,
        entity_birth_chapelry_description: [],
        entity_birth_chapelry_id: [],
        residence_chapelry_description: [],
        residence_chapelry_id: [],
        entity_person: this.fb.group({
          id: [],
          serie_number: [],
          sex: [null, Validators.required],
          birth_date: [],
          qualifications_id: [],
          professional_profession_description: [],
          ident_document_type: [],
          ident_document_number: [],
          ident_document_emission_date: [],
          ident_document_validity_date: [],
          ident_document_emitted_by: [],
          comments: [],
          is_parishioner: [],
        }),
        entity_catechist: this.fb.group({
          id: [],
          catechist: [],
        }),
        entity_mec: this.fb.group({
          id: [],
          mec: false,
        }),
        entity_acolyte: this.fb.group({
          id: [],
          is_acolyte: false,
        }),
        entity_reader: this.fb.group({
          id: [],
          is_reader: false,
        }),
        entity_elder_patient: this.fb.group({}),
      }),
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setPastoralAgentTypeModal();
    this.setFormationsModal();
    this.setChapelriesModal();
    this.setDurationControlsUpdate();

    const pastoralAgentTypesObsevable = this.store.select(
      getPastoralAgentTypes
    );
    this.subs.push(
      pastoralAgentTypesObsevable.subscribe(
        (pastoralAgentTypes: PastoralAgentTypesResponse) => {
          if (pastoralAgentTypes) {
            this.pastoralAgentTypesList = pastoralAgentTypes.results;
            this.setPastoralAgentTypesDescriptions();
          }
        }
      )
    );
    this.store.dispatch(new actions.RequestGetTypes(null));
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

  setFormValues(obj: EntityPastoralAgent) {
    super.setFormValues(obj);
    this.setExtraMenus(
      obj.pastoral_agents_departments,
      obj.pastoral_agents_formations
    );
    this.setPastoralAgentTypesDescriptions();
  }

  onAfterViewInit() {
    this.setFormTabs();
    this.setPastoralAgentDepartmentsColumns();
    this.setPastoralAgentFormationsColumns();

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
          this.pastoralAgentService.generateCard(
            this.id,
            +localStorage.getItem('subscriptionId'),
            localStorage.getItem('token')
          );
        }
        break;
      case 'clear_modal_pastoral_agents_type':
        if (inputName) {
          if (inputName.includes('#')) {
            const index = this.getInputNameIndex(inputName);
            if (
              this.pastoralAgentDepartmentsFormArray.value[index]
                .pastoral_agents_type.id
            ) {
              this.pastoralAgentDepartmentsFormArray.controls[index]
                .get('pastoral_agents_type')
                .get('id')
                .setValue(null);
              this.pastoralAgentDepartmentsFormArray.controls[index]
                .get('pastoral_agents_type')
                .get('description')
                .setValue(null);
            }
          } else {
            const fieldName = inputName.split('_pastoral_agent_types')[0];
            if (this.form.get(fieldName + '_type_id')) {
              this.form.get(fieldName + '_type_id').setValue(null);
              switch (fieldName) {
                case 'dac':
                  this.dacTypeDescription.setValue(null);
                  break;
                case 'dapj':
                  this.dapjTypeDescription.setValue(null);
                  break;
                case 'eca':
                  this.ecaTypeDescription.setValue(null);
                  break;
                case 'emrc':
                  this.emrcTypeDescription.setValue(null);
                  break;
                case 'ec':
                  this.ecTypeDescription.setValue(null);
                  break;
                case 'pu':
                  this.puTypeDescription.setValue(null);
                  break;
              }
            }
          }
        }
        break;
      case 'view_selected_pastoral_agents_type':
        if (inputName) {
          if (inputName.includes('#')) {
            const index = this.getInputNameIndex(inputName);
            if (
              this.pastoralAgentDepartmentsFormArray.value[index]
                .pastoral_agents_type.id
            ) {
              this.openDetails(
                'pastoral-agents-types',
                this.pastoralAgentDepartmentsFormArray.value[index]
                  .pastoral_agents_type.id
              );
            }
          } else {
            const fieldName =
              inputName.split('_pastoral_agent_types')[0] + '_type_id';
            if (this.form.get(fieldName).value) {
              this.openDetails(
                'pastoral-agents-types',
                this.form.get(fieldName).value
              );
            }
          }
        }
        break;
      case 'clear_modal_dac_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentDACFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
          ) {
            this.pastoralAgentDACFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
              .setValue(null);
            this.pastoralAgentDACFormationsFormArray.controls[index]
              .get('formation')
              .get('description')
              .setValue(null);
          }
        }
        break;
      case 'view_selected_dac_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentDACFormationsFormArray.value[index].formation.id
          ) {
            this.openDetails(
              'formations',
              this.pastoralAgentDACFormationsFormArray.value[index].formation.id
            );
          }
        }
        break;
      case 'clear_modal_dapj_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentDAPJFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
          ) {
            this.pastoralAgentDAPJFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
              .setValue(null);
            this.pastoralAgentDAPJFormationsFormArray.controls[index]
              .get('formation')
              .get('description')
              .setValue(null);
          }
        }
        break;
      case 'view_selected_dapj_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentDAPJFormationsFormArray.value[index].formation.id
          ) {
            this.openDetails(
              'formations',
              this.pastoralAgentDAPJFormationsFormArray.value[index].formation
                .id
            );
          }
        }
        break;
      case 'clear_modal_eca_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentECAFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
          ) {
            this.pastoralAgentECAFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
              .setValue(null);
            this.pastoralAgentECAFormationsFormArray.controls[index]
              .get('formation')
              .get('description')
              .setValue(null);
          }
        }
        break;
      case 'view_selected_eca_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentECAFormationsFormArray.value[index].formation.id
          ) {
            this.openDetails(
              'formations',
              this.pastoralAgentECAFormationsFormArray.value[index].formation.id
            );
          }
        }
        break;
      case 'clear_modal_emrc_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentEMRCFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
          ) {
            this.pastoralAgentEMRCFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
              .setValue(null);
            this.pastoralAgentEMRCFormationsFormArray.controls[index]
              .get('formation')
              .get('description')
              .setValue(null);
          }
        }
        break;
      case 'view_selected_emrc_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentEMRCFormationsFormArray.value[index].formation.id
          ) {
            this.openDetails(
              'formations',
              this.pastoralAgentEMRCFormationsFormArray.value[index].formation
                .id
            );
          }
        }
        break;
      case 'clear_modal_ec_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentECFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
          ) {
            this.pastoralAgentECFormationsFormArray.controls[index]
              .get('formation')
              .get('id')
              .setValue(null);
            this.pastoralAgentECFormationsFormArray.controls[index]
              .get('formation')
              .get('description')
              .setValue(null);
          }
        }
        break;
      case 'view_selected_ec_formations':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.pastoralAgentECFormationsFormArray.value[index].formation.id
          ) {
            this.openDetails(
              'formations',
              this.pastoralAgentECFormationsFormArray.value[index].formation.id
            );
          }
        }
        break;
      case 'clear_modal_dac':
        this.form.get('dac_chapelry_description').setValue(null);
        this.form.get('dac_chapelry_id').setValue(null);
        break;
      case 'view_selected_dac':
        if (this.form.get('dac_chapelry_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('dac_chapelry_id').value
          );
        }
        break;
      case 'clear_modal_dapj':
        this.form.get('dapj_chapelry_description').setValue(null);
        this.form.get('dapj_chapelry_id').setValue(null);
        break;
      case 'view_selected_dapj':
        if (this.form.get('dapj_chapelry_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('dapj_chapelry_id').value
          );
        }
        break;
      case 'clear_modal_eca':
        this.form.get('eca_chapelry_description').setValue(null);
        this.form.get('eca_chapelry_id').setValue(null);
        break;
      case 'view_selected_eca':
        if (this.form.get('eca_chapelry_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('eca_chapelry_id').value
          );
        }
        break;
      case 'clear_modal_ec':
        this.form.get('ec_chapelry_description').setValue(null);
        this.form.get('ec_chapelry_id').setValue(null);
        break;
      case 'view_selected_ec':
        if (this.form.get('ec_chapelry_id').value) {
          this.openDetails('chapelries', this.form.get('ec_chapelry_id').value);
        }
        break;
      case 'clear_modal_emrc':
        this.form.get('emrc_chapelry_description').setValue(null);
        this.form.get('emrc_chapelry_id').setValue(null);
        break;
      case 'view_selected_emrc':
        if (this.form.get('emrc_chapelry_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('emrc_chapelry_id').value
          );
        }
        break;
      case 'clear_modal_birth':
        this.form
          .get('entity.entity_birth_chapelry_description')
          .setValue(null);
        this.form.get('entity.entity_birth_chapelry_id').setValue(null);
        break;
      case 'view_selected_birth':
        if (this.form.get('entity.entity_birth_chapelry_id').value) {
          this.openDetails(
            'chapelries',
            this.form.get('entity.entity_birth_chapelry_id').value
          );
        }
        break;
      case 'clear_modal_address':
        this.form.get('entity.residence_chapelry_description').setValue(null);
        this.form.get('entity.residence_chapelry_id').setValue(null);
        break;
      case 'view_selected_address':
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
      .get('dac_date')
      .setValue(
        this.form.get('dac_date').value
          ? moment(this.form.get('dac_date').value).format('YYYY-MM-DD')
          : null
      );
    this.form
      .get('dapj_date')
      .setValue(
        this.form.get('dapj_date').value
          ? moment(this.form.get('dapj_date').value).format('YYYY-MM-DD')
          : null
      );
    this.form
      .get('eca_date')
      .setValue(
        this.form.get('eca_date').value
          ? moment(this.form.get('eca_date').value).format('YYYY-MM-DD')
          : null
      );

    if (this.validatePastoralAgentsDepartments()) {
      if (this.validatePastoralAgentsFormations()) {
        if (this.sharedModule.isDuplicateMode(this.route)) {
          // Remove all id's
          this.form.get('id').setValue(null);
          this.form.get('entity_id').setValue(null);
          this.form.get('entity.entity_person.id').setValue(null);
          this.form.get('entity.entity_mec.id').setValue(null);
          this.form.get('entity.entity_reader.id').setValue(null);
          this.form.get('entity.entity_acolyte.id').setValue(null);
          this.form.get('entity.entity_catechist.id').setValue(null);

          this.form.value.pastoral_agents_departments.forEach(
            (ml: PastoralAgentDepartment) => {
              ml.id = null;
              ml.entity_pastoral_agent_id = null;
            }
          );

          this.form.value.pastoral_agents_formations.forEach(
            (mf: PastoralAgentFormation) => {
              mf.id = null;
              mf.entity_pastoral_agent_id = null;
            }
          );
        }
        super.onFormValid();
      } else {
        this.savingError(
          this.i18nextPipe.transform(
            `${this.modulePath}:message.error_blankpastoral_agent_formations`
          )
        );
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blankpastoral_agent_lines`
        )
      );
    }
  }

  deleteTableLine(
    index: number,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    const currentLines = [...formArray.value];
    if (currentLines[index].id) {
      if (!formArray.controls[index].get('_destroy')) {
        const fg = formArray.controls[index] as FormGroup;
        fg.addControl('_destroy', new FormControl());
      }
      formArray.controls[index].get('_destroy').setValue(true);
    } else {
      currentLines.splice(index, 1);
      formArray.removeAt(index);
    }
    tableDS.data = formArray.value;
  }

  /* Module Functions */
  setPastoralAgentTypeModal() {
    this.subs.push(
      this.pastoralAgentsTypesStore
        .select(
          PastoralAgentsTypesModalSelectors.getPastoralAgentsTypesSelected
        )
        .subscribe((row: SelectedModalRow) => {
          if (row && row.inputName) {
            const inputNameInfo = row.inputName.split('#');
            const index = inputNameInfo[1];
            if (index !== undefined) {
              if (inputNameInfo[0] === 'pastoral_agent_types_departments') {
                this.pastoralAgentDepartmentsFormArray.controls[index]
                  .get('pastoral_agents_type')
                  .get('id')
                  .setValue(row.model.id);
                this.pastoralAgentDepartmentsFormArray.controls[index]
                  .get('pastoral_agents_type')
                  .get('description')
                  .setValue(row.model.description);
              }
            } else {
              switch (inputNameInfo[0]) {
                case 'dac_pastoral_agent_types':
                  this.form.get('dac_type_id').setValue(row.model.id);
                  this.dacTypeDescription.setValue(row.model.description);
                  break;
                case 'dapj_pastoral_agent_types':
                  this.form.get('dapj_type_id').setValue(row.model.id);
                  this.dapjTypeDescription.setValue(row.model.description);
                  break;
                case 'eca_pastoral_agent_types':
                  this.form.get('eca_type_id').setValue(row.model.id);
                  this.ecaTypeDescription.setValue(row.model.description);
                  break;
                case 'emrc_pastoral_agent_types':
                  this.form.get('emrc_type_id').setValue(row.model.id);
                  this.emrcTypeDescription.setValue(row.model.description);
                  break;
                case 'ec_pastoral_agent_types':
                  this.form.get('ec_type_id').setValue(row.model.id);
                  this.ecTypeDescription.setValue(row.model.description);
                  break;
                case 'pu_pastoral_agent_types':
                  this.form.get('pu_type_id').setValue(row.model.id);
                  this.puTypeDescription.setValue(row.model.description);
                  break;
              }
            }
          }
        })
    );
  }

  setFormationsModal() {
    this.subs.push(
      this.formationsStore
        .select(FormationsModalSelectors.getFormationSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row && row.inputName) {
            const inputNameInfo = row.inputName.split('#');
            const index = inputNameInfo[1];
            if (index !== undefined) {
              switch (inputNameInfo[0]) {
                case 'dac_formations':
                  this.pastoralAgentDACFormationsFormArray.controls[index]
                    .get('formation')
                    .get('id')
                    .setValue(row.model.id);
                  this.pastoralAgentDACFormationsFormArray.controls[index]
                    .get('formation')
                    .get('description')
                    .setValue(row.model.description);
                  break;
                case 'dapj_formations':
                  this.pastoralAgentDAPJFormationsFormArray.controls[index]
                    .get('formation')
                    .get('id')
                    .setValue(row.model.id);
                  this.pastoralAgentDAPJFormationsFormArray.controls[index]
                    .get('formation')
                    .get('description')
                    .setValue(row.model.description);
                  break;
                case 'eca_formations':
                  this.pastoralAgentECAFormationsFormArray.controls[index]
                    .get('formation')
                    .get('id')
                    .setValue(row.model.id);
                  this.pastoralAgentECAFormationsFormArray.controls[index]
                    .get('formation')
                    .get('description')
                    .setValue(row.model.description);
                  break;
                case 'ec_formations':
                  this.pastoralAgentECFormationsFormArray.controls[index]
                    .get('formation')
                    .get('id')
                    .setValue(row.model.id);
                  this.pastoralAgentECFormationsFormArray.controls[index]
                    .get('formation')
                    .get('description')
                    .setValue(row.model.description);
                  break;
                case 'emrc_formations':
                  this.pastoralAgentEMRCFormationsFormArray.controls[index]
                    .get('formation')
                    .get('id')
                    .setValue(row.model.id);
                  this.pastoralAgentEMRCFormationsFormArray.controls[index]
                    .get('formation')
                    .get('description')
                    .setValue(row.model.description);
                  break;
              }
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
                  .setValue(row.model.entity_id);
                break;
              case 'address':
                this.form
                  .get('entity.residence_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form
                  .get('entity.residence_chapelry_id')
                  .setValue(row.model.entity_id);
                break;
              case 'dac':
                this.form
                  .get('dac_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form.get('dac_chapelry_id').setValue(row.model.entity_id);
                break;
              case 'dapj':
                this.form
                  .get('dapj_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form.get('dapj_chapelry_id').setValue(row.model.entity_id);
                break;
              case 'eca':
                this.form
                  .get('eca_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form.get('eca_chapelry_id').setValue(row.model.entity_id);
                break;
              case 'ec':
                this.form
                  .get('ec_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form.get('ec_chapelry_id').setValue(row.model.entity_id);
                break;
              case 'emrc':
                this.form
                  .get('emrc_chapelry_description')
                  .setValue(row.model.complete_relation);
                this.form.get('emrc_chapelry_id').setValue(row.model.entity_id);
                break;
            }
          }
        })
    );
  }

  setDurationControlsUpdate() {
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
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.dac'),
        templateContent: this.dacTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.dapj'),
        templateContent: this.dapjTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.eca'),
        templateContent: this.ecaTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.emrc'),
        templateContent: this.emrcTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.ec'),
        templateContent: this.ecTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.pu'),
        templateContent: this.puTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.ddbp'),
        templateContent: this.ddbpTemplate,
      },
    ];
  }

  setPastoralAgentDepartmentsColumns() {
    this.pastoralAgentDepartmentsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deletePastoralAgentTableTemplate,
        sortable: false,
      },
      {
        id: 'pastoral_agents_type_id',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.pastoral_agents_departments.pastoral_agents_type_id'
        ),
        filter: false,
        template: this.pastoralAgentDepartmentTemplate,
        sortable: false,
      },
    ];
  }

  setPastoralAgentFormationsColumns() {
    this.pastoralAgentDACFormationsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deletePastoralAgentDACFormationTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_id',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.pastoral_agents_formations.formation.id'
        ),
        filter: false,
        template: this.pastoralAgentDACFormationTemplate,
        sortable: false,
      },
    ];
    this.pastoralAgentDAPJFormationsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deletePastoralAgentDAPJormationTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_id',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.pastoral_agents_formations.formation.id'
        ),
        filter: false,
        template: this.pastoralAgentDAPJFormationTemplate,
        sortable: false,
      },
    ];
    this.pastoralAgentECAFormationsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deletePastoralAgentECAFormationTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_id',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.pastoral_agents_formations.formation.id'
        ),
        filter: false,
        template: this.pastoralAgentECAFormationTemplate,
        sortable: false,
      },
    ];
    this.pastoralAgentECFormationsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deletePastoralAgentECFormationTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_id',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.pastoral_agents_formations.formation.id'
        ),
        filter: false,
        template: this.pastoralAgentECFormationTemplate,
        sortable: false,
      },
    ];
    this.pastoralAgentEMRCFormationsColumns = [
      {
        id: '#',
        filter: false,
        template: this.deletePastoralAgentEMRCormationTableTemplate,
        sortable: false,
      },
      {
        id: 'formation_id',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.pastoral_agents_formations.formation.id'
        ),
        filter: false,
        template: this.pastoralAgentEMRCFormationTemplate,
        sortable: false,
      },
    ];
  }

  setExtraMenus(
    pastoralAgentDepartments: PastoralAgentDepartment[],
    pastoralAgentFormations: PastoralAgentFormation[]
  ) {
    this.pastoralAgentDepartmentsFormArray.clear();
    this.pastoralAgentDepartmentsDS.data =
      this.pastoralAgentDepartmentsFormArray.value;
    if (pastoralAgentDepartments?.length) {
      pastoralAgentDepartments.forEach((fe: PastoralAgentDepartment) => {
        this.addTableLine(
          {
            ...fe,
            pastoral_agents_type: this.fb.group(fe.pastoral_agents_type),
          },
          this.pastoralAgentDepartmentsFormArray,
          this.pastoralAgentDepartmentsDS
        );
      });
    }
    this.pastoralAgentDACFormationsFormArray.clear();
    this.pastoralAgentDAPJFormationsFormArray.clear();
    this.pastoralAgentECAFormationsFormArray.clear();
    this.pastoralAgentECFormationsFormArray.clear();
    this.pastoralAgentEMRCFormationsFormArray.clear();
    this.pastoralAgentDACFormationsDS.data =
      this.pastoralAgentDACFormationsFormArray.value;
    this.pastoralAgentDAPJFormationsDS.data =
      this.pastoralAgentDAPJFormationsFormArray.value;
    this.pastoralAgentECAFormationsDS.data =
      this.pastoralAgentECAFormationsFormArray.value;
    this.pastoralAgentECFormationsDS.data =
      this.pastoralAgentECFormationsFormArray.value;
    this.pastoralAgentEMRCFormationsDS.data =
      this.pastoralAgentEMRCFormationsFormArray.value;
    if (pastoralAgentFormations?.length) {
      pastoralAgentFormations.forEach((fe: PastoralAgentFormation) => {
        this.addPastoralAgentFormationToCorrectDS(fe);
      });
    }
  }

  addPastoralAgentFormationToCorrectDS(fe: PastoralAgentFormation) {
    const processedFe = {
      ...fe,
      formation: this.fb.group(fe.formation),
    };
    switch (fe.agent_type) {
      case 'dac':
        this.addTableLine(
          processedFe,
          this.pastoralAgentDACFormationsFormArray,
          this.pastoralAgentDACFormationsDS
        );
        break;
      case 'dapj':
        this.addTableLine(
          processedFe,
          this.pastoralAgentDAPJFormationsFormArray,
          this.pastoralAgentDAPJFormationsDS
        );
        break;
      case 'eca':
        this.addTableLine(
          processedFe,
          this.pastoralAgentECAFormationsFormArray,
          this.pastoralAgentECAFormationsDS
        );
        break;
      case 'ec':
        this.addTableLine(
          processedFe,
          this.pastoralAgentECFormationsFormArray,
          this.pastoralAgentECFormationsDS
        );
        break;
      case 'emrc':
        this.addTableLine(
          processedFe,
          this.pastoralAgentEMRCFormationsFormArray,
          this.pastoralAgentEMRCFormationsDS
        );
        break;
    }
  }

  setPastoralAgentTypesDescriptions() {
    if (this.pastoralAgentTypesList) {
      if (this.form.value.dac_type_id && !this.dacTypeDescription.value) {
        this.dacTypeDescription.setValue(
          this.pastoralAgentTypesList.find(
            (x) => x.id === this.form.value.dac_type_id
          ).description
        );
      }
      if (this.form.value.dapj_type_id && !this.dapjTypeDescription.value) {
        this.dapjTypeDescription.setValue(
          this.pastoralAgentTypesList.find(
            (x) => x.id === this.form.value.dapj_type_id
          ).description
        );
      }
      if (this.form.value.eca_type_id && !this.ecaTypeDescription.value) {
        this.ecaTypeDescription.setValue(
          this.pastoralAgentTypesList.find(
            (x) => x.id === this.form.value.eca_type_id
          ).description
        );
      }
      if (this.form.value.emrc_type_id && !this.emrcTypeDescription.value) {
        this.emrcTypeDescription.setValue(
          this.pastoralAgentTypesList.find(
            (x) => x.id === this.form.value.emrc_type_id
          ).description
        );
      }
      if (this.form.value.ec_type_id && !this.ecTypeDescription.value) {
        this.ecTypeDescription.setValue(
          this.pastoralAgentTypesList.find(
            (x) => x.id === this.form.value.ec_type_id
          ).description
        );
      }
      if (this.form.value.pu_type_id && !this.puTypeDescription.value) {
        this.puTypeDescription.setValue(
          this.pastoralAgentTypesList.find(
            (x) => x.id === this.form.value.pu_type_id
          ).description
        );
      }
    }
  }

  private validatePastoralAgentsDepartments(): boolean {
    let isValid = true;
    this.form.setControl(
      'pastoral_agents_departments',
      this.fb.array(this.pastoralAgentDepartmentsFormArray.value)
    );
    this.form.value.pastoral_agents_departments.forEach(
      (ml: PastoralAgentDepartment) => {
        if (
          !ml.pastoral_agents_type ||
          ml.pastoral_agents_type == null ||
          !ml.pastoral_agents_type.id ||
          ml.pastoral_agents_type.id == null
        ) {
          isValid = false;
        }
      }
    );
    return isValid;
  }
  private validatePastoralAgentsFormations(): boolean {
    let isValid = true;
    this.form.setControl(
      'pastoral_agents_formations',
      this.fb.array(
        [].concat(
          this.pastoralAgentDACFormationsFormArray.value,
          this.pastoralAgentDAPJFormationsFormArray.value,
          this.pastoralAgentECAFormationsFormArray.value,
          this.pastoralAgentECFormationsFormArray.value,
          this.pastoralAgentEMRCFormationsFormArray.value
        )
      )
    );
    this.form.value.pastoral_agents_formations.forEach(
      (mf: PastoralAgentFormation) => {
        if (
          !mf.agent_type ||
          !mf.agent_type == null ||
          !mf.formation ||
          !mf.formation == null ||
          !mf.formation.id ||
          !mf.formation.id == null
        ) {
          isValid = false;
        }
      }
    );
    return isValid;
  }

  newPastoralAgentFormation(agentType: string) {
    return {
      formation: this.fb.group({
        id: null,
        description: null,
      }),
      agent_type: agentType,
    };
  }
  newPastoralAgentDepartment() {
    return {
      pastoral_agents_type_id: null,
      pastoral_agents_type: this.fb.group({
        id: null,
        description: null,
      }),
    };
  }
}
