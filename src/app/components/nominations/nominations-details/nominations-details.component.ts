import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/nominations.actions';
import { getNomination } from '../reducers/nominations.selectors';
import { Observable } from 'rxjs';
import { Attachment, Nomination } from '../nomination.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { NominationsService } from '@peakitpt/ui-kyrios-api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-nominations-details',
  templateUrl: './nominations-details.component.html',
  styleUrls: ['./nominations-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NominationsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Nomination>;
  returnUrl = '/nominations';
  modulePath = 'nominations';
  viewName = 'Nomination';

  selectorGetModel = getNomination;
  actionRequestFail = actions.NominationsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  nominationsTypesOptions: any;
  detailsTabs: any[] = [];

  // TABS
  @ViewChild('clergyNominationTabsTemplate')
  clergyNominationTabsTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabsTemplate')
  attachmentsTabsTemplate: TemplateRef<any>;

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
    private nominationsService: NominationsService
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

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.setNominationsTypes();
    this.detailsTabs.push(
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
      }
    );
  }

  setNominationsTypes() {
    this.nominationsTypesOptions = {
      2: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.not_parishioner`
      ),
      1: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.parishioner`
      ),
    };
  }

  downloadAttachment(attachment: Attachment) {
    window.open(
      `${environment.railsAppUrl}/filemanagers/download?f=${attachment.attachment}&fn=${attachment.attachment_filename}`,
      '_blank'
    );
  }
}
