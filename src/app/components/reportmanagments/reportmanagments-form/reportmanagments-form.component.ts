import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder } from '@angular/forms';
import { State } from '../reducers/reportmanagments.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/reportmanagments.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getReportmanagment } from '../reducers/reportmanagments.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Title } from '@angular/platform-browser';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs/internal/Subscription';
import { ReportmanagmentsV2Service } from '@peakitpt/ui-kyrios-api';
import { Reportmanagment } from '../reportmanagment.model';

@Component({
  selector: 'kyr-reportmanagments-form',
  templateUrl: './reportmanagments-form.component.html',
  styleUrls: ['./reportmanagments-form.component.scss'],
})
export class ReportmanagmentsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<any>;
  modulePath = 'reportmanagments';
  appName = 'reporting';

  selectorGetModel = getReportmanagment;
  actionRequestFail =
    actions.ReportmanagmentsActionTypes.RequestFailReportmanagments;
  actionRequestGetOne = actions.RequestGetAll;
  actionRequestPut = actions.RequestPutReportmanagment;
  actionSuccessPut =
    actions.ReportmanagmentsActionTypes.SuccessPutReportmanagment;
  actionRequestPost = actions.RequestPostReportmanagment;
  actionSuccessPost =
    actions.ReportmanagmentsActionTypes.SuccessPostReportmanagment;
  actionRequestGetNew = actions.RequestGetNew;

  modulesModel = [];

  environment = environment;
  pagerMenu: any[] = [];
  importOptionsKyrios = [];
  importOptionsChapelry = [];
  currentImage = {
    file: null,
    cover: null,
    attachment_filename: null,
    thumbnail: null,
  };
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
    private reportmanagmentsV2Service: ReportmanagmentsV2Service
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
      address_footer: [],
      arciprestship_header: [],
      attachment: [],
      attachment_filename: [],
      chapelry_header: [],
      contacts_footer: [],
      created_by_user_id: [],
      deleted_by_user_id: [],
      entity_id: [],
      id: [],
      img_header_url: [],
      updated_by_user_id: [],
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

    this.isLoading = false;

    this.subs.push(
      this.reportmanagmentsV2Service
        .getReportmanagmentsId()
        .subscribe((r: Reportmanagment) => {
          // I need to get the id from another http request since
          // some browsers like safari do not deal well with
          // redirections
          this.model$ = this.store.select(this.selectorGetModel);
          this.store.dispatch(new actions.RequestGetReportmanagment(r.id));

          this.subs.push(
            this.model$.subscribe((obj: any) => {
              if (obj) {
                this.setFormValues(obj);
                this.currentImage.thumbnail = this.getInitialImagePath();
                this.isLoading = false;
              }
            })
          );
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

    this.modulesModel = [
      {
        name: this.i18nextPipe.transform('reports-groups:module.name_many'),
        value: 'reports-groups',
      },
      {
        name: this.i18nextPipe.transform('reports:module.name_many'),
        value: 'reports',
      },
      {
        name: this.i18nextPipe.transform('reports-groupers:module.name_many'),
        value: 'reports-groupers',
      },
    ];
  }

  ngAfterViewInit() {
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
    if (this.currentImage.file) {
      this.uploadImage();
      const uploadSubscribe = this.actionSubject
        .pipe(ofType(actions.ReportmanagmentsActionTypes.SuccessPostUploadFile))
        .subscribe((r: any) => {
          this.form.get('attachment').setValue(r.payload.file);
          this.form.get('attachment_filename').setValue(r.payload.name);
          this.form.get('img_header_url').setValue(r.payload.path_url);

          const cleanForm = this.form.getRawValue();
          this.store.dispatch(new this.actionRequestPost(cleanForm));
          uploadSubscribe.unsubscribe();
        });
    } else {
      const cleanForm = this.form.getRawValue();
      this.store.dispatch(new this.actionRequestPost(cleanForm));
    }
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

            this.store.dispatch(new actions.RequestGetReportmanagment(this.id));
          }
        })
    );
  }

  closeModal() {
    this.modal.close();
  }

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImage.file = event;
        this.currentImage.attachment_filename = event.target.files[0].name;
        this.currentImage.thumbnail = eventReader.target.result;
        // this.uploadImage();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadImage() {
    const fd = new FormData();
    fd.append(
      'file',
      this.currentImage.file.target.files[0],
      this.currentImage.file.target.files[0].name
    );
    this.store.dispatch(new actions.RequestPostUploadFile(fd));
  }

  successChangeImage(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.ReportmanagmentsActionTypes.SuccessPostUploadFile))
      .subscribe((r: any) => {
        this.form.get('attachment').setValue(r.payload.file);
        this.form.get('attachment_filename').setValue(r.payload.name);
        this.form.get('img_header_url').setValue(r.payload.path_url);
      });
  }

  modulesMenuClick(event: any) {
    this.router.navigate([event]);
    this.modal.close();
  }

  private getInitialImagePath() {
    return `${environment.railsAppUrl}/filemanagers/download?f=${this.form.value.attachment}&fn=${this.form.value.attachment_filename}`;
  }
}
