import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/current-accounts.actions';
import { getCurrentAccountReceipt } from '../reducers/current-accounts.selectors';
import { Observable } from 'rxjs';
import {
  CurrentAccountLine,
  CurrentAccountReceipt,
  CurrentAccountReceiptAttachment,
} from '../current-account.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import {
  CurrentAccountsReceiptsService,
  CurrentAccountsService,
  FileManagerService,
} from '@peakitpt/ui-kyrios-api';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  BaseFormComponent,
  ControlValue,
  FileUpload,
} from 'src/app/shared/components/base-form-component';

@Component({
  selector: 'kyr-current-accounts-receipts-details',
  templateUrl: './current-accounts-receipts-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CurrentAccountsReceiptsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CurrentAccountReceipt>;
  returnUrl = '/current-accounts';
  modulePath = 'current-accounts-receipts';
  viewName = 'CurrentAccount';

  selectorGetModel = getCurrentAccountReceipt;
  actionRequestFail =
    actions.CurrentAccountsActionTypes.RequestFailCurrentAccounts;
  actionRequestGetOne = actions.RequestGetCurrentAccountsReceipt;

  currentAccountsTypes: any = {};
  paymentTypes: any;
  treasuryLocations: any;
  currentAccountsLinesSorted = [];

  // Tabs
  @ViewChild('mainTab') mainTab: TemplateRef<any>;
  @ViewChild('attachmentsTab') attachmentsTab: TemplateRef<any>;
  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate') attachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

  // Attachments Variables
  form: FormGroup;

  attachmentFormControlPlaceholder = new FormControl();
  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  attachmentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private currentAccountsReceiptsService: CurrentAccountsReceiptsService,
    private fileManagerService: FileManagerService,
    private fb: FormBuilder
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
  }

  ngOnInit() {
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    if (this.actionClearGet) {
      this.store.dispatch(new this.actionClearGet());
    }
    this.buildHeaderOptionsMenu();

    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.CARid) {
          this.id = +params.CARid;
          this.model$ = this.store.select(this.selectorGetModel);
          this.model$.subscribe((model: any) => {
            if (model) {
              this.model = model;
              this.returnUrl = this.getReturnUrl(this.router.url);
              this.afterGetModel();
              this.setForm(model);
            }
          });
          this.store.dispatch(new this.actionRequestGetOne(+params.CARid));
        }
      })
    );

    // Manage Reports
    this.reportMenuOptionsModel = [];
    this.getReports();
    this.getSubscriptionReports();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.current_accounts_receipts`
        ),
        templateContent: this.mainTab,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments`
        ),
        templateContent: this.attachmentsTab,
      },
    ];

    this.buildSubTablesColumns();
  }

  calculateTotalAmountToReceive(list: CurrentAccountLine[]): number {
    let result: number = 0;

    list.forEach((line: CurrentAccountLine) => {
      result += +line.total_amount;
    });
    return result;
  }

  openDocument(documentId: number) {
    window.open(`documents/${documentId}/details`, '_blank');
  }

  afterGetModel() {
    super.afterGetModel();
    this.setCurrentAccountsLinesSorted();
  }

  setCurrentAccountsLinesSorted() {
    this.currentAccountsLinesSorted = this.model.current_accounts_receipts_lines
      .slice()
      .sort((a, b) => {
        if (a['document_date'] < b['document_date']) {
          return 1;
        }
        if (a['document_date'] > b['document_date']) {
          return -1;
        }
        return 0;
      });
  }

  private getReturnUrl(url: string): string {
    let list = url.split('/');
    list.splice(-2, 2);
    return list.join('/');
  }

  // Attachments Functions

  private setForm(model: CurrentAccountReceipt) {
    this.form = this.fb.group({
      block_edit: [],
      created_at: [],
      created_by_user_id: [],
      currency: [],
      current_account_id: [],
      deleted: [],
      deleted_by_user_id: [],
      entity_description: [],
      entity_ekklesia_location_id: [],
      entity_id: [],
      id: [],
      observations: [],
      payment_type_description: [],
      payment_type_id: [],
      receipt_date: [],
      serie_number: [],
      total_amount: [],
      treasury_location: [],
      updated_at: [],
      updated_by_user_id: [],
      current_accounts_receipts_lines: [],
      current_accounts_receipts_attachments: this.fb.array([]),
    });

    this.attachmentsFormArray = this.form.controls
      .current_accounts_receipts_attachments as FormArray;

    this.setFormValues(model);
  }

  private setFormValues(obj: any) {
    this.model = obj;
    Object.keys(obj).forEach((key: string) => {
      if (
        this.form.contains(key) &&
        !(this.form.get(key) instanceof FormArray)
      ) {
        this.form.get(key).patchValue(obj[key]);
      }
    });

    this.setInnerTable(
      obj.current_accounts_receipts_attachments,
      this.attachmentsFormArray,
      this.attachmentsDS
    );
  }

  setInnerTable(
    innerArray: any[] = [],
    formArray: FormArray,
    dataSource: TableDataSource<any>
  ) {
    formArray.clear();
    dataSource.data = formArray.value;
    if (innerArray?.length) {
      innerArray.forEach((elem: any) => {
        let newObj = { ...elem };
        this.addTableLine(newObj, formArray, dataSource);
      });
    }
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
      const newAttachment: CurrentAccountReceiptAttachment = {
        attachment: null,
        attachment_name: event.target.files[0].name,
        current_accounts_receipt_id: null,
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

  onSubmit() {
    this.uploadAttachments(this.attachmentsFormArray, this.attachmentsDS);
  }

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

  sendAttachment(file: File): Promise<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.fileManagerService.upload(fd).toPromise();
  }

  onFormValid(payload = this.form.getRawValue()) {
    if (this.validateAttachments()) {
      this.subs.push(
        this.currentAccountsReceiptsService.update(payload).subscribe(
          (r: any) => {
            this.store.dispatch(new this.actionRequestGetOne(this.id));
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.sucess_update_attachments`
              ),
              this.sharedModule.SUCCESS_COLOR
            );
          },
          (err) => {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.error_invalid_attachments`
              ),
              this.sharedModule.ERROR_COLOR
            );
          }
        )
      );
    } else {
      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_invalid_attachments`
        ),
        this.sharedModule.ERROR_COLOR
      );
    }
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
      'current_accounts_receipts_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.current_accounts_receipts_attachments
      .filter(
        (obj: CurrentAccountReceiptAttachment) =>
          !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: CurrentAccountReceiptAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }

  getAttachmentUrl(formControl: any): string {
    if (formControl.get('attachment').value) {
      return `${environment.railsAppUrl}/filemanagers/download?f=${
        formControl.get('attachment').value
      }&fn=${formControl.get('attachment_name').value}`;
    }
    return '';
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
}
