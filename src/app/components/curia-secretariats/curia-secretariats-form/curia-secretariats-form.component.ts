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

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/curia-secretariats.reducer';
import { Observable, timer } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/curia-secretariats.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getCuriaSecretariat } from '../reducers/curia-secretariats.selectors';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import {
  CuriaSecretariatAttachment,
  CuriaSecretariat,
  CuriaSecretariatEntity,
} from '../curia-secretariat.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { State as PriestsV1State } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { getPriestsV1Selected } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as CuriaFunctionsState } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import { State as CuriaSecretariatTypesState } from 'src/app/shared/components/modals/curia-secretariat-types-modal/reducers/curia-secretariat-types-modal.reducer';
import { getCuriaSecretariatTypesSelected } from 'src/app/shared/components/modals/curia-secretariat-types-modal/reducers/curia-secretariat-types-modal.selectors';
import { State as WorshipplacesState } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { getWorshipplacesSelected } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { FileManagerService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-curia-secretariats-form',
  templateUrl: './curia-secretariats-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaSecretariatsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaSecretariat>;
  modulePath = 'curia-secretariats';
  preFillWithNew = true;

  selectorGetModel = getCuriaSecretariat;
  actionRequestFail =
    actions.CuriaSecretariatsActionTypes.RequestFailCuriaSecretariats;
  actionRequestGetAll = actions.RequestGetAllCuriaSecretariats;
  actionRequestGetOne = actions.RequestGetCuriaSecretariat;
  actionRequestPut = actions.RequestPutCuriaSecretariat;
  actionSuccessPut =
    actions.CuriaSecretariatsActionTypes.SuccessPutCuriaSecretariat;
  actionRequestPost = actions.RequestPostCuriaSecretariat;
  actionSuccessPost =
    actions.CuriaSecretariatsActionTypes.SuccessPostCuriaSecretariat;
  actionRequestGetNew = actions.RequestGetNew;

  /* This specific's component fields */
  emolumentsMenuOptions: ModalMenuOption[] = [];
  parishionersMenuOptions: ModalMenuOption[] = [];
  worshipplacesMenuOptions: ModalMenuOption[] = [];
  priestsMenuOptions: ModalMenuOption[] = [];
  curiaFunctionsMenuOptions: ModalMenuOption[] = [];
  curiaSecretariatTypesMenuOptions: ModalMenuOption[] = [];

  saveAndGenerateDoc = false;

  entitiesColumns: any[] = [];
  entitiesFormArray: FormArray = new FormArray([]);
  entitiesDS: TableDataSource<any> = new TableDataSource([]);
  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]);
  attachmentsDS: TableDataSource<any> = new TableDataSource([]);

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('documentsTabTemplate') documentsTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  // ENTITIES TABLE
  @ViewChild('deleteEntitiesTemplate')
  deleteEntitiesTemplate: TemplateRef<any>;
  @ViewChild('entityEntityDescriptionTemplate')
  entityEntityDescriptionTemplate: TemplateRef<any>;
  @ViewChild('entityCuriaFunctionTemplate')
  entityCuriaFunctionTemplate: TemplateRef<any>;
  @ViewChild('entityPlaceDescriptionTemplate')
  entityPlaceDescriptionTemplate: TemplateRef<any>;
  @ViewChild('entityDescriptionTemplate')
  entityDescriptionTemplate: TemplateRef<any>;
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
    private worshipplacesStore: Store<WorshipplacesState>,
    private parishionersStore: Store<ParishionersState>,
    private curiaSecretariatTypesStore: Store<CuriaSecretariatTypesState>,
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
    this.setWorshipplacesModal();
    this.setPriestsModal();
    this.setCuriaFunctionsModal();
    this.setCuriaSecretariatTypesModal();
    this.setPersonsModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      archive: [],
      created_at: [],
      created_by_user_id: [],
      curia_secretariat_attachments: this.fb.array([]),
      curia_secretariat_entities: this.fb.array([]),
      curia_secretariat_type_description: [],
      curia_secretariat_type_id: [],
      deleted: [],
      deleted_by_user_id: [],
      delivery_term: [],
      dispatch: [],
      document_date: [],
      document_entity_description: [],
      document_entity_id: [],
      emolument_description: [],
      emolument_id: [],
      entity_ekklesia_location_id: [],
      free_description: [],
      free_text: [],
      id: [],
      is_free_text: [],
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
      obj.curia_secretariat_entities,
      this.entitiesFormArray,
      this.entitiesDS
    );
    this.setInnerTable(
      obj.curia_secretariat_attachments,
      this.attachmentsFormArray,
      this.attachmentsDS
    );
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.secretariats`
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
      'curia_secretariat_type_id',
      'curia_secretariat_type_description',
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
      case 'clear_emolument_modal':
        this.affectField(`tax`, null);
      case 'clear_parishioner_modal':
      case 'clear_worshipplace_modal':
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
        if (inputName) {
          this.affectField(`${inputName}_id`, null);
          this.affectField(`${inputName}_description`, null);
        }
        break;
      case 'view_selected_emolument':
      case 'view_selected_worshipplace':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            if (event.includes('emolument')) {
              this.openDetails('emoluments', id);
            } else if (event.includes('worshipplace')) {
              this.openDetails('worshipplaces', id);
            }
          }
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
    if (this.validateAttachments() && this.validateEntities()) {
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
            if (row.inputName.includes('curia_secretariat_entities')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.entitiesFormArray,
                this.entitiesDS,
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
              this.affectField(
                `${row.inputName}_description`,
                row.model.complete_relation
              );
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

  private setCuriaFunctionsModal() {
    this.curiaFunctionsMenuOptions = [
      this.defaultModalMenu('curia-functions')[0],
    ];

    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('curia_secretariat_entities')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.entitiesFormArray,
                this.entitiesDS,
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

  private setCuriaSecretariatTypesModal() {
    this.curiaSecretariatTypesMenuOptions = [
      this.defaultModalMenu('curia-secretariat-types')[0],
    ];

    this.subs.push(
      this.curiaSecretariatTypesStore
        .select(getCuriaSecretariatTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }

  private buildSubTablesColumns() {
    setTimeout(() => {
      this.entitiesColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteEntitiesTemplate,
          width: '30px',
        },
        {
          id: 'entity_entity_description',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_entity_description`
            ) + ' *',
          sortable: false,
          template: this.entityEntityDescriptionTemplate,
        },
        {
          id: 'entity_curia_function',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_curia_function`
          ),
          sortable: false,
          template: this.entityCuriaFunctionTemplate,
        },
        {
          id: 'entity_place_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_place_description`
          ),
          sortable: false,
          template: this.entityPlaceDescriptionTemplate,
        },
        {
          id: 'entity_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
          ),
          sortable: false,
          template: this.entityDescriptionTemplate,
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
      'curia_secretariat_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.curia_secretariat_attachments
      .filter(
        (obj: CuriaSecretariatAttachment) => !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: CuriaSecretariatAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }

  private validateEntities(): boolean {
    let entitiesValid = true;

    this.form.setControl(
      'curia_secretariat_entities',
      this.fb.array(this.entitiesFormArray.value)
    );

    this.form.value.curia_secretariat_entities
      .filter((obj: CuriaSecretariatEntity) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: CuriaSecretariatEntity, i: number) => {
        if (!obj.entity_description) {
          entitiesValid = false;
        }
      });

    this.form.setControl(
      'curia_secretariat_entities',
      this.fb.array(this.entitiesFormArray.value)
    );

    return entitiesValid;
  }
}
