import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { State } from '../reducers/users.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/users.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getUser } from '../reducers/users.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { User } from '../user.model';
import { SharedModule } from 'src/app/shared/shared.module';
import * as BishopricsState from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getBishopricsSelected } from 'src/app/shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

@Component({
  selector: 'kyr-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<User>;
  modulePath = 'users';
  subscriptionModalMenu = [
    {
      name: this.i18nextPipe.transform('translation:action.clear'),
      value: 'clear_modal',
      icon: 'clear',
    },
  ];

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

  entityTypeOptions = [
    {
      value: 2,
      label: this.i18nextPipe.transform('translation:entity.chapelry'),
    },
    {
      value: 3,
      label: this.i18nextPipe.transform('translation:entity.user'),
    },
    {
      value: 4,
      label: this.i18nextPipe.transform('translation:entity.super_user'),
    },
    {
      value: 10,
      label: this.i18nextPipe.transform('translation:entity.archpriestship'),
    },
    {
      value: 11,
      label: this.i18nextPipe.transform('translation:entity.priest'),
    },
    {
      value: 13,
      label: this.i18nextPipe.transform('translation:entity.institution'),
    },
  ];

  parishionersModalParams = {
    modal: true,
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users_with_demo: true,
    format: 'json',
    documents: true,
  };

  selectorGetModel = getUser;
  actionRequestFail = actions.UsersActionTypes.RequestFailUsers;
  actionRequestGetAll = actions.RequestGetAllUsers;
  actionRequestGetOne = actions.RequestGetUser;
  actionRequestPut = actions.RequestPutUser;
  actionSuccessPut = actions.UsersActionTypes.SuccessPutUser;
  actionRequestPost = actions.RequestPostUser;
  actionSuccessPost = actions.UsersActionTypes.SuccessPostUser;

  bishopricsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private bishopricsStore: Store<BishopricsState.State>,
    private parishionersStore: Store<ParishionersState.State>
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
      name: [null, Validators.required],
      email: [null, Validators.required],
      disabled: [true],
      kyrios_social_access: [false],
      kyrios_portal_access: [false],
      approved_at: [new Date()],
      expiration_date: [],
      locale: [],
      subscription_id: [],
      subscription_description: [],
      subscriptions_limit: [
        1,
        Validators.compose([Validators.required, this.notNegative]),
      ],
      entity: this.fb.group({
        entity_ekklesia_location_id: [],
        entity_type_id: [],
      }),
      entity_ekklesia_location_description: [],

      block_remove: [false],
      blocked_at: [null],
      blocked_by_user_id: [null],
      created_at: [null],
      created_by_user_id: [null],
      current_sign_in_at: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      entity_id: [null],
      profile_id: [null],
      role: [null],
      session_id: [null],
      sign_in_count: [0],
      sync_at: [null],
      updated_by_user_id: [null],
      user_id: [null],
    });

    this.subs.push(
      this.form
        .get('entity')
        .get('entity_type_id')
        .valueChanges.subscribe((r: number) => {
          if (+r !== 11) {
            this.form
              .get('entity')
              .get('entity_ekklesia_location_id')
              .setValue(null);
            this.form
              .get('entity_ekklesia_location_description')
              .setValue(null);
          }
        })
    );
  }

  ngOnInit() {
    super.ngOnInit();

    this.setBishopricsModal();
    this.setParishionersModal();
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(
          ofType(
            this.actionRequestFail,
            this.actionSuccessPut,
            this.actionSuccessPost
          )
        )
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.snackBarService.openSnackBar(
              result.payload.error.error,
              this.sharedModule.ERROR_COLOR,
              5000
            );
          } else {
            this.isLoading = true;

            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.save_success`
              ),
              this.sharedModule.SUCCESS_COLOR
            );

            if (this.saveAndNew) {
              this.saveAndNew = false;
              this.isLoading = false;
              this.initializeForm();
            } else if (result.payload.id) {
              this.modal.close();
              this.router.navigate([
                this.modulePath,
                result.payload.id,
                'details',
              ]);
            } else {
              this.modal.close();
            }
          }
        })
    );
  }

  setFormValues(obj: any) {
    Object.keys(obj).forEach((key: any) => {
      if (this.duplicateMode && ['id'].includes(key)) {
        // Don't include these keys on duplicate mode
      } else if (
        this.form.contains(key) &&
        !(this.form.get(key) instanceof FormArray)
      ) {
        switch (key) {
          case 'entity': // Entity is a special case
            this.form
              .get(key)
              .get('entity_type_id')
              .setValue(obj[key]['entity_type_id']);
            this.form
              .get(key)
              .get('entity_ekklesia_location_id')
              .setValue(obj[key]['entity_ekklesia_location_id']);
            break;
          default:
            this.form.get(key).setValue(obj[key]);
        }
      }
    });
  }

  onFormValid() {
    // Must be numeric
    this.form.value.subscriptions_limit = +this.form.value.subscriptions_limit;

    if (this.form.value.id) {
      this.store.dispatch(new this.actionRequestPut(this.form.value));
    } else {
      this.store.dispatch(new this.actionRequestPost(this.form.value));
    }
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'save_new': {
        this.onSubmit();
        this.router
          .navigate([this.modulePath])
          .then(() => this.router.navigate([this.modulePath, 'new']));
        break;
      }
      case 'delete': {
        if (this.id) {
          this.router.navigate([this.modulePath, this.id, 'edit', 'delete']);
        }
        break;
      }
      case 'clear_parishioner_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(`${inputName}_id`).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
        }
        break;
      }
      case 'view_selected_parishioner': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('subscriptions', id);
          }
        }
        break;
      }
      case 'clear_bishopric_modal': {
        if (inputName) {
          // Form's modal
          this.form.get(['entity', `${inputName}_id`]).setValue(null);
          this.form.get(`${inputName}_description`).setValue(null);
          this.form.get(`subscription_id`).setValue(null);
        }
        break;
      }
      case 'entity_ekklesia_location': {
        if (inputName) {
          let id: number;
          // Form's modal
          id = this.form.get(['entity', `${inputName}_id`]).value;
          if (id) {
            this.openDetails('bishoprics', id);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  private notNegative(control: any): { [key: string]: any } {
    if (Number(control.value) < 1) {
      return { nonZero: true };
    } else {
      return null;
    }
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioner');

    // When a row is selected
    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.entity_id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.complete_relation);
            this.form.get('subscription_id').setValue(row.model.id);
          }
        })
    );
  }

  private setBishopricsModal() {
    this.bishopricsMenuOptions = this.defaultModalMenu('bishopric');

    // When a row is selected
    this.subs.push(
      this.bishopricsStore
        .select(getBishopricsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form
              .get(['entity', `${row.inputName}_id`])
              .setValue(row.model.entity_id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.complete_relation);
          }
        })
    );
  }
}
