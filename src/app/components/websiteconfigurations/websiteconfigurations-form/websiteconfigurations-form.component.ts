import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/websiteconfigurations.reducer';
import { State as ContentsState } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { State as SectionsState } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.reducer';
import { Observable, Subscription } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/websiteconfigurations.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getWebsiteconfiguration } from '../reducers/websiteconfigurations.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Title } from '@angular/platform-browser';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { getContentsSelected } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.selectors';
import { getSectionsSelected } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-websiteconfigurations-form',
  templateUrl: './websiteconfigurations-form.component.html',
  styleUrls: ['./websiteconfigurations-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WebsiteconfigurationsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<any>;
  modulePath = 'websiteconfigurations';
  appName = 'cms';
  baseFilePath = environment.railsAppUrl;

  selectorGetModel = getWebsiteconfiguration;
  actionRequestFail =
    actions.WebsiteconfigurationsActionTypes.RequestFailWebsiteconfigurations;
  actionRequestGetOne = actions.RequestGetWebsiteconfiguration;
  actionRequestPut = actions.RequestPutWebsiteconfiguration;
  actionSuccessPut =
    actions.WebsiteconfigurationsActionTypes.SuccessPutWebsiteconfiguration;
  actionRequestPost = actions.RequestPostWebsiteconfiguration;
  actionSuccessPost =
    actions.WebsiteconfigurationsActionTypes.SuccessPostWebsiteconfiguration;

  environment = environment;
  contentsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  sectionsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  pagerMenu: any[] = [];

  imageChanged: any;
  currentImagePath = {
    cover: null,
    attachment_filename: null,
    thumbnail: null,
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
    public titleService: Title,
    public menuHelperService: MenuHelperService,
    private contentsStore: Store<ContentsState>,
    private sectionsStore: Store<SectionsState>
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
      app_share: [false],
      block_remove: [],
      confessions_content_description: [],
      confessions_content_id: [],
      conteudo_ano_pastoral_description: [],
      conteudo_ano_pastoral_id: [],
      conteudo_informacoes_description: [],
      conteudo_informacoes_id: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [],
      deleted_by_user_id: [],
      email: [null, Validators.pattern(this.sharedModule.PATTERN_EMAIL)],
      entity_ekklesia_location_id: [],
      id: [],
      masses_content_description: [],
      masses_content_id: [],
      parish_notary_content_description: [],
      parish_notary_content_id: [],
      seccao_boletim_description: [],
      seccao_boletim_id: [],
      seccao_noticias_description: [],
      seccao_noticias_id: [],
      sync_at: [],
      updated_at: [],
      updated_by_user_id: [],
      url: [],
      url_facebook: [],
      url_soundcloud: [],
      url_twitter: [],
      url_youtube: [],
      visits_to_the_sicks_content_description: [],
      visits_to_the_sicks_content_id: [],
      how_to_help_content_description: [],
      how_to_help_content_id: [],
      header_url: [],
      header_filename: [],
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.pagerMenu = this.sharedModule.getPagerMenu();
    this.setContentsModal();
    this.setSectionsModal();

    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );

    this.isLoading = true;

    this.model$ = this.store.select(this.selectorGetModel);
    this.store.dispatch(new this.actionRequestGetOne());

    this.subs.push(
      this.model$.subscribe((obj: any) => {
        if (obj) {
          this.setFormValues(obj);
          this.isLoading = false;
        }
      })
    );
  }

  ngAfterViewInit() {
    this.setSideNav();
    this.subscribeForSavingActions();
    this.onAfterViewInit();
    this.modal.open();
  }

  onAfterViewInit() {
    this.subs.push(this.successChangeImage());
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

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_content_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_content': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('contents', id);
          }
        }
        break;
      }
      case 'clear_section_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_section': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('sections', id);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  onFormValid(payload = this.form.getRawValue()) {
    // Image
    if (
      this.form.get('header_filename').value === null ||
      this.form.get('header_filename').value === undefined
    ) {
      this.form.get('header_filename').setValue(null);
    }

    if (this.form.value.id) {
      this.store.dispatch(new this.actionRequestPut(payload));
    } else {
      const cleanForm = payload;
      Object.keys(cleanForm).forEach((k) => {
        if (cleanForm[k] === null || cleanForm[k] === undefined) {
          delete cleanForm[k];
        }
      });
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
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.no_website_found`
              ),
              this.sharedModule.SUCCESS_COLOR
            );
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

            this.store.dispatch(new this.actionRequestGetOne());
          }
        })
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.form.get('header_url').value && this.imageChanged) {
        // this will triger successChangeImage() which will first upload the image, and then
        // will go to onFormValid()
        this.dispatchImage();
      } else {
        this.onFormValid();
      }
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // Image
  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImagePath.attachment_filename = event.target.files[0].name;
        this.currentImagePath.thumbnail = eventReader.target.result;

        this.imageChanged = event;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  dispatchImage() {
    const fd = new FormData();
    fd.append(
      'file',
      this.imageChanged.target.files[0],
      this.imageChanged.target.files[0].name
    );
    this.store.dispatch(new actions.RequestPostHeaderImage(fd));
  }

  successChangeImage(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(actions.WebsiteconfigurationsActionTypes.SuccessPostHeaderImage)
      )
      .subscribe((r: any) => {
        if (r.payload.name === this.currentImagePath?.attachment_filename) {
          this.currentImagePath.cover = r.payload.filePath;
          this.form.get('header_filename').setValue(r.payload.name);
          this.form.get('header_url').setValue(r.payload.path_url);

          this.onFormValid();
        }
      });
  }

  private setContentsModal() {
    this.contentsMenuOptions = this.defaultModalMenu('content');

    // When a row is selected
    this.subs.push(
      this.contentsStore
        .select(getContentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.title);
          }
        })
    );
  }

  private setSectionsModal() {
    this.sectionsMenuOptions = this.defaultModalMenu('section');

    // When a row is selected
    this.subs.push(
      this.sectionsStore
        .select(getSectionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.description);
          }
        })
    );
  }

  closeModal() {
    this.modal.close();
  }
}
