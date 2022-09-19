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
import { State } from '../reducers/curia-provisions.reducer';
import { Observable, timer } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/curia-provisions.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getCuriaProvision } from '../reducers/curia-provisions.selectors';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import {
  CuriaProvisionAttachment,
  CuriaProvision,
  CuriaProvisionMember,
} from '../curia-provision.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { State as PriestsV1State } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { getPriestsV1Selected } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as CuriaFunctionsState } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import { State as ChapelriesState } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import { getChapelriesSelected } from 'src/app/shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { State as CuriaProvisionTypesState } from 'src/app/shared/components/modals/curia-provision-types-modal/reducers/curia-provision-types-modal.reducer';
import { getCuriaProvisionTypesSelected } from 'src/app/shared/components/modals/curia-provision-types-modal/reducers/curia-provision-types-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { FileManagerService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-curia-provisions-form',
  templateUrl: './curia-provisions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaProvisionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaProvision>;
  modulePath = 'curia-provisions';
  preFillWithNew = true;

  selectorGetModel = getCuriaProvision;
  actionRequestFail =
    actions.CuriaProvisionsActionTypes.RequestFailCuriaProvisions;
  actionRequestGetAll = actions.RequestGetAllCuriaProvisions;
  actionRequestGetOne = actions.RequestGetCuriaProvision;
  actionRequestPut = actions.RequestPutCuriaProvision;
  actionSuccessPut =
    actions.CuriaProvisionsActionTypes.SuccessPutCuriaProvision;
  actionRequestPost = actions.RequestPostCuriaProvision;
  actionSuccessPost =
    actions.CuriaProvisionsActionTypes.SuccessPostCuriaProvision;
  actionRequestGetNew = actions.RequestGetNew;

  /* This specific's component fields */
  emolumentsMenuOptions: ModalMenuOption[] = [];
  parishionersMenuOptions: ModalMenuOption[] = [];
  chapelriesMenuOptions: ModalMenuOption[] = [];
  priestsMenuOptions: ModalMenuOption[] = [];
  curiaFunctionsMenuOptions: ModalMenuOption[] = [];
  curiaProvisionTypesMenuOptions: ModalMenuOption[] = [];

  saveAndGenerateDoc = false;

  membersColumns: any[] = [];
  membersFormArray: FormArray = new FormArray([]);
  membersDS: TableDataSource<any> = new TableDataSource([]);
  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]);
  attachmentsDS: TableDataSource<any> = new TableDataSource([]);

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('membersTabTemplate') membersTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  // Members TABLE
  @ViewChild('deleteEntitiesTemplate')
  deleteEntitiesTemplate: TemplateRef<any>;
  @ViewChild('entityEntityDescriptionTemplate')
  entityEntityDescriptionTemplate: TemplateRef<any>;
  @ViewChild('entityCuriaFunctionTemplate')
  entityCuriaFunctionTemplate: TemplateRef<any>;

  // ATTACHMENTS TABLE
  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate')
  attachmentTemplate: TemplateRef<any>;
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
    except_users: 'false',
  };
  priestsQSP = {
    can_sign: true,
  };
  priestsAndPersonsQSP = {
    modal: 'true',
    serialize: 'priests_and_persons',
    priests_and_persons: 'true',
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
    private curiaFunctionsStore: Store<CuriaFunctionsState>,
    private chapelriesStore: Store<ChapelriesState>,
    private parishionersStore: Store<ParishionersState>,
    private personsStore: Store<PersonsState>,
    private curiaProvisionTypesStore: Store<CuriaProvisionTypesState>
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
    this.setChapelriesModal();
    this.setPriestsModal();
    this.setCuriaFunctionsModal();
    this.setPersonsModal();
    this.setProvisionTypesModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      active: [],
      applicant_chapelry_description: [],
      applicant_chapelry_id: [],
      applicant_entity_description: [],
      applicant_entity_id: [],
      applicant_function_description: [],
      applicant_function_id: [],
      archpriest_description: [],
      archpriest_entity_priest_id: [],
      archpriest_id: [],
      created_at: [],
      created_by_user_id: [],
      curia_provision_attachments: this.fb.array([]),
      curia_provision_members: this.fb.array([]),
      deleted: [false],
      deleted_by_user_id: [],
      document_date: [],
      document_entity_description: [],
      document_entity_id: [],
      emolument_description: [],
      emolument_id: [],
      entity_ekklesia_location_id: [],
      expiration_date: [],
      id: [],
      observations: [],
      place_description: [],
      place_id: [],
      provision_type_description: [],
      provision_type_id: [],
      receipt_id: [],
      serie_number: [],
      subscriber1_description: [],
      subscriber1_entity_priest_id: [],
      subscriber1_id: [],
      subscriber2_description: [],
      subscriber2_entity_priest_id: [],
      subscriber2_id: [],
      tax: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }

  initKeysToIgnoreOnDuplicate(addKeys: Array<string> = []) {
    this.keysToIgnoreOnDuplicate = [
      'id',
      'serie_number',
      'created_at',
      'updated_at',
      'sync_at',
      'sync_id',
      'deleted_by_user_id',
      'created_by_user_id',
      'updated_by_user_id',
      'import_origin',
      'paroquia_sw_id',
      'touched_in_current_importation',
      'curia_status',
      'curia_status_date',
      'process_id',
      'document_id',
      'curia_provision_attachments',
      'receipt_id',
    ];
    if (addKeys.length) {
      this.keysToIgnoreOnDuplicate =
        this.keysToIgnoreOnDuplicate.concat(addKeys);
    }
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.setInnerTable(
      obj.curia_provision_members,
      this.membersFormArray,
      this.membersDS
    );
    if (!this.duplicateMode) {
      this.setInnerTable(
        obj.curia_provision_attachments,
        this.attachmentsFormArray,
        this.attachmentsDS
      );
    }
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.provision`
        ),
        templateContent: this.mainTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.members`
        ),
        templateContent: this.membersTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments_tab`
        ),
        templateContent: this.attachmentsTabTemplate,
      },
    ];

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
        this.router.navigate([
          this.modulePath,
          result.payload.id,
          'emit_document',
        ]);
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
      'applicant_entity_id',
      'applicant_entity_description',
      'applicant_function_id',
      'applicant_function_description',
      'chapelry_id',
      'chapelry_description',
      'emolument_id',
      'emolument_description',
      'document_entity_id',
      'document_entity_description',
      'archpriest_id',
      'archpriest_description',
      'president_id',
      'president_description',
      'vide_president_id',
      'vide_president_description',
      'subscriber1_id',
      'subscriber1_description',
      'subscriber2_id',
      'subscriber2_description',
    ].forEach((field: string) => this.affectField(field, null));
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_emolument_modal':
        this.affectField(`tax`, null);
      case 'clear_parishioner_modal':
      case 'clear_priest_modal':
        switch (inputName) {
          case 'subscriber1':
          case 'subscriber2':
            this.affectField(`${inputName}_entity_priest_id`, null);
            this.affectField(`${inputName}_id`, null);
            this.affectField(`${inputName}_description`, null);
            break;
          case 'entity':
            this.affectField(`${inputName}_id`, null);
            this.affectField(`${inputName}_description`, null);
            this.affectField(`${inputName}_entity_priest_id`, null);
            this.affectField(`${inputName}_ekklesia_location_id`, null);
            break;
          default:
            break;
        }
      case 'clear_curia-functions_modal':
      case 'clear_chapelries_modal':
      case 'clear_curia-provision-types_modal':
        if (inputName) {
          this.affectField(`${inputName}_id`, null);
          this.affectField(`${inputName}_description`, null);
        }
        break;
      case 'view_selected_emolument':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('emoluments', id);
          }
        }
      case 'view_selected_chapelries':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('chapelries', id);
          }
        }
        break;
      case 'view_selected_curia-provision-types':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('curia-provision-types', id);
          }
        }
        break;
      case 'view_selected_priest':
        const id = this.form.get(`${inputName}_entity_priest_id`).value;
        if (id) {
          this.openDetails('priests', id);
        }
        break;
      case 'quick_insertion_parishioner':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'quick_insertion_emolument':
        this.openQuickInsertionModal(
          'quick-insert-emoluments-modal',
          inputName
        );
        break;
      case 'quick_insertion_worshipplace':
        this.openQuickInsertionModal(
          'quick-insert-worshipplaces-modal',
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
    if (this.validateAttachments() && this.validateMembers()) {
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

    // This always removes the VIEW option
    if (this.parishionersMenuOptions.length > 1) {
      this.parishionersMenuOptions.splice(1, 1);
    }

    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('curia_provision_members')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.membersFormArray,
                this.membersDS,
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
            } else {
              this.affectField(`${row.inputName}_id`, row.model.id);
              this.affectField(`${row.inputName}_description`, row.model.name);
            }
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

  private setChapelriesModal() {
    this.chapelriesMenuOptions = this.defaultModalMenu('chapelries');

    this.subs.push(
      this.chapelriesStore
        .select(getChapelriesSelected)
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
    this.priestsMenuOptions = this.defaultModalMenu('priest');

    this.subs.push(
      this.priestsStore
        .select(getPriestsV1Selected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              default:
                this.affectField(
                  `${row.inputName}_entity_priest_id`,
                  row.model.id
                );
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

  private setCuriaFunctionsModal() {
    this.curiaFunctionsMenuOptions = [
      this.defaultModalMenu('curia-functions')[0],
    ];

    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('curia_provision_members')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.membersFormArray,
                this.membersDS,
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
            } else {
              this.affectField(`${row.inputName}_id`, row.model.id);
              this.affectField(`${row.inputName}_description`, row.model.name);
            }
          }
        })
    );
  }

  private setProvisionTypesModal() {
    this.curiaProvisionTypesMenuOptions = this.defaultModalMenu(
      'curia-provision-types'
    );

    this.subs.push(
      this.curiaProvisionTypesStore
        .select(getCuriaProvisionTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              default:
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  `${row.model.name}`
                );
                break;
            }
          }
        })
    );
  }

  private buildSubTablesColumns() {
    setTimeout(() => {
      this.membersColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteEntitiesTemplate,
          width: '30px',
        },
        {
          id: 'entity_curia_function',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.function_description`
            ) + ' *',
          sortable: false,
          template: this.entityCuriaFunctionTemplate,
        },
        {
          id: 'entity_member_description',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.member_description`
            ) + ' *',
          sortable: false,
          template: this.entityEntityDescriptionTemplate,
        },
      ];
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
      'curia_provision_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.curia_provision_attachments
      .filter(
        (obj: CuriaProvisionAttachment) => !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: CuriaProvisionAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }

  private validateMembers(): boolean {
    let membersValid = true;

    this.form.setControl(
      'curia_provision_members',
      this.fb.array(this.membersFormArray.value)
    );

    this.form.value.curia_provision_members
      .filter((obj: CuriaProvisionMember) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: CuriaProvisionMember, i: number) => {
        if (!obj.member_description) {
          membersValid = false;
        }
      });

    this.form.setControl(
      'curia_provision_members',
      this.fb.array(this.membersFormArray.value)
    );

    return membersValid;
  }
}
