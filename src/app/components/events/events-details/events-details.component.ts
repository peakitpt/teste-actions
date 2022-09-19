import { Hashtag } from './../event.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/events.actions';
import { getEvent } from '../reducers/events.selectors';
import { Observable } from 'rxjs';
import { Event } from '../event.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { environment } from './../../../../environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-events-details',
  templateUrl: './events-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EventsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Event>;
  returnUrl = '/events';
  modulePath = 'events';
  viewName = 'Event';

  detailsTabs: any[];
  hashtagsList: any[] = [];
  baseFilePath = environment.apiUploaderUrl;
  contentHtml: SafeHtml;

  selectorGetModel = getEvent;
  actionRequestFail = actions.EventsActionTypes.RequestFailEvents;
  actionRequestGetOne = actions.RequestGetEvent;

  // TEMPLATES
  @ViewChild('eventTemplate') eventTemplate: TemplateRef<any>;
  @ViewChild('registrationsTemplate') registrationsTemplate: TemplateRef<any>;
  @ViewChild('relatedContentsTemplate')
  relatedContentsTemplate: TemplateRef<any>;
  @ViewChild('fotogaleryTemplate') fotogaleryTemplate: TemplateRef<any>;
  @ViewChild('downloadsTemplate') downloadsTemplate: TemplateRef<any>;

  // History Modal
  openHistoryModal: boolean = false;
  historyModalData: any;

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
            this.model$.subscribe((r: Event) => {
              if (r) {
                this.contentHtml = this.sanitizer.bypassSecurityTrustHtml(
                  r.content
                );
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

    this.modal.open();
  }

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
