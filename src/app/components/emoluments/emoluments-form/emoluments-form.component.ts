import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/emoluments.actions';
import { getEmolument } from '../reducers/emoluments.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Emolument } from '../emolument.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../reducers/emoluments.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';
import { EmolumentsTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestSetSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.actions';
import { EmolumentsType } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.model';

@Component({
  selector: 'kyr-emoluments-form',
  templateUrl: './emoluments-form.component.html',
})
export class EmolumentsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Emolument>;
  modulePath = 'emoluments';
  preFillWithNew = true;

  selectorGetModel = getEmolument;
  actionRequestFail = actions.EmolumentsActionTypes.RequestFailEmoluments;
  actionRequestGetAll = actions.RequestGetAllEmoluments;
  actionRequestGetOne = actions.RequestGetEmolument;
  actionRequestSetSelected = RequestSetSelected;
  actionRequestPut = actions.RequestPutEmolument;
  actionSuccessPut = actions.EmolumentsActionTypes.SuccessPutEmolument;
  actionRequestPost = actions.RequestPostEmolument;
  actionSuccessPost = actions.EmolumentsActionTypes.SuccessPostEmolument;
  actionRequestGetNew = actions.RequestGetNew;

  emolumentsTypes = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private emolumentsTypesService: EmolumentsTypesService
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
      created_at: [],
      created_by_user_id: [],
      currency: ['EUR', Validators.required],
      deleted: [false],
      deleted_by_user_id: [],
      description: [null, Validators.required],
      description_short: [null, Validators.required],
      emoluments_type_id: [null, Validators.required],
      entity_ekklesia_location_id: [],
      id: [],
      is_parochial_right: [false, Validators.required],
      updated_at: [],
      updated_by_user_id: [],
      value: [null, Validators.required],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getEmolumentTypes();
  }

  getEmolumentTypes() {
    const payload = {
      limit: 'none',
    };

    this.subs.push(
      this.emolumentsTypesService.getAll(payload).subscribe((r) => {
        r.results.forEach((emolumentType: EmolumentsType) => {
          this.emolumentsTypes.push({
            label: emolumentType.name,
            value: emolumentType.id,
          });
        });
      })
    );
  }
}
