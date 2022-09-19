import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/emoluments.actions';
import { getEmolument } from '../reducers/emoluments.selectors';
import { Observable } from 'rxjs';
import { Emolument } from '../emolument.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { EmolumentsTypesService } from '@peakitpt/ui-kyrios-api';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-emoluments-details',
  templateUrl: './emoluments-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmolumentsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Emolument>;
  returnUrl = '/emoluments';
  modulePath = 'emoluments';
  viewName = 'Emolument';

  selectorGetModel = getEmolument;
  actionRequestFail = actions.EmolumentsActionTypes.RequestFailEmoluments;
  actionRequestGetOne = actions.RequestGetEmolument;

  emolumentsTypes: any = {};
  currencies: any = {};

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
    private emolumentsTypesService: EmolumentsTypesService
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
    super.ngOnInit();
    this.getEmolumentTypes();
  }

  getEmolumentTypes() {
    const payload = {
      limit: 9999,
    };

    this.subs.push(
      this.emolumentsTypesService.getAll(payload).subscribe((r) => {
        r.results.forEach((emolument) => {
          this.emolumentsTypes[emolument.id] = emolument.name;
        });
      })
    );
  }
}
