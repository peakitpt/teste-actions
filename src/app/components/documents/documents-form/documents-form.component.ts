import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { State } from '../reducers/documents.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/documents.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getDocument } from '../reducers/documents.selectors';
import {
  BaseFormComponent,
  FileUpload,
} from 'src/app/shared/components/base-form-component';
import {
  Document,
  DocumentsAttachment,
  DocumentsEmolument,
  Numeration,
} from '../document.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import * as EmolumentsState from '../../../shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import {
  DocumentsService,
  EntitiesService,
  FileManagerService,
  PersonsService,
} from '@peakitpt/ui-kyrios-api';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getDocumentsTypesSelected } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.selectors';
import * as DocumentsTypesState from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';

@Component({
  selector: 'kyr-documents-form',
  templateUrl: './documents-form.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Document>;
  preFillWithNew = true;
  modulePath = 'documents';
  canEdit: boolean = false;

  selectorGetModel = getDocument;
  actionRequestFail = actions.DocumentsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.DocumentsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.DocumentsActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;
  actionClearGet = actions.ClearGet;

  @ViewChild('documentTab') documentTab: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  documentTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  // EMOLUMENTS
  emolumentsColumns: any[] = [];
  emolumentsDS: TableDataSource<any> = new TableDataSource([]);
  emolumentsFormArray: FormArray = new FormArray([]);
  newEmolument = {
    block_remove: false,
    created_at: null,
    created_by_user_id: null,
    deleted: false,
    deleted_by_user_id: null,
    document_id: null,
    emolument_description: null,
    emolument_id: null,
    id: null,
    price_value: null,
    updated_at: null,
    updated_by_user_id: null,
    _destroy: false,
  };
  emolumentsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('descriptionTemplate') descriptionTemplate: TemplateRef<any>;
  @ViewChild('priceValueTemplate') priceValueTemplate: TemplateRef<any>;

  // ATTACHMENTS
  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate') attachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  attachmentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  attachmentFormControlPlaceholder = new FormControl();

  series = [];
  currencyOptions: any[] = [];

  parishionerParams = {
    modal: true,
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: true,
    documents: true,
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
    public emolumentsStore: Store<EmolumentsState.State>,
    public documentTypesStore: Store<DocumentsTypesState.State>,
    public documentsService: DocumentsService,
    public parishionersStore: Store<ParishionersState.State>,
    public personsStore: Store<PersonsState>,
    public personsService: PersonsService,
    public entitiesService: EntitiesService,
    public fileManagerService: FileManagerService
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
      accruals_accrual_id: [],
      block_edit: [false, Validators.required],
      block_remove: [false, Validators.required],
      created_at: [],
      created_by_user_id: [],
      currency: ['EUR', Validators.required],
      deleted: [false, Validators.required],
      deleted_by_user_id: [],
      document_date: [null, Validators.required],
      document_line_attributes: this.fb.array([]),
      documents_status_description: [],
      documents_status_id: [],
      documents_type_description: [null, Validators.required],
      documents_type_id: [null, Validators.required],
      documents_type_serie_id: [null, Validators.required],
      entity_description: [null, Validators.required],
      entity_ekklesia_location_id: [],
      entity_id: [null, Validators.required],
      expiration_date: [],
      has_parochial_rights: [],
      id: [],
      is_mass_delivery: [],
      name: [null, Validators.required],
      paid: [false, Validators.required],
      serie_number: [],
      total_amount: ['0.0', Validators.required],
      updated_at: [],
      updated_by_user_id: [],
      documents_attachments_attributes: this.fb.array([]),
    });

    this.emolumentsFormArray = this.form.controls
      .document_line_attributes as FormArray;
    this.attachmentsFormArray = this.form.controls
      .documents_attachments_attributes as FormArray;
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    this.getSeries();
    this.canEdit = this.setCanEdit(obj);
    this.setEmoluments(obj.document_line_attributes);
    this.setInnerTable(
      obj.documents_attachments_attributes,
      this.attachmentsFormArray,
      this.attachmentsDS
    );

    if (obj.id) {
      this.form.controls['documents_type_serie_id'].disable();
    } else {
      this.form.controls['documents_type_serie_id'].enable();
    }
    this.form.controls['currency'].disable();
  }

  ngOnInit() {
    if (this.actionClearGet) {
      this.store.dispatch(new this.actionClearGet());
    }
    super.ngOnInit();
    this.setDocumentTypesModal();
    this.setEmolumentsModal();
    this.setParishionersModal();
    this.sharedModule.getCurrencies().forEach((currency) => {
      this.currencyOptions.push({
        label: currency.code,
        value: currency.code,
      });
    });
  }

  onAfterViewInit() {
    super.onAfterViewInit();
    this.buildEmolumentsTableColumns();

    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.document`
        ),
        templateContent: this.documentTab,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments`
        ),
        templateContent: this.attachmentsTabTemplate,
      },
    ];

    this.buildSubTablesColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_document-types_modal':
        this.form.get('documents_type_id').setValue(null);
        this.form.get('documents_type_description').setValue(null);
        break;
      case 'view_selected_document-types':
        if (this.form.get('documents_type_id').value) {
          this.openDetails(
            'documents-types',
            this.form.get('documents_type_id').value
          );
        }
        break;
      case 'clear_emoluments_modal':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          this.emolumentsFormArray.controls[index]
            .get('emolument_id')
            .setValue(null);
          this.emolumentsFormArray.controls[index]
            .get('emolument_description')
            .setValue(null);
        }
        break;
      case 'view_selected_emoluments':
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (this.emolumentsFormArray.value[index].emolument_id) {
            this.openDetails(
              'emoluments',
              this.emolumentsFormArray.value[index].emolument_id
            );
          }
        }
        break;
      case 'clear_parishioners_modal': {
        this.form.get('entity_id').setValue(null);
        this.form.get('entity_description').setValue(null);
        break;
      }
      case 'quick_insertion_person':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'view_parishioners_modal': {
        if (this.form.value.entity_id) {
          this.openDetails('unknown', this.form.value.entity_id);
        }
        break;
      }
      case 'save_new': {
        this.onSubmit();
        this.router
          .navigate([`/${this.modulePath}`])
          .then(() => this.navigate(`/${this.modulePath}/new`));
        break;
      }
      case 'delete': {
        if (this.id) {
          this.navigate(`/${this.modulePath}/${this.id}/edit/delete`);
        }
        break;
      }
      case 'clear_document-types_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_document-types': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('document-types', id);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.appendEmolumentsToForm();
    this.uploadAttachments(this.attachmentsFormArray, this.attachmentsDS);
  }

  onFormValid(payload = this.form.getRawValue()) {
    if (this.validateAttachments()) {
      if (payload.id) {
        this.store.dispatch(new this.actionRequestPut(payload));
      } else {
        this.store.dispatch(new this.actionRequestPost(payload));
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_invalid_attachments`
        )
      );
    }
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (modulePath === 'unknown') {
      this.subs.push(
        this.entitiesService.getOne(id).subscribe((result) => {
          const module = this.getEntityModule(result.entity_type_id);
          switch (module) {
            case 'persons':
              this.subs.push(
                this.personsService.getByEntityId(id).subscribe((result) => {
                  super.openDetails(module, result.id, railsApp);
                })
              );
              break;
            default:
              super.openDetails(module, result.id, railsApp);
              break;
          }
        })
      );
    } else {
      super.openDetails(modulePath, id, railsApp);
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  public setEmoluments(emoluments: DocumentsEmolument[] = []) {
    this.emolumentsFormArray.clear();
    this.emolumentsDS.data = this.emolumentsFormArray.value;
    if (emoluments?.length) {
      emoluments.forEach((accrualType: DocumentsEmolument) => {
        this.addTableLine(
          accrualType,
          this.emolumentsFormArray,
          this.emolumentsDS
        );
      });
    }
  }

  public setDocumentTypesModal() {
    this.documentTypesMenuOptions = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: `clear_document-types_modal`,
        icon: 'clear',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: `view_selected_document-types`,
        icon: 'preview',
      },
    ];
    // When a row is selected
    this.subs.push(
      this.documentTypesStore
        .select(getDocumentsTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(`${row.model.name} [${row.model.description}]`);
            this.getSeries();
          }
        })
    );
  }

  public setEmolumentsModal() {
    this.emolumentsMenuOptions = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: `clear_emoluments_modal`,
        icon: 'clear',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: `view_selected_emoluments`,
        icon: 'preview',
      },
    ];

    // When a row is selected
    this.subs.push(
      this.emolumentsStore
        .select(getEmolumentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('#')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.emolumentsFormArray,
                this.emolumentsDS,
                [
                  {
                    control: 'emolument_id',
                    value: row.model.id,
                  },
                  {
                    control: 'emolument_description',
                    value: row.model.description_short,
                  },
                  {
                    control: 'price_value',
                    value: row.model.value,
                  },
                ]
              );
            }
          }
        })
    );
  }

  public setParishionersModal() {
    this.parishionersMenuOptions = [
      {
        name: this.i18nextPipe.transform('translation:action.add'),
        value: `quick_insertion_person`,
        icon: 'add_circle_outline',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: `view_parishioners_modal`,
        icon: 'preview',
      },
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: `clear_parishioners_modal`,
        icon: 'clear',
      },
    ];

    // When a row is selected
    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`entity_id`).setValue(row.model.id);
            this.form
              .get(`entity_description`)
              .setValue(row.model.complete_relation);
          }
        })
    );

    // When a row is selected
    this.subs.push(
      this.personsStore
        .select(getPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`entity_id`).setValue(row.model.entity.id);
            this.form
              .get(`entity_description`)
              .setValue(row.model.entity.complete_relation);
          }
        })
    );
  }

  private buildEmolumentsTableColumns() {
    setTimeout(() => {
      this.emolumentsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
        },
        {
          id: 'emolument_description',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.emolument_description`
            ) + ' *',
          sortable: false,
          template: this.descriptionTemplate,
        },
        {
          id: 'price_value',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.price_value`) +
            ' *',
          sortable: false,
          template: this.priceValueTemplate,
        },
      ];
    });
  }

  calculateGrandTotal(list: DocumentsEmolument[]): number {
    let result: number = 0;

    list.forEach((emolument: DocumentsEmolument) => {
      result += +emolument.price_value;
    });
    return result;
  }

  appendEmolumentsToForm() {
    this.form.setControl(
      'document_line_attributes',
      this.fb.array(this.emolumentsFormArray.value)
    );
    this.form
      .get('total_amount')
      .setValue(this.calculateGrandTotal(this.emolumentsFormArray.value));
  }

  private getSeries(payload = this.form.value) {
    this.subs.push(
      this.documentsService.getDocumentsTypesForJS(payload).subscribe((r) => {
        this.series = [];
        if (r.self_assessment !== null || r.self_assessment !== undefined) {
          this.form.get('paid').setValue(r.self_assessment);
        }
        r.numerations.forEach((serie: Numeration) => {
          this.series.push({
            label: serie.serie,
            value: serie.id,
          });
          if (serie.is_default) {
            this.form.get('documents_type_serie_id').setValue(serie.id);
          }
        });
      })
    );
  }

  setCanEdit(obj) {
    if (obj.block_edit) {
      return false;
    }
    if (['null', 4, 3].includes(obj.documents_status_id)) {
      return false;
    }
    return true;
  }

  private getEntityModule(entity_type_id) {
    const dict = {
      2: 'chapelries',
      5: 'persons',
      8: 'worshipplaces',
      9: 'bishoprics',
      10: 'archpristships',
      11: 'priests',
    };
    return dict[entity_type_id];
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = '',
    queryStringParams: any = {}
  ) {
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(modalParams)),
        queryStringParams: btoa(JSON.stringify(queryStringParams)),
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }

  // ATTACHMENTS
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
          id: 'attachment',
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
      'documents_attachments_attributes',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.documents_attachments_attributes
      .filter((obj: DocumentsAttachment) => !obj.hasOwnProperty('_destroy'))
      .forEach((obj: DocumentsAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }

  addAttachment(event: any) {
    if (event.target.files && event.target.files[0]) {
      const newAttachment: DocumentsAttachment = {
        attachment: null,
        attachment_name: event.target.files[0].name,
        document_id: null,
        created_at: null,
        description: null,
        id: null,
        updated_at: null,
        file_to_upload: event.target.files[0],
      };

      this.addTableLine(
        newAttachment,
        this.attachmentsFormArray,
        this.attachmentsDS
      );
    }
  }
}
