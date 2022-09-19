import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/clergy-types.actions';
import { getClergyType } from '../reducers/clergy-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { ClergyType } from '../clergy-type.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../reducers/clergy-types.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';
import * as BaseState from 'src/app/components/base/reducers/base.reducer';
import * as BaseSelectors from '../../base/reducers/base.selectors';

@Component({
  selector: 'kyr-clergy-types-form',
  templateUrl: './clergy-types-form.component.html',
})
export class ClergyTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<ClergyType>;
  modulePath = 'clergy-types';

  selectorGetModel = getClergyType;
  actionRequestFail = actions.ClergyTypeActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.ClergyTypeActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.ClergyTypeActionTypes.SuccessPost;

  groupOptions: any[] = [];
  localeOptions: any[] = [];

  canEdit = {
    isSuperUser: false,
  };

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private baseStore: Store<BaseState.State>
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

  ngOnInit() {
    super.ngOnInit();
    this.checkSuperUser();
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      group_id: [null, Validators.required],
      group_name: [null],
      name: [null, Validators.required],
      abbreviated_name: [null],
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      inserted_by_user: [],
      locale: [null],
      updated_at: [],
      updated_by_user_id: [],
      validated: [false],
    });

    this.groupOptions = [
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.presbiterals`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.deacons`
        ),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.bishops`
        ),
      },
    ];

    this.localeOptions = [
      {
        value: 'pt',
        label: this.i18nextPipe.transform(`translation:_languages.pt`),
      },
      {
        value: 'es',
        label: this.i18nextPipe.transform(`translation:_languages.es`),
      },
      {
        value: 'en',
        label: this.i18nextPipe.transform(`translation:_languages.en`),
      },
    ];
  }

  checkSuperUser() {
    this.subs.push(
      this.baseStore
        .select(BaseSelectors.getUserInfo)
        .subscribe(async (r: any) => {
          if (r) {
            const isSuperUser = this.sharedModule.checkIfEntityType(
              SharedModule.USER_SUPERUSERS,
              r.payload.user.entity
            );
            this.canEdit.isSuperUser = isSuperUser;
          }
        })
    );
  }
}
