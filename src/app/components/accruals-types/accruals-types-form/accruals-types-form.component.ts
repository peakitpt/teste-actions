import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accruals-types.actions';
import { getAccrualType } from '../reducers/accruals-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { AccrualsType, AccrualTypesEmolument } from '../accruals-type.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getDocumentsTypesSelected } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.selectors';
import * as DocumentsTypesState from '../../../shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import * as EmolumentsState from '../../../shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { AccrualsTypesService } from '@peakitpt/ui-kyrios-api';
import { DocumentsTypesNumeration } from '../../accruals/accrual.model';

@Component({
  selector: 'kyr-accruals-types-form',
  templateUrl: './accruals-types-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccrualsTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccrualsType>;
  modulePath = 'accruals-types';
  preFillWithNew = true;

  selectorGetModel = getAccrualType;
  actionRequestFail = actions.AccrualTypesActionTypes.RequestFailAccrualTypes;
  actionRequestGetAll = actions.RequestGetAllAccrualTypes;
  actionRequestGetOne = actions.RequestGetAccrualType;
  actionRequestPut = actions.RequestPutAccrualType;
  actionSuccessPut = actions.AccrualTypesActionTypes.SuccessPutAccrualType;
  actionRequestPost = actions.RequestPostAccrualType;
  actionSuccessPost = actions.AccrualTypesActionTypes.SuccessPostAccrualType;
  actionRequestGetNew = actions.RequestGetNew;

  emolumentsColumns: any[] = [];
  emolumentsDS: TableDataSource<any> = new TableDataSource([]);
  emolumentsFormArray: FormArray = new FormArray([]);
  newEmolument = {
    accruals_type_id: null,
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

  periodicityTypeOptions: any[] = [];
  accrualsTypes = [];
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
    this.setPeriodicityTypeOptions();
    this.setDocumentsTypesModal();
    this.setEmolumentsModal();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.getAccrualTypes();
  }

  initializeForm() {
    this.form = this.fb.group({
      accruals_types_emoluments: this.fb.array([]),
      code: [null, Validators.required],
      comments: [null],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      description: [null, Validators.required],
      document_to_generate_document_type_description: [],
      document_to_generate_document_type_id: [],
      document_to_generate_serie_description: [null, Validators.required],
      document_to_generate_serie_id: [null, Validators.required],
      emoluments_total: ['0.0'],
      entity_ekklesia_location_id: [],
      id: [],
      periodicity_number_of_days: [null],
      periodicity_type: [null, Validators.required],
      updated_at: [],
      validity_date_end: [],
      validity_date_start: [],
    });

    this.emolumentsFormArray = this.form.controls
      .accruals_types_emoluments as FormArray;
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
    this.setEmoluments(obj.accruals_types_emoluments);
  }

  onAfterViewInit() {
    this.setFormTabs();
    super.onAfterViewInit();
    this.buildEmolumentsTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
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
    this.appendDocumentToGenerateSerie();

    if (this.form.valid && this.emolumentsFormArray.valid) {
      this.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setEmoluments(emoluments: AccrualTypesEmolument[] = []) {
    this.emolumentsFormArray.clear();
    this.emolumentsDS.data = this.emolumentsFormArray.value;
    if (emoluments?.length) {
      emoluments.forEach((accrualType: AccrualTypesEmolument) => {
        this.addTableLine(
          accrualType,
          this.emolumentsFormArray,
          this.emolumentsDS
        );
      });
    }
  }

  private getAccrualTypes() {
    const payload = {
      limit: 'none',
    };

    this.accrualsTypes = [];
    this.subs.push(
      this.accrualsTypesService.getAll(payload).subscribe((r) => {
        r.results.forEach((accrualType: AccrualsType) => {
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

  private setPeriodicityTypeOptions() {
    this.periodicityTypeOptions = [
      {
        label: `---`,
        value: '',
      },
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:options.yearly`),
        value: '1',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:options.quarterly`
        ),
        value: '2',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:options.semiannual`
        ),
        value: '3',
      },
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:options.monthly`),
        value: '4',
      },
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:options.weekly`),
        value: '5',
      },
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:options.other`),
        value: '6',
      },
    ];
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

  calculateRowTotal(row: AccrualTypesEmolument) {
    return +row.value * +row.quantity;
  }

  calculateGrandTotal(list: AccrualTypesEmolument[]): number {
    let result: number = 0;

    list.forEach((emolument: AccrualTypesEmolument) => {
      result += +emolument.value * +emolument.quantity;
    });
    return result;
  }

  appendEmolumentsToForm() {
    this.emolumentsFormArray.value.forEach(
      (row: AccrualTypesEmolument, index: number) => {
        this.emolumentsFormArray
          .get([index, 'total'])
          .setValue(String(this.calculateRowTotal(row)));
      }
    );

    this.form
      .get('emoluments_total')
      .setValue(
        String(
          this.calculateGrandTotal(this.form.value.accruals_types_emoluments)
        )
      );

    this.form.setControl(
      'accruals_types_emoluments',
      this.fb.array(this.emolumentsFormArray.value)
    );
  }

  appendDocumentToGenerateSerie() {
    const searchFor = this.form.get('document_to_generate_serie_id').value;
    this.accrualsTypes.forEach((element) => {
      if (element.value === searchFor) {
        this.form
          .get('document_to_generate_serie_description')
          .setValue(element.label);
      }
    });
  }
}
