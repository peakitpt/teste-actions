import { ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import { SelectedModalRow } from '../shared.model';
import { FileManagerService } from '@peakitpt/ui-kyrios-api';

export interface ControlValue {
  control: string;
  value?: any;
}

export interface ModalMenuOption {
  name: string;
  value: string;
  icon?: string;
}

export interface FileUpload {
  file: string;
  name: string;
  path: string;
}

export class BaseFormComponent implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<any>;
  model: any;
  modulePath: string;
  id: number;
  form: FormGroup;
  subs: Subscription[] = [];
  formTabs: Tab[] = [];
  headerOptionsMenu: Array<{ name: string; value: string; icon: string }> = [];
  isLoading: boolean = true;
  isSaving: boolean = false;
  saveAndNew: boolean = false;
  preFillWithNew: boolean = false;
  keysToIgnoreOnDuplicate: Array<string> = [];
  isQuickInsertion: boolean = false;
  // the blockChainClosing variable is responsible for blocking the close of modals
  // in the subscribeForSavingActions()
  // It is used when the same modal is opened within itself, and
  // there is a saving action (e.g.: in quick insertion of persons inside persons).
  blockChainClosing: boolean = false;
  duplicateMode: boolean = false;
  openGenerateDocModal: boolean = false;

  // Selectors & actions
  selectorGetModel: Selector<any, any>;
  actionRequestFail: any;
  actionRequestGetAll: any;
  actionRequestGetOne: any;
  actionRequestSetSelected: any;
  actionRequestPut: any;
  actionSuccessPut: any;
  actionRequestPost: any;
  actionSuccessPost: any;
  actionRequestGetNew: any;
  // Selectors & actions END

  @ViewChild('modal') modal: DialogComponent;

  fileManagerService: FileManagerService;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
  ) {}

  ngOnInit() {
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    this.initializeForm();
    this.initKeysToIgnoreOnDuplicate();
    this.duplicateMode = this.sharedModule.isDuplicateMode(this.route);

    this.subs.push(
      this.route.params.subscribe((params) => {
        this.isLoading = true;

        if (params.id) {
          if (this.duplicateMode) {
            this.id = null;
          } else {
            this.id = +params.id;
            this.addToHeaderOptionsMenu();
          }

          this.model$ = this.store.select(this.selectorGetModel);
          this.store.dispatch(new this.actionRequestGetOne(+params.id));

          this.subs.push(
            this.model$.subscribe((obj: any) => {
              if (obj && !this.blockChainClosing) {
                this.setFormValues(obj);
                this.isLoading = false;
              }
            })
          );
        } else if (this.preFillWithNew && this.actionRequestGetNew) {
          this.model$ = this.store.select(this.selectorGetModel);
          this.store.dispatch(new this.actionRequestGetNew());

          this.subs.push(
            this.model$.subscribe((obj: any) => {
              if (obj && !this.blockChainClosing) {
                this.setFormValues(obj);
                this.isLoading = false;
              }
            })
          );
        } else {
          this.isLoading = false;
        }
      })
    );

    // Code used for Quick Insertions
    this.isQuickInsertion =
      this.route.snapshot.queryParamMap.get('isQuickInsertion') === 'true';
  }

  initializeForm() {}

  addToHeaderOptionsMenu() {
    this.headerOptionsMenu.push({
      name: this.i18nextPipe.transform('translation:action.delete'),
      value: 'delete',
      icon: 'delete',
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
    ];
    if (addKeys.length) {
      this.keysToIgnoreOnDuplicate =
        this.keysToIgnoreOnDuplicate.concat(addKeys);
    }
  }

  setFormValues(obj: any) {
    this.model = obj;
    Object.keys(obj).forEach((key: string) => {
      if (this.duplicateMode && this.keysToIgnoreOnDuplicate.includes(key)) {
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
    this.modal.open();
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(
          ofType(
            this.actionRequestFail,
            this.actionSuccessPut,
            this.actionSuccessPost
          )
        )
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

            if (
              errorMessage !== undefined &&
              errorMessage !== null &&
              errorMessage !== ''
            ) {
              this.snackBarService.openSnackBar(
                errorMessage,
                this.sharedModule.ERROR_COLOR
              );
            }
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
      } else if (result.payload.id) {
        this.modal.close();
        this.router.navigate([this.modulePath, result.payload.id, 'details']);
      } else {
        this.modal.close();
      }
    }
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
    this.form.get(field)?.setValue(newValue, { emitEvent });
    if (message) {
      this.snackBarService.openSnackBar(message, this.sharedModule.WARN_COLOR);
    }
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'save_new':
        this.saveAndNew = true;
        this.onSubmit();
        break;
      case 'delete':
        if (this.id) {
          this.router.navigate([this.modulePath, this.id, 'edit', 'delete']);
        }
        break;
      default:
        break;
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
    if (payload.id) {
      this.store.dispatch(new this.actionRequestPut(payload));
    } else {
      this.store.dispatch(new this.actionRequestPost(payload));
    }
  }

  savingError(message: string) {
    this.isSaving = false;
    this.snackBarService.openSnackBar(message, this.sharedModule.ERROR_COLOR);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = '',
    queryStringParams: any = null
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

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }

  defaultModalMenu(
    menuIdentifier: string
  ): Array<{ name: string; value: string; icon: string }> {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: `clear_${menuIdentifier}_modal`,
        icon: 'clear',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: `view_selected_${menuIdentifier}`,
        icon: 'preview',
      },
    ];

    if (!this.isQuickInsertion) {
      // Avoids infinite quick insertion
      menu.push({
        name: this.i18nextPipe.transform('translation:action.quick_insertion'),
        value: `quick_insertion_${menuIdentifier}`,
        icon: 'add_circle_outline',
      });
    }

    return menu;
  }

  getInputNameIndex(inputName: string): number {
    return +inputName.split('#')[1];
  }

  getInputNameField(inputName: string): string {
    return inputName.split('#')[0].split('.')[1];
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

  openQuickInsertionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {}
  ) {
    this.router.navigate([this.router.url, modalName], {
      queryParams: {
        isQuickInsertion: true,
        inputNameQI: inputName,
        modalParamsQI: btoa(JSON.stringify(modalParams)),
      },
    });
  }

  clearModalInputs() {}

  onModalClose() {
    if (this.isQuickInsertion) {
      const url = this.router.url.split('/');
      url.pop();
      this.router.navigate(url);
    } else {
      this.router.navigate([this.modulePath]);
    }
  }

  onCancelClick() {
    if (this.id) {
      this.router.navigate([this.modulePath, this.id, 'details']);
    }
    this.modal.close();
  }

  setInnerTable(
    innerArray: any[] = [],
    formArray: FormArray,
    dataSource: TableDataSource<any>,
    keysToIgnoreOnDuplicate: Array<string> = []
  ) {
    formArray.clear();
    dataSource.data = formArray.value;
    if (innerArray?.length) {
      innerArray.forEach((elem: any) => {
        let newObj = { ...elem };
        if (this.duplicateMode) {
          if (keysToIgnoreOnDuplicate.length) {
            this.keysToIgnoreOnDuplicate = this.keysToIgnoreOnDuplicate.concat(
              keysToIgnoreOnDuplicate
            );
          }
          newObj = this.nullifyDuplicateKeys(newObj);
        }
        this.addTableLine(newObj, formArray, dataSource);
      });
    }
  }

  closeGenerateDocModal(docGeneratedSuccesfully: boolean) {
    this.openGenerateDocModal = false;
    if (docGeneratedSuccesfully) {
      this.onDocGeneratedSuccesfully();
      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform('documents:message.generate_doc_success'),
        this.sharedModule.SUCCESS_COLOR
      );

      this.store.dispatch(new this.actionRequestGetAll()); // Refresh table
      this.modal.close();
      this.router.navigate([this.modulePath, this.model.id, 'details']);
    }
  }

  onDocGeneratedSuccesfully() {}

  uploadAttachments(formArray: FormArray, dataSource: TableDataSource<any>) {
    let uploads = formArray.value.filter(
      (obj: any) =>
        obj.file_to_upload != null && !obj.hasOwnProperty('_destroy')
    ).length;

    if (uploads === 0) {
      this.onFormValid();
    } else {
      formArray.value.forEach(async (obj: any, i: number) => {
        if (obj.file_to_upload && !obj.hasOwnProperty('_destroy')) {
          await this.sendAttachment(obj.file_to_upload).then(
            (result: FileUpload) => {
              this.updateTableValues(
                i,
                formArray,
                dataSource,
                this.attachmentsControlValuesToUpdate(result)
              );
              uploads -= 1;

              if (uploads === 0) {
                this.onFormValid();
              }
            }
          );
        }
      });
    }
  }

  attachmentsControlValuesToUpdate(result: FileUpload): ControlValue[] {
    return [
      {
        control: 'attachment',
        value: result.file,
      },
      {
        control: 'attachment_name',
        value: result.name,
      },
      {
        control: 'file_to_upload',
        value: null,
      },
    ];
  }

  sendAttachment(file: File): Promise<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.fileManagerService.upload(fd).toPromise();
  }

  getAttachmentUrl(formControl: any): string {
    if (formControl.get('attachment').value) {
      return `${environment.railsAppUrl}/filemanagers/download?f=${
        formControl.get('attachment').value
      }&fn=${formControl.get('attachment_name').value}`;
    }
    return '';
  }
}
