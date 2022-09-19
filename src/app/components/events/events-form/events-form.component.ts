import { Hashtag, FotogaleryContent, DownloadContent } from './../event.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  Validators,
  FormArray,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableDataSource, SnackBarService } from '@peakitpt/ui-material';
import { getEvent } from '../reducers/events.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Event } from '../event.model';
import { ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';

import { SelectedModalRow } from 'src/app/shared/shared.model';
import * as actions from '../reducers/events.actions';
import { Store, ActionsSubject } from '@ngrx/store';
import { State } from '../reducers/events.reducer';
import { State as ContentsState } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getContentsSelected } from './../../../shared/components/modals/contents-modal/reducers/contents-modal.selectors';
import { ContentRelation, Registration } from './../../contents/content.model';
import { I18NextPipe } from 'angular-i18next';
import { TextareCKEditorComponent } from '@peakitpt/ui-material/components/text-area-ckeditor/text-area-ckeditor.component';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import normalizeText from 'normalize-text';


@Component({
  selector: 'kyr-events-form',
  templateUrl: './events-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EventsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  environment = environment;
  model$: Observable<Event>;
  modulePath = 'events';
  baseFilePath = environment.apiUploaderUrl;

  selectorGetModel = getEvent;
  actionRequestFail = actions.EventsActionTypes.RequestFailEvents;
  actionRequestGetAll = actions.RequestGetAllEvents;
  actionRequestGetOne = actions.RequestGetEvent;
  actionRequestPut = actions.RequestPutEvent;
  actionSuccessPut = actions.EventsActionTypes.SuccessPutEvent;
  actionRequestPost = actions.RequestPostEvent;
  actionSuccessPost = actions.EventsActionTypes.SuccessPostEvent;

  // TEMPLATES
  @ViewChild('eventTemplate') eventTemplate: TemplateRef<any>;
  @ViewChild('registrationsTemplate') registrationsTemplate: TemplateRef<any>;
  @ViewChild('contentRowTemplate') contentRowTemplate: TemplateRef<any>;
  @ViewChild('relatedContentsTemplate')
  relatedContentsTemplate: TemplateRef<any>;
  @ViewChild('fotogaleryTemplate') fotogaleryTemplate: TemplateRef<any>;
  @ViewChild('downloadsTemplate') downloadsTemplate: TemplateRef<any>;
  @ViewChild('deleteContentTemplate') deleteContentTemplate: TemplateRef<any>;
  @ViewChild('deleteFotogaleryTemplate')
  deleteFotogaleryTemplate: TemplateRef<any>;
  @ViewChild('deleteDownloadTemplate') deleteDownloadTemplate: TemplateRef<any>;
  @ViewChild('fotogaleryThumbnailTemplate')
  fotogaleryThumbnailTemplate: TemplateRef<any>;
  @ViewChild('fotogaleryAuthorTemplate')
  fotogaleryAuthorTemplate: TemplateRef<any>;
  @ViewChild('fotogaleryCaptionTemplate')
  fotogaleryCaptionTemplate: TemplateRef<any>;
  @ViewChild('downloadDescriptionTemplate')
  downloadDescriptionTemplate: TemplateRef<any>;
  @ViewChild('deleteRegistrationTemplate')
  deleteRegistrationTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsNameTemplate')
  contentsRegistrationsNameTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsEmailTemplate')
  contentsRegistrationsEmailTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsPhoneTemplate')
  contentsRegistrationsPhoneTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsNrOfPeopleTemplate')
  contentsRegistrationsNrOfPeopleTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsObservationsTemplate')
  contentsRegistrationsObservationsTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsConfirmedTemplate')
  contentsRegistrationsConfirmedTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsHistoryTemplate')
  contentsRegistrationsHistoryTemplate: TemplateRef<any>;
  @ViewChild('contentsRegistrationsPresentTemplate')
  contentsRegistrationsPresentTemplate: TemplateRef<any>;

  // Text Areas
  @ViewChild('contentTextEditor')
  contentTextEditor: TextareCKEditorComponent;

  selectedModal$: Observable<SelectedModalRow>;

  model: any;
  // Contents
  contentsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  relatedContentColumns: any[] = [];
  relatedContentDS: TableDataSource<any> = new TableDataSource([]);
  relatedContentsFormArray: FormArray = new FormArray([]);
  newRelatedContent = {
    content_rel_description: null,
    content_rel_id: null,
  };
  // Registrations
  registrationsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  registrationColumns: any[] = [];
  registrationDS: TableDataSource<any> = new TableDataSource([]);
  registrationsFormArray: FormArray = new FormArray([]);
  newRegistration = {
    confirmed: false,
    content_id: null,
    email: null,
    entity_description: null,
    entity_id: null,
    id: null,
    name: null,
    nr_of_people: 1,
    observations: null,
    phone: null,
    present: false,
    qr_code_path: null,
  };
  isNotifying = false;
  // Hashtags
  hashtagsList = [];
  // Thumbnail
  currentImagePath = {
    cover: null,
    attachment_filename: null,
    thumbnail: null,
  };
  // Fotogalery
  fotogaleryFormControl = new FormControl();
  fotogaleryDS: TableDataSource<any> = new TableDataSource([]);
  fotogaleryColumns: any[] = [];
  fotogaleryFormArray: FormArray = new FormArray([]);
  imageQueued: any;
  // Downloads
  downloadsFormControl = new FormControl();
  downloadsDS: TableDataSource<any> = new TableDataSource([]);
  downloadsColumns: any[] = [];
  downloadsFormArray: FormArray = new FormArray([]);
  fileQueued: any;

  // History Modal
  openHistoryModal: boolean = false;
  historyModalData: any;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private contentsStore: Store<ContentsState>,
    private personsStore: Store<PersonsState>
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
      id: [],
      title: [null, Validators.required],
      content: [null],
      block_remove: [false],
      attachment: [],
      attachment_filename: [],
      author: [],
      content_type_id: [],
      contents_attachments: this.fb.array([]),
      contents_contents: this.fb.array([]),
      contents_fotogaleries: this.fb.array([]),
      contents_hashtags: [],
      cover: [],
      cover_author: [],
      cover_filename: [],
      cover_locale: [],
      entity_ekklesia_location_id: [],
      locale: [],
      notification_sent_at: [],
      online: [true],
      event_from_date: [null, Validators.required],
      event_to_date: [],
      event_from_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      event_to_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      online_from_date: [new Date()],
      online_to_date: [],
      online_from_hour: [
        this.sharedModule.getFormattedHour(),
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      online_to_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      contents_registrations: this.fb.array([]),
      accept_registrations: [false],
      limited_spaces: [1, Validators.compose([this.notNegative])],
      occupied_spaces: [0],
      registrations_start: [],
      registrations_start_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      registrations_end: [],
      registrations_end_hour: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      resume: [],
      send_notification: [false],
      notification_sent_at_date: [],
      send_scheduled_notification: [false],
      scheduled_notification_date_to_send: [],
      scheduled_notification_hour_to_send: [
        this.sharedModule.getFormattedHour(),
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      scheduled_notification_sent_at_date: [],
      slug: [],
    });

    this.relatedContentsFormArray = this.form.get(
      'contents_attachments'
    ) as FormArray;
    this.registrationsFormArray = this.form.get(
      'contents_registrations'
    ) as FormArray;
  }

  ngOnInit() {
    super.ngOnInit();
    this.setRelatedContentsModal();
    this.setPersonsModal();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    this.model = obj;
    this.setHashtags();
    this.setRelatedContents(obj.contents_contents);
    this.setRegistrations(obj.contents_registrations);
    this.setFotogalery();
    this.setDownloads();
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
            this.isNotifying = false;
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

            if (this.saveAndNew) {
              this.saveAndNew = false;
              this.isLoading = false;
              this.modal.close();
              this.router
                .navigate([this.modulePath])
                .then(() => this.router.navigate([this.modulePath, 'new']));
            } else if (this.isNotifying) {
              this.notifyPeople();
            } else if (result.payload.id) {
              this.modal.close();
              this.router.navigate([
                this.modulePath,
                result.payload.id,
                'details',
              ]);
            } else {
              this.modal.close();
            }
          }
        })
    );

    this.subs.push(
      this.actionSubject
        .pipe(ofType(actions.EventsActionTypes.SuccessNotifyEvents))
        .subscribe((result: any) => {
          this.isNotifying = false;
          if (result.payload instanceof RequestError) {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform('translation:message.error_401', {
                appName: environment.appName,
              }),
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.notification_complete`
              ),
              this.sharedModule.SUCCESS_COLOR
            );
          }
        })
    );
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.event`),
        templateContent: this.eventTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.registrations`
        ),
        templateContent: this.registrationsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.related-content`
        ),
        templateContent: this.relatedContentsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.fotogalery`
        ),
        templateContent: this.fotogaleryTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.downloads`
        ),
        templateContent: this.downloadsTemplate,
      },
    ];

    // this.subs.push(this.successUploadFileToContent());
    this.subs.push(this.successChangeImage());
    this.buildRelatedContentTableColumns();
    this.subs.push(this.successFotogaleryUpload());
    this.buildFotogaleryTableColumns();
    this.subs.push(this.successAddDownload());
    this.buildDownloadsTableColumns();
    this.isNotifying = false;
    this.buildRegistrationTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'save_new': {
        this.saveAndNew = true;
        this.onSubmit();
        break;
      }
      case 'delete': {
        if (this.id) {
          this.router.navigate([this.modulePath, this.id, 'edit', 'delete']);
        }
        break;
      }
      case 'clear_content_modal': {
        if (inputName) {
          // Table's modal
          const tableIndex = this.getInputNameIndex(inputName);

          this.relatedContentsFormArray
            .get([tableIndex, 'content_rel_id'])
            .setValue(null);
          this.relatedContentsFormArray
            .get([tableIndex, 'content_rel_description'])
            .setValue(null);
        }
        break;
      }
      case 'view_selected_content': {
        if (inputName) {
          let id: number;

          // Table's modal
          id = this.relatedContentsFormArray.get([
            this.getInputNameIndex(inputName),
            'content_rel_id',
          ]).value;

          if (id) {
            this.openDetails('contents', id);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  onSubmit() {
    this.isSaving = true;

    this.appendAttachmentImage();
    this.appendContentsToForm();
    this.appendHastagsToForm();
    this.appendFotogaleryToForm();
    this.appendDownloadsToForm();
    this.appendRegistrationsToForm();

    if (this.form.valid && this.relatedContentsFormArray.valid) {
      if(this.form.get('slug').value){
        this.affectField('slug', this.createSlug(this.form.get('slug').value));
      }else{
        this.affectField('slug', this.createSlug(this.form.get('title').value));
      }
      this.onFormValid();
    } else {
      this.isSaving = false;

      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform('translation:message.form_errors'),
        this.sharedModule.ERROR_COLOR
      );
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  createSlug(title: string) {
    let slug = normalizeText(title);
    slug = slug.replace(/\s+/g, '-');
    return slug
  }

  private setRelatedContents(relatedContents: ContentRelation[] = []) {
    this.relatedContentsFormArray.clear();
    this.relatedContentDS.data = this.relatedContentsFormArray.value;
    if (relatedContents?.length) {
      relatedContents.forEach((rc: ContentRelation) => {
        const item = {
          content_rel_description: rc.content_rel_description,
          content_rel_id: rc.content_rel_id,
        };
        this.addTableLine(
          item,
          this.relatedContentsFormArray,
          this.relatedContentDS
        );
      });
    }
  }

  private setRegistrations(registrations: Registration[] = []) {
    this.registrationsFormArray.clear();
    this.registrationDS.data = this.registrationsFormArray.value;
    if (registrations?.length) {
      registrations.forEach((reg: Registration) => {
        const item = {
          confirmed: reg.confirmed ? reg.confirmed : false,
          content_id: reg.content_id,
          email: reg.email,
          entity_description: reg.entity_description,
          entity_id: reg.entity_id,
          id: reg.id,
          name: reg.name,
          nr_of_people: reg.nr_of_people,
          observations: reg.observations,
          phone: reg.phone,
          present: reg.present,
          qr_code_path: reg.qr_code_path,
        };
        this.addTableLine(
          item,
          this.registrationsFormArray,
          this.registrationDS
        );
      });
    }
  }

  private setHashtags() {
    this.hashtagsList = [];
    this.model.contents_hashtags.forEach((tag: Hashtag) => {
      this.hashtagsList.push({
        id: tag.id,
        label: tag.tag,
        selected: true,
      });
    });
  }

  private setFotogalery() {
    this.fotogaleryFormArray.clear();
    this.fotogaleryDS.data = this.fotogaleryFormArray.value;
    if (this.model.contents_fotogaleries?.length) {
      this.fotogaleryDS.data = this.model.contents_fotogaleries;

      this.fotogaleryDS.data.forEach((fotogaleryContent: FotogaleryContent) => {
        this.fotogaleryFormArray.push(this.fb.group(fotogaleryContent));
      });
    }
  }

  private setDownloads() {
    this.downloadsFormArray.clear();
    this.downloadsDS.data = this.downloadsFormArray.value;
    if (this.model.contents_attachments?.length) {
      this.downloadsDS.data = this.model.contents_attachments;

      this.downloadsDS.data.forEach((fe: DownloadContent) => {
        this.downloadsFormArray.push(
          this.fb.group({
            attachment_url_filename: fe.attachment_url_filename,
            id: fe.id,
            attachment_url: fe.attachment_url,
            link_description: fe.link_description,
          })
        );
      });
    }
  }

  private buildRelatedContentTableColumns() {
    setTimeout(() => {
      this.relatedContentColumns = [
        {
          id: 'delete-btn',
          filter: false,
          sortable: false,
          template: this.deleteContentTemplate,
        },
        {
          id: 'contents',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.content`) +
            ' *',
          filter: false,
          sortable: false,
          template: this.contentRowTemplate,
        },
      ];
    });
  }

  private buildRegistrationTableColumns() {
    setTimeout(() => {
      this.registrationColumns = [
        {
          id: 'delete-btn',
          filter: false,
          sortable: false,
          template: this.deleteRegistrationTemplate,
        },
        {
          id: 'contentsRegistrationsName',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.name`) + ' *',
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsNameTemplate,
        },
        {
          id: 'contentsRegistrationsEmail',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.email`),
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsEmailTemplate,
        },
        {
          id: 'contentsRegistrationsPhone',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.phone`),
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsPhoneTemplate,
        },
        {
          id: 'contentsRegistrationsNrOfPeople',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.nr_of_people`
            ) + ' *',
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsNrOfPeopleTemplate,
        },
        {
          id: 'contentsRegistrationsObservations',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.observations`
          ),
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsObservationsTemplate,
        },
        {
          id: 'contentsRegistrationsConfirmed',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.confirmed`
          ),
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsConfirmedTemplate,
        },
        {
          id: 'contentsRegistrationsHistory',
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsHistoryTemplate,
        },
        {
          id: 'contentsRegistrationsPresent',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.present`),
          filter: false,
          sortable: false,
          template: this.contentsRegistrationsPresentTemplate,
        },
      ];
    });
  }

  private buildFotogaleryTableColumns() {
    setTimeout(() => {
      this.fotogaleryColumns = [
        {
          id: 'delete-btn',
          filter: false,
          sortable: false,
          template: this.deleteFotogaleryTemplate,
        },
        {
          id: 'image_url_filename',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.image_url_filename`
          ),
          filter: false,
          sortable: false,
        },
        {
          id: 'thumbnail',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.thumbnail`
          ),
          filter: false,
          sortable: false,
          template: this.fotogaleryThumbnailTemplate,
        },
        {
          id: 'author',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.author`),
          filter: false,
          sortable: false,
          template: this.fotogaleryAuthorTemplate,
        },
        {
          id: 'caption',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.caption`),
          filter: false,
          sortable: false,
          template: this.fotogaleryCaptionTemplate,
        },
      ];
    });
  }

  private buildDownloadsTableColumns() {
    setTimeout(() => {
      this.downloadsColumns = [
        {
          id: 'delete-btn',
          filter: false,
          sortable: false,
          template: this.deleteDownloadTemplate,
        },
        {
          id: 'attachment_url_filename',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.download_filename`
          ),
          filter: false,
          sortable: false,
        },
        {
          id: 'download_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          filter: false,
          sortable: false,
          template: this.downloadDescriptionTemplate,
        },
      ];
    });
  }

  removeFotogalery(index: number) {
    const currentFotogalery = [...this.fotogaleryDS.data];

    if (currentFotogalery[index].id) {
      currentFotogalery[index] = {
        ...currentFotogalery[index],
        ...{ _destroy: true },
      };
    } else {
      currentFotogalery.splice(index, 1);
    }

    this.fotogaleryDS.data = currentFotogalery;

    this.fotogaleryFormArray.clear();
    this.fotogaleryDS.data.forEach((fotoContent: FotogaleryContent) => {
      this.fotogaleryFormArray.push(this.fb.group(fotoContent));
    });
  }

  removeDownload(index: number) {
    const currentDownload = [...this.downloadsDS.data];

    if (currentDownload[index].id) {
      currentDownload[index] = {
        ...currentDownload[index],
        ...{ _destroy: true },
      };
    } else {
      currentDownload.splice(index, 1);
    }

    this.downloadsDS.data = currentDownload;

    this.downloadsFormArray.clear();
    this.downloadsDS.data.forEach((downContent: DownloadContent) => {
      this.downloadsFormArray.push(this.fb.group(downContent));
    });
  }

  setRelatedContentsModal() {
    this.contentsMenuOptions = this.defaultModalMenu('content');

    // When a row is selected
    this.subs.push(
      this.contentsStore
        .select(getContentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('contents')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.relatedContentsFormArray,
                this.relatedContentDS,
                [
                  {
                    control: 'content_rel_id',
                    value: row.model.id,
                  },
                  {
                    control: 'content_rel_description',
                    value: row.model.title,
                  },
                ]
              );
            }
          }
        })
    );
  }

  setPersonsModal() {
    this.registrationsMenuOptions = this.defaultModalMenu('registrations');

    // When a row is selected
    this.subs.push(
      this.personsStore
        .select(getPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.updateTableValues(
              this.getInputNameIndex(row.inputName),
              this.registrationsFormArray,
              this.registrationDS,
              [
                {
                  control: 'email',
                  value: row.model.entity.email,
                },
                {
                  control: 'name',
                  value: row.model.entity.name,
                },
                {
                  control: 'entity_id',
                  value: row.model.entity.id,
                },
                {
                  control: 'phone',
                  value: row.model.entity.mobilephone,
                },
              ]
            );
          }
        })
    );
  }

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImagePath.attachment_filename = event.target.files[0].name;
        this.currentImagePath.thumbnail = eventReader.target.result;

        const fd = new FormData();
        fd.append('file', event.target.files[0], event.target.files[0].name);
        this.store.dispatch(new actions.RequestPostEventImage(fd));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  successChangeImage(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.EventsActionTypes.SuccessPostEventImage))
      .subscribe((r: any) => {
        if (r.payload.filename === this.currentImagePath?.attachment_filename) {
          this.currentImagePath.cover = r.payload.filePath;

          this.form.get('cover').setValue(this.currentImagePath.cover);
          this.form
            .get('attachment_filename')
            .setValue(this.currentImagePath.attachment_filename);
        }
      });
  }

  // uploadFileToContent(file) {
  //   if (file) {
  //     const fd = new FormData();
  //     fd.append('file', file, file.name);
  //     this.store.dispatch(new actions.RequestPostContentFile(fd));
  //   }
  // }

  // successUploadFileToContent(): Subscription {
  //   return this.actionSubject
  //     .pipe(ofType(actions.EventsActionTypes.SuccessPostContentFile))
  //     .subscribe((r: any) => {
  //       this.contentTextEditor.addLink(
  //         `${this.baseFilePath}/${r.payload.filePath.replace(
  //           'public/uploads/',
  //           ''
  //         )}`,
  //         r.payload.filename
  //       );
  //     });
  // }

  addImageToFotogalery(event) {
    const thumbnailImage = '';
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        const thumbnailImage = eventReader.target.result;

        const newFotogalery = {
          attachment_filename: event.target.files[0].name,
          image_url_filename: event.target.files[0].name,
          thumbnail: thumbnailImage,
          image_url: null,
          photo_author: null,
          photo_caption: null,
          _destroy: false,
        };
        // Save the image that we are sending
        this.imageQueued = newFotogalery;

        // When the input changes, obtain the image
        const fd = new FormData();
        fd.append('file', event.target.files[0], event.target.files[0].name);
        // Uploads image
        this.store.dispatch(new actions.RequestPostEventImage(fd));
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    // We cannot immediately add it to the DataSource
    // because we need the filePath thats sent in the response
    // the response is listened in successFotogaleryUpload()
    // that checks if the name of the file is the same we are waiting and if it is
    // it adds it to the table with the additional data from the response
  }

  successFotogaleryUpload(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.EventsActionTypes.SuccessPostEventImage))
      .subscribe((r: any) => {
        if (r.payload.filename === this.imageQueued?.attachment_filename) {
          this.imageQueued.image_url = r.payload.filePath;
          this.fotogaleryFormArray.push(this.fb.group(this.imageQueued));

          this.fotogaleryDS.data = [
            ...this.fotogaleryDS.data,
            this.imageQueued,
          ];
        }
      });
  }

  addDownload(event) {
    if (event.target.files && event.target.files[0]) {
      const newDownload = {
        attachment_url_filename: event.target.files[0].name,
        attachment_url: null,
        link_description: null,
        _destroy: false,
      };
      this.fileQueued = newDownload;

      const fd = new FormData();
      fd.append('file', event.target.files[0], event.target.files[0].name);
      this.store.dispatch(new actions.RequestPostEventImage(fd));
    }
  }

  successAddDownload(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.EventsActionTypes.SuccessPostEventImage))
      .subscribe((r: any) => {
        if (r.payload.filename === this.fileQueued?.attachment_url_filename) {
          this.fileQueued.attachment_url = r.payload.filePath;
          this.downloadsFormArray.push(this.fb.group(this.fileQueued));

          this.downloadsDS.data = [...this.downloadsDS.data, this.fileQueued];
        }
      });
  }

  appendAttachmentImage() {
    // If attachmente is file type, get the name
    if (this.form.get('attachment_filename').value?.name) {
      this.form
        .get('attachment_filename')
        .setValue(this.form.get('attachment_filename').value.name);
    }

    if (this.form.get('attachment_filename').value === null) {
      this.form.get('cover').setValue(null);
    }
  }

  appendContentsToForm() {
    this.form.setControl(
      'contents_contents',
      this.fb.array(this.relatedContentsFormArray.value)
    );
  }

  appendHastagsToForm() {
    const res = [];
    this.hashtagsList.forEach((tag) => {
      res.push({
        id: tag.id,
        tag: tag.label,
        deleted: false,
        _destroy: tag.selected ? false : true,
      });
    });
    this.form.setControl('contents_hashtags', this.fb.array(res));
  }

  appendFotogaleryToForm() {
    const contentsFotogaleries = [];
    this.fotogaleryFormArray.value.forEach((element) => {
      contentsFotogaleries.push({
        attachment: element.attachment,
        attachment_filename: element.attachment_filename,
        deleted: element.deleted,
        id: element.id,
        image_url: element.image_url,
        image_url_filename: element.image_url_filename,
        photo_author: element.photo_author,
        photo_caption: element.photo_caption,
        _destroy: element._destroy,
      });
    });
    this.form.setControl(
      'contents_fotogaleries',
      this.fb.array(contentsFotogaleries)
    );
  }

  appendDownloadsToForm() {
    const contentsDownloads = [];
    this.downloadsFormArray.value.forEach((element) => {
      contentsDownloads.push({
        attachment_url: element.attachment_url,
        attachment_url_filename: element.attachment_url_filename,
        link_description: element.link_description,
        deleted: element.deleted,
        id: element.id,
        _destroy: element._destroy,
      });
    });
    this.form.setControl(
      'contents_attachments',
      this.fb.array(contentsDownloads)
    );
  }

  appendRegistrationsToForm() {
    const contentsRegistrations = [];
    this.registrationsFormArray.value.forEach((element) => {
      contentsRegistrations.push({
        confirmed: element.confirmed,
        email: element.email,
        entity_description: element.entity_description,
        entity_id: element.entity_id,
        name: element.name,
        nr_of_people: element.nr_of_people,
        observations: element.observations,
        phone: element.phone,
        present: element.present,
        qr_code_path: element.qr_code_path,
        id: element.id,
        _destroy: element._destroy,
      });
    });
    this.form.setControl(
      'contents_registrations',
      this.fb.array(contentsRegistrations)
    );
  }

  calcOccupiedSpaces(): number {
    let occSpaces = 0;
    this.registrationsFormArray.value.forEach((element) => {
      if (!element._destroy) {
        occSpaces += +element.nr_of_people;
      }
    });
    this.form.get('occupied_spaces').setValue(occSpaces);
    return occSpaces;
  }

  saveAndNotifyClick() {
    this.isNotifying = true;
    this.onSubmit();
  }

  notifyPeople() {
    const payload = { registrations: this.registrationsFormArray.value };
    this.store.dispatch(new actions.RequestNotifyEvents(payload));
  }

  // Form Validators --
  private notNegative(control: any): { [key: string]: any } {
    if (Number(control.value) < 1) {
      return { nonZero: true };
    } else {
      return null;
    }
  }
  // --

  // History --
  openHistory(data: any) {
    this.openHistoryModal = true;
    this.historyModalData = data;
  }

  onHistoryModalClose() {
    this.openHistoryModal = false;
  }
  // --
}
