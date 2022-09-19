import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/nominations.actions';
import { getNomination } from '../reducers/nominations.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Attachment, Nomination } from '../nomination.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';

import { getPriestsV1Selected } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.selectors';
import * as PriestsV1State from '../../../shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import * as CuriaFunctionsState from '../../../shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { FileManagerService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-nominations-form',
  templateUrl: './nominations-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NominationsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Nomination>;
  modulePath = 'nominations';
  preFillWithNew = true;

  selectorGetModel = getNomination;
  actionRequestFail = actions.NominationsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.NominationsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.NominationsActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;

  // TABS
  @ViewChild('clergyNominationTabsTemplate')
  clergyNominationTabsTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabsTemplate')
  attachmentsTabsTemplate: TemplateRef<any>;

  // TABLE VARIABLES
  attachmentColumns: any[] = [];
  attachmentDS: TableDataSource<any> = new TableDataSource([]);
  attachmentFormArray: FormArray = new FormArray([]);
  newAttachmentLine = {
    attachment: [null, Validators.required],
    attachment_description: [null, Validators.required],
    attachment_filename: [null, Validators.required],
    created_at: null,
    id: null,
    nomination_id: null,
    updated_at: null,
    _destroy: false,
    __tmpFile: null,
  };
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('uploadTemplate')
  uploadTemplate: TemplateRef<any>;
  @ViewChild('attachmentFilenameTemplate')
  attachmentFilenameTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

  // Select Options
  nominationsTypesOptions: any[] = [];

  // Quick Insert Menus
  priestsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  curiaFunctionsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  parishionersQueryStringParams = {
    modal: true,
    entity_type: 'Locals',
    translatable: true,
    serialize: 'parishioners_complete_relation',
    documents: true,
  };

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private priestsV1Store: Store<PriestsV1State.State>,
    private parishionersStore: Store<ParishionersState.State>,
    private curiaFunctionsStore: Store<CuriaFunctionsState.State>,
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

  ngOnInit() {
    super.ngOnInit();
    this.setNominationsTypes();
    this.setPriestsModal();
    this.setParishionersModal();
    this.setCuriaFunctionsModal();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.setFormTabs();
  }

  initializeForm() {
    this.form = this.fb.group({
      bishop_description: [null, Validators.required],
      bishop_id: [null, Validators.required],
      birth_place: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [],
      deleted_by_user_id: [],
      enabled: [],
      entity_ekklesia_location_id: [],
      entity_priest_description: [null, Validators.required],
      entity_priest_id: [null, Validators.required],
      expiration_date: [],
      function_description: [null, Validators.required],
      function_details: [],
      function_id: [null, Validators.required],
      id: [],
      moderator_description: [],
      moderator_id: [],
      nomination_attachments: this.fb.array([]),
      nomination_date: [null, Validators.required],
      nomination_type_id: [null, Validators.required],
      observations: [],
      place_description: [null, Validators.required],
      place_id: [null, Validators.required],
      serie_number: [],
      subscriber1_description: [null, Validators.required],
      subscriber1_id: [null, Validators.required],
      subscriber2_description: [null, Validators.required],
      subscriber2_id: [null, Validators.required],
      updated_at: [],
      updated_by_user_id: [],
    });

    this.attachmentFormArray = this.form.controls
      .nomination_attachments as FormArray;
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
    this.setAttachments(obj.nomination_attachments);
  }

  onAfterViewInit() {
    super.onAfterViewInit();
    this.buildAttachmentsTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_priests_modal': {
        this.form.get(`${inputName}_id`).setValue(null);
        this.form.get(`${inputName}_description`).setValue(null);
        break;
      }
      case 'view_selected_priests': {
        if (this.form.get(`${inputName}_id`).value) {
          this.openDetails('priests', this.form.get(`${inputName}_id`).value);
        }
        break;
      }

      case 'clear_parishioners_modal': {
        this.form.get(`${inputName}_id`).setValue(null);
        this.form.get(`${inputName}_description`).setValue(null);
        break;
      }
      case 'view_selected_parishioners': {
        if (this.form.get(`${inputName}_id`).value) {
          this.openDetails(
            'parishioners',
            this.form.get(`${inputName}_id`).value
          );
        }
        break;
      }

      case 'clear_curia-functions_modal': {
        this.form.get(`${inputName}_id`).setValue(null);
        this.form.get(`${inputName}_description`).setValue(null);
        break;
      }
      case 'view_selected_curia-functions': {
        if (this.form.get(`${inputName}_id`).value) {
          this.openDetails(
            'curia-functions',
            this.form.get(`${inputName}_id`).value
          );
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
          this.modulePath + ':tabs.clergy_nomination'
        ),
        templateContent: this.clergyNominationTabsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.attachments'
        ),
        templateContent: this.attachmentsTabsTemplate,
      },
    ];
  }

  onSubmit() {
    this.isSaving = true;

    if (this.form.valid && this.attachmentFormArray.valid) {
      this.uploadFilesList().then((r) => {
        this.onFormValid();
      });
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setAttachments(attachments: Attachment[] = []) {
    this.attachmentFormArray.clear();
    this.attachmentDS.data = this.attachmentFormArray.value;
    if (attachments?.length) {
      attachments.forEach((attachment: Attachment) => {
        if (this.duplicateMode) {
          attachment = { ...attachment, id: null };
        }
        this.addTableLine(
          attachment,
          this.attachmentFormArray,
          this.attachmentDS
        );
      });
    }
  }

  private setNominationsTypes() {
    this.nominationsTypesOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.parishioner`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.not_parishioner`
        ),
        value: 2,
      },
    ];
  }

  private setPriestsModal() {
    this.priestsMenuOptions = this.defaultModalMenu('priests');

    // When a row is selected
    this.subs.push(
      this.priestsV1Store
        .select(getPriestsV1Selected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.entity.name);
            if (row.inputName === 'entity_priest') {
              this.form
                .get(`birth_place`)
                .setValue(row.model.birth_chapelry_description);
            }
          }
        })
    );
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioners');

    // When a row is selected
    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.complete_relation);
          }
        })
    );
  }

  private setCuriaFunctionsModal() {
    this.curiaFunctionsMenuOptions = this.defaultModalMenu('curia-functions');

    // When a row is selected
    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.name);
          }
        })
    );
  }

  private buildAttachmentsTableColumns() {
    setTimeout(() => {
      this.attachmentColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
        },
        {
          id: 'upload_file',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.nomination_attachments.attachment_filename`
            ) + ' *',
          sortable: false,
          template: this.uploadTemplate,
        },
        {
          id: 'attachment_filename',
          sortable: false,
          template: this.attachmentFilenameTemplate,
        },
        {
          id: 'attachment_description',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.nomination_attachments.attachment_description`
            ) + ' *',
          sortable: false,
          template: this.attachmentDescriptionTemplate,
        },
      ];
    });
  }

  addFileToList(file, index) {
    if (file.target.files && file.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.attachmentFormArray
          .get([index, 'attachment_filename'])
          .setValue(file.target.files[0].name);

        if (!this.attachmentFormArray.get([index, '__tmpFile'])) {
          (this.attachmentFormArray.controls[index] as FormGroup).addControl(
            '__tmpFile',
            this.fb.control(file, Validators.required)
          );
        }
        this.attachmentFormArray.get([index, '__tmpFile']).setValue(file);
      };
      reader.readAsDataURL(file.target.files[0]);
    }
  }

  uploadFilesList(): Promise<any> {
    return new Promise((resolve) => {
      let uploadedFilesCount = 0;
      let uploadedFilesMax = 0;

      // Get Files to Upload
      this.attachmentFormArray.value.forEach((attachment) => {
        if (
          attachment.__tmpFile !== null &&
          attachment.__tmpFile !== undefined
        ) {
          uploadedFilesMax++;
        }
      });

      if (uploadedFilesMax === 0) {
        resolve('no files to upload');
      }

      // Upload Files Individually
      this.attachmentFormArray.value.forEach((attachment, index) => {
        if (
          attachment.__tmpFile !== null &&
          attachment.__tmpFile !== undefined
        ) {
          const fd = new FormData();
          fd.append(
            'file',
            attachment.__tmpFile.target.files[0],
            attachment.__tmpFile.target.files[0].name
          );

          this.subs.push(
            this.fileManagerService.upload(fd).subscribe(
              (r) => {
                uploadedFilesCount++;
                this.attachmentFormArray
                  .get([index, 'attachment'])
                  .setValue(r.file);
                this.afterAttachmentUpload(index);
                if (uploadedFilesCount === uploadedFilesMax) {
                  resolve('resolved');
                }
              },
              (err) => {
                uploadedFilesCount++;
                this.afterAttachmentUpload(index);
                if (uploadedFilesCount === uploadedFilesMax) {
                  resolve('resolved');
                }
              }
            )
          );
        } else {
          this.afterAttachmentUpload(index);
        }
      });
    });
  }

  afterAttachmentUpload(index: number) {
    (this.attachmentFormArray.controls[index] as FormGroup).removeControl(
      '__tmpFile'
    );
  }

  getPriestsQueryStringParams(inputName: string): any {
    let res = null;
    switch (inputName) {
      case 'bishop':
        res = {
          group_id: 3,
        };
        break;
      case 'subscriber1':
      case 'subscriber2':
        res = {
          can_sign: true,
        };
        break;
    }

    return res;
  }
}
