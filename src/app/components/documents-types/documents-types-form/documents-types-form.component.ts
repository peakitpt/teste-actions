import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/documents-types.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/documents-types.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getDocumentsType } from '../reducers/documents-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { DocumentsType } from '../documents-type.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { Numeration } from '../../numerations/numeration.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-documents-types-form',
  templateUrl: './documents-types-form.component.html',
  styleUrls: ['./documents-types-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentsTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<DocumentsType>;
  modulePath = 'documents-types';

  selectorGetModel = getDocumentsType;
  actionRequestFail =
    actions.DocumentsTypesActionTypes.RequestFailDocumentsTypes;
  actionRequestGetAll = actions.RequestGetAllDocumentsTypes;
  actionRequestGetOne = actions.RequestGetDocumentsType;
  actionRequestPut = actions.RequestPutDocumentsType;
  actionSuccessPut = actions.DocumentsTypesActionTypes.SuccessPutDocumentsType;
  actionRequestPost = actions.RequestPostDocumentsType;
  actionSuccessPost =
    actions.DocumentsTypesActionTypes.SuccessPostDocumentsType;

  movementTypeOptions = [];
  operatorOptions = [];
  numerationsColumns: any[] = [];
  numerationsDS: TableDataSource<any> = new TableDataSource([]);
  numerationsFormArray: FormArray = new FormArray([]);
  newNumeration = {
    active: true,
    block_edit: false,
    block_remove: false,
    created_at: null,
    created_by_user_id: null,
    deleted: false,
    deleted_by_user_id: null,
    documents_type_id: null,
    entity_ekklesia_location_id: null,
    id: null,
    is_default: false,
    name: null,
    numeration_view_attributes: [],
    ser_length: 10,
    ser_max: 2147483647,
    ser_preffix: null,
    ser_suffix: null,
    ser_value: 0,
    ser_year: null,
    serie: null,
    updated_at: null,
    updated_by_user_id: null,
    _destroy: false,
  };
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('is_defaultTemplate') is_defaultTemplate: TemplateRef<any>;
  @ViewChild('serieTemplate') serieTemplate: TemplateRef<any>;
  @ViewChild('ser_prefixTemplate') ser_prefixTemplate: TemplateRef<any>;
  @ViewChild('ser_suffixTemplate') ser_suffixTemplate: TemplateRef<any>;
  @ViewChild('ser_valueTemplate') ser_valueTemplate: TemplateRef<any>;
  @ViewChild('ser_maxTemplate') ser_maxTemplate: TemplateRef<any>;
  @ViewChild('ser_lengthTemplate') ser_lengthTemplate: TemplateRef<any>;

  constructor(
    public store: Store<State>,
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
      active: [true],
      affects_legal_tax_reports: [false],
      block_remove: [false],
      created_at: [null],
      created_by_user_id: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      description: [null, Validators.required],
      entity_ekklesia_location_id: [null],
      id: [null],
      inverse_doc_type_id: [null],
      movement_operator: ['-', Validators.required],
      movement_type: ['c', Validators.required],
      name: [null, Validators.required],
      numerations: this.fb.array([]),
      self_assessment: [false],
      updated_at: [null],
      updated_by_user_id: [null],
    });

    this.numerationsFormArray = this.form.controls.numerations as FormArray;
  }

  setFormValues(obj: DocumentsType) {
    super.setFormValues(obj);
    if (!this.duplicateMode) {
      this.setNumerations(obj.numerations);
    }
    if (obj.id) {
      this.form.controls['movement_type'].disable();
      this.form.controls['movement_operator'].disable();
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.movementTypeOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.movement_type_option.c`
        ),
        value: 'c',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.movement_type_option.d`
        ),
        value: 'd',
      },
    ];
    this.operatorOptions = [
      {
        label: `+`,
        value: '+',
      },
      {
        label: `-`,
        value: '-',
      },
    ];
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
        this.router
          .navigate([this.modulePath])
          .then(() => this.router.navigate([this.modulePath, 'new']));
      } else if (this.blockChainClosing) {
        this.isLoading = false;
        this.blockChainClosing = false;
      } else if (result.payload.id && this.id) {
        this.modal.close();
        this.router.navigate([this.modulePath, result.payload.id, 'details']);
      } else {
        this.modal.close();
        this.router.navigate([this.modulePath, result.payload.id, 'edit']);
      }
    }
  }

  onAfterViewInit() {
    super.onAfterViewInit();
    this.buildNumerationsTableColumns();
  }

  onSubmit() {
    this.isSaving = true;
    if (!this.duplicateMode) {
      this.appendNumerationsToForm();
    }

    // If its edit, there must be at least 1 numerations
    if (
      this.id &&
      this.form.value.numerations.length === 0 &&
      !this.duplicateMode
    ) {
      this.savingError(
        this.i18nextPipe.transform(`${this.modulePath}:message.error.no_series`)
      );
    } else if (this.form.valid) {
      this.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setNumerations(numerations: Numeration[] = []) {
    this.numerationsFormArray.clear();
    this.numerationsDS.data = this.numerationsFormArray.value;
    if (numerations?.length) {
      numerations.forEach((numeration: Numeration) => {
        this.addTableLine(
          numeration,
          this.numerationsFormArray,
          this.numerationsDS
        );
      });
    }
  }

  private buildNumerationsTableColumns() {
    setTimeout(() => {
      this.numerationsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
        },
        {
          id: 'active',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.numeration.active`
          ),
          sortable: false,
          template: this.activeTemplate,
        },
        {
          id: 'is_default',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.numeration.is_default`
          ),
          sortable: false,
          template: this.is_defaultTemplate,
        },
        {
          id: 'serie',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.numeration.serie`
            ) + ' *',
          sortable: false,
          template: this.serieTemplate,
        },
        {
          id: 'ser_prefix',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.numeration.ser_preffix`
          ),
          sortable: false,
          template: this.ser_prefixTemplate,
        },
        {
          id: 'ser_suffix',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.numeration.ser_suffix`
          ),
          sortable: false,
          template: this.ser_suffixTemplate,
        },
        {
          id: 'ser_value',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.numeration.ser_value`
            ) + ' *',
          sortable: false,
          template: this.ser_valueTemplate,
        },
        {
          id: 'ser_max',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.numeration.ser_max`
            ) + ' *',
          sortable: false,
          template: this.ser_maxTemplate,
        },
        {
          id: 'ser_length',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.numeration.ser_length`
            ) + ' *',
          sortable: false,
          template: this.ser_lengthTemplate,
        },
      ];
    });
  }

  appendNumerationsToForm() {
    this.form.setControl(
      'numerations',
      this.fb.array(this.numerationsFormArray.value)
    );
  }

  generateNewNumeration() {
    const result = this.newNumeration;
    result.ser_preffix = `${this.form.value.name}/`;
    return result;
  }
}
