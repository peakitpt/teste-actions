import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Gestdocument } from '../gestdocument.model';
import * as actions from '../reducers/gestdocuments.actions';
import { getGestdocument } from '../reducers/gestdocuments.selectors';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'kyr-gestdocuments-details',
  templateUrl: './gestdocuments-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GestdocumentsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Gestdocument>;
  model: Gestdocument;
  returnUrl = '/gestdocuments';
  modulePath = 'gestdocuments';
  viewName = 'Gestdocument';

  // Selectors & actions
  selectorGetModel = getGestdocument;
  actionRequestFail = actions.GestdocumentsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
  // Selectors & actions END

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
