import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
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

import { Chapelry } from '../chapelry.model';
import * as actions from '../reducers/chapelries.actions';
import * as modalActions from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.actions';
import { State } from '../reducers/chapelries.reducer';
import { getChapelry } from '../reducers/chapelries.selectors';

import * as ArchpristshipsStore from '../../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.reducer';
import * as ArchpristshipsSelectors from '../../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.selectors';
import * as PatronsStore from '../../../shared/components/modals/patrons-modal/reducers/patrons-modal.reducer';
import * as BaseStore from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';
import * as PatronsSelectors from '../../../shared/components/modals/patrons-modal/reducers/patrons-modal.selectors';
import * as WorshipplacesStore from '../../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import * as WorshipplacesSelectors from '../../../shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import * as moment from 'moment';
import { BaseFormPermissionsComponent } from 'src/app/shared/components/base-form-permissions-component';
import {
  ChapelriesService,
  SubscriptionsService,
} from '@peakitpt/ui-kyrios-api';
import { environment } from 'src/environments/environment';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-chapelries-form',
  templateUrl: './chapelries-form.component.html',
})
export class ChapelriesFormComponent
  extends BaseFormPermissionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Chapelry>;
  modulePath = 'chapelries';

  // MASSES
  massSchedulesColumns: any[] = [];
  massSchedulesFormArray: FormArray = new FormArray([]);
  massSchedulesDS: TableDataSource<any> = new TableDataSource([]);
  newMass = {
    created_at: null,
    end_date: null,
    end_hour: [
      null,
      [
        Validators.pattern(this.sharedModule.PATTERN_HOUR),
        Validators.minLength(5),
        Validators.maxLength(5),
      ],
    ],
    entity_ekklesia_location_id: null,
    for_confessions: false,
    frequency: null,
    id: null,
    months: null,
    start_date: null,
    start_hour: [
      null,
      [
        Validators.pattern(this.sharedModule.PATTERN_HOUR),
        Validators.minLength(5),
        Validators.maxLength(5),
      ],
    ],
    sync_at: null,
    sync_id: null,
    updated_at: null,
    weekdays: null,
    worshipplace_description: null,
    worshipplace_id: null,
  };

  // NOMINATIONS
  nominationsColumns: any[] = [];
  nominationsFormArray: FormArray = new FormArray([]);
  nominationsDS: TableDataSource<any> = new TableDataSource([]);

  massFrequencyOptions = this.sharedModule.getFrequencies();
  weekdaysOptions = this.sharedModule.getWeekdays();
  monthsOptions = this.sharedModule.getMonths();
  archpristshipModalMenu: Array<{ name: string; value: string; icon: string }> =
    [];
  patronModalMenu: Array<{ name: string; value: string; icon: string }> = [];
  worshipplaceModalMenu: Array<{ name: string; value: string; icon: string }> =
    [];
  isSuperUser: boolean;

  // IMAGE
  imageChanged: any;
  baseFilePath = environment.railsAppUrl;
  currentImagePath = {
    cover: null,
    attachment_filename: null,
    thumbnail: null,
  };

  selectorGetModel = getChapelry;
  actionRequestFail = actions.ChapelriesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.ChapelriesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.ChapelriesActionTypes.SuccessPost;

  @ViewChild('chapelryTemplate') chapelryTemplate: TemplateRef<any>;
  permissionsAttributesColumns: any[];
  @ViewChild('permissionsModulesTemplate')
  permissionsModulesTemplate: TemplateRef<any>;
  @ViewChild('statisticDataTemplate') statisticDataTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesTemplateCheckbox')
  permissionsModulesTemplateCheckbox: TemplateRef<any>;
  @ViewChild('permissionsAttributesCheckboxTemplate')
  permissionsAttributesCheckboxTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesModule')
  permissionsModulesModule: TemplateRef<any>;
  @ViewChild('permissionsModulesApp')
  permissionsModulesApp: TemplateRef<any>;
  // Tabs
  @ViewChild('massesSchedulesTemplate')
  massesSchedulesTemplate: TemplateRef<any>;
  @ViewChild('nominationsTemplate') nominationsTemplate: TemplateRef<any>;

  // MASS SCHEDULES TEMPALTES
  @ViewChild('deleteMassLineTableTemplate')
  deleteMassLineTableTemplate: TemplateRef<any>;
  @ViewChild('worshipplaceDescriptionTableTemplate')
  worshipplaceDescriptionTableTemplate: TemplateRef<any>;
  @ViewChild('frequencyTableTemplate') frequencyTableTemplate: TemplateRef<any>;
  @ViewChild('startHourTableTemplate') startHourTableTemplate: TemplateRef<any>;
  @ViewChild('endHourTableTemplate') endHourTableTemplate: TemplateRef<any>;
  @ViewChild('monthsTableTemplate') monthsTableTemplate: TemplateRef<any>;
  @ViewChild('weekdaysTableTemplate') weekdaysTableTemplate: TemplateRef<any>;
  @ViewChild('startDateTableTemplate') startDateTableTemplate: TemplateRef<any>;
  @ViewChild('endDateTableTemplate') endDateTableTemplate: TemplateRef<any>;
  @ViewChild('confessionsTableTemplate')
  confessionsTableTemplate: TemplateRef<any>;

  // NOMINATIONS TEMPLATES
  @ViewChild('startDateInputTemplate') startDateInputTemplate: TemplateRef<any>;
  @ViewChild('endDateInputTemplate') endDateInputTemplate: TemplateRef<any>;

  // Populate Templates
  @ViewChild('populateDefaultsModal') populateDefaultsModal: DialogComponent;

  currentSubscription = +localStorage.getItem('subscriptionId');
  canEdit = {
    isSuperUser: false,
    isSubscriptionAdmin: false,
  };

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public baseStore: Store<BaseStore.State>,
    public archpristshipStore: Store<ArchpristshipsStore.State>,
    public worshipplaceStore: Store<WorshipplacesStore.State>,
    public patronStore: Store<PatronsStore.State>,
    public chapelriesService: ChapelriesService,
    private subscriptionService: SubscriptionsService
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

  forSuperUserOnly() {
    if (this.formTabs && this.formTabs.length && this.isSuperUser) {
      this.formTabs.push({
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.permissions_modules'
        ),
        templateContent: this.permissionsModulesTemplate,
      });
    }

    if (this.id && this.isSuperUser) {
      this.headerOptionsMenu.push({
        name: this.i18nextPipe.transform('translation:action.populate'),
        value: 'populate_defaults',
        icon: 'build_circle',
      });
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      name: [],
      archpristship_name: [],
      bishopric_name: [],
      validated: [],
      entity_relation_attributes: this.fb.group({
        id: [],
        arciprestado_description: [],
        arciprestado_id: [],
        diocese_description: [],
        diocese_id: [],
      }),
      entity_priest_appointments_attributes: this.fb.array([]),
      masses_schedules_attributes: this.fb.array([]),
      tax_designation: [],
      taxpayer: [],
      patron_description: [],
      address: [],
      door_number: [],
      postal_code: [],
      place: [],
      country_id: [],
      country_description: [],
      county: [],
      parish: [],
      district: [],
      latitude: [],
      longitude: [],
      mobilephone: [],
      phone: [],
      fax: [],
      email: [null, Validators.pattern(this.sharedModule.PATTERN_EMAIL)],
      url: [],
      subscription_modules_permission_attributes: this.fb.group({
        // Set only the permissions available for the type of sub
        accounting_balance_sheet: [],
        accounting_chart_account: [],
        accounting_cost_center: [],
        accounting_exercise: [],
        accounting_journal: [],
        accounting_taxonomy_code: [],
        accounting_taxonomy_reference: [],
        accounting_transaction: [],
        accounting_transaction_document_type: [],
        accounting_transaction_line: [],
        accounting_transaction_type: [],
        accruals_accrual: [],
        accruals_processment: [],
        accruals_type: [],
        acolyte: [],
        acolytes_formation: [],
        acolytes_renewal: [],
        admin_statistic: [],
        archpriestship: [],
        baptism: [],
        bishopric: [],
        calendar: [],
        catechism: [],
        catechisms_individual_document: [],
        catechisms_session: [],
        catechumen: [],
        catholic_directory_institution: [],
        catholic_directory_priest: [],
        chapelry: [],
        chrism: [],
        chrisms_entity: [],
        content: [],
        country: [],
        current_account: [],
        current_accounts_line: [],
        current_accounts_receipt: [],
        dashboard: [],
        death: [],
        document: [],
        documents_type: [],
        emenu: [],
        emolument: [],
        emoluments_type: [],
        event: [],
        family: [],
        formation: [],
        formations_type: [],
        gestdocument: [],
        group: [],
        institution_type: [],
        mass_intention: [],
        mass_intentions_type: [],
        mec: [],
        mecs_formation: [],
        mecs_renewal: [],
        module_documentation_link: [],
        newsletter: [],
        newsletter_group_subscription: [],
        newsletter_subscription: [],
        newsletters_layout: [],
        numeration: [],
        numeration_view: [],
        parishioner: [],
        parishioner_process: [],
        pastoral_agent: [],
        pastoral_agents_type: [],
        patron: [],
        profile_priest: [],
        reader: [],
        readers_formation: [],
        readers_renewal: [],
        records_importer: [],
        relationship_degree: [],
        report: [],
        reportmanagment: [],
        reports_group: [],
        reports_grouper: [],
        reports_view: [],
        section: [],
        subscription: [],
        subscription_setting: [],
        subscription_statistic: [],
        subscription_user: [],
        text_message: [],
        treasury_location: [],
        user: [],
        websiteconfiguration: [],
        wedding: [],
        worshipplace: [],
      }),

      patron_id: [],
      validate_taxpayer_and_name: [],
      entity_type_id: [],
      photo_url: [],
      photo_filename: [],
      attachment: [],
      attachment_filename: [],
      notes: [],
    });

    this.massSchedulesFormArray = this.form.controls
      .masses_schedules_attributes as FormArray;
    this.nominationsFormArray = this.form.controls
      .entity_priest_appointments_attributes as FormArray;
  }

  ngOnInit() {
    super.ngOnInit();
    this.fillPermissionsDataSource([]);

    this.subs.push(
      this.archpristshipStore
        .select(ArchpristshipsSelectors.getArchpristshipsSelected)
        .subscribe((v) => {
          if (v) {
            this.form
              .get('entity_relation_attributes.arciprestado_description')
              .setValue(v.model.complete_relation);
            this.form
              .get('entity_relation_attributes.arciprestado_id')
              .setValue(v.model.id);
            this.form.get('country_id').setValue(v.model.country_id);
            this.form
              .get('country_description')
              .setValue(v.model.country_description);
          }
        })
    );

    this.subs.push(
      this.patronStore
        .select(PatronsSelectors.getPatronsSelected)
        .subscribe((v) => {
          if (v) {
            this.form.get('patron_description').setValue(v.model.name);
            this.form.get('patron_id').setValue(v.model.id);
          }
        })
    );

    // Mass Schedule
    this.subs.push(
      this.worshipplaceStore
        .select(WorshipplacesSelectors.getWorshipplacesSelected)
        .subscribe((v) => {
          if (v && v.inputName) {
            const index = this.getInputNameIndex(v.inputName);
            this.massSchedulesFormArray.controls[index]
              .get('worshipplace_description')
              .setValue(v.model.name);
            this.massSchedulesFormArray.controls[index]
              .get('worshipplace_id')
              .setValue(v.model.id);
          }
        })
    );

    this.subs.push(
      this.form
        .get('subscription_modules_permission_attributes')
        .valueChanges.subscribe((v: any) => this.fillPermissionsDataSource(v))
    );

    this.subs.push(
      this.baseStore.select(BaseSelectors.getUserInfo).subscribe((r: any) => {
        if (r) {
          this.isSuperUser = this.sharedModule.checkIfEntityType(
            SharedModule.USER_SUPERUSERS,
            r.payload.user.entity
          );
          this.forSuperUserOnly();
        }
      })
    );

    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.save_new'),
        value: 'save_new',
        icon: 'add_circle',
      },
    ];

    super.addToHeaderOptionsMenu();

    this.archpristshipModalMenu = this.defaultModalMenu('archpristship');
    this.patronModalMenu = this.defaultModalMenu('patron');
    this.worshipplaceModalMenu = this.defaultModalMenu('worshipplace');
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.setExtraMenus(
      obj.entity_priest_appointments_attributes,
      obj.masses_schedules_attributes
    );
    this.setCanEdit(obj);
  }

  setExtraMenus(entityPriestAppointmentsAttributes, massesSchedulesAttributes) {
    this.nominationsFormArray.clear();
    this.nominationsDS.data = this.nominationsFormArray.value;
    if (entityPriestAppointmentsAttributes?.length) {
      entityPriestAppointmentsAttributes.forEach((fe) => {
        this.addTableLine(fe, this.nominationsFormArray, this.nominationsDS);
      });
    }

    this.massSchedulesFormArray.clear();
    this.massSchedulesDS.data = this.massSchedulesFormArray.value;
    if (massesSchedulesAttributes?.length) {
      massesSchedulesAttributes.forEach((mass) => {
        this.addTableLine(
          {
            ...mass,
            months: [mass.months],
            weekdays: [mass.weekdays],
          },
          this.massSchedulesFormArray,
          this.massSchedulesDS
        );
      });
    }
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.chapelry'
        ),
        templateContent: this.chapelryTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.masses_schedules'
        ),
        templateContent: this.massesSchedulesTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.nominations'
        ),
        templateContent: this.nominationsTemplate,
      },
    ];

    this.forSuperUserOnly();

    this.permissionsAttributesColumns = [
      {
        id: 'id',
        title: '#',
        sortable: false,
        template: this.permissionsModulesTemplateCheckbox,
        headerTemplate: this.permissionsAttributesCheckboxTemplate,
      },
      {
        id: 'module',
        title: this.i18nextPipe.transform('chapelries:header.module'),
        headerTemplate: this.permissionsModulesModule,
        sortable: false,
      },
      {
        id: 'app',
        title: this.i18nextPipe.transform(this.modulePath + ':header.app'),
        headerTemplate: this.permissionsModulesApp,
        sortable: false,
      },
    ];

    this.massSchedulesColumns = [
      {
        id: '#',
        template: this.deleteMassLineTableTemplate,
        sortable: false,
      },
      {
        id: 'worshipplace_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.masses_schedules_attributes.worshipplace_description'
        ),
        template: this.worshipplaceDescriptionTableTemplate,
        sortable: false,
      },
      {
        id: 'frequency',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.frequency'
        ),
        template: this.frequencyTableTemplate,
        sortable: false,
      },
      {
        id: 'start_hour',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.start_hour'
        ),
        template: this.startHourTableTemplate,
        sortable: false,
      },
      {
        id: 'end_hour',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.end_hour'
        ),
        template: this.endHourTableTemplate,
        sortable: false,
      },
      {
        id: 'months',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.months'
        ),
        template: this.monthsTableTemplate,
        sortable: false,
      },
      {
        id: 'weekdays',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.weekdays'
        ),
        template: this.weekdaysTableTemplate,
        sortable: false,
      },
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.start_date'
        ),
        template: this.startDateTableTemplate,
        sortable: false,
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.end_date'
        ),
        template: this.endDateTableTemplate,
        sortable: false,
      },
      {
        id: 'for_confessions',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.masses_schedules_attributes.for_confessions'
        ),
        template: this.confessionsTableTemplate,
        sortable: false,
      },
    ];

    this.nominationsColumns = [
      {
        id: 'entity_name',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.entity_name'
        ),
        sortable: false,
      },
      {
        id: 'curia_function_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.curia_function_description'
        ),
        sortable: false,
      },
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.start_date'
        ),
        template: this.startDateInputTemplate,
        sortable: false,
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.end_date'
        ),
        template: this.endDateInputTemplate,
        sortable: false,
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entity_priest_appointments_attributes.description'
        ),
        sortable: false,
      },
    ];

    this.clearModalInputs();
    this.subs.push(this.successChangeImage());
  }

  menuClick(event: string, inputName?: string) {
    console.log('click', event, inputName);
    switch (event) {
      case 'clear_modal_patron':
        this.form.get('patron_description').setValue(null);
        this.form.get('patron_id').setValue(null);
        break;
      case 'view_selected_patron':
        if (this.form.value.patron_id) {
          this.openDetails('patrons', this.form.value.patron_id);
        }
        break;
      case 'quick_insertion_patron':
        this.openQuickInsertionModal('quick-insert-patrons-modal', inputName);
        break;
      case 'clear_modal_worshipplace':
        if (inputName) {
          const index = this.getInputNameIndex(inputName);
          this.massSchedulesFormArray.value[index].worshipplace_description =
            null;
          this.massSchedulesFormArray.value[index].worshipplace_id = null;
        }
        break;
      case 'view_selected_worshipplace':
        if (inputName) {
          const index = this.getInputNameIndex(inputName);
          if (
            index != null &&
            this.massSchedulesFormArray.value[index].worshipplace_id
          ) {
            this.openDetails(
              'worshipplaces',
              this.massSchedulesFormArray.value[index].worshipplace_id
            );
          }
        }
        break;
      case 'quick_insertion_worshipplace':
        this.openQuickInsertionModal(
          'quick-insert-worshipplaces-modal',
          inputName
        );
        break;
      case 'clear_modal_archpristship':
        this.form
          .get('entity_relation_attributes.arciprestado_description')
          .setValue(null);
        this.form
          .get('entity_relation_attributes.arciprestado_id')
          .setValue(null);
        this.form.get('country_id').setValue(null);
        this.form.get('country_description').setValue(null);
        break;
      case 'view_selected_archpristship':
        if (this.form.get('entity_relation_attributes.arciprestado_id').value) {
          this.openDetails(
            'archpristships',
            this.form.get('entity_relation_attributes.arciprestado_id').value
          );
        }
        break;
      case 'quick_insertion_archpristship':
        this.openQuickInsertionModal(
          'quick-insert-archpristships-modal',
          inputName
        );
        break;
      case 'populate_defaults':
        this.openPopulateDefaultsModal();
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.getPermissionsDataSourceOnSubmit();
    if (!this.form.get('id').value) {
      this.form.removeControl('entity_priest_appointments_attributes');
    }

    this.isSaving = true;

    if (this.form.valid) {
      if (this.form.get('photo_url').value && this.imageChanged) {
        // this will triger successChangeImage() which will first upload the image, and then
        // will go to onFormValid()
        this.dispatchImage();
      } else {
        this.onFormValid();
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  onFormValid() {
    // Image
    if (
      this.form.get('photo_url').value === null ||
      this.form.get('photo_url').value === undefined
    ) {
      this.form.get('photo_filename').setValue(null);
      this.form.get('attachment_filename').setValue(null);
      this.form.get('attachment').setValue(null);
    }

    // Add Masses and Nominations to Form Value
    this.nominationsFormArray.value.forEach((nomination) => {
      nomination.start_date = nomination.start_date
        ? moment(nomination.start_date).format('YYYY-MM-DD')
        : null;
      nomination.end_date = nomination.end_date
        ? moment(nomination.end_date).format('YYYY-MM-DD')
        : null;
    });
    this.massSchedulesFormArray.value.forEach((massSchedule) => {
      massSchedule.start_date = massSchedule.start_date
        ? moment(massSchedule.start_date).format('YYYY-MM-DD')
        : null;
      massSchedule.end_date = massSchedule.end_date
        ? moment(massSchedule.end_date).format('YYYY-MM-DD')
        : null;
    });
    if (this.validateNominations()) {
      if (this.validateMassSchedules()) {
        if (this.sharedModule.isDuplicateMode(this.route)) {
          // Remove all id's
          this.form.get('entity_relation_attributes.id').setValue(null);
          this.form.value.masses_schedules_attributes.forEach((mf: any) => {
            mf.entity_ekklesia_location_id = null;
          });
        }
        if (this.form.valid) {
          if (this.form.value.id) {
            this.store.dispatch(new this.actionRequestPut(this.form.value));
          } else {
            this.store.dispatch(new this.actionRequestPost(this.form.value));
          }
        }
      } else {
        this.savingError(
          this.i18nextPipe.transform(
            `${this.modulePath}:message.error_blank_mass_schedules`
          )
        );
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_blank_nominations`
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

  private validateNominations(): boolean {
    let isValid = true;
    if (this.form.get('id').value) {
      this.form.setControl(
        'entity_priest_appointments_attributes',
        this.fb.array(this.nominationsFormArray.value)
      );
      this.form.value.entity_priest_appointments_attributes.forEach(
        (ml: any) => {
          if (isValid && (!ml.start_date || ml.start_date == null)) {
            isValid = false;
          }
        }
      );
    }
    return isValid;
  }

  private validateMassSchedules(): boolean {
    let isValid = true;
    this.form.setControl(
      'masses_schedules_attributes',
      this.fb.array(this.massSchedulesFormArray.value)
    );
    this.form.value.masses_schedules_attributes.forEach((mf: any) => {
      if (
        isValid &&
        (!mf.worshipplace_id ||
          !mf.worshipplace_description ||
          !mf.start_hour ||
          !mf.months ||
          !mf.weekdays ||
          !mf.frequency ||
          !mf.worshipplace_id == null ||
          !mf.worshipplace_description == null ||
          !mf.start_hour == null ||
          mf.months.length == 0 ||
          !mf.months == null ||
          mf.weekdays.length == 0 ||
          !mf.weekdays == null ||
          !mf.frequency == null ||
          !mf.for_confessions == null)
      ) {
        isValid = false;
      }
    });
    return isValid;
  }

  clearModalInputs() {
    this.form.get(['entity_relation_attributes', 'id']).setValue(null);
    this.form
      .get(['entity_relation_attributes', 'arciprestado_description'])
      .setValue(null);
    this.form
      .get(['entity_relation_attributes', 'arciprestado_id'])
      .setValue(null);
    this.form.get('patron_description').setValue(null);
    this.form.get('country_id').setValue(null);
    this.form.get('country_description').setValue(null);
  }

  openPopulateDefaultsModal() {
    this.populateDefaultsModal.open();
  }

  populateDefaults() {
    if (this.id) {
      this.subs.push(
        this.chapelriesService
          .populateDefaults(this.id, this.form.value)
          .subscribe((result: any) => {
            this.snackBarService.openSnackBar(
              result.message,
              this.sharedModule.SUCCESS_COLOR,
              5000
            );
            this.store.dispatch(new this.actionRequestGetOne(this.id));
            this.populateDefaultsModal.close();
          })
      );
    }
  }

  // Image
  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImagePath.attachment_filename = event.target.files[0].name;
        this.currentImagePath.thumbnail = eventReader.target.result;

        this.imageChanged = event;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  dispatchImage() {
    const fd = new FormData();
    fd.append(
      'file',
      this.imageChanged.target.files[0],
      this.imageChanged.target.files[0].name
    );
    this.store.dispatch(new actions.RequestPostChapelryImage(fd));
  }

  successChangeImage(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.ChapelriesActionTypes.SuccessPostChapelryImage))
      .subscribe((r: any) => {
        if (r.payload.name === this.currentImagePath?.attachment_filename) {
          this.currentImagePath.cover = r.payload.filePath;
          this.form.get('attachment_filename').setValue(r.payload.name);
          this.form.get('attachment').setValue(r.payload.file);

          this.onFormValid();
        }
      });
  }

  setCanEdit(obj: any) {
    this.subs.push(
      this.baseStore
        .select(BaseSelectors.getUserInfo)
        .subscribe(async (r: any) => {
          if (r) {
            const isSuperUser = this.sharedModule.checkIfEntityType(
              SharedModule.USER_SUPERUSERS,
              r.payload.user.entity
            );
            this.canEdit.isSuperUser = isSuperUser;
            const isSubscriptionAdmin =
              await this.subscriptionService.isSubscriptionAdmin();
            this.canEdit.isSubscriptionAdmin = isSubscriptionAdmin;
            if (!this.canEditChapelry(obj.entity_relation_attributes)) {
              this.modal.close();
            }
          }
        })
    );
  }

  canEditChapelry(chapelryData: any): boolean {
    if (this.canEdit.isSuperUser) {
      return true;
    }
    return (
      // this.canEdit.isSubscriptionAdmin &&
      chapelryData &&
      [
        chapelryData.entity_id,
        chapelryData.diocese_id,
        chapelryData.archpriestship_id,
      ].includes(this.currentSubscription)
    );
  }
}
