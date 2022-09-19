import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as actions from '../reducers/reports-groupers.actions';
import { State } from '../reducers/reports-groupers.reducer';
import { getReportsGrouper } from '../reducers/reports-groupers.selectors';
import { ReportsGrouper } from '../reports-grouper.model';

@Component({
  selector: 'kyr-reports-groupers-form',
  templateUrl: './reports-groupers-form.component.html',
})
export class ReportsGroupersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<ReportsGrouper>;
  modulePath = 'reports-groupers';

  selectorGetModel = getReportsGrouper;
  actionRequestFail =
    actions.ReportsGroupersActionTypes.RequestFailReportsGroupers;
  actionRequestGetAll = actions.RequestGetAllReportsGroupers;
  actionRequestGetOne = actions.RequestGetReportsGrouper;
  actionRequestPut = actions.RequestPutReportsGrouper;
  actionSuccessPut =
    actions.ReportsGroupersActionTypes.SuccessPutReportsGrouper;
  actionRequestPost = actions.RequestPostReportsGrouper;
  actionSuccessPost =
    actions.ReportsGroupersActionTypes.SuccessPostReportsGrouper;

  localeOptions = [
    {
      value: 'pt',
      label: this.i18nextPipe.transform(`translation:_languages.pt`),
    },
    {
      value: 'en',
      label: this.i18nextPipe.transform(`translation:_languages.en`),
    },
    {
      value: 'es',
      label: this.i18nextPipe.transform(`translation:_languages.es`),
    },
  ];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
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
      block_remove: [false],
      created_at: [null],
      created_by_user_id: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      enabled: [true],
      id: [null],
      locale: [null, Validators.required],
      name: [null, Validators.required],
      updated_at: [null],
      updated_by_user_id: [null],
    });
  }
}
