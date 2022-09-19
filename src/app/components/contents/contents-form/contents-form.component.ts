import {
  Hashtag,
  FotogaleryContent,
  DownloadContent,
  ContentRelation,
} from './../content.model';
import { Section, SectionResponse } from './../../sections/section.model';
import { getSectionsList } from './../../sections/reducers/sections.selectors';
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
import * as actions from '../reducers/contents.actions';
import * as modalActions from '../../../shared/components/modals/contents-modal/reducers/contents-modal.actions';
import * as sectionsActions from '../../sections/reducers/sections.actions';
import { TableDataSource, SnackBarService } from '@peakitpt/ui-material';
import { getContent } from '../reducers/contents.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Content } from '../content.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ofType } from '@ngrx/effects';
import { Store, ActionsSubject } from '@ngrx/store';
import { State } from '../reducers/contents.reducer';
import { State as ContentsState } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { getContentsSelected } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { TextareCKEditorComponent } from '@peakitpt/ui-material/components/text-area-ckeditor/text-area-ckeditor.component';
import { environment } from 'src/environments/environment';
import normalizeText from 'normalize-text';

@Component({
  selector: 'kyr-contents-form',
  templateUrl: './contents-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ContentsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  environment = environment;
  model$: Observable<Content>;
  modulePath = 'contents';
  baseFilePath = environment.apiUploaderUrl;

  selectorGetModel = getContent;
  actionRequestFail = actions.ContentsActionTypes.RequestFailContents;
  actionRequestGetAll = actions.RequestGetAllContents;
  actionRequestGetOne = actions.RequestGetContent;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionRequestPut = actions.RequestPutContent;
  actionSuccessPut = actions.ContentsActionTypes.SuccessPutContent;
  actionRequestPost = actions.RequestPostContent;
  actionSuccessPost = actions.ContentsActionTypes.SuccessPostContent;

  // TEMPLATES
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('contentRowTemplate') contentRowTemplate: TemplateRef<any>;
  @ViewChild('sectionRowTemplate') sectionRowTemplate: TemplateRef<any>;
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

  // Text Areas
  @ViewChild('contentTextEditor')
  contentTextEditor: TextareCKEditorComponent;

  model: any;
  // Contents
  contentsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  newRelatedContent = {
    content_rel_description: null,
    content_rel_id: null,
  };
  relatedContentDS: TableDataSource<any> = new TableDataSource([]);
  relatedContentColumns: any[] = [];
  relatedContentsFormArray: FormArray = new FormArray([]);
  // Sections
  sectionsList = [];
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

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private contentsStore: Store<ContentsState>
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
      content: [null, Validators.required],
      sections_names: [],
      online_from_date: [new Date()],
      block_remove: [false],
      accept_registrations: [false],
      attachment: [],
      attachment_filename: [],
      author: [],
      content_type_id: [],
      contents_attachments: this.fb.array([]),
      contents_contents: this.fb.array([]),
      contents_fotogaleries: this.fb.array([]),
      contents_hashtags: [],
      contents_sections: this.fb.array([]),
      cover: [],
      cover_author: [],
      cover_filename: [],
      cover_locale: [],
      entity_ekklesia_location_id: [],
      limited_spaces: [],
      locale: [],
      notification_sent_at: [],
      occupied_spaces: [0],
      online: [true],
      online_from_hour: [
        this.sharedModule.getFormattedHour(),
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      online_to_date: [],
      online_to_hour: [
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
      registrations_start: [],
      registrations_start_hour: [
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
      slug:[]
    });

    this.relatedContentsFormArray = this.form.get(
      'contents_attachments'
    ) as FormArray;
  }

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
          this.setSections();
          this.isLoading = false;
        }
      })
    );

    // Code used for Quick Insertions
    this.isQuickInsertion =
      this.route.snapshot.queryParamMap.get('isQuickInsertion') === 'true';

    this.setRelatedContentsModal();
  }

  ngAfterViewInit() {
    this.subscribeForSavingActions();
    this.onAfterViewInit();
    this.modal.open();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);

    this.model = obj;
    this.setHashtags();
    this.setSections();
    this.setRelatedContents(obj.contents_contents);
    this.setFotogalery();
    this.setDownloads();
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.content`
        ),
        templateContent: this.contentTemplate,
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
    this.appendSectionsToForm();
    this.appendHastagsToForm();
    this.appendFotogaleryToForm();
    this.appendDownloadsToForm();

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
    this.sectionsList = [];
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  createSlug(title: string) {
    let slug = normalizeText(title);
    slug = slug.replace(/\s+/g, '-');
    return slug
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]

  private setRelatedContents(contents: ContentRelation[] = []) {
    this.relatedContentsFormArray.clear();
    this.relatedContentDS.data = this.relatedContentsFormArray.value;
    if (contents?.length) {
      contents.forEach((content: ContentRelation) => {
        const item = {
          content_rel_description: content.content_rel_description,
          content_rel_id: content.content_rel_id,
        };
        this.addTableLine(
          item,
          this.relatedContentsFormArray,
          this.relatedContentDS
        );
      });
    }
  }

  private setSections() {
    this.sectionsList = [];
    const sections$ = this.store.select(getSectionsList);
    this.store.dispatch(
      new sectionsActions.RequestGetAllSections({ limit: 'all' })
    );
    this.subs.push(
      sections$.subscribe((r: SectionResponse) => {
        this.sectionsList = [];
        if (r) {
          r.results.forEach((section: Section) => {
            this.sectionsList.push({
              label: section.description,
              selected: this.model?.contents_sections.some(
                (s: any) => s.section.id === section.id
              ),
              description: section.description,
              id: section.id,
              reference: section.reference,
            });
          });
        }
      })
    );
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

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.currentImagePath.attachment_filename = event.target.files[0].name;
        this.currentImagePath.thumbnail = eventReader.target.result;

        const fd = new FormData();
        fd.append('file', event.target.files[0], event.target.files[0].name);
        this.store.dispatch(new actions.RequestPostContentImage(fd));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  successChangeImage(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.ContentsActionTypes.SuccessPostContentImage))
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
  //     .pipe(ofType(actions.ContentsActionTypes.SuccessPostContentFile))
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
        this.store.dispatch(new actions.RequestPostContentImage(fd));
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
      .pipe(ofType(actions.ContentsActionTypes.SuccessPostContentImage))
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
      this.store.dispatch(new actions.RequestPostContentImage(fd));
    }
  }

  successAddDownload(): Subscription {
    return this.actionSubject
      .pipe(ofType(actions.ContentsActionTypes.SuccessPostContentImage))
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

  appendSectionsToForm() {
    const contentsSections = [];
    let sections = '';
    this.sectionsList.forEach((section) => {
      if (section.selected === true) {
        sections = sections + section.description + ';';
        contentsSections.push({
          section_id: section.id,
        });
      }
    });

    this.form.get('sections_names').setValue(sections);
    this.form.setControl('contents_sections', this.fb.array(contentsSections));
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

  private setRelatedContentsModal() {
    this.contentsMenuOptions = this.defaultModalMenu('content');

    // When a row is selected
    this.subs.push(
      this.contentsStore
        .select(getContentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
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
        })
    );
  }
}
