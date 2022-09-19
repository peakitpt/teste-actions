import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accruals.actions';
import { getAccrual } from '../reducers/accruals.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import {
  Accrual,
  AccrualsTypesEmolument,
  DocumentsTypesNumeration,
} from '../accrual.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import {
  DialogComponent,
  SnackBarService,
  TableDataSource,
} from '@peakitpt/ui-material';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getAccrualTypesSelected } from 'src/app/shared/components/modals/accrual-types-modal/reducers/accrual-types-modal.selectors';
import * as AccrualTypesState from '../../../shared/components/modals/accrual-types-modal/reducers/accrual-types-modal.reducer';
import { getDocumentsTypesSelected } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.selectors';
import * as DocumentsTypesState from '../../../shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import * as EmolumentsState from '../../../shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { AccrualsTypesService } from '@peakitpt/ui-kyrios-api';
import { AccrualsType } from '../../accruals-types/accruals-type.model';

@Component({
  selector: 'kyr-accruals-form',
  templateUrl: './accruals-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccrualsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Accrual>;
  modulePath = 'accruals';
  preFillWithNew = true;

  selectorGetModel = getAccrual;
  actionRequestFail = actions.AccrualsActionTypes.RequestFailAccruals;
  actionRequestGetAll = actions.RequestGetAllAccruals;
  actionRequestGetOne = actions.RequestGetAccrual;
  actionRequestPut = actions.RequestPutAccrual;
  actionSuccessPut = actions.AccrualsActionTypes.SuccessPutAccrual;
  actionRequestPost = actions.RequestPostAccrual;
  actionSuccessPost = actions.AccrualsActionTypes.SuccessPostAccrual;
  actionRequestGetNew = actions.RequestGetNew;

  emolumentsColumns: any[] = [];
  emolumentsDS: TableDataSource<any> = new TableDataSource([]);
  emolumentsFormArray: FormArray = new FormArray([]);
  newEmolument = {
    accruals_accrual_id: null,
    created_at: null,
    emolument_description: null,
    emolument_id: null,
    id: null,
    quantity: null,
    total: null,
    updated_at: null,
    value: null,
    _destroy: false,
  };
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('descriptionTemplate') descriptionTemplate: TemplateRef<any>;
  @ViewChild('quantityTemplate') quantityTemplate: TemplateRef<any>;
  @ViewChild('valueTemplate') valueTemplate: TemplateRef<any>;
  @ViewChild('totalTemplate') totalTemplate: TemplateRef<any>;

  @ViewChild('generalTabTemplate') generalTabTemplate: TemplateRef<any>;
  @ViewChild('emolumentsTabTemplate') emolumentsTabTemplate: TemplateRef<any>;
  formTabs: any[] = [];

  accrualsTypes = [];
  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  accrualTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  documentsTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  emolumentsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  parishionersQueryStringParams = {
    modal: true,
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: true,
    entity_type: null,
    documents: true,
    format: 'json',
  };

  @ViewChild('autoCompleteModal') autoCompleteModal: DialogComponent;
  autoCompleteData: AccrualsType;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private accrualsTypesService: AccrualsTypesService,
    private parishionersStore: Store<ParishionersState.State>,
    private accrualTypesStore: Store<AccrualTypesState.State>,
    private documentsTypesStore: Store<DocumentsTypesState.State>,
    private emolumentsStore: Store<EmolumentsState.State>
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
    this.getAccrualsTypes();
    this.setParishionersModal();
    this.setAccrualTypesModal();
    this.setDocumentsTypesModal();
    this.setEmolumentsModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      accrual_type_description: [Validators.required],
      accruals_accruals_emoluments: this.fb.array([]),
      accruals_type_id: [Validators.required],
      active: [true],
      client_id: [],
      client_name: [null, Validators.required],
      comments: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      document_to_generate_document_type_description: [
        null,
        Validators.required,
      ],
      document_to_generate_document_type_id: [],
      document_to_generate_serie_description: [],
      document_to_generate_serie_id: [null, Validators.required],
      emoluments_total: [],
      entity_ekklesia_location_id: [],
      id: [],
      processing_last_date: [],
      processing_next_date: [],
      updated_at: [],
      validity_date_end: [],
      validity_date_start: [null, Validators.required],
      periodicity_number_of_days: [null],
      periodicity_type: [null],
    });

    this.emolumentsFormArray = this.form.controls
      .accruals_accruals_emoluments as FormArray;
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
    this.setEmoluments(obj.accruals_accruals_emoluments);
  }

  onAfterViewInit() {
    this.setFormTabs();
    super.onAfterViewInit();
    this.buildEmolumentsTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_parishioners_modal': {
        this.form.get('client_id').setValue(null);
        this.form.get('client_name').setValue(null);
        break;
      }
      case 'view_selected_parishioners': {
        // if (this.form.get('client_id').value) {
        //   this.openDetails(
        //     'worshipplaces',
        //     this.form.get('client_id').value
        //   );
        // }
        break;
      }
      case 'clear_accrual-types_modal': {
        this.form.get('accruals_type_id').setValue(null);
        this.form.get('accrual_type_description').setValue(null);
        break;
      }
      case 'view_selected_accrual-types': {
        if (this.form.get('accruals_type_id').value) {
          this.openDetails(
            'accrual-types',
            this.form.get('accruals_type_id').value
          );
        }
        break;
      }
      case 'clear_documents-types_modal': {
        this.form.get('document_to_generate_document_type_id').setValue(null);
        this.form
          .get('document_to_generate_document_type_description')
          .setValue(null);
        break;
      }
      case 'view_selected_documents-types': {
        if (this.form.get('document_to_generate_document_type_id').value) {
          this.openDetails(
            'gestdocuments',
            this.form.get('document_to_generate_document_type_id').value
          );
        }
        break;
      }
      case 'clear_emoluments_modal': {
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
      }
      case 'view_selected_emoluments': {
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (this.emolumentsFormArray.value[index].formation_id) {
            this.openDetails(
              'emoluments',
              this.emolumentsFormArray.value[index].formation_id
            );
          }
        }
        break;
      }
      default: {
        super.menuClick(event, inputName);
      }
    }
  }

  setFormTabs() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.general'
        ),
        templateContent: this.generalTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.emoluments'
        ),
        templateContent: this.emolumentsTabTemplate,
      },
    ];
  }

  onSubmit() {
    this.isSaving = true;
    this.appendEmolumentsToForm();

    if (this.form.valid && this.emolumentsFormArray.valid) {
      this.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setEmoluments(emoluments: AccrualsTypesEmolument[] = []) {
    this.emolumentsFormArray.clear();
    this.emolumentsDS.data = this.emolumentsFormArray.value;
    if (emoluments?.length) {
      emoluments.forEach((accrualType: AccrualsTypesEmolument) => {
        this.addTableLine(
          accrualType,
          this.emolumentsFormArray,
          this.emolumentsDS
        );
      });
    }
  }

  private getAccrualsTypes() {
    const payload = {
      limit: 'none',
    };

    this.accrualsTypes = [];
    this.subs.push(
      this.accrualsTypesService.getAll(payload).subscribe((r) => {
        r.results.forEach((accrualType: Accrual) => {
          this.accrualsTypes.push({
            label: accrualType.document_to_generate_serie_description,
            value: accrualType.document_to_generate_serie_id,
          });
        });
      })
    );
  }

  private refreshSeries(numerations: DocumentsTypesNumeration[]) {
    this.accrualsTypes = [];
    numerations.forEach((numeration: DocumentsTypesNumeration) => {
      this.accrualsTypes.push({
        label: numeration.serie,
        value: numeration.id,
      });
    });
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioners');

    // When a row is selected
    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`client_id`).setValue(row.model.id);
            this.form.get(`client_name`).setValue(row.model.name);
          }
        })
    );
  }

  private setAccrualTypesModal() {
    this.accrualTypesMenuOptions = this.defaultModalMenu('accrual-types');

    // When a row is selected
    this.subs.push(
      this.accrualTypesStore
        .select(getAccrualTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`accruals_type_id`).setValue(row.model.id);
            this.form
              .get(`accrual_type_description`)
              .setValue(row.model.description);
            this.popAutoCompleteModal(row.model);
          }
        })
    );
  }

  private setDocumentsTypesModal() {
    this.documentsTypesMenuOptions = this.defaultModalMenu('documents-types');

    // When a row is selected
    this.subs.push(
      this.documentsTypesStore
        .select(getDocumentsTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.description);
            this.refreshSeries(row.model.numerations);
            this.form.get('document_to_generate_serie_id').setValue(null);
          }
        })
    );
  }

  private setEmolumentsModal() {
    this.emolumentsMenuOptions = this.defaultModalMenu('emoluments');

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
                ]
              );
            }
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
          id: 'description',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.description`) +
            ' *',
          sortable: false,
          template: this.descriptionTemplate,
        },
        {
          id: 'quantity',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.quantity`) +
            ' *',
          sortable: false,
          template: this.quantityTemplate,
        },
        {
          id: 'value',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.value`) + ' *',
          sortable: false,
          template: this.valueTemplate,
        },
        {
          id: 'total',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.total`),
          sortable: false,
          template: this.totalTemplate,
        },
      ];
    });
  }

  calculateRowTotal(row: AccrualsTypesEmolument) {
    return +row.value * +row.quantity;
  }

  calculateGrandTotal(list: AccrualsTypesEmolument[]): number {
    let result: number = 0;

    list.forEach((emolument: AccrualsTypesEmolument) => {
      result += +emolument.value * +emolument.quantity;
    });
    return result;
  }

  appendEmolumentsToForm() {
    this.emolumentsFormArray.value.forEach(
      (row: AccrualsTypesEmolument, index: number) => {
        this.emolumentsFormArray
          .get([index, 'total'])
          .setValue(String(this.calculateRowTotal(row)));
      }
    );

    this.form.setControl(
      'accruals_accruals_emoluments',
      this.fb.array(this.emolumentsFormArray.value)
    );
    this.form
      .get('emoluments_total')
      .setValue(this.emolumentsFormArray.value.length);
  }

  private popAutoCompleteModal(data) {
    if (this.autoCompleteModal) {
      this.autoCompleteData = data;
      this.autoCompleteModal.open();
    }
  }

  cancelAutoComplete() {
    this.autoCompleteData = null;
    this.autoCompleteModal.close();
  }

  autoComplete() {
    // BASE INPUTS
    this.form
      .get('validity_date_start')
      .setValue(this.autoCompleteData.validity_date_start);
    this.form
      .get('validity_date_end')
      .setValue(this.autoCompleteData.validity_date_end);
    this.form
      .get('document_to_generate_document_type_id')
      .setValue(this.autoCompleteData.document_to_generate_document_type_id);
    this.form
      .get('document_to_generate_document_type_description')
      .setValue(
        this.autoCompleteData.document_to_generate_document_type_description
      );
    this.form
      .get('document_to_generate_serie_id')
      .setValue(this.autoCompleteData.document_to_generate_serie_id);
    this.form
      .get('document_to_generate_serie_description')
      .setValue(this.autoCompleteData.document_to_generate_serie_description);
    this.form.get('comments').setValue(this.autoCompleteData.comments);
    this.form
      .get('periodicity_number_of_days')
      .setValue(this.autoCompleteData.periodicity_number_of_days);
    this.form
      .get('periodicity_type')
      .setValue(this.autoCompleteData.periodicity_type);

    // EMOLUMENTS but remove IDs
    const accrualsTypesEmoluments = [];
    this.autoCompleteData.accruals_types_emoluments.forEach((emolument) => {
      accrualsTypesEmoluments.push({
        accruals_type_id: emolument.accruals_type_id,
        created_at: emolument.created_at,
        emolument_description: emolument.emolument_description,
        emolument_id: emolument.emolument_id,
        id: null,
        quantity: emolument.quantity,
        total: emolument.total,
        updated_at: emolument.updated_at,
        value: emolument.value,
      });
    });
    this.setEmoluments(accrualsTypesEmoluments);

    this.autoCompleteData = null;
    this.autoCompleteModal.close();
  }
}
