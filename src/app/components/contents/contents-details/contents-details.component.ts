import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable } from 'rxjs';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Content, SectionRelation } from '../content.model';
import * as actions from '../reducers/contents.actions';
import { getContent } from '../reducers/contents.selectors';
import { environment } from './../../../../environments/environment';
import { Hashtag } from './../content.model';

@Component({
  selector: 'kyr-contents-details',
  templateUrl: './contents-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ContentsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Content>;
  returnUrl = '/contents';
  modulePath = 'contents';
  viewName = 'Content';

  detailsTabs: any[];
  sectionsList: any[] = [];
  hashtagsList: any[] = [];
  baseFilePath = environment.apiUploaderUrl;
  contentHtml: SafeHtml;

  selectorGetModel = getContent;
  actionRequestFail = actions.ContentsActionTypes.RequestFailContents;
  actionRequestGetOne = actions.RequestGetContent;

  // TEMPLATES
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('relatedContentsTemplate')
  relatedContentsTemplate: TemplateRef<any>;
  @ViewChild('fotogaleryTemplate') fotogaleryTemplate: TemplateRef<any>;
  @ViewChild('downloadsTemplate') downloadsTemplate: TemplateRef<any>;

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
    public sanitizer: DomSanitizer
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
    this.buildHeaderOptionsMenu();

    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.id = +params.id;
          this.model$ = this.store.select(this.selectorGetModel);
          this.store.dispatch(new this.actionRequestGetOne(+params.id));
          this.subs.push(
            this.model$.subscribe((r: Content) => {
              if (r) {
                this.contentHtml = this.sanitizer.bypassSecurityTrustHtml(
                  r.content
                );
                this.sectionsList = [];
                r.contents_sections.forEach((section: SectionRelation) => {
                  this.sectionsList.push({
                    value: section.section.description,
                  });
                });
                this.hashtagsList = [];
                r.contents_hashtags.forEach((hashtag: Hashtag) => {
                  this.hashtagsList.push({
                    value: hashtag.tag,
                  });
                });
              }
            })
          );
        }
      })
    );
    this.getReports();
  }

  ngAfterViewInit() {
    this.detailsTabs = [
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

    this.modal.open();
  }
}
