import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { DomSanitizer } from '@angular/platform-browser';

import { NewslettersLayout } from '../newsletters-layout.model';
import * as actions from '../reducers/newsletters-layouts.actions';
import { getNewslettersLayout } from '../reducers/newsletters-layouts.selectors';

@Component({
  selector: 'kyr-newsletters-layouts-details',
  templateUrl: './newsletters-layouts-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewslettersLayoutsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<NewslettersLayout>;
  model: NewslettersLayout;
  returnUrl = '/newsletters-layouts';
  modulePath = 'newsletters-layouts';
  viewName = 'NewslettersLayout';

  selectorGetModel = getNewslettersLayout;
  actionRequestFail = actions.NewslettersLayoutsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;

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
}
