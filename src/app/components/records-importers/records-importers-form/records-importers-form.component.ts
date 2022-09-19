import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/records-importers.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/records-importers.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getRecordsImporter } from '../reducers/records-importers.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Title } from '@angular/platform-browser';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { CSVExporterService } from '@peakitpt/ui-kyrios-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kyr-records-importers-form',
  templateUrl: './records-importers-form.component.html',
})
export class RecordsImportersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<any>;
  modulePath = 'records-importers';
  appName = 'settings';

  selectorGetModel = getRecordsImporter;
  actionRequestFail =
    actions.RecordsImportersActionTypes.RequestFailRecordsImporters;
  actionRequestGetOne = actions.RequestGetRecordsImporter;
  actionRequestPut = actions.RequestPutRecordsImporter;
  actionSuccessPut =
    actions.RecordsImportersActionTypes.SuccessPutRecordsImporter;
  actionRequestPost = actions.RequestPostRecordsImporter;
  actionSuccessPost =
    actions.RecordsImportersActionTypes.SuccessPostRecordsImporter;
  actionRequestGetNew = actions.RequestGetNew;

  @ViewChild('kyriosTabTemplate') kyriosTabTemplate: TemplateRef<any>;
  @ViewChild('chapelryTabTemplate') chapelryTabTemplate: TemplateRef<any>;

  environment = environment;
  pagerMenu: any[] = [];
  importOptionsKyrios = [];
  importOptionsChapelry = [];
  currentFile: any;
  baseFilePath = environment.apiUploaderUrl;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public titleService: Title,
    public menuHelperService: MenuHelperService,
    private CSVExporterService: CSVExporterService,
    private http: HttpClient
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
      attachment: [null, Validators.required],
      attachment_filename: [null, Validators.required],
      importer_type: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.pagerMenu = this.sharedModule.getPagerMenu();

    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );

    this.isLoading = true;

    this.model$ = this.store.select(this.selectorGetModel);
    this.store.dispatch(new this.actionRequestGetNew());

    this.subs.push(
      this.model$.subscribe((obj: any) => {
        if (obj) {
          this.setFormValues(obj);
          this.isLoading = false;
        }
      })
    );

    this.importOptionsKyrios = [
      {
        value: 3,
        label: this.i18nextPipe.transform(this.modulePath + ':options.persons'),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform(
          this.modulePath + ':options.families'
        ),
      },
    ];
    this.importOptionsChapelry = [
      {
        value: 1,
        label: this.i18nextPipe.transform(
          this.modulePath + ':options.the_chapelry_sql'
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(
          this.modulePath + ':options.the_chapelry_mdb'
        ),
      },
    ];
  }

  ngAfterViewInit() {
    this.setFormTabs();
    this.setSideNav();
    this.subscribeForSavingActions();
    this.onAfterViewInit();
    this.modal.open();
  }

  setSideNav() {
    this.subs.push(
      this.menuHelperService
        .createSideMenuInterface(
          this.appName,
          this.modulePath,
          null,
          null,
          null,
          false
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  onSubmit() {
    this.isSaving = true;
    this.onFormValid();
  }

  onFormValid(payload = this.form.getRawValue()) {
    this.uploadCurrentFile();
    const uploadSubscribe = this.actionSubject
      .pipe(ofType(actions.RecordsImportersActionTypes.SuccessPostUploadFile))
      .subscribe((r: any) => {
        this.form.get('attachment').setValue(r.payload.file);
        this.form.get('attachment_filename').setValue(r.payload.name);

        const cleanForm = this.form.getRawValue();
        Object.keys(cleanForm).forEach((k) => {
          if (cleanForm[k] === null || cleanForm[k] === undefined) {
            delete cleanForm[k];
          }
        });
        this.store.dispatch(new this.actionRequestPost(cleanForm));
        uploadSubscribe.unsubscribe();
      });
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
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
          if (result.payload.error === 'no_website_found') {
            this.isLoading = false;
          } else if (result.payload instanceof RequestError) {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform('translation:message.error_401', {
                appName: environment.appName,
              }),
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.isLoading = true;

            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.save_success`
              ),
              this.sharedModule.SUCCESS_COLOR
            );

            this.store.dispatch(new this.actionRequestGetNew());
          }
        })
    );
  }

  closeModal() {
    this.modal.close();
  }

  setFormTabs() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.kyrios'),
        templateContent: this.kyriosTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.chapelry'
        ),
        templateContent: this.chapelryTabTemplate,
      },
    ];
  }

  changeFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentFile = event;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadCurrentFile() {
    const fd = new FormData();
    fd.append(
      'file',
      this.currentFile.target.files[0],
      this.currentFile.target.files[0].name
    );
    this.store.dispatch(new actions.RequestPostUploadFile(fd));
  }

  clearFileUploaded() {
    this.currentFile = null;
    this.form.get('attachment').setValue(null);
    this.form.get('attachment_filename').setValue(null);
    this.form.get('importer_type').setValue(null);
  }

  downloadPersons() {
    this.subs.push(
      this.CSVExporterService.exportCSV('parishioners').subscribe((r) => {
        this.openFileNewTab(r, 'parishioners');
      })
    );
  }

  downloadFamilies() {
    this.subs.push(
      this.CSVExporterService.exportCSV('families').subscribe((r) => {
        this.openFileNewTab(r, 'families');
      })
    );
  }

  openFileNewTab(file, name) {
    const fileR = new Blob([file], {
      type: file.type,
    });
    const fileURL = window.URL.createObjectURL(fileR);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = name + '.csv';
    link.click();
  }
}
