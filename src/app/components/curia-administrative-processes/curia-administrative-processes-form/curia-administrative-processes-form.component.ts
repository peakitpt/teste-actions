import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormArray, FormBuilder } from '@angular/forms';
import { State } from '../reducers/curia-administrative-processes.reducer';
import { Observable, Subscription, timer } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/curia-administrative-processes.actions';
import { SnackBarService, Tab, TableDataSource } from '@peakitpt/ui-material';
import { getCuriaAdministrativeProcess } from '../reducers/curia-administrative-processes.selectors';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import {
  CuriaAdministrativeProcessAttachment,
  CuriaAdministrativeProcess,
} from '../curia-administrative-process.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { State as PriestsV1State } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { getPriestsV1Selected } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as CuriaAdministrativeProcessTypesState } from 'src/app/shared/components/modals/curia-administrative-process-types-modal/reducers/curia-administrative-process-types-modal.reducer';
import { getCuriaAdministrativeProcessTypesSelected } from 'src/app/shared/components/modals/curia-administrative-process-types-modal/reducers/curia-administrative-process-types-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { FileManagerService } from '@peakitpt/ui-kyrios-api';
import {
  ClearGetByEntityId,
  RequestGetByEntityId,
} from '../../persons/reducers/persons.actions';
import { getPersonByEntityId } from '../../persons/reducers/persons.selectors';

@Component({
  selector: 'kyr-curia-administrative-processes-form',
  templateUrl: './curia-administrative-processes-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaAdministrativeProcessesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaAdministrativeProcess>;
  modulePath = 'curia-administrative-processes';
  preFillWithNew = true;

  selectorGetModel = getCuriaAdministrativeProcess;
  actionRequestFail =
    actions.CuriaAdministrativeProcessesActionTypes
      .RequestFailCuriaAdministrativeProcesses;
  actionRequestGetAll = actions.RequestGetAllCuriaAdministrativeProcesses;
  actionRequestGetOne = actions.RequestGetCuriaAdministrativeProcess;
  actionRequestPut = actions.RequestPutCuriaAdministrativeProcess;
  actionSuccessPut =
    actions.CuriaAdministrativeProcessesActionTypes
      .SuccessPutCuriaAdministrativeProcess;
  actionRequestPost = actions.RequestPostCuriaAdministrativeProcess;
  actionSuccessPost =
    actions.CuriaAdministrativeProcessesActionTypes
      .SuccessPostCuriaAdministrativeProcess;
  actionRequestGetNew = actions.RequestGetNew;
  actionClearGet = actions.ClearGet;

  /* This specific's component fields */
  emolumentsMenuOptions: ModalMenuOption[] = [];
  parishionersMenuOptions: ModalMenuOption[] = [];
  priestsMenuOptions: ModalMenuOption[] = [];
  chapelriesMenuOptions: ModalMenuOption[] = [];
  curiaAdministrativeProcessTypesMenuOptions: ModalMenuOption[] = [];

  saveAndGenerateDoc = false;

  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]);
  attachmentsDS: TableDataSource<any> = new TableDataSource([]);

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('documentsTabTemplate') documentsTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  // ATTACHMENTS TABLE
  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate')
  attachmentTemplate: TemplateRef<any>;
  @ViewChild('partyProvisionsTabTemplate')
  partyProvisionsTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

  generalQueryStringParams = {
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: 'true',
  };
  placeDescriptionQSP = {
    entity_type: 'Locals',
    translatable: true,
    serialize: 'parishioners_complete_relation',
  };
  priestsQSP = {
    can_sign: true,
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
    public fileManagerService: FileManagerService,
    private emolumentsStore: Store<EmolumentsState>,
    private priestsStore: Store<PriestsV1State>,
    private parishionersStore: Store<ParishionersState>,
    private chapelriesStore: Store<ChapelriesState>,
    private curiaAdministrativeProcessTypesStore: Store<CuriaAdministrativeProcessTypesState>,
    private personsStore: Store<PersonsState>
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

  ngOnInit() {
    super.ngOnInit();
    this.setEmolumentsModal();
    this.setParishionersModal();
    this.setPriestsModal();
    this.setChapelriesModal();
    this.setCuriaAdministrativeProcessTypesModal();
    this.setPersonsModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      archive: [],
      created_at: [],
      created_by_user_id: [],
      curia_administrative_process_attachments: this.fb.array([]),
      curia_administrative_process_type: this.fb.group({
        subtype_id: [],
      }),
      curia_administrative_process_type_description: [],
      curia_administrative_process_type_id: [],
      deleted: [],
      deleted_by_user_id: [],
      delivery_term: [],
      dispatch: [],
      document_date: [],
      document_entity_description: [],
      document_entity_id: [],
      emolument_description: [],
      emolument_id: [],
      entity_description: [],
      entity_ekklesia_location_id: [],
      entity_id: [],
      free_description: [],
      free_text: [],
      free_text_title: [],
      id: [],
      is_free_text: [],
      party_provision_bands_of: [],
      party_provision_chapelry_description: [],
      party_provision_chapelry_id: [],
      party_provision_dates: [],
      party_provision_party_name: [],
      party_provision_place: [],
      party_provision_preacher_description: [],
      party_provision_preacher_entity_priest_id: [],
      party_provision_preacher_id: [],
      party_provision_schedule: [],
      party_provision_subscriber_description: [],
      party_provision_subscriber_entity_priest_id: [],
      party_provision_subscriber_id: [],
      place_description: [],
      place_id: [],
      receipt_id: [],
      serie_number: [],
      subscriber_description: [],
      subscriber_entity_priest_id: [],
      subscriber_id: [],
      tax: [],
      title: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.setInnerTable(
      obj.curia_administrative_process_attachments,
      this.attachmentsFormArray,
      this.attachmentsDS
    );

    this.setFormTabs();
    this.addOrRemoveTabs(
      obj && obj?.curia_administrative_process_type?.subtype_id === 1,
      'party_provisions',
      this.partyProvisionsTabTemplate
    );
  }

  private setFormTabs() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.administrative_processes`
        ),
        templateContent: this.mainTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.documents`
        ),
        templateContent: this.documentsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.party_provisions`
        ),
        templateContent: this.partyProvisionsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments_tab`
        ),
        templateContent: this.attachmentsTabTemplate,
      },
    ];
  }

  onAfterViewInit() {
    this.setFormTabs();
    this.addOrRemoveTabs(
      this.model &&
        this.model?.curia_administrative_process_type?.subtype_id === 1,
      'party_provisions',
      this.partyProvisionsTabTemplate
    );

    this.clearModalInputs();
    this.buildSubTablesColumns();
  }

  onSaveSuccess(result: any) {
    this.isLoading = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.save_success`),
      this.sharedModule.SUCCESS_COLOR
    );

    if (this.isQuickInsertion) {
      // Code used for Quick Insertions
      this.store.dispatch(
        new this.actionRequestSetSelected({
          inputName: this.route.snapshot.queryParamMap.get('inputNameQI'),
          model: result.payload,
        } as SelectedModalRow)
      );
      this.modal.close();
    } else {
      // Not quick inserting
      if (this.saveAndNew) {
        this.saveAndNew = false;
        this.isLoading = false;
        this.modal.close();
        this.router.navigate([this.modulePath]).then(() => {
          timer(500).subscribe(() => {
            this.router.navigate([this.modulePath, 'new']);
          });
        });
      } else if (this.blockChainClosing) {
        this.isLoading = false;
        this.blockChainClosing = false;
      } else if (this.saveAndGenerateDoc) {
        this.saveAndGenerateDoc = false;
        this.modal.close();
        this.navigate(`/${this.modulePath}/${this.id}/emit_document`);
      } else if (result.payload.id) {
        this.modal.close();
        this.router.navigate([this.modulePath, result.payload.id, 'details']);
      } else {
        this.modal.close();
      }
    }
  }

  clearModalInputs() {
    [
      'curia_administrative_process_type_id',
      'curia_administrative_process_type_description',
      'emolument_id',
      'emolument_description',
      'document_entity_id',
      'document_entity_description',
      'subscriber_entity_priest_id',
      'subscriber_description',
    ].forEach((field: string) => this.affectField(field, null));
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_curia-administrative-process-types_modal':
        this.affectField(`${inputName}_id`, null);
        this.affectField(`${inputName}_description`, null);
        this.form
          .get(['curia_administrative_process_type', 'subtype_id'])
          .setValue(null);
        this.addOrRemoveTabs(
          this.form.value.curia_administrative_process_type.subtype_id === 1,
          'party_provisions',
          this.partyProvisionsTabTemplate
        );
        break;
      case 'clear_emolument_modal':
        this.affectField(`tax`, null);
        this.affectField(`${inputName}_id`, null);
        this.affectField(`${inputName}_description`, null);
        break;
      case 'clear_chapelries_modal':
      case 'clear_parishioner_modal':
      case 'clear_priest_modal':
        this.affectField(`${inputName}_id`, null);
        this.affectField(`${inputName}_description`, null);
        break;
      case 'view_selected_curia-administrative-process-types':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('curia-administrative-process-types', id);
          }
        }
        break;
      case 'view_selected_emolument':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            if (event.includes('emolument')) {
              this.openDetails('emoluments', id);
            }
          }
        }
        break;
      case 'view_selected_chapelries':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('chapelries', id);
          }
        }
        break;
      case 'view_selected_person':
      case 'view_selected_parishioner':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.personsStore.dispatch(new RequestGetByEntityId(id));
            let getEntity$: Subscription = this.personsStore
              .select(getPersonByEntityId)
              .subscribe((person: any) => {
                if (person) {
                  getEntity$.unsubscribe();
                  this.personsStore.dispatch(new ClearGetByEntityId());
                  this.openDetails('persons', person.id);
                }
              });
          }
        }
        break;
      case 'quick_insertion_parishioner':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'quick_insertion_curia-administrative-process-types':
        this.openQuickInsertionModal(
          'quick-insert-curia-administrative-process-types-modal',
          inputName
        );
        break;
      case 'quick_insertion_emolument':
        this.openQuickInsertionModal(
          'quick-insert-emoluments-modal',
          inputName
        );
        break;
      case 'quick_insertion_chapelries':
        this.openQuickInsertionModal(
          'quick-insert-chapelries-modal',
          inputName
        );
        break;
      case 'save_generate_document':
        this.saveAndGenerateDoc = true;
        this.onSubmit();
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onFormValid() {
    if (this.validateAttachments()) {
      super.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_invalid_attachments`
        )
      );
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.uploadAttachments(this.attachmentsFormArray, this.attachmentsDS);
  }

  private setEmolumentsModal() {
    this.emolumentsMenuOptions = this.defaultModalMenu('emolument');

    this.subs.push(
      this.emolumentsStore
        .select(getEmolumentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              case 'emolument':
                this.affectField(`tax`, row.model.value);
              default:
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  row.model.description_short
                );
                break;
            }
          }
        })
    );
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioner');

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

  private setPriestsModal() {
    this.priestsMenuOptions = [this.defaultModalMenu('priest')[0]];

    this.subs.push(
      this.priestsStore
        .select(getPriestsV1Selected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              default:
                this.affectField(`${row.inputName}_id`, row.model.entity.id);
                this.affectField(
                  `${row.inputName}_description`,
                  `${row.model.entity.name}`
                );
                break;
            }
          }
        })
    );
  }

  private setChapelriesModal() {
    this.chapelriesMenuOptions = this.defaultModalMenu('chapelries');

    this.subs.push(
      this.chapelriesStore
        .select(getChapelriesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }

  private setCuriaAdministrativeProcessTypesModal() {
    this.curiaAdministrativeProcessTypesMenuOptions = this.defaultModalMenu(
      'curia-administrative-process-types'
    );

    this.subs.push(
      this.curiaAdministrativeProcessTypesStore
        .select(getCuriaAdministrativeProcessTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
            this.form
              .get(['curia_administrative_process_type', 'subtype_id'])
              .setValue(row.model.subtype_id);
            this.addOrRemoveTabs(
              this.form.value.curia_administrative_process_type.subtype_id ===
                1,
              'party_provisions',
              this.partyProvisionsTabTemplate
            );
          }
        })
    );
  }

  private setPersonsModal() {
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

  private buildSubTablesColumns() {
    setTimeout(() => {
      this.attachmentsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteAttachmentTemplate,
          width: '30px',
        },
        {
          id: 'attachment_name',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.attachment`
          ),
          sortable: false,
          template: this.attachmentTemplate,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          sortable: false,
          template: this.attachmentDescriptionTemplate,
        },
      ];
    });
  }

  private validateAttachments(): boolean {
    let attachmentsValid = true;

    this.form.setControl(
      'curia_administrative_process_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.curia_administrative_process_attachments
      .filter(
        (obj: CuriaAdministrativeProcessAttachment) =>
          !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: CuriaAdministrativeProcessAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }

  private addOrRemoveTabs(
    conditionToAdd: boolean,
    tabName: string,
    tabTemplate: TemplateRef<any>
  ) {
    const tab: Tab = {
      textLabel: this.i18nextPipe.transform(
        `${this.modulePath}:tabs.${tabName}`
      ),
      templateContent: tabTemplate,
    };

    if (conditionToAdd) {
      const tabExist = this.formTabs.find(
        (t: Tab) => t.textLabel === tab.textLabel
      );
      if (!tabExist) {
        this.formTabs.splice(this.formTabs.length - 1, 0, tab);
      }
    } else {
      const index: number = this.formTabs.findIndex(
        (t: Tab) => t.textLabel === tab.textLabel
      );
      if (index >= 0) {
        this.formTabs.splice(index, 1);
      }
    }
  }
}
