import {
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  ValidationErrors,
} from '@angular/forms';
import {
  DialogComponent,
  SnackBarService,
  Tab,
  TableDataSource,
} from '@peakitpt/ui-material';
import { Store, ActionsSubject, Selector } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import { Output } from '@angular/core';

export interface ControlValue {
  control: string;
  value?: any;
}

export interface ModalMenuOption {
  name: string;
  value: string;
  icon?: string;
}

export class BaseModalQuickAddFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<any>;
  model: any;
  modulePath: string;
  form: FormGroup;
  subs: Subscription[] = [];
  formTabs: Tab[] = [];
  isLoading: boolean = true;
  isSaving: boolean = false;
  preFillWithNew: boolean = false;
  keysToIgnoreOnDuplicate: Array<string> = [];
  openGenerateDocModal: boolean = false;

  // Selectors & actions
  selectorGetModel: Selector<any, any>;
  actionRequestFail: any;
  actionRequestPost: any;
  actionSuccessPost: any;
  actionRequestGetNew: any;
  // Selectors & actions END

  @ViewChild('modal') modal: DialogComponent;
  @Output() emitCreateSuccess = new EventEmitter();

  ERROR_COLOR = '#ff8080';
  SUCCESS_COLOR = '#66ff99';
  WARN_COLOR = '#FFB204';

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.initKeysToIgnoreOnDuplicate();

    this.isLoading = true;

    this.model$ = this.store.select(this.selectorGetModel);
    if (this.actionRequestGetNew && this.preFillWithNew) {
      this.store.dispatch(new this.actionRequestGetNew());
      this.subs.push(
        this.model$.subscribe((obj: any) => {
          if (obj) {
            this.setFormValues(obj);
            this.isLoading = false;
          }
        })
      );
    } else {
      this.isLoading = false;
    }
  }

  initializeForm() {}

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
    ];
    if (addKeys.length) {
      this.keysToIgnoreOnDuplicate = this.keysToIgnoreOnDuplicate.concat(
        addKeys
      );
    }
  }

  setFormValues(obj: any) {
    this.model = obj;
    Object.keys(obj).forEach((key: string) => {
      if (this.keysToIgnoreOnDuplicate.includes(key)) {
        // Don't include these keys on duplicate mode
      } else if (
        this.form.contains(key) &&
        !(this.form.get(key) instanceof FormArray)
      ) {
        this.form.get(key).patchValue(obj[key]);
      }
    });
  }

  nullifyDuplicateKeys(newObj: any): any {
    const result = { ...newObj };
    this.keysToIgnoreOnDuplicate.forEach((key: string) => {
      if (key in result) {
        if (typeof result[key] === 'boolean') {
          result[key] = false;
        } else {
          result[key] = null;
        }
      }
    });
    return result;
  }

  ngAfterViewInit() {
    this.subscribeForSavingActions();
    this.onAfterViewInit();
  }

  openModal() {
    this.initializeForm();
    this.modal.open();
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessPost))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            let errorMessage = '';

            if (result.payload.error.status === 400) {
              errorMessage = result.payload.error.error.message;
            } else if (result.payload.error.status === 401) {
              if ('message' in result.payload.error) {
                errorMessage = result.payload.error.error.message;
              } else {
                errorMessage = this.i18nextPipe.transform(
                  'translation:message.error_401',
                  { appName: environment.appName }
                );
              }
            } else if (
              result.payload.error.status === 422 &&
              'error' in result.payload.error
            ) {
              for (const key of Object.keys(result.payload.error.error)) {
                errorMessage += `${result.payload.error.error[key]}\n`;
              }
            }

            this.snackBarService.openSnackBar(errorMessage, this.ERROR_COLOR);
          } else {
            this.onSaveSuccess(result);
          }
        })
    );
  }

  onSaveSuccess(result: any) {
    this.isLoading = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.save_success`),
      this.SUCCESS_COLOR
    );

    this.emitCreateSuccess.emit(result);
    this.isLoading = false;
    this.modal.close();
  }

  onAfterViewInit() {
    this.clearModalInputs();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  affectFieldIfBlank(field: string, newValue: any, message?: string) {
    if (!this.form.get(field).value && newValue) {
      this.affectField(field, newValue, message);
    }
  }

  affectField(
    field: string,
    newValue: any,
    message?: string,
    emitEvent = true
  ) {
    this.form.get(field).setValue(newValue, { emitEvent });
    if (message) {
      this.snackBarService.openSnackBar(message, this.WARN_COLOR);
    }
  }

  onSubmit() {
    this.isSaving = true;

    if (this.form.valid) {
      this.onFormValid();
    } else {
      this.logFormValidationErrors();
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  logFormValidationErrors() {
    Object.keys(this.form.controls).forEach((key: string) => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError: string) => {
          console.error(
            'Control: ' + key + ' | Error: ' + keyError + ' | Err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }

  onFormValid(payload = this.form.getRawValue()) {
    this.store.dispatch(new this.actionRequestPost(payload));
  }

  savingError(message: string) {
    this.isSaving = false;
    this.snackBarService.openSnackBar(message, this.ERROR_COLOR);
  }

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }

  deleteTableLine(
    index: number,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    const currentLines = [...formArray.value];

    if (currentLines[index].id) {
      currentLines[index] = {
        ...currentLines[index],
        _destroy: true,
      };
    } else {
      currentLines.splice(index, 1);
    }

    formArray.clear();
    currentLines.forEach((line) => {
      formArray.push(this.fb.group(line));
    });

    tableDS.data = formArray.value;
  }

  updateTableValues(
    tableIndex: number,
    formArray: FormArray,
    tableDS: TableDataSource<any>,
    controlValues: ControlValue[]
  ) {
    controlValues.forEach((cv: ControlValue, index: number) => {
      const formGroup = formArray.controls[tableIndex];
      if (formGroup) {
        const formControl = formGroup.get(cv.control);
        if (formControl) {
          formControl.setValue(cv.value);
        }
      }
    });

    const newTableData = [];
    tableDS.data.forEach((line: any, i: number) => {
      const lineCopy = { ...line };
      if (tableIndex === i) {
        controlValues.forEach((cv: ControlValue) => {
          lineCopy[cv.control] = cv.value;
        });
      }
      newTableData.push(lineCopy);
    });
    tableDS.data = newTableData;
  }

  clearModalInputs() {}

  onModalClose() {
    // Do nothing by default
  }

  onCancelClick() {
    this.modal.close();
  }
}
